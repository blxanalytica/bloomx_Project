# Fix Vercel Deployment Error - Peer Dependency Issue

## Problem
Vercel deployment fails with peer dependency conflict between `@react-email/components` and React.

## Solution

### Option 1: Manual Vercel Dashboard Configuration (RECOMMENDED)

1. Go to your Vercel project dashboard
2. Click **Settings** → **General**
3. Scroll to **Build & Development Settings**
4. Click **Override** button
5. Set the following:

   **Install Command:**
   ```
   npm install --legacy-peer-deps
   ```

   **Build Command:**
   ```
   npm run build
   ```

6. Click **Save**
7. Redeploy your project

### Option 2: Using vercel.json (Already Created)

The `vercel.json` file has been created with the correct configuration. Make sure it's committed and pushed:

```bash
git add vercel.json .npmrc
git commit -m "Fix Vercel build with legacy peer deps"
git push
```

### Option 3: Force Install Script

If the above doesn't work, add this to your `package.json`:

```json
"scripts": {
  "vercel-install": "npm install --legacy-peer-deps",
  "build": "vite build"
}
```

Then in Vercel Dashboard, set:
- **Install Command:** `npm run vercel-install`

## Files to Commit

Make sure these files are committed:

1. `.npmrc` - Contains `legacy-peer-deps=true`
2. `vercel.json` - Contains Vercel build configuration

## Verification

After updating:
1. Push the changes
2. Trigger a new deployment
3. Check build logs - you should see `--legacy-peer-deps` being used
4. Build should complete successfully

## Why This Happens

`@react-email/components@0.0.16` has a strict peer dependency on React 18.2.0, but npm's strict dependency resolution conflicts with other packages. Using `--legacy-peer-deps` allows npm to install despite minor version mismatches, which is safe for React 18.2.x versions.

