/**
 * Get API base URL with smart fallback
 * - Checks environment variable first
 * - Falls back to detecting Vercel URL or using relative path
 * - Works in both development and production
 */
export function getApiBaseUrl() {
  // Check environment variable first
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  // If env var is set and not placeholder, use it
  if (envUrl && !envUrl.includes('your-project-name')) {
    return envUrl;
  }
  
  // In production, try to detect Vercel URL or use relative path
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    // If on bloomxanalytica.co.uk domain
    if (hostname.includes('bloomxanalytica.co.uk')) {
      // Check if we have a runtime config (set via window or meta tag)
      if (window.__API_BASE_URL__) {
        return window.__API_BASE_URL__;
      }
      
      // If API is on same domain, use relative path
      // Otherwise, MUST set VITE_API_BASE_URL in Vercel env vars
      // For now, return empty string to use relative paths
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
