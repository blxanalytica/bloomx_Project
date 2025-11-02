import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactSchema, type ContactInput } from '../../server/lib/validation/contact.js';
import { checkRateLimit } from '../../server/lib/utils/rateLimit.js';
import { sendEmail } from '../../server/lib/email/sendEmail.js';
import { generateRequestId } from '../../server/lib/utils/id.js';
import { renderContact } from '../../server/lib/email/templates/renderEmail.js';

/**
 * Get client IP address from Vercel request
 */
function getClientIP(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim();
  }
  return (
    (req.headers['x-real-ip'] as string) ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const requestId = generateRequestId();
  const clientIP = getClientIP(req);

  try {
    // Check rate limit
    if (checkRateLimit(clientIP)) {
      return res.status(429).json({
        ok: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    // Parse form data - Vercel automatically parses multipart/form-data
    const body = req.body || {};

    // Check honeypot
    if (body.company && body.company.trim() !== '') {
      // Honeypot filled, silently ignore
      return res.status(204).send();
    }

    // Validate input
    const validationResult = contactSchema.safeParse(body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });

      return res.status(400).json({
        ok: false,
        message: 'Validation failed',
        fieldErrors,
      });
    }

    const data: ContactInput = validationResult.data;
    const submittedAtISO = new Date().toISOString();

    // Optional: reCAPTCHA verification
    if (process.env.ENABLE_RECAPTCHA === 'true') {
      const recaptchaToken = body.recaptchaToken;
      if (!recaptchaToken) {
        return res.status(400).json({
          ok: false,
          message: 'reCAPTCHA verification required',
        });
      }

      // Verify reCAPTCHA
      const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
      if (recaptchaSecret) {
        const verifyResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
          }
        );
        const verifyData = await verifyResponse.json();
        if (!verifyData.success) {
          return res.status(400).json({
            ok: false,
            message: 'reCAPTCHA verification failed',
          });
        }
      }
    }

    // Render email template
    let rendered;
    try {
      rendered = renderContact({
        id: requestId,
        submittedAtISO,
        sender: {
          name: data.name,
          email: data.email,
        },
        subject: data.inquiryType,
        message: data.message,
      });
    } catch (renderError) {
      console.error(`[${requestId}] Error rendering email template:`, renderError);
      throw renderError;
    }

    // Send email
    try {
      await sendEmail({
        to: process.env.SMTP_TO || 'contact@bloomxanalytica.co.uk',
        subject: rendered.subject,
        text: rendered.text,
        html: rendered.html,
      });
    } catch (emailError) {
      console.error(`[${requestId}] Error sending email:`, emailError);
      throw emailError;
    }

    // Log success (no PII)
    console.log(`[${requestId}] Contact form submitted successfully from ${clientIP}`);

    return res.status(200).json({
      ok: true,
      id: requestId,
    });
  } catch (error) {
    console.error(`[${requestId}] Error processing contact form:`, error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

