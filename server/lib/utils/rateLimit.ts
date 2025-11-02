/**
 * Simple in-memory rate limiter
 * In production, use Redis or a proper rate limiting service
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 10;

/**
 * Check if request is rate limited
 * @param identifier - IP address or user identifier
 * @returns true if rate limited, false otherwise
 */
export function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (now > entry.resetAt) {
    // Window expired, reset
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true; // Rate limited
  }

  entry.count += 1;
  rateLimitStore.set(identifier, {
    count: entry.count,
    resetAt: entry.resetAt,
  });
  return false;
}

/**
 * Clean up expired entries (should be called periodically)
 */
export function cleanupRateLimitStore(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetAt) {
      rateLimitStore.delete(key);
    }
  }
}

// Clean up every 5 minutes
setInterval(cleanupRateLimitStore, 5 * 60 * 1000);

