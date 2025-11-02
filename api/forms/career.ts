import type { VercelRequest, VercelResponse } from '@vercel/node';
import { careerSchema, validateFiles, type CareerInput } from '../../server/lib/validation/career.js';
import { checkRateLimit } from '../../server/lib/utils/rateLimit.js';
import { sendEmail } from '../../server/lib/email/sendEmail.js';
import { generateRequestId } from '../../server/lib/utils/id.js';
import { renderCareer } from '../../server/lib/email/templates/renderEmail.js';
import busboy from 'busboy';

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
 * Parse multipart/form-data with files using busboy
 */
async function parseFormDataWithFiles(
  req: VercelRequest
): Promise<{
  body: Record<string, string>;
  files: Array<{ name: string; data: Buffer; contentType: string; size: number }>;
}> {
  return new Promise((resolve, reject) => {
    const body: Record<string, string> = {};
    const files: Array<{ name: string; data: Buffer; contentType: string; size: number }> = [];

    const bb = busboy({ headers: req.headers });

    bb.on('file', (name, file, info) => {
      const chunks: Buffer[] = [];
      file.on('data', (chunk) => {
        chunks.push(Buffer.from(chunk));
      });
      file.on('end', () => {
        files.push({
          name: info.filename || name,
          data: Buffer.concat(chunks),
          contentType: info.mimeType || 'application/octet-stream',
          size: Buffer.concat(chunks).length,
        });
      });
    });

    bb.on('field', (name, value) => {
      body[name] = value;
    });

    bb.on('finish', () => {
      resolve({ body, files });
    });

    bb.on('error', (err) => {
      reject(err);
    });

    // Vercel provides the request body as a stream
    if (req.body) {
      // If body is already parsed, we need to handle it differently
      if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
        // Body already parsed by Vercel
        resolve({ body: req.body as Record<string, string>, files: [] });
      } else {
        bb.end(req.body as Buffer);
      }
    } else {
      req.pipe(bb);
    }
  });
}

/**
 * Set CORS headers
 */
function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://www.bloomxanalytica.co.uk',
    'https://bloomxanalytica.co.uk',
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  // Check if origin is allowed (exact match or contains)
  const isAllowed = allowedOrigins.includes(origin) || 
                    origin.includes('bloomxanalytica.co.uk') ||
                    origin.includes('localhost') ||
                    process.env.ALLOWED_ORIGIN === '*';

  if (isAllowed || process.env.ALLOWED_ORIGIN === '*') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else if (origin) {
    // If origin is provided but not allowed, use first allowed origin
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  } else {
    // No origin header (e.g., direct fetch), allow all
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(req, res);
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    setCorsHeaders(req, res);
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  const requestId = generateRequestId();
  const clientIP = getClientIP(req);

  try {
    // Set CORS headers
    setCorsHeaders(req, res);

    // Check rate limit
    if (checkRateLimit(clientIP)) {
      return res.status(429).json({
        ok: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    // Parse form data with files
    const { body, files } = await parseFormDataWithFiles(req);

    // Check honeypot
    if (body.company && body.company.trim() !== '') {
      // Honeypot filled, silently ignore
      return res.status(204).send();
    }

    // Validate files
    const fileObjects = files.map(f => ({
      name: f.name,
      size: f.size,
    }));

    const fileValidation = validateFiles(fileObjects);
    if (!fileValidation.valid) {
      return res.status(400).json({
        ok: false,
        message: 'File validation failed',
        fieldErrors: {
          resume: fileValidation.errors.join('; '),
        },
      });
    }

    // Validate form fields
    const formData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      applyFor: body.applyFor,
      message: body.message,
      company: body.company,
    };

    const validationResult = careerSchema.safeParse(formData);
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

    const data: CareerInput = validationResult.data;
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

    // Convert files to buffers for email attachments
    const attachments = files.map(file => ({
      filename: file.name,
      content: file.data,
      contentType: file.contentType,
    }));

    // Render email template
    let rendered;
    try {
      rendered = renderCareer({
        id: requestId,
        submittedAtISO,
        applicant: {
          name: data.name,
          email: data.email,
          phone: data.phone,
        },
        applyFor: data.applyFor,
        message: data.message,
        attachments: files.map(f => ({
          filename: f.name,
          contentType: f.contentType,
          sizeBytes: f.size,
        })),
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
        attachments,
      });
    } catch (emailError) {
      console.error(`[${requestId}] Error sending email:`, emailError);
      throw emailError;
    }

    // Log success (no PII)
    console.log(`[${requestId}] Career form submitted successfully from ${clientIP}`);

    return res.status(200).json({
      ok: true,
      id: requestId,
    });
  } catch (error) {
    console.error(`[${requestId}] Error processing career form:`, error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

