# Email Configuration Guide

## Production Email Setup

**Production Email:** `contact@bloomxanalytica.co.uk`

### Quick Setup

Copy this to `.env.local` for development, or set in your deployment platform for production:

```bash
# Development (Mailpit)
EMAIL_PROVIDER=smtp
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_TO="contact@bloomxanalytica.co.uk"
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"

# Production - Option 1: Resend (Recommended)
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_TO="contact@bloomxanalytica.co.uk"
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"

# Production - Option 2: SMTP
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
SMTP_TO="contact@bloomxanalytica.co.uk"
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"

# Optional: reCAPTCHA for production
ENABLE_RECAPTCHA=true
RECAPTCHA_SECRET_KEY=your-secret-key

# API Configuration
PORT=3001
VITE_API_BASE_URL=http://localhost:3001  # Change to production URL in production
```

## Resend Setup (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Add domain `bloomxanalytica.co.uk`
3. Add DNS records:
   - SPF: `v=spf1 include:_spf.resend.com ~all`
   - DKIM: Provided by Resend
   - DMARC: `v=DMARC1; p=quarantine; rua=mailto:dmarc@bloomxanalytica.co.uk`
4. Verify domain
5. Create API key and add to environment variables

## SMTP Providers

### SendGrid
- SMTP Host: `smtp.sendgrid.net`
- Port: `587`
- Username: `apikey`
- Password: Your SendGrid API key

### Mailgun
- SMTP Host: `smtp.mailgun.org`
- Port: `587`
- Username: Your Mailgun SMTP username
- Password: Your Mailgun SMTP password

### AWS SES
- SMTP Host: `email-smtp.[region].amazonaws.com`
- Port: `587`
- Username: Your AWS SES SMTP username
- Password: Your AWS SES SMTP password

**Important:** Ensure DNS records (SPF, DKIM, DMARC) are configured for `bloomxanalytica.co.uk` to improve deliverability.

