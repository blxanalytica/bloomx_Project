import { sendViaSMTP } from './transports/smtp.js';
import { sendViaResend } from './transports/resend.js';
import { sanitizeText } from '../utils/files.js';

export interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
  attachments?: Array<{
    filename: string;
    content: Buffer;
    contentType?: string;
  }>;
}

/**
 * Send email using configured provider
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const provider = process.env.EMAIL_PROVIDER || 'smtp';
  const to = process.env.SMTP_TO || options.to;

  // Sanitize text content
  const sanitizedText = sanitizeText(options.text);
  const html = options.html || sanitizeText(options.text).replace(/\n/g, '<br>');

  if (provider === 'resend') {
    await sendViaResend(to, options.subject, sanitizedText, html, options.attachments);
  } else {
    await sendViaSMTP(to, options.subject, sanitizedText, html, options.attachments);
  }
}

/**
 * Generate HTML email template
 */
export function generateEmailHTML(content: string, title: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
    <h2 style="color: #0a0b1a; margin-top: 0;">${title}</h2>
    <div style="background-color: white; padding: 20px; border-radius: 4px; margin-top: 15px;">
      ${content.replace(/\n/g, '<br>')}
    </div>
  </div>
  <p style="color: #666; font-size: 12px; margin-top: 20px; text-align: center;">
    This is an automated message from BloomX Analytica website forms.
  </p>
</body>
</html>
  `.trim();
}

