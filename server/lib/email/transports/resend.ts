import { Resend } from 'resend';

let resendClient: Resend | null = null;

/**
 * Initialize Resend client
 */
function getResendClient(): Resend {
  if (resendClient) {
    return resendClient;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is required when EMAIL_PROVIDER=resend');
  }

  resendClient = new Resend(apiKey);
  return resendClient;
}

/**
 * Send email via Resend
 */
export async function sendViaResend(
  to: string,
  subject: string,
  text: string,
  html: string,
  attachments?: Array<{ filename: string; content: Buffer; contentType?: string }>
): Promise<void> {
  const client = getResendClient();
  const from = process.env.SMTP_FROM || 'BloomX Analytica <no-reply@bloomxanalytica.co.uk>';

  await client.emails.send({
    from,
    to,
    subject,
    text,
    html,
    attachments: attachments?.map(att => ({
      filename: att.filename,
      content: att.content.toString('base64'),
      type: att.contentType || 'application/octet-stream',
    })),
  });
}

