# 500 Error Fix - Vercel Serverless Function Crash

## Problem
Serverless function crashing with `FUNCTION_INVOCATION_FAILED`. Error likely caused by:
- Multipart form data parsing issues
- Request stream handling
- Module loading errors

## Root Cause
Vercel serverless functions handle multipart/form-data differently than Express:
- When `bodyParser: false`, the request body needs special handling
- `req.pipe()` may not work as expected in Vercel's environment
- Need to read the raw body stream correctly

## Fix Applied

### 1. Simplified Multipart Parsing ✅
- Removed complex fallback logic
- Direct stream piping to busboy
- Better error handling with specific error messages
- Added timeout protection

### 2. Enhanced Error Handling ✅
- Top-level try-catch for module loading errors
- Specific error messages for parsing failures
- Development mode shows error details
- All errors return JSON (never HTML)

### 3. Better Error Messages ✅
- Parse errors show specific error message
- File upload errors are caught separately
- Email errors are caught separately
- All errors log request ID for tracking

## Files Changed

- `api/forms/career.ts` - Simplified parsing, better error handling

## Testing

After deployment:

1. **Check Vercel Function Logs:**
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on `/api/forms/career`
   - Check logs for:
     - Error messages
     - Stack traces
     - Request IDs

2. **Test Form Submission:**
   - Submit career form with resume
   - Check browser console for errors
   - Check Vercel logs for server errors

## Common Issues & Solutions

### Issue: "Request is not a readable stream"
**Solution:** This means `bodyParser` configuration is wrong. The function should have `bodyParser: false`.

### Issue: "Busboy error"
**Solution:** Check:
- Content-Type header is `multipart/form-data`
- File size is within limits
- Request format is correct

### Issue: Module loading error
**Solution:** Check:
- All imports are correct
- Dependencies are installed
- TypeScript compilation succeeds

## Next Steps

1. Deploy to Vercel
2. Check Function Logs for specific error
3. Test form submission
4. Review logs if error persists

The function should now handle errors gracefully and return JSON instead of crashing.

