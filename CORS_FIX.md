# CORS Fix - Critical Deployment Instructions

## Problem
CORS errors preventing form submissions from `https://www.bloomxanalytica.co.uk` to Vercel API.

## Solution Applied

✅ **Fixed CORS headers** - Headers are now set **BEFORE** any other logic
✅ **Improved origin matching** - Better logic for matching allowed origins
✅ **Error handling** - CORS headers set even on errors

## Critical: Update Environment Variable

**YOU MUST UPDATE** `VITE_API_BASE_URL` in Vercel Dashboard:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Find `VITE_API_BASE_URL`
3. **REPLACE** `https://your-project-name.vercel.app` with your **ACTUAL Vercel URL**
4. To find your actual URL:
   - Check Vercel Dashboard → Deployments → Click latest deployment
   - Copy the URL (e.g., `https://bloom-x-analytica-abc123.vercel.app`)
   - Or check your project settings

## Steps to Fix

### 1. Commit and Push CORS Fixes
```bash
git add api/forms/contact.ts api/forms/career.ts api/health.ts
git commit -m "Fix CORS headers - set before any response"
git push
```

### 2. Update Vercel Environment Variable
In Vercel Dashboard → Settings → Environment Variables:

**Current (WRONG):**
```
VITE_API_BASE_URL=https://your-project-name.vercel.app
```

**Update to (CORRECT):**
```
VITE_API_BASE_URL=https://your-actual-vercel-url.vercel.app
```

### 3. Redeploy
- After updating the env var, Vercel will automatically redeploy
- Or manually trigger a new deployment

### 4. Rebuild Frontend
Since `VITE_API_BASE_URL` is used at build time, you need to:
- Trigger a new build in Vercel (or redeploy)
- The frontend will be rebuilt with the correct API URL

## Verification

After deployment, test:

1. **Check API URL in browser console:**
   ```javascript
   console.log(import.meta.env.VITE_API_BASE_URL)
   ```
   Should show your actual Vercel URL, not `your-project-name.vercel.app`

2. **Test CORS:**
   - Open browser DevTools → Network tab
   - Submit a form
   - Check the request headers - should include `Origin: https://www.bloomxanalytica.co.uk`
   - Check response headers - should include `Access-Control-Allow-Origin: https://www.bloomxanalytica.co.uk`

3. **Test form submission:**
   - Submit contact form
   - Should succeed without CORS errors

## Browser Extension Errors

The `content_script.js` errors are from browser extensions (password managers, form fillers, etc.) and are **NOT related to your code**. These can be safely ignored.

## If Still Not Working

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the function that's failing
   - Check logs for errors

2. **Verify CORS Headers:**
   ```bash
   curl -H "Origin: https://www.bloomxanalytica.co.uk" \
        -X OPTIONS \
        https://your-vercel-url.vercel.app/api/forms/contact \
        -v
   ```
   Should return `Access-Control-Allow-Origin: https://www.bloomxanalytica.co.uk`

3. **Test with curl:**
   ```bash
   curl -H "Origin: https://www.bloomxanalytica.co.uk" \
        -X POST \
        https://your-vercel-url.vercel.app/api/forms/contact \
        -F "name=Test" \
        -F "email=test@test.com" \
        -F "inquiryType=Test" \
        -F "message=Test message" \
        -v
   ```

## Important Notes

- `VITE_API_BASE_URL` is embedded at **build time**, not runtime
- After changing the env var, you **MUST rebuild** the frontend
- CORS headers are now set at the very beginning of the handler
- Origin matching is more permissive for `bloomxanalytica.co.uk` domains

