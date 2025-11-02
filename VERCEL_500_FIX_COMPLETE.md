# Vercel 500 Error Fix - Comprehensive Solution

## Problem
Serverless function returning HTML error page ("A server e...") instead of JSON, indicating crash before handler runs or during execution.

## Root Cause Analysis

The error "A server e..." indicates Vercel's default error page, which means:
1. **Module import error** - Imports failing at load time
2. **Request parsing error** - Multipart handling crashing immediately  
3. **Unhandled promise rejection** - Async error not caught
4. **Stream handling issue** - Request stream not accessible as expected

## Fixes Applied (Based on Vercel Documentation)

### 1. ✅ CORS Headers Set FIRST
- **Critical:** CORS headers now set **before** any other logic
- Ensures JSON responses even if error occurs early
- Headers set even on module load failures

### 2. ✅ Improved Multipart Parsing (Vercel Best Practices)
- Added Content-Type validation
- Added timeout protection (30 seconds)
- Proper stream error handling
- Better busboy event handling
- Simplified stream piping logic

### 3. ✅ Enhanced Error Handling
- Top-level try-catch (catches module errors)
- Detailed logging at each step
- Stack trace logging for debugging
- All errors return JSON (never HTML)
- Module import check with detailed logging

### 4. ✅ Better Logging
- Request ID logging for tracking
- Logs at each major step
- Error stack traces logged
- Module status logged

## Key Changes

### Request Stream Handling
```typescript
// Before: Complex fallback logic
if (req.on && typeof req.on === 'function' && typeof req.read === 'function') {
  req.pipe(bb);
} else {
  // Complex fallback...
}

// After: Simplified, Vercel-recommended approach
if (typeof req.on === 'function') {
  req.on('error', (err) => {
    // Handle stream errors
  });
  req.pipe(bb);
} else {
  reject(new Error('Request is not a readable stream'));
}
```

### Error Handling Order
```typescript
// 1. Set CORS headers FIRST
setCorsHeaders(req, res);

// 2. Handle OPTIONS
if (req.method === 'OPTIONS') return res.status(200).end();

// 3. Check method
if (req.method !== 'POST') return res.status(405).json({...});

// 4. Generate request ID and log
const requestId = generateRequestId();
console.log(`[${requestId}] Request received`);

// 5. Check modules
if (!careerSchema || !busboy || ...) {
  return res.status(500).json({...});
}

// 6. Process request with try-catch
```

## Next Steps: Check Vercel Function Logs

**CRITICAL:** After deploying, check Vercel Function Logs:

1. Go to **Vercel Dashboard** → Your Project → **Functions**
2. Click on `/api/forms/career`
3. Check **Logs** tab
4. Look for:
   - `[REQUEST_ID] Career form request received` - Confirms handler runs
   - `[REQUEST_ID] Starting form data parsing...` - Confirms parsing starts
   - `[REQUEST_ID] Module import check failed` - Shows which modules missing
   - Error stack traces - Shows exact error location

## Expected Log Flow

**Success flow:**
```
[REQUEST_ID] Career form request received from IP, method: POST
[REQUEST_ID] Starting form data parsing...
[REQUEST_ID] Form data parsed successfully: 5 fields, 1 files
[REQUEST_ID] Career form submitted successfully from IP
```

**Error flow:**
```
[REQUEST_ID] Career form request received from IP, method: POST
[REQUEST_ID] Error parsing form data: [error message]
[REQUEST_ID] Parse error stack: [stack trace]
```

## Troubleshooting

### If logs show "Module import check failed"
- Check which modules are `false` in the log
- Verify dependencies in `package.json`
- Check if `npm install` completed successfully

### If logs show "Request is not a readable stream"
- Verify `bodyParser: false` in `config`
- Check if Content-Type is `multipart/form-data`
- May need to use Vercel's built-in multipart handling

### If logs show "Request timeout"
- File upload is too large
- Network issues
- Increase timeout (currently 30 seconds)

### If no logs appear at all
- Function crashing before handler runs
- Module import error at load time
- Check Vercel deployment logs (not function logs)

## Files Changed

- `api/forms/career.ts` - Complete rewrite of parsing logic with Vercel best practices

## Testing After Deployment

1. **Deploy** the updated code
2. **Immediately check Function Logs** in Vercel Dashboard
3. **Submit test form** with a resume file
4. **Check logs again** for detailed error messages
5. **Share specific error** from logs if issue persists

The enhanced logging will show exactly where and why the function is failing.

