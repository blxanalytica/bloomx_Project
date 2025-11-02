# Environment Variables Guide

## Where to Get Environment Variable Values

### 1. VITE_API_BASE_URL

This is the URL where your backend API server is deployed.

#### For Development (Local):
```bash
VITE_API_BASE_URL=http://localhost:3001
```

#### For Production (Vercel):

**✅ If deploying backend on Vercel (Recommended):**

After deploying to Vercel, you'll get a URL like:
- `https://your-project-name.vercel.app`
- Or with custom domain: `https://bloomxanalytica.co.uk`

Set in Vercel Dashboard → Settings → Environment Variables:
```bash
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

**Important:** 
- The frontend code already handles this automatically!
- It uses: `const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'`
- So your forms will automatically work with Vercel deployment

**How to find your Vercel URL:**
1. Deploy to Vercel: `vercel --prod`
2. Check the deployment URL in Vercel Dashboard
3. Set `VITE_API_BASE_URL` to that URL in environment variables
4. Forms will automatically use: `https://your-url.vercel.app/api/forms/contact`

---

**Option A: If deploying backend separately (Railway, Render, Fly.io, etc.)**
- After deploying, your provider will give you a URL like:
  - `https://your-app-name.up.railway.app`
  - `https://your-app-name.onrender.com`
  - `https://api.yourdomain.com`
- Set: `VITE_API_BASE_URL=https://your-actual-api-url.com`

**Option B: If using Vercel Serverless Functions**
- If API is at `/api` on your Vercel domain:
  - `VITE_API_BASE_URL=https://your-vercel-app.vercel.app`
  - Or with custom domain: `VITE_API_BASE_URL=https://api.bloomxanalytica.co.uk`

**How to find your API URL:**
1. Deploy your backend server
2. Check your deployment platform dashboard for the URL
3. Test it: `curl https://your-api-url.com/api/health` (should return `{"status":"ok"}`)
4. Use that URL as `VITE_API_BASE_URL`

---

### 2. RECAPTCHA_SECRET_KEY

This is from Google reCAPTCHA service (optional but recommended for production).

#### Step-by-Step Setup:

1. **Go to Google reCAPTCHA Admin Console**
   - Visit: https://www.google.com/recaptcha/admin/create

2. **Create a new site**
   - Label: `BloomX Analytica Forms`
   - reCAPTCHA type: **reCAPTCHA v2** → "I'm not a robot" Checkbox
   - Domains: Add your domains:
     - `bloomxanalytica.co.uk`
     - `www.bloomxanalytica.co.uk`
     - `localhost` (for development)
   - Accept terms and click "Submit"

3. **Get your keys**
   - After creation, you'll see:
     - **Site Key** (public, used in frontend)
     - **Secret Key** (private, used in backend) ← This is `RECAPTCHA_SECRET_KEY`

4. **Add to environment variables**
   ```bash
   ENABLE_RECAPTCHA=true
   RECAPTCHA_SECRET_KEY=6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe  # Your actual secret key
   ```

5. **Add Site Key to frontend** (if implementing reCAPTCHA widget)
   - The Site Key goes in your React components (if you add reCAPTCHA UI)
   - Currently, the backend supports reCAPTCHA but the frontend doesn't have a widget yet

#### Important Notes:

- **reCAPTCHA is OPTIONAL** - Forms work without it
- **For development**: You can skip reCAPTCHA or use test keys:
  - Site Key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`
  - Secret Key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`
  - These are Google's test keys that always pass

- **For production**: Create real keys and restrict to your domain

---

## Quick Reference

### Development Setup (No reCAPTCHA needed):
```bash
VITE_API_BASE_URL=http://localhost:3001
ENABLE_RECAPTCHA=false
# RECAPTCHA_SECRET_KEY not needed
```

### Production Setup (Vercel - Recommended):
```bash
# Your Vercel deployment URL
VITE_API_BASE_URL=https://your-project-name.vercel.app

# Email configuration
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"

# Enable reCAPTCHA protection (optional)
ENABLE_RECAPTCHA=true
RECAPTCHA_SECRET_KEY=your-actual-secret-key-from-google
```

---

## Deployment Platform Examples

### Vercel
1. Go to Project → Settings → Environment Variables
2. Add each variable for Production environment
3. Vercel will automatically use them in production builds

### Railway
1. Go to Project → Variables tab
2. Add each variable
3. Restart the deployment

### Render
1. Go to Service → Environment tab
2. Add environment variables
3. Save and redeploy

### Netlify
1. Go to Site → Site settings → Environment variables
2. Add variables for Production
3. Redeploy

---

## Testing Your Configuration

After setting environment variables:

1. **Test API URL:**
   ```bash
   curl https://your-api-url.com/health
   # Should return: {"status":"ok"}
   ```

2. **Test Email (if configured):**
   - Submit a test form
   - Check if email arrives at `contact@bloomxanalytica.co.uk`

3. **Test reCAPTCHA (if enabled):**
   - Submit form with invalid token → Should fail
   - Submit form with valid token → Should succeed

---

## Current Status

✅ **Already Configured:**
- `SMTP_TO="contact@bloomxanalytica.co.uk"` (default)
- `SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"` (default)

⏳ **To Configure:**
- `VITE_API_BASE_URL` - Set after deploying your backend
- `RECAPTCHA_SECRET_KEY` - Get from Google reCAPTCHA (optional)

---

## Quick Start (No reCAPTCHA)

If you want to deploy without reCAPTCHA first:

```bash
# Production environment variables
EMAIL_PROVIDER=resend
RESEND_API_KEY=re_xxxxxxxxxxxxx
SMTP_FROM="BloomX Analytica <no-reply@bloomxanalytica.co.uk>"
SMTP_TO="contact@bloomxanalytica.co.uk"
VITE_API_BASE_URL=https://your-deployed-api-url.com
ENABLE_RECAPTCHA=false
# RECAPTCHA_SECRET_KEY not needed
```

You can add reCAPTCHA later when you're ready!

