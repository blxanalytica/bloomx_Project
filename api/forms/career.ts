import type { VercelRequest, VercelResponse } from '@vercel/node';
import { careerSchema, validateFiles, type CareerInput } from '../../server/lib/validation/career.js';
import { checkRateLimit } from '../../server/lib/utils/rateLimit.js';
import { sendEmail } from '../../server/lib/email/sendEmail.js';
import { generateRequestId } from '../../server/lib/utils/id.js';
import busboy from 'busboy';
import React from 'react';
import { render } from '@react-email/render';
import { CareerApplicationEmail, type CareerApplicationProps } from '../lib/email/templates/CareerApplication';

// Inline renderCareer function to ensure it's compiled with the function
interface RenderedEmail {
  subject: string;
  html: string;
  text: string;
  preheader?: string;
}

function wrapTextLines(text: string, maxLength: number = 78): string {
  const lines = text.split('\n');
  const wrapped: string[] = [];

  for (const line of lines) {
    if (line.length <= maxLength) {
      wrapped.push(line);
    } else {
      let remaining = line;
      while (remaining.length > maxLength) {
        const spaceIndex = remaining.lastIndexOf(' ', maxLength);
        if (spaceIndex > 0) {
          wrapped.push(remaining.substring(0, spaceIndex));
          remaining = remaining.substring(spaceIndex + 1);
        } else {
          wrapped.push(remaining.substring(0, maxLength));
          remaining = remaining.substring(maxLength);
        }
      }
      if (remaining) {
        wrapped.push(remaining);
      }
    }
  }
  return wrapped.join('\n');
}

function renderCareer(props: CareerApplicationProps): RenderedEmail {
  try {
    const { id, applicant, applyFor } = props;
    const subject = `Career Application #${id} – ${applyFor} – ${applicant.name}`;
    const preheader = `New application for ${applyFor} from ${applicant.name}`;

    const html = render(React.createElement(CareerApplicationEmail, props), {
      pretty: false,
    });

    const text = render(React.createElement(CareerApplicationEmail, props), {
      plainText: true,
    });

    return {
      subject,
      html,
      text: wrapTextLines(text),
      preheader,
    };
  } catch (error) {
    console.error('Error rendering career email:', error);
    throw error;
  }
}

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

/**
 * Parse multipart/form-data with files using busboy
 * Follows Vercel's recommended approach for handling raw request bodies
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

    // Set a timeout to prevent hanging
    const timeout = setTimeout(() => {
      reject(new Error('Request timeout: Form data parsing took too long'));
    }, 30000); // 30 seconds

    try {
      // Validate Content-Type header
      const contentType = req.headers['content-type'];
      if (!contentType || !contentType.includes('multipart/form-data')) {
        clearTimeout(timeout);
        reject(new Error('Invalid Content-Type: Expected multipart/form-data'));
        return;
      }

      // Create busboy instance with proper headers
      const bb = busboy({ 
        headers: req.headers as any,
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB per file
        },
      });

      let fileCount = 0;
      let fieldCount = 0;

      // Handle file uploads
      bb.on('file', (name: string, file: NodeJS.ReadableStream, info: { filename?: string; mimeType?: string }) => {
        fileCount++;
        const chunks: Buffer[] = [];
        
        file.on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        
        file.on('end', () => {
          const fileData = Buffer.concat(chunks);
          files.push({
            name: info.filename || name,
            data: fileData,
            contentType: info.mimeType || 'application/octet-stream',
            size: fileData.length,
          });
        });
        
        file.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(new Error(`File upload error for ${name}: ${err.message}`));
        });
      });

      // Handle form fields
      bb.on('field', (name: string, value: string) => {
        fieldCount++;
        body[name] = value;
      });

      // Handle finish - resolve when busboy finishes parsing
      bb.on('finish', () => {
        clearTimeout(timeout);
        resolve({ body, files });
      });

      // Handle busboy errors
      bb.on('error', (err: Error) => {
        clearTimeout(timeout);
        reject(new Error(`Busboy error: ${err.message}`));
      });

      // For Vercel serverless functions with bodyParser: false
      // The request should be a readable stream
      if (typeof req.on === 'function') {
        // It's a readable stream - pipe it to busboy
        // Handle stream errors
        req.on('error', (err: Error) => {
          clearTimeout(timeout);
          reject(new Error(`Request stream error: ${err.message}`));
        });

        // Pipe request to busboy
        req.pipe(bb);
      } else {
        clearTimeout(timeout);
        reject(new Error('Request is not a readable stream. Ensure bodyParser: false in config.'));
      }
    } catch (error) {
      clearTimeout(timeout);
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
}

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, we'll handle it manually
  },
  maxDuration: 60, // Extend timeout for file uploads
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Wrap entire handler in try-catch to ensure JSON errors
  try {
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

    console.log(`[${requestId}] Career form request received from ${clientIP}, method: ${req.method}`);

    try {
      // Check if required modules are loaded
      if (!careerSchema || !validateFiles || !checkRateLimit || !sendEmail || !generateRequestId || !renderCareer || !busboy) {
        console.error(`[${requestId}] Module import check failed:`, {
          careerSchema: !!careerSchema,
          validateFiles: !!validateFiles,
          checkRateLimit: !!checkRateLimit,
          sendEmail: !!sendEmail,
          generateRequestId: !!generateRequestId,
          renderCareer: !!renderCareer,
          busboy: !!busboy,
        });
        return res.status(500).json({
          ok: false,
          message: 'Server configuration error',
          error: process.env.NODE_ENV === 'development' ? 'Required modules not loaded' : undefined,
        });
      }
      // Check rate limit
      if (checkRateLimit(clientIP)) {
        return res.status(429).json({
          ok: false,
          message: 'Too many requests. Please try again later.',
        });
      }

      // Parse form data with files
      let body: Record<string, string> = {};
      let files: Array<{ name: string; data: Buffer; contentType: string; size: number }> = [];

      try {
        console.log(`[${requestId}] Starting form data parsing...`);
        const parsed = await parseFormDataWithFiles(req);
        body = parsed.body;
        files = parsed.files;
        console.log(`[${requestId}] Form data parsed successfully: ${Object.keys(body).length} fields, ${files.length} files`);
      } catch (parseError) {
        console.error(`[${requestId}] Error parsing form data:`, parseError);
        const errorMessage = parseError instanceof Error ? parseError.message : String(parseError);
        const errorStack = parseError instanceof Error ? parseError.stack : undefined;
        console.error(`[${requestId}] Parse error stack:`, errorStack);
        return res.status(400).json({
          ok: false,
          message: 'Failed to parse form data',
          fieldErrors: {
            _general: errorMessage,
          },
        });
      }

      // Check honeypot
      if (body.company && body.company.trim() !== '') {
        // Honeypot filled, silently ignore
        return res.status(204).end();
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
          try {
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
              return res.status(400).json({
                ok: false,
                message: 'reCAPTCHA verification failed',
              });
            }
          } catch (recaptchaError) {
            console.error(`[${requestId}] reCAPTCHA verification error:`, recaptchaError);
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
        const errorMessage = renderError instanceof Error ? renderError.message : String(renderError);
        return res.status(500).json({
          ok: false,
          message: 'Email template rendering failed',
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        });
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
        const errorMessage = emailError instanceof Error ? emailError.message : String(emailError);
        return res.status(500).json({
          ok: false,
          message: 'Email sending failed',
          error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
        });
      }

      // Log success (no PII)
      console.log(`[${requestId}] Career form submitted successfully from ${clientIP}`);

      return res.status(200).json({
        ok: true,
        id: requestId,
      });
    } catch (error) {
      console.error(`[${requestId}] Error processing career form:`, error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return res.status(500).json({
        ok: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      });
    }
  } catch (handlerError) {
    // Top-level error handler for module loading or other critical errors
    console.error('Critical error in career handler:', handlerError);
    const errorMessage = handlerError instanceof Error ? handlerError.message : String(handlerError);
    const requestId = generateRequestId();
    try {
      setCorsHeaders(req, res);
    } catch {
      // If CORS fails, continue anyway
    }
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
    });
  }
}
