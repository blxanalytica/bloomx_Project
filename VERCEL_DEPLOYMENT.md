# Vercel Deployment Guide

## ✅ Backend on Vercel

Your backend is now configured to deploy on Vercel! The API routes are in the `/api` directory and will automatically be deployed as serverless functions.

## API Endpoints

Once deployed, your API endpoints will be available at:
- `https://your-vercel-domain.vercel.app/api/forms/contact`
- `https://your-vercel-domain.vercel.app/api/forms/career`
- `https://your-vercel-domain.vercel.app/api/health`

## Deployment Steps

### 1. Install Vercel CLI (if not already installed)
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

### 4. Set Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```bash
# Email Configuration
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"

# Optional: reCAPTCHA
ENABLE_RECAPTCHA=true
RECAPTCHA_SECRET_KEY=your-secret-key

# Frontend API URL (use your Vercel deployment URL)
VITE_API_BASE_URL=https://your-vercel-app.vercel.app
```

**Important:** Set these for **Production** environment.

### 5. Update Frontend

After deployment, update your frontend to use the Vercel API URL:

**Option 1: Use relative path (recommended)**
- If frontend and backend are on the same domain, the frontend code already uses `import.meta.env.VITE_API_BASE_URL`
- Set `VITE_API_BASE_URL` to your Vercel domain in environment variables
- The frontend will automatically use it

**Option 2: Use absolute URL**
- The frontend code checks `import.meta.env.VITE_API_BASE_URL`
- If not set, it defaults to `http://localhost:3001` (for development)
- In production, set the environment variable to your Vercel URL

## Project Structure

```
your-project/
├── api/                    # Vercel serverless functions
│   ├── forms/
│   │   ├── contact.ts     # POST /api/forms/contact
│   │   └── career.ts      # POST /api/forms/career
│   └── health.ts          # GET /api/health
├── server/                 # Shared server code (used by API routes)
│   └── lib/
│       ├── email/
│       ├── validation/
│       └── utils/
└── src/                    # Frontend React app
```

## Vercel Configuration

Vercel will automatically:
- Detect your Vite frontend
- Deploy API routes from `/api` directory
- Set up serverless functions
- Configure proper routing

## Important Notes

1. **File Upload Limits**: Vercel has a 4.5MB limit for serverless function payloads. Our validation already limits files to 5MB per file and 10MB total, which should work fine.

2. **Function Timeout**: The career route has `maxDuration = 60` configured in the code, but Vercel has its own limits:
   - Hobby: 10 seconds
   - Pro: 60 seconds
   - Enterprise: 300 seconds

3. **Rate Limiting**: The current in-memory rate limiting works, but for production scale, consider using Vercel KV (Redis) or Upstash.

4. **Environment Variables**: Make sure to set all environment variables in Vercel Dashboard for production.

## Testing After Deployment

1. **Test Health Endpoint:**
   ```bash
   curl https://your-vercel-app.vercel.app/api/health
   # Should return: {"status":"ok"}
   ```

2. **Test Contact Form:**
   - Submit the contact form from your deployed frontend
   - Check if email arrives at `contact@bloomxanalytica.co.uk`

3. **Test Career Form:**
   - Submit the career form with a resume file
   - Check if email with attachments arrives

## Troubleshooting

### API Routes Not Working
- Check Vercel Function Logs in Dashboard
- Verify environment variables are set correctly
- Check that imports are using correct paths

### File Upload Issues
- Verify file size limits (5MB per file, 10MB total)
- Check Vercel function logs for errors
- Ensure `busboy` is installed (already in dependencies)

### Email Not Sending
- Verify `RESEND_API_KEY` is set correctly
- Check Resend dashboard for delivery status
- Verify `SMTP_TO` and `SMTP_FROM` are correct

## Next Steps

1. Deploy to Vercel
2. Set environment variables
3. Test form submissions
4. Monitor Vercel Function Logs for any issues
5. Consider adding monitoring/alerting for production

## VITE_API_BASE_URL

After deployment, your frontend will automatically use:
- **Development**: `http://localhost:3001` (if `VITE_API_BASE_URL` not set)
- **Production**: Your Vercel deployment URL (set via environment variable)

The frontend code already handles this:
```javascript
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
```

So forms will automatically work with your Vercel deployment! 🎉

