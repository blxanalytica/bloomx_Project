import { Request, Response } from 'express';
import { contactSchema, type ContactInput } from '../lib/validation/contact.js';
import { checkRateLimit } from '../lib/utils/rateLimit.js';
import { sendEmail } from '../lib/email/sendEmail.js';
import { generateRequestId } from '../lib/utils/id.js';
import { renderContact } from '../lib/email/templates/renderEmail.js';

/**
 * Get client IP address
 */
function getClientIP(req: Request): string {
  return (
    (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
    (req.headers['x-real-ip'] as string) ||
    req.ip ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

/**
 * Contact form handler
 */
export async function contactHandler(req: Request, res: Response): Promise<void> {
  const requestId = generateRequestId();
  const clientIP = getClientIP(req);

  try {
    // Check rate limit
    if (checkRateLimit(clientIP)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please try again later.',
      });
      return;
    }

    // Check honeypot
    if (req.body.company && req.body.company.trim() !== '') {
      // Honeypot filled, silently ignore
      res.status(204).send();
      return;
    }

    // Validate input
    const validationResult = contactSchema.safeParse(req.body);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });

      res.status(400).json({
        ok: false,
        message: 'Validation failed',
        fieldErrors,
      });
      return;
    }

    const data: ContactInput = validationResult.data;
    const submittedAtISO = new Date().toISOString();

    // Optional: reCAPTCHA verification
    if (process.env.ENABLE_RECAPTCHA === 'true') {
      const recaptchaToken = req.body.recaptchaToken;
      if (!recaptchaToken) {
        res.status(400).json({
          ok: false,
          message: 'reCAPTCHA verification required',
        });
        return;
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
        const verifyData = (await verifyResponse.json()) as { success: boolean };
        if (!verifyData.success) {
          res.status(400).json({
            ok: false,
            message: 'reCAPTCHA verification failed',
          });
          return;
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

    res.status(200).json({
      ok: true,
      id: requestId,
    });
  } catch (error) {
    console.error(`[${requestId}] Error processing contact form:`, error);
    res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

