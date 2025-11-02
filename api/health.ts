import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Set CORS headers - MUST be called before any response is sent
 */
function setCorsHeaders(req: VercelRequest, res: VercelResponse): void {
  try {
    const origin = req.headers.origin || '';
    
    const allowedOrigins = [
      'https://www.bloomxanalytica.co.uk',
      'https://bloomxanalytica.co.uk',
      'http://localhost:5173',
      'http://localhost:3000',
    ];

    let allowedOrigin = '*';
    
    if (origin) {
      if (allowedOrigins.includes(origin) || 
          origin.includes('bloomxanalytica.co.uk') ||
          origin.includes('localhost')) {
        allowedOrigin = origin;
      } else if (process.env.ALLOWED_ORIGIN === '*') {
        allowedOrigin = '*';
      } else {
        allowedOrigin = allowedOrigins[0];
      }
    }

    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  } catch (error) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // ALWAYS set CORS headers first
  setCorsHeaders(req, res);

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({ status: 'ok' });
}
