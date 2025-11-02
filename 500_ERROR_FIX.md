# 500 Error Fix - Server Error Handling

## Problem
Server returning 500 error with non-JSON response ("A server e..." - HTML error page).

## Root Cause
- Unhandled errors causing Vercel to return HTML error page instead of JSON
- Multipart/form-data parsing issues in Vercel serverless functions
- Module loading errors not caught

## Fixes Applied

### 1. Top-Level Error Handler ✅
- Wrapped entire handler in try-catch to catch module loading errors
- Ensures all errors return JSON, not HTML
- Provides development error details

### 2. Improved Multipart Parsing ✅
- Enhanced `parseFormDataWithFiles` to handle Vercel's body parsing
- Checks if Vercel already parsed the body
- Falls back to busboy stream parsing if needed
- Better error handling for parsing failures

### 3. Better Error Messages ✅
- Parse errors return proper JSON with fieldErrors
- All errors include CORS headers
- Development mode shows error details

## Files Changed

1. **`api/forms/career.ts`**
   - Added top-level try-catch wrapper
   - Improved parseFormDataWithFiles error handling
   - Better error messages

2. **`api/forms/contact.ts`**
   - Added top-level try-catch wrapper
   - Better error handling

## Testing

After deployment, check Vercel Function Logs for:
- Error messages (should be logged)
- Stack traces (for debugging)
- Request IDs (for tracking)

## Next Steps

1. Deploy to Vercel
2. Check Function Logs in Vercel Dashboard
3. Test form submission
4. Review error logs if 500 persists

## Debugging

If 500 error persists:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the failing function
   - Check logs for error details

2. **Test Locally:**
   ```bash
   npm run dev:server
   # Test form submission
   ```

3. **Common Issues:**
   - Missing environment variables
   - Email service configuration errors
   - File parsing issues
   - Module import errors

The top-level error handler should now catch all errors and return JSON instead of HTML.

