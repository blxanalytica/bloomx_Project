# Final Fix: Vercel includeFiles Configuration

## Error
```
Cannot find module '/var/task/api/lib/email/templates/renderEmail'
```

Vercel isn't compiling `.tsx` files in `api/lib/` subdirectories.

## Solution Applied

### 1. ✅ Removed `.js` Extension from Import
- Changed `'../lib/email/templates/renderEmail.js'` to `'../lib/email/templates/renderEmail'`
- Let Vercel's TypeScript compiler resolve it automatically

### 2. ✅ Added `includeFiles` Configuration
Updated `vercel.json` to explicitly include `api/lib/**` files:

```json
{
  "functions": {
    "api/forms/career.ts": {
      "includeFiles": "api/lib/**"
    },
    "api/forms/contact.ts": {
      "includeFiles": "api/lib/**"
    }
  }
}
```

This tells Vercel to:
- ✅ Include all files from `api/lib/` directory
- ✅ Compile `.tsx` files in that directory
- ✅ Make them available to the functions

## Why This Works

Vercel's `includeFiles` configuration ensures that:
1. Files in `api/lib/` are included in the deployment bundle
2. TypeScript files (including `.tsx`) are compiled
3. The compiled files are available at runtime

## Next Steps

1. **Deploy to Vercel**
   ```bash
   git add .
   git commit -m "fix: add includeFiles config for api/lib templates"
   git push
   ```

2. **Wait for Deployment**
   - Vercel will redeploy automatically
   - Check deployment status

3. **Test**
   - Submit the career form
   - Check function logs - error should be resolved

## Expected Result

After deployment:
- ✅ Vercel includes `api/lib/email/templates/` files
- ✅ Compiles `.tsx` files to `.js`
- ✅ Function finds `renderEmail` module successfully
- ✅ Form submissions work without errors

The `includeFiles` configuration ensures Vercel includes and compiles all template files!

