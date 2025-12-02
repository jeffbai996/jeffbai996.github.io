import express from 'express';
import GeminiService from '../services/geminiService.js';
import { buildRelevantContext, formatConversationHistory } from '../services/contextBuilder.js';
import { validateChatRequest, sanitizeInput } from '../middleware/validator.js';
import { geminiRateLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Initialize Gemini service
let geminiService;
try {
  geminiService = new GeminiService(process.env.GEMINI_API_KEY);
} catch (error) {
  console.error('Failed to initialize Gemini service:', error.message);
}

/**
 * POST /api/gemini/chat
 * Generate a response using Gemini API
 */
router.post(
  '/chat',
  geminiRateLimiter,
  sanitizeInput,
  validateChatRequest,
  async (req, res) => {
    try {
      // Check if Gemini service is initialized
      if (!geminiService) {
        return res.status(503).json({
          success: false,
          error: 'AI service is not available. Please try the basic chatbot.',
          fallback: true,
        });
      }

      const { message, history = [], departmentContext = [] } = req.body;

      // Build relevant context to reduce token usage
      const relevantDepartments = departmentContext.length > 0
        ? buildRelevantContext(message, departmentContext)
        : [];

      // Format conversation history
      const formattedHistory = formatConversationHistory(history);

      // Generate response using Gemini
      const result = await geminiService.generateResponse(
        message,
        relevantDepartments,
        formattedHistory
      );

      // Get rate limit status
      const rateLimitStatus = geminiService.getRateLimitStatus();

      // Return response
      res.json({
        success: true,
        response: result.text,
        tokensUsed: result.tokensUsed,
        rateLimit: rateLimitStatus,
      });

    } catch (error) {
      console.error('Gemini API error:', error);

      // Handle rate limit errors
      if (error.message?.includes('Rate limit')) {
        return res.status(429).json({
          success: false,
          error: error.message,
          fallback: true,
        });
      }

      // Handle other errors
      res.status(500).json({
        success: false,
        error: 'Failed to generate response. Please try again.',
        fallback: true,
      });
    }
  }
);

/**
 * GET /api/gemini/status
 * Get Gemini service status and rate limits
 */
router.get('/status', async (req, res) => {
  try {
    if (!geminiService) {
      return res.json({
        available: false,
        error: 'Gemini service not initialized',
      });
    }

    const rateLimitStatus = geminiService.getRateLimitStatus();

    res.json({
      available: true,
      model: 'gemini-2.0-flash-exp',
      rateLimit: rateLimitStatus,
    });
  } catch (error) {
    res.status(500).json({
      available: false,
      error: error.message,
    });
  }
});

/**
 * GET /api/gemini/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'gemini-api',
    timestamp: new Date().toISOString(),
  });
});

export default router;
