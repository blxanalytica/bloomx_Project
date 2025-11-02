import type { VercelRequest, VercelResponse } from '@vercel/node';
import { contactSchema, type ContactInput } from '../../server/lib/validation/contact.js';
import { checkRateLimit } from '../../server/lib/utils/rateLimit.js';
import { sendEmail } from '../../server/lib/email/sendEmail.js';
import { generateRequestId } from '../../server/lib/utils/id.js';
import React from 'react';
import { render } from '@react-email/render';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
  Row,
  Column,
} from '@react-email/components';

// ============================================================================
// INLINED EMAIL THEME SYSTEM
// ============================================================================

interface EmailTheme {
  brand: {
    name: string;
    url: string;
    logoUrl?: string;
  };
  color: {
    bg: string;
    card: string;
    text: string;
    muted: string;
    accent: string;
    accentDark: string;
  };
  radius: {
    card: string;
  };
  space: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
  shadow: {
    card: string;
  };
}

const defaultTheme: EmailTheme = {
  brand: {
    name: 'BloomX Analytica',
    url: 'https://bloomxanalytica.co.uk',
    logoUrl: undefined,
  },
  color: {
    bg: '#0B0C10',
    card: '#FFFFFF',
    text: '#1B1E28',
    muted: '#6B7280',
    accent: '#2563EB',
    accentDark: '#1E3A8A',
  },
  radius: {
    card: '12px',
  },
  space: {
    xs: '4px',
    sm: '8px',
    lg: '24px',
    md: '16px',
  },
  shadow: {
    card: '0 2px 10px rgba(0,0,0,.06)',
  },
};

function mergeTheme(theme: Partial<EmailTheme>): EmailTheme {
  return {
    brand: { ...defaultTheme.brand, ...theme.brand },
    color: { ...defaultTheme.color, ...theme.color },
    radius: { ...defaultTheme.radius, ...theme.radius },
    space: { ...defaultTheme.space, ...theme.space },
    shadow: { ...defaultTheme.shadow, ...theme.shadow },
  };
}

interface EmailContainerProps {
  children?: React.ReactNode;
  theme?: Partial<EmailTheme>;
  preheader?: string;
}

function EmailContainer({ children, theme, preheader }: EmailContainerProps) {
  const finalTheme = mergeTheme(theme || {});

  return React.createElement(Html, null,
    React.createElement(Head, null,
      React.createElement('style', null, `
        @media (prefers-color-scheme: dark) {
          .email-bg { background-color: ${finalTheme.color.text} !important; }
          .email-card { background-color: ${finalTheme.color.bg} !important; }
          .email-text { color: ${finalTheme.color.card} !important; }
          .email-muted { color: #9CA3AF !important; }
          .email-accent { color: ${finalTheme.color.accent} !important; }
          .email-border { border-color: #374151 !important; }
        }
      `)
    ),
    React.createElement(Body, { style: { fontFamily: '-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif', backgroundColor: finalTheme.color.bg, margin: 0, padding: 0 } },
      preheader && React.createElement('div', { style: { display: 'none', fontSize: '1px', color: '#ffffff', lineHeight: '1px', maxHeight: '0px', maxWidth: '0px', opacity: 0, overflow: 'hidden' } }, preheader),
      React.createElement(Container, { style: { maxWidth: '600px', margin: '0 auto', padding: finalTheme.space.md } }, children)
    )
  );
}

interface SectionProps {
  children?: React.ReactNode;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

function EmailSection({ children, theme, style }: SectionProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Section, {
    style: {
      backgroundColor: finalTheme.color.card,
      borderRadius: finalTheme.radius.card,
      padding: finalTheme.space.lg,
      marginBottom: finalTheme.space.md,
      boxShadow: finalTheme.shadow.card,
      ...style,
    },
  }, children);
}

interface HeadingProps {
  children?: React.ReactNode;
  level?: 1 | 2;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

function EmailH1({ children, theme, style }: HeadingProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Heading, {
    as: 'h1',
    style: {
      fontSize: '24px',
      fontWeight: '600',
      color: finalTheme.color.text,
      margin: `0 0 ${finalTheme.space.md} 0`,
      lineHeight: '1.4',
      ...style,
    },
  }, children);
}

function EmailH2({ children, theme, style }: HeadingProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Heading, {
    as: 'h2',
    style: {
      fontSize: '18px',
      fontWeight: '600',
      color: finalTheme.color.text,
      margin: `0 0 ${finalTheme.space.sm} 0`,
      lineHeight: '1.4',
      ...style,
    },
  }, children);
}

interface TextProps {
  children?: React.ReactNode;
  theme?: Partial<EmailTheme>;
  muted?: boolean;
  style?: React.CSSProperties;
}

function EmailText({ children, theme, muted, style }: TextProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Text, {
    style: {
      fontSize: '16px',
      lineHeight: '1.6',
      color: muted ? finalTheme.color.muted : finalTheme.color.text,
      margin: `0 0 ${finalTheme.space.sm} 0`,
      ...style,
    },
  }, children);
}

interface ButtonProps {
  href: string;
  children?: React.ReactNode;
  theme?: Partial<EmailTheme>;
  style?: React.CSSProperties;
}

function EmailButton({ href, children, theme, style }: ButtonProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Button, {
    href,
    style: {
      backgroundColor: finalTheme.color.accent,
      color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: '600',
      textDecoration: 'none',
      padding: '12px 24px',
      borderRadius: '6px',
      display: 'inline-block',
      minHeight: '44px',
      lineHeight: '20px',
      ...style,
    },
  }, children);
}

interface KeyValueRowProps {
  label: string;
  value: string;
  theme?: Partial<EmailTheme>;
}

function KeyValueRow({ label, value, theme }: KeyValueRowProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement('table', { style: { width: '100%', marginBottom: finalTheme.space.sm, borderCollapse: 'collapse' } },
    React.createElement('tr', null,
      React.createElement('td', { style: { padding: '4px 8px 4px 0', fontSize: '14px', fontWeight: '600', color: finalTheme.color.text, verticalAlign: 'top', width: '120px' } }, label),
      React.createElement('td', { style: { padding: '4px 0', fontSize: '14px', color: finalTheme.color.text, verticalAlign: 'top' } }, value)
    )
  );
}

interface FooterProps {
  theme?: Partial<EmailTheme>;
  complianceNote?: string;
}

function EmailFooter({ theme, complianceNote }: FooterProps) {
  const finalTheme = mergeTheme(theme || {});
  return React.createElement(Section, {
    style: {
      marginTop: finalTheme.space.lg,
      paddingTop: finalTheme.space.md,
      borderTop: `1px solid #E5E7EB`,
    },
  },
    React.createElement(Text, {
      style: {
        fontSize: '12px',
        color: finalTheme.color.muted,
        textAlign: 'center',
        margin: 0,
      },
    }, complianceNote || 'Internal notification. Do not forward externally.')
  );
}

// ============================================================================
// INLINED CONTACT EMAIL TEMPLATE
// ============================================================================

interface ContactMessageProps {
  id: string;
  submittedAtISO: string;
  sender: {
    name: string;
    email: string;
  };
  subject: string;
  message: string;
  brand?: Partial<EmailTheme>;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day} ${month} ${year}, ${hours}:${minutes} UTC`;
}

function encodeMailtoSubject(subject: string): string {
  return encodeURIComponent(`Re: ${subject}`);
}

function ContactMessageEmail({
  id,
  submittedAtISO,
  sender,
  subject,
  message,
  brand,
}: ContactMessageProps) {
  const theme = brand || {};
  const submittedAt = formatDate(submittedAtISO);
  const preheader = `New message from ${sender.name}`;
  const mailtoHref = `mailto:${sender.email}?subject=${encodeMailtoSubject(subject)}`;

  return React.createElement(EmailContainer, { theme, preheader },
    React.createElement(EmailSection, { theme },
      React.createElement(EmailH1, { theme }, `Contact #${id}`),
      React.createElement(EmailText, { theme, muted: true }, 'New message received')
    ),
    React.createElement(EmailSection, { theme },
      React.createElement(EmailH2, { theme }, 'Sender Information'),
      React.createElement(Row, null,
        React.createElement(Column, null,
          React.createElement(KeyValueRow, { label: 'Name', value: sender.name, theme }),
          React.createElement(KeyValueRow, { label: 'Email', value: sender.email, theme }),
          React.createElement(KeyValueRow, { label: 'Subject', value: subject, theme }),
          React.createElement(KeyValueRow, { label: 'Submitted', value: submittedAt, theme }),
          React.createElement(KeyValueRow, { label: 'Request ID', value: id, theme })
        )
      )
    ),
    React.createElement(EmailSection, { theme },
      React.createElement(EmailH2, { theme }, 'Message'),
      React.createElement(EmailText, { theme, style: { whiteSpace: 'pre-wrap' } }, message)
    ),
    React.createElement(EmailSection, { theme },
      React.createElement(Row, null,
        React.createElement(Column, { align: 'center' },
          React.createElement(EmailButton, { href: mailtoHref, theme }, `Reply to ${sender.name}`)
        )
      )
    ),
    React.createElement(EmailFooter, { theme })
  );
}

// ============================================================================
// RENDER FUNCTION
// ============================================================================

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

function renderContact(props: ContactMessageProps): RenderedEmail {
  try {
    const { id, sender, subject } = props;
    const emailSubject = `Contact #${id} – ${subject} – ${sender.name}`;
    const preheader = `New message from ${sender.name}`;

    const html = render(React.createElement(ContactMessageEmail, props), {
      pretty: false,
    });

    const text = render(React.createElement(ContactMessageEmail, props), {
      plainText: true,
    });

    return {
      subject: emailSubject,
      html,
      text: wrapTextLines(text),
      preheader,
    };
  } catch (error) {
    console.error('Error rendering contact email:', error);
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
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
        return res.status(204).end();
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
          const verifyData = (await verifyResponse.json()) as { success: boolean };
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
  } catch (handlerError) {
    // Top-level error handler for module loading or other critical errors
    console.error('Critical error in contact handler:', handlerError);
    const requestId = generateRequestId();
    setCorsHeaders(req, res);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? String(handlerError) : undefined,
    });
  }
}
