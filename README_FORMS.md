# Form Submission & Email Delivery

This document describes the form submission system for the Contact and Career application forms.

## Overview

The system includes:
- **Contact Form** (`/Contact`) - Standard form fields (name, email, inquiry type, message)
- **Career Application Form** (`/JobApplication`) - Form with file uploads (resume + optional attachments)

Both forms submit to backend API endpoints that validate input, check rate limits, and send emails via SMTP (Mailpit for dev) or Resend (production).

## Setup

### Prerequisites

1. **Mailpit** (for local email testing):
   ```bash
   docker run -d -p 8025:8025 -p 1025:1025 --name mailpit axllent/mailpit
   ```

2. **Node.js dependencies**:
   ```bash
   npm install
   ```

### Environment Configuration

**Development** (copy to `.env.local`):

```bash
# Email Configuration - Development (Mailpit)
EMAIL_PROVIDER=smtp
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"

# Server Configuration
PORT=3001

# Frontend API URL
VITE_API_BASE_URL=http://localhost:3001
```

**Production** (set in your deployment platform):

```bash
# Option 1: Resend (Recommended)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"

# Option 2: SMTP (e.g., SendGrid, Mailgun, AWS SES)
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"

# Recommended for production
ENABLE_RECAPTCHA=true
RECAPTCHA_SECRET_KEY=your-recaptcha-secret

# Frontend API URL
VITE_API_BASE_URL=https://api.bloomxanalytica.co.uk
```

### Running the Server

**Development** (with hot reload):
```bash
npm run dev:server
```

**Run both frontend and server together**:
```bash
npm run dev:all
```

The server will start on `http://localhost:3001` by default.

## API Endpoints

### POST `/api/forms/contact`

Submit contact form.

**Request Body** (multipart/form-data):
- `name` (string, required): Full name (2-100 chars)
- `email` (string, required): Email address
- `inquiryType` (string, required): Type of inquiry (1-100 chars)
- `message` (string, required): Message (10-5000 chars)
- `company` (string, optional): Honeypot field (should be empty)

**Success Response** (200):
```json
{
  "ok": true,
  "id": "1234567890-abc123"
}
```

**Error Response** (400):
```json
{
  "ok": false,
  "message": "Validation failed",
  "fieldErrors": {
    "email": "Invalid email address",
    "message": "Message must be at least 10 characters"
  }
}
```

**Rate Limited** (429):
```json
{
  "ok": false,
  "message": "Too many requests. Please try again later."
}
```

### POST `/api/forms/career`

Submit career application with resume.

**Request Body** (multipart/form-data):
- `name` (string, required): Full name (2-100 chars)
- `email` (string, required): Email address
- `phone` (string, required): Phone number (E.164 format)
- `applyFor` (string, required): Job title/position
- `message` (string, optional): Cover letter/message (max 5000 chars)
- `resume` (file, required): Resume file (PDF, DOC, DOCX, max 5MB)
- `attachments[]` (file[], optional): Additional files (max 5MB each, 10MB total)
- `company` (string, optional): Honeypot field (should be empty)

**File Requirements**:
- Allowed extensions: `.pdf`, `.doc`, `.docx`
- Max file size: 5MB per file
- Max total size: 10MB for all files combined
- Resume is required

**Success Response** (200):
```json
{
  "ok": true,
  "id": "1234567890-abc123"
}
```

**Error Response** (400):
```json
{
  "ok": false,
  "message": "File validation failed",
  "fieldErrors": {
    "resume": "File 'resume.txt' has invalid extension. Allowed: pdf, doc, docx"
  }
}
```

## cURL Examples

### Contact Form

```bash
curl -X POST http://localhost:3001/api/forms/contact \
  -F "name=John Doe" \
  -F "email=john@example.com" \
  -F "inquiryType=Request a Demo" \
  -F "message=Hi, I'm interested in learning more about your platform."
```

### Career Application (with resume)

```bash
curl -X POST http://localhost:3001/api/forms/career \
  -F "name=Jane Smith" \
  -F "email=jane@example.com" \
  -F "phone=+442012345678" \
  -F "applyFor=Senior AI/ML Engineer" \
  -F "message=I'm excited to apply for this position..." \
  -F "resume=@/path/to/resume.pdf" \
  -F "attachments=@/path/to/portfolio.pdf"
```

### Career Application (with multiple attachments)

```bash
curl -X POST http://localhost:3001/api/forms/career \
  -F "name=Jane Smith" \
  -F "email=jane@example.com" \
  -F "phone=+442012345678" \
  -F "applyFor=Senior AI/ML Engineer" \
  -F "resume=@/path/to/resume.pdf" \
  -F "attachments=@/path/to/cover-letter.pdf" \
  -F "attachments=@/path/to/portfolio.pdf"
```

## Testing

### Local Email Testing with Mailpit

1. Start Mailpit:
   ```bash
   docker run -d -p 8025:8025 -p 1025:1025 --name mailpit axllent/mailpit
   ```

2. View emails in browser:
   ```
   http://localhost:8025
   ```

3. Submit a form and check Mailpit inbox for the email.

### Unit Tests

```bash
npm test
```

### E2E Tests (Playwright)

```bash
# Ensure Mailpit is running
docker run -d -p 8025:8025 -p 1025:1025 --name mailpit axllent/mailpit

# Run tests
npm run test:e2e
```

## Features

### Rate Limiting

- **10 requests per 10 minutes** per IP address
- Returns `429 Too Many Requests` when exceeded
- In-memory storage (dev only; use Redis in production)

### Honeypot Protection

- Hidden `company` field in forms
- If filled, returns `204 No Content` silently
- Helps prevent bot submissions

### reCAPTCHA (Optional)

Enable by setting `ENABLE_RECAPTCHA=true` and providing `RECAPTCHA_SECRET_KEY`.

### Email Providers

**SMTP** (Default for dev):
- Works with Mailpit for local testing
- Configurable for any SMTP server

**Resend** (Production):
- Set `EMAIL_PROVIDER=resend`
- Provide `RESEND_API_KEY`
- Better deliverability and tracking

## Production Deployment

### Email Configuration for Production

**Production Email:** `contact@bloomxanalytica.co.uk`

#### Option 1: Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Add your domain `bloomxanalytica.co.uk` and verify DNS records
3. Create an API key
4. Set environment variables:
   ```bash
   EMAIL_PROVIDER=resend
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
   SMTP_TO="contact@bloomxanalytica.co.uk"
   ```

#### Option 2: SMTP Provider (SendGrid, Mailgun, AWS SES, etc.)

1. Sign up with your SMTP provider
2. Configure DNS records (SPF, DKIM, DMARC) for `bloomxanalytica.co.uk`
3. Set environment variables:
   ```bash
   EMAIL_PROVIDER=smtp
   SMTP_HOST=smtp.your-provider.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
   SMTP_TO="contact@bloomxanalytica.co.uk"
   ```

**Important:** Make sure your `from` address (`no-reply@bloomxanalytica.co.uk`) is verified with your email provider to avoid spam filters.

### Vercel Deployment Setup

1. **Environment Variables** - Add these in Vercel Dashboard → Settings → Environment Variables:
   - `EMAIL_PROVIDER=resend` (or `smtp`)
   - `RESEND_API_KEY=re_xxx` (if using Resend)
   - `SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"`
   - `SMTP_TO="contact@bloomxanalytica.co.uk"`
   - `VITE_API_BASE_URL=https://your-api-domain.com` (see [ENV_VARIABLES_GUIDE.md](./ENV_VARIABLES_GUIDE.md) for how to get this)
   - `ENABLE_RECAPTCHA=true` (recommended, optional)
   - `RECAPTCHA_SECRET_KEY=xxx` (get from [Google reCAPTCHA](https://www.google.com/recaptcha/admin/create), see [ENV_VARIABLES_GUIDE.md](./ENV_VARIABLES_GUIDE.md))

2. **Serverless Functions** - Convert Express routes to Vercel serverless functions (see structure below)

3. **Function Configuration** - Add `maxDuration = 60` for file upload routes

Example Vercel serverless function structure:
```
api/
  forms/
    contact/
      route.ts
    career/
      route.ts
```

## Troubleshooting

### Emails not appearing in Mailpit

1. Check Mailpit is running: `docker ps`
2. Verify SMTP settings in `.env.local`
3. Check server logs for errors

### File upload fails

1. Check file size (max 5MB per file)
2. Verify file extension (PDF, DOC, DOCX only)
3. Check total size (max 10MB)

### Rate limit issues

- Rate limit resets after 10 minutes
- Check server logs for rate limit entries
- In production, use Redis-based rate limiting

## Security Notes

- No PII logged in server logs (only request IDs)
- Honeypot field prevents basic bot submissions
- Rate limiting prevents abuse
- File validation prevents malicious uploads
- Email content sanitized (HTML stripped)

## Production Checklist

- [x] Set `SMTP_TO="contact@bloomxanalytica.co.uk"` (default configured)
- [x] Set `SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"` (default configured)
- [ ] Choose email provider (Resend recommended)
- [ ] Configure DNS records for email domain (`bloomxanalytica.co.uk`)
- [ ] Verify `no-reply@bloomxanalytica.co.uk` with email provider
- [ ] Set `EMAIL_PROVIDER=resend` (or configure production SMTP)
- [ ] Set `RESEND_API_KEY` (if using Resend)
- [ ] Enable reCAPTCHA for production (`ENABLE_RECAPTCHA=true`)
- [ ] Set `VITE_API_BASE_URL` to production API URL
- [ ] Replace in-memory rate limiting with Redis (for production scale)
- [ ] Set appropriate CORS origins
- [ ] Configure proper error logging
- [ ] Set up monitoring/alerts
- [ ] Test form submissions in production

