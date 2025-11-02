# How to Access Vercel Function Logs - Step-by-Step Guide

## ✅ EXACT STEPS (Official Vercel Method)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Login if needed

2. **Select Your Project**
   - Click on your project name (e.g., "bloom-x-analytica")

3. **Go to Deployments Tab**
   - Click on **"Deployments"** tab at the top of the page

4. **Click on Latest Deployment**
   - Find the most recent deployment (usually at the top)
   - Click on the deployment (shows status like "Building", "Ready", or "Error")

5. **Open the Resources Tab**
   - In the deployment details page, look for tabs at the top
   - Click on **"Resources"** tab (NOT "Overview" or "Build Logs")
   - This tab shows functions, middleware, and static assets

6. **Find Your Function**
   - In the "Resources" tab, you'll see a list of functions
   - Look for **`/api/forms/career`** in the list
   - You can use the search/filter if needed

7. **View Function Logs**
   - Find the three-dot menu (`...`) next to `/api/forms/career`
   - Click on the three dots (`...`)
   - Select **"Logs"** from the dropdown menu
   - This will show the function logs

## Method 2: Through Functions Tab

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard

2. **Select Your Project**
   - Click on your project name

3. **Go to Settings → Functions**
   - Click on **"Settings"** tab at the top
   - In the left sidebar, click on **"Functions"**
   - This shows all your serverless functions

4. **Or Use Real-Time Logs**
   - In your project dashboard, look for **"Logs"** or **"Real-Time Logs"** button
   - Click it to see live logs from all functions

## Method 3: Direct URL (If Available)

If you know your project name, you can try:
```
https://vercel.com/[your-username]/[project-name]/functions
```

## Method 4: Using Vercel CLI (Alternative)

If you have Vercel CLI installed:

```bash
# Install Vercel CLI if not installed
npm i -g vercel

# Login
vercel login

# View logs
vercel logs --follow

# Or for specific function
vercel logs /api/forms/career --follow
```

## What to Look For

Once you're in the logs, look for:

1. **Error Messages** - Red text showing errors
2. **Stack Traces** - Detailed error information
3. **Console.log outputs** - Lines starting with `[REQUEST_ID]`
4. **Request details** - HTTP method, status codes, etc.

## If You Still Can't Find It

1. **Check Project Overview**
   - On your project dashboard, look for a **"Functions"** or **"Serverless Functions"** section
   - It might show function names like `/api/forms/career`

2. **Check Recent Deployments**
   - Look for deployments with errors (red status)
   - Click on failed deployments to see error details

3. **Use Browser Search**
   - Press `Ctrl+F` (or `Cmd+F` on Mac)
   - Search for "career" or "functions" or "logs"

4. **Contact Vercel Support**
   - If you still can't find it, Vercel support can help
   - They can guide you to the exact location

## Screenshot Locations

The logs are typically found in one of these locations:

- **Deployments → [Latest Deployment] → Functions → `/api/forms/career`**
- **Project Dashboard → Functions Tab → `/api/forms/career`**
- **Project Dashboard → Logs Button (Top Right)**
- **Settings → Functions → View Logs**

## Quick Alternative: Check Build Logs

If you can't find function logs, check **Build Logs**:

1. Go to your project
2. Click on **"Deployments"** tab
3. Click on latest deployment
4. Look for **"Build Logs"** or **"Runtime Logs"**
5. These show errors during function execution

The build logs will show if there are any import errors or module loading issues.

