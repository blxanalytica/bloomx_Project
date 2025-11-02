import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { contactHandler } from '../server/routes/contact.js';
import { careerHandler } from '../server/routes/career.js';
import * as sendEmailModule from '../server/lib/email/sendEmail.js';

// Mock email sending
vi.mock('../server/lib/email/sendEmail.js', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

// Mock rate limiting
vi.mock('../server/lib/utils/rateLimit.js', () => ({
  checkRateLimit: vi.fn().mockReturnValue(false),
}));

describe('Email Template Integration', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let capturedEmail: any;

  beforeEach(() => {
    mockReq = {
      body: {},
      headers: {},
      ip: '127.0.0.1',
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
    
    capturedEmail = null;
    vi.mocked(sendEmailModule.sendEmail).mockImplementation((options: any) => {
      capturedEmail = options;
      return Promise.resolve();
    });
  });

  describe('Career Application Integration', () => {
    it('should render career email with correct subject and content', async () => {
      const mockFile = {
        fieldname: 'resume',
        originalname: 'resume.pdf',
        mimetype: 'application/pdf',
        buffer: Buffer.from('fake pdf content'),
        size: 1024 * 500,
      } as Express.Multer.File;

      mockReq.body = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+442012345678',
        applyFor: 'Senior AI/ML Engineer',
        message: 'I am interested in this position.',
      };
      mockReq.files = {
        resume: [mockFile],
      };

      await careerHandler(mockReq as Request, mockRes as Response);

      expect(capturedEmail).toBeTruthy();
      expect(capturedEmail.subject).toContain('Career Application #');
      expect(capturedEmail.subject).toContain('Senior AI/ML Engineer');
      expect(capturedEmail.subject).toContain('Jane Smith');
      
      // HTML should contain applicant info
      expect(capturedEmail.html).toContain('Jane Smith');
      expect(capturedEmail.html).toContain('jane@example.com');
      expect(capturedEmail.html).toContain('Senior AI/ML Engineer');
      
      // HTML should contain attachments table
      expect(capturedEmail.html).toContain('Attachments');
      expect(capturedEmail.html).toContain('resume.pdf');
      
      // Plain text should contain applicant name
      expect(capturedEmail.text).toContain('Jane Smith');
      expect(capturedEmail.text).toContain('Senior AI/ML Engineer');
    });

    it('should include attachments in email', async () => {
      const mockResume = {
        fieldname: 'resume',
        originalname: 'resume.pdf',
        mimetype: 'application/pdf',
        buffer: Buffer.from('fake pdf'),
        size: 1024,
      } as Express.Multer.File;

      const mockAttachment = {
        fieldname: 'attachments',
        originalname: 'portfolio.pdf',
        mimetype: 'application/pdf',
        buffer: Buffer.from('fake portfolio'),
        size: 2048,
      } as Express.Multer.File;

      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+442012345678',
        applyFor: 'Product Designer',
      };
      mockReq.files = {
        resume: [mockResume],
        attachments: [mockAttachment],
      };

      await careerHandler(mockReq as Request, mockRes as Response);

      expect(capturedEmail.attachments).toHaveLength(2);
      expect(capturedEmail.html).toContain('portfolio.pdf');
      expect(capturedEmail.html).toContain('resume.pdf');
    });
  });

  describe('Contact Message Integration', () => {
    it('should render contact email with correct subject and content', async () => {
      mockReq.body = {
        name: 'John Doe',
        email: 'john@example.com',
        inquiryType: 'Request a Demo',
        message: 'I would like to schedule a demo.',
      };

      await contactHandler(mockReq as Request, mockRes as Response);

      expect(capturedEmail).toBeTruthy();
      expect(capturedEmail.subject).toContain('Contact #');
      expect(capturedEmail.subject).toContain('Request a Demo');
      expect(capturedEmail.subject).toContain('John Doe');
      
      // HTML should contain sender info
      expect(capturedEmail.html).toContain('John Doe');
      expect(capturedEmail.html).toContain('john@example.com');
      expect(capturedEmail.html).toContain('Request a Demo');
      
      // HTML should contain mailto CTA
      expect(capturedEmail.html).toContain('Reply to John Doe');
      expect(capturedEmail.html).toContain('mailto:john@example.com');
      
      // Plain text should contain sender name
      expect(capturedEmail.text).toContain('John Doe');
      expect(capturedEmail.text).toContain('Request a Demo');
    });

    it('should encode mailto subject correctly', async () => {
      mockReq.body = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        inquiryType: 'Sales Inquiry',
        message: 'Interested in your product.',
      };

      await contactHandler(mockReq as Request, mockRes as Response);

      expect(capturedEmail.html).toContain('mailto:jane@example.com');
      expect(capturedEmail.html).toContain('subject=');
      expect(capturedEmail.html).toContain('Re:');
    });
  });
});

