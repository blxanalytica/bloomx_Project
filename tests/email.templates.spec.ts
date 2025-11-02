import { describe, it, expect } from 'vitest';
import { renderCareer, renderContact } from '../../server/lib/email/templates/renderEmail.js';
import React from 'react';

describe('Email Templates', () => {
  describe('Career Application Email', () => {
    const careerProps = {
      id: '1234567890-abc123',
      submittedAtISO: '2025-11-02T12:00:00.000Z',
      applicant: {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+442012345678',
      },
      applyFor: 'Senior AI/ML Engineer',
      message: 'I am very interested in this position.',
      attachments: [
        {
          filename: 'resume.pdf',
          contentType: 'application/pdf',
          sizeBytes: 1024 * 500, // 500KB
        },
        {
          filename: 'portfolio.pdf',
          contentType: 'application/pdf',
          sizeBytes: 1024 * 1024 * 2, // 2MB
        },
      ],
    };

    it('should render HTML with all required sections', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.html).toContain('Career Application #1234567890-abc123');
      expect(rendered.html).toContain('Jane Smith');
      expect(rendered.html).toContain('jane@example.com');
      expect(rendered.html).toContain('Senior AI/ML Engineer');
      expect(rendered.html).toContain('Attachments');
      expect(rendered.html).toContain('resume.pdf');
      expect(rendered.html).toContain('portfolio.pdf');
      expect(rendered.html).toContain('Internal notification');
    });

    it('should render plain text with all required information', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.text).toContain('Career Application');
      expect(rendered.text).toContain('Jane Smith');
      expect(rendered.text).toContain('jane@example.com');
      expect(rendered.text).toContain('Senior AI/ML Engineer');
      expect(rendered.text).toContain('resume.pdf');
    });

    it('should have correct subject format', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.subject).toBe('Career Application #1234567890-abc123 – Senior AI/ML Engineer – Jane Smith');
    });

    it('should have correct preheader', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.preheader).toBe('New application for Senior AI/ML Engineer from Jane Smith');
    });

    it('should include dark mode CSS', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.html).toContain('@media (prefers-color-scheme: dark)');
      expect(rendered.html).toContain('background-color');
    });

    it('should not contain external CSS links', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.html).not.toContain('<link');
      expect(rendered.html).not.toContain('href=');
    });

    it('should not contain script tags', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.html).not.toContain('<script');
      expect(rendered.html).not.toContain('javascript:');
    });

    it('should truncate long filenames', () => {
      const propsWithLongFilename = {
        ...careerProps,
        attachments: [
          {
            filename: 'very-long-filename-that-exceeds-sixty-characters-and-should-be-truncated.pdf',
            contentType: 'application/pdf',
            sizeBytes: 1024,
          },
        ],
      };

      const rendered = renderCareer(propsWithLongFilename);

      expect(rendered.html).toContain('…pdf');
      expect(rendered.html).not.toContain('very-long-filename-that-exceeds-sixty-characters-and-should-be-truncated.pdf');
    });

    it('should format file sizes correctly', () => {
      const rendered = renderCareer(careerProps);

      expect(rendered.html).toContain('500.0 KB');
      expect(rendered.html).toContain('2.0 MB');
    });

    it('should wrap plain text lines to max 78 characters', () => {
      const rendered = renderCareer(careerProps);

      const lines = rendered.text.split('\n');
      for (const line of lines) {
        expect(line.length).toBeLessThanOrEqual(78);
      }
    });
  });

  describe('Contact Message Email', () => {
    const contactProps = {
      id: '9876543210-xyz789',
      submittedAtISO: '2025-11-02T14:30:00.000Z',
      sender: {
        name: 'John Doe',
        email: 'john@example.com',
      },
      subject: 'Request a Demo',
      message: 'I would like to schedule a demo of your platform.',
    };

    it('should render HTML with all required sections', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.html).toContain('Contact #9876543210-xyz789');
      expect(rendered.html).toContain('John Doe');
      expect(rendered.html).toContain('john@example.com');
      expect(rendered.html).toContain('Request a Demo');
      expect(rendered.html).toContain('Reply to John Doe');
      expect(rendered.html).toContain('mailto:');
      expect(rendered.html).toContain('Internal notification');
    });

    it('should render plain text with all required information', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.text).toContain('Contact');
      expect(rendered.text).toContain('John Doe');
      expect(rendered.text).toContain('john@example.com');
      expect(rendered.text).toContain('Request a Demo');
    });

    it('should have correct subject format', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.subject).toBe('Contact #9876543210-xyz789 – Request a Demo – John Doe');
    });

    it('should have correct preheader', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.preheader).toBe('New message from John Doe');
    });

    it('should include mailto link in HTML', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.html).toContain(`mailto:john@example.com`);
      expect(rendered.html).toContain('subject=');
      expect(rendered.html).toContain('Re:');
    });

    it('should include dark mode CSS', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.html).toContain('@media (prefers-color-scheme: dark)');
    });

    it('should not contain external CSS links or scripts', () => {
      const rendered = renderContact(contactProps);

      expect(rendered.html).not.toContain('<link');
      expect(rendered.html).not.toContain('<script');
    });

    it('should wrap plain text lines to max 78 characters', () => {
      const rendered = renderContact(contactProps);

      const lines = rendered.text.split('\n');
      for (const line of lines) {
        expect(line.length).toBeLessThanOrEqual(78);
      }
    });
  });
});

