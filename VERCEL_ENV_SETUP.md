# Vercel Environment Variables Import Guide

## Option 1: Import via Vercel Dashboard (Recommended)

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable manually (see values below)

## Option 2: Set via Vercel CLI

```bash
vercel env add EMAIL_PROVIDER production
# Enter: resend

vercel env add RESEND_API_KEY production
# Enter: re_NA1fQqM6_Gu8dPyW6pypFLd3JDMTKMnAA

vercel env add SMTP_FROM production
# Enter: BloomX Analytica <no-reply@bloomxanalytica.co.uk>

vercel env add SMTP_TO production
# Enter: contact@bloomxanalytica.co.uk

vercel env add VITE_API_BASE_URL production
# Enter: https://your-project-name.vercel.app (UPDATE AFTER DEPLOYMENT)

vercel env add ENABLE_RECAPTCHA production
# Enter: false (or true if you want to enable reCAPTCHA)

vercel env add RECAPTCHA_SECRET_KEY production
# Enter: (leave empty if not using reCAPTCHA)
```

## Environment Variables to Set

Copy these values to Vercel Dashboard → Settings → Environment Variables:

### Required Variables:

**EMAIL_PROVIDER**
```
resend
```

**RESEND_API_KEY**
```
re_NA1fQqM6_Gu8dPyW6pypFLd3JDMTKMnAA
```

**SMTP_FROM**
```
BloomX Analytica <no-reply@bloomxanalytica.co.uk>
```

**SMTP_TO**
```
contact@bloomxanalytica.co.uk
```

**VITE_API_BASE_URL**
```
https://your-project-name.vercel.app
```
⚠️ **IMPORTANT:** Update this after deployment with your actual Vercel URL!

### Optional Variables:

**ENABLE_RECAPTCHA**
```
false
```
(Set to `true` if you want to enable reCAPTCHA protection)

**RECAPTCHA_SECRET_KEY**
```
(leave empty if not using reCAPTCHA)
```
(Get from https://www.google.com/recaptcha/admin/create if enabling)

## After Deployment

1. Deploy your project: `vercel --prod`
2. Note your deployment URL (e.g., `https://bloom-x-analytica.vercel.app`)
3. Update `VITE_API_BASE_URL` in Vercel Dashboard with your actual URL
4. Redeploy or the next deployment will pick up the change

## Testing

After setting environment variables, test your endpoints:

```bash
# Test health endpoint
curl https://your-project-name.vercel.app/api/health

# Should return: {"status":"ok"}
```

## Notes

- Set all variables for **Production** environment
- You can also set them for Preview/Development if needed
- `VITE_API_BASE_URL` needs to be set for the frontend build process
- After updating `VITE_API_BASE_URL`, you may need to trigger a new deployment

