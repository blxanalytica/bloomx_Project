import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

/**
 * Initialize SMTP transporter
 */
export function initSMTPTransporter(): Transporter {
  if (transporter) {
    return transporter;
  }

  const host = process.env.SMTP_HOST || 'localhost';
  const port = parseInt(process.env.SMTP_PORT || '1025', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER || '';
  const pass = process.env.SMTP_PASS || '';

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  return transporter;
}

/**
 * Send email via SMTP
 */
export async function sendViaSMTP(
  to: string,
  subject: string,
  text: string,
  html: string,
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>
): Promise<void> {
  const mailTransporter = initSMTPTransporter();
  const from = process.env.SMTP_FROM || 'BloomX Analytica <no-reply@bloomxanalytica.co.uk>';

  await mailTransporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments: attachments?.map(att => ({
      filename: att.filename,
      content: att.content,
      contentType: att.contentType,
    })),
  });
}

