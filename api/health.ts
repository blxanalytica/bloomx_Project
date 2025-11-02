import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Set CORS headers
 */
function setCorsHeaders(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://www.bloomxanalytica.co.uk',
    'https://bloomxanalytica.co.uk',
    'http://localhost:5173',
    'http://localhost:3000',
  ];

  const isAllowed = allowedOrigins.includes(origin) || 
                    origin.includes('bloomxanalytica.co.uk') ||
                    origin.includes('localhost') ||
                    process.env.ALLOWED_ORIGIN === '*';

  if (isAllowed || process.env.ALLOWED_ORIGIN === '*') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    setCorsHeaders(req, res);
    return res.status(200).end();
  }

  setCorsHeaders(req, res);
  return res.status(200).json({ status: 'ok' });
}

