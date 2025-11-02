/**
 * Get API base URL with smart fallback
 * - Checks environment variable first
 * - Falls back to detecting Vercel URL or using relative path
 * - Works in both development and production
 */
export function getApiBaseUrl(): string {
  // Check environment variable first
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  // If env var is set and not placeholder, use it
  if (envUrl && !envUrl.includes('your-project-name')) {
    return envUrl;
  }
  
  // In production, try to detect Vercel URL or use relative path
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If on bloomxanalytica.co.uk domain, check if API is on same domain
    if (hostname.includes('bloomxanalytica.co.uk')) {
      // Option 1: Same domain - use relative path (if API is on same domain)
      // return ''; // This would use relative paths
      
      // Option 2: Different domain - need actual Vercel URL
      // For now, return empty string to use relative paths if API is on same domain
      // Otherwise, you MUST set VITE_API_BASE_URL in Vercel
      
      // Check if we have a runtime config (set via window or meta tag)
      const runtimeConfig = (window as any).__API_BASE_URL__;
      if (runtimeConfig) {
        return runtimeConfig;
      }
      
      // Fallback: use relative path (assumes API is on same domain at /api)
      // If API is on different domain, this won't work - MUST set env var
      return '';
    }
    
    // Development fallback
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:3001';
    }
  }
  
  // Final fallback
  return envUrl || 'http://localhost:3001';
}

