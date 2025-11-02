import { Request, Response } from 'express';
import { careerSchema, validateFiles, type CareerInput } from '../lib/validation/career.js';
import { checkRateLimit } from '../lib/utils/rateLimit.js';
import { sendEmail } from '../lib/email/sendEmail.js';
import { generateRequestId } from '../lib/utils/id.js';
import { renderCareer } from '../lib/email/templates/renderEmail.js';

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
 * Career form handler
 */
export async function careerHandler(req: Request, res: Response): Promise<void> {
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

    // Validate files
    const files: Express.Multer.File[] = [];
    if (req.files) {
      const resumeFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['resume'] || [];
      const attachmentFiles = (req.files as { [fieldname: string]: Express.Multer.File[] })['attachments'] || [];
      files.push(...resumeFiles, ...attachmentFiles);
    }

    // Convert Express.Multer.File[] to FileLike for validation
    const fileObjects = files.map(f => ({
      name: f.originalname,
      size: f.size,
    }));

    const fileValidation = validateFiles(fileObjects);
    if (!fileValidation.valid) {
      res.status(400).json({
        ok: false,
        message: 'File validation failed',
        fieldErrors: {
          resume: fileValidation.errors.join('; '),
        },
      });
      return;
    }

    // Validate form fields
    const formData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      applyFor: req.body.applyFor,
      message: req.body.message,
      company: req.body.company,
    };

    const validationResult = careerSchema.safeParse(formData);
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

    const data: CareerInput = validationResult.data;
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

    // Convert files to buffers for email attachments
    const attachments = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(file.buffer);
        return {
          filename: file.originalname,
          content: buffer,
          contentType: file.mimetype,
        };
      })
    );

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
          filename: f.originalname,
          contentType: f.mimetype,
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

    res.status(200).json({
      ok: true,
      id: requestId,
    });
  } catch (error) {
    console.error(`[${requestId}] Error processing career form:`, error);
    res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
}

