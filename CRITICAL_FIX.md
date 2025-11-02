# CRITICAL FIX - CORS and API URL Issue

## Problem
Frontend is using placeholder URL `https://your-project-name.vercel.app` instead of actual Vercel URL, causing CORS errors.

## Solution Applied

✅ **Smart API URL detection** - Created `src/utils/apiConfig.js` that:
- Detects placeholder URLs and ignores them
- Falls back to relative paths if on same domain
- Uses runtime configuration if available

✅ **Updated form pages** - Contact and JobApplication now use smart API detection

## IMMEDIATE ACTION REQUIRED

### Option 1: Update Vercel Environment Variable (RECOMMENDED)

1. **Find your actual Vercel URL:**
   - Go to Vercel Dashboard → Your Project → Deployments
   - Click on the latest deployment
   - Copy the URL (e.g., `https://bloom-x-analytica-abc123.vercel.app`)

2. **Update environment variable:**
   - Go to Vercel Dashboard → Settings → Environment Variables
   - Find `VITE_API_BASE_URL`
   - **REPLACE** `https://your-project-name.vercel.app` with your **ACTUAL URL**
   - Make sure it's set for **Production** environment
   - Save

3. **Redeploy:**
   - After saving, Vercel will automatically trigger a new deployment
   - The frontend will be rebuilt with the correct URL

### Option 2: Use Runtime Configuration (Alternative)

If you can't update the env var immediately, you can set the API URL at runtime:

1. **Add to your HTML head** (in `index.html`):
   ```html
   <meta name="api-base-url" content="https://your-actual-vercel-url.vercel.app">
   ```

2. **Or set via JavaScript** (before your app loads):
   ```javascript
   window.__API_BASE_URL__ = 'https://your-actual-vercel-url.vercel.app';
   ```

### Option 3: Deploy API on Same Domain (Best Long-term)

If your frontend and backend can be on the same domain:
- Deploy both frontend and API on `bloomxanalytica.co.uk`
- Use relative paths (`/api/forms/contact`)
- No CORS issues, no env vars needed

## Testing

After applying the fix:

1. **Check browser console:**
   ```javascript
   console.log(getApiBaseUrl())
   ```
   Should NOT show `your-project-name.vercel.app`

2. **Test form submission:**
   - Submit contact form
   - Check Network tab - request URL should be correct
   - Should succeed without CORS errors

## Browser Extension Errors

The `content_script.js` errors are from browser extensions (password managers, form fillers) and are **NOT related to your code**. These can be safely ignored.

## Next Steps

1. ✅ Commit the code changes (already done)
2. ⚠️ **UPDATE VITE_API_BASE_URL in Vercel Dashboard** (CRITICAL)
3. ✅ Redeploy (automatic after env var update)
4. ✅ Test forms

## Files Changed

- `src/utils/apiConfig.js` - New smart API URL detection
- `src/pages/Contact.jsx` - Updated to use `getApiBaseUrl()`
- `src/pages/JobApplication.jsx` - Updated to use `getApiBaseUrl()`

The code now handles the placeholder URL gracefully, but you **MUST** update the environment variable for production to work correctly.

