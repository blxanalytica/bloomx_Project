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

/**
 * Set CORS headers - MUST be called before any response is sent
 */
function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  try {
    const origin = req.headers.origin || '';
    
    // Allowed origins list
    const allowedOrigins = [
      'https://www.bloomxanalytica.co.uk',
      'https://bloomxanalytica.co.uk',
      'http://localhost:5173',
      'http://localhost:3000',
    ];

    // Check if origin matches allowed list
    let allowedOrigin = '*';
    
    if (origin) {
      // Check for exact match first
      if (allowedOrigins.includes(origin)) {
        allowedOrigin = origin;
      } 
      // Check if origin contains bloomxanalytica.co.uk
      else if (origin.includes('bloomxanalytica.co.uk')) {
        allowedOrigin = origin;
      }
      // Check if origin contains localhost (for dev)
      else if (origin.includes('localhost')) {
        allowedOrigin = origin;
      }
      // If ALLOWED_ORIGIN env var is set to *, allow all
      else if (process.env.ALLOWED_ORIGIN === '*') {
        allowedOrigin = '*';
      }
      // Otherwise, use first allowed origin as fallback
      else {
        allowedOrigin = allowedOrigins[0];
      }
    } else {
      // No origin header - allow all for direct requests
      allowedOrigin = '*';
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Max-Age', '86400');
    res.setHeader('Access-Control-Allow-Credentials', 'false');
  } catch (error) {
    console.error('Error setting CORS headers:', error);
    // Fallback: allow all origins if there's an error
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ALWAYS set CORS headers first, before any other logic
  setCorsHeaders(req, res);

  // Handle CORS preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

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
    // Ensure CORS headers are still set even on error
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}
