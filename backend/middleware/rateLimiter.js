import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for Gemini API endpoint
 * Free tier allows 15 requests per minute
 * We set a more conservative limit per IP to prevent abuse
 */
export const geminiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Limit each IP to 10 requests per minute (conservative for free tier)
  message: {
    success: false,
    error: 'Too many requests. Please try again in a minute.',
    retryAfter: 60,
  },
  standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false, // Disable `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: 'Rate limit exceeded. The chatbot is experiencing high traffic. Please try again in a minute.',
      retryAfter: 60,
    });
  },
});

/**
 * General API rate limiter (more permissive)
 */
export const apiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute for health checks, etc.
  message: {
    success: false,
    error: 'Too many requests. Please slow down.',
  },
});

export default { geminiRateLimiter, apiRateLimiter };
