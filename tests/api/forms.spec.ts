import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Request, Response } from 'express';
import { contactHandler } from '../server/routes/contact.js';
import { careerHandler } from '../server/routes/career.js';

// Mock email sending
vi.mock('../server/lib/email/sendEmail.js', () => ({
  sendEmail: vi.fn().mockResolvedValue(undefined),
}));

// Mock rate limiting
vi.mock('../server/lib/utils/rateLimit.js', () => ({
  checkRateLimit: vi.fn().mockReturnValue(false),
}));

describe('Contact Form API', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

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
  });

  it('should accept valid contact form submission', async () => {
    mockReq.body = {
      name: 'John Doe',
      email: 'john@example.com',
      inquiryType: 'demo',
      message: 'This is a test message with enough characters.',
    };

    await contactHandler(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        id: expect.any(String),
      })
    );
  });

  it('should reject invalid email', async () => {
    mockReq.body = {
      name: 'John Doe',
      email: 'invalid-email',
      inquiryType: 'demo',
      message: 'This is a test message.',
    };

    await contactHandler(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        fieldErrors: expect.objectContaining({
          email: expect.any(String),
        }),
      })
    );
  });

  it('should reject honeypot submission', async () => {
    mockReq.body = {
      name: 'John Doe',
      email: 'john@example.com',
      inquiryType: 'demo',
      message: 'This is a test message.',
      company: 'spam',
    };

    await contactHandler(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(204);
  });
});

describe('Career Form API', () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockReq = {
      body: {},
      files: {},
      headers: {},
      ip: '127.0.0.1',
    };
    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis(),
      send: vi.fn().mockReturnThis(),
    };
  });

  it('should accept valid career form with resume', async () => {
    const mockFile = {
      fieldname: 'resume',
      originalname: 'resume.pdf',
      mimetype: 'application/pdf',
      buffer: Buffer.from('fake pdf content'),
      size: 1024,
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

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: true,
        id: expect.any(String),
      })
    );
  });

  it('should reject missing resume', async () => {
    mockReq.body = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+442012345678',
      applyFor: 'Senior AI/ML Engineer',
    };
    mockReq.files = {};

    await careerHandler(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        fieldErrors: expect.objectContaining({
          resume: expect.any(String),
        }),
      })
    );
  });

  it('should reject invalid file extension', async () => {
    const mockFile = {
      fieldname: 'resume',
      originalname: 'resume.txt',
      mimetype: 'text/plain',
      buffer: Buffer.from('fake content'),
      size: 1024,
    } as Express.Multer.File;

    mockReq.body = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+442012345678',
      applyFor: 'Senior AI/ML Engineer',
    };
    mockReq.files = {
      resume: [mockFile],
    };

    await careerHandler(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ok: false,
        fieldErrors: expect.objectContaining({
          resume: expect.stringContaining('invalid extension'),
        }),
      })
    );
  });
});

