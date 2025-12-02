/**
 * Input validation middleware
 */

/**
 * Validates chat request body
 */
export function validateChatRequest(req, res, next) {
  const { message, history, departmentContext } = req.body;

  // Validate message
  if (!message || typeof message !== 'string') {
    return res.status(400).json({
      success: false,
      error: 'Message is required and must be a string',
    });
  }

  // Check message length
  if (message.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Message cannot be empty',
    });
  }

  if (message.length > 1000) {
    return res.status(400).json({
      success: false,
      error: 'Message is too long (max 1000 characters)',
    });
  }

  // Validate history if provided
  if (history !== undefined) {
    if (!Array.isArray(history)) {
      return res.status(400).json({
        success: false,
        error: 'History must be an array',
      });
    }

    if (history.length > 20) {
      // Limit history to prevent token overflow
      req.body.history = history.slice(-20);
    }
  }

  // Validate department context if provided
  if (departmentContext !== undefined) {
    if (!Array.isArray(departmentContext)) {
      return res.status(400).json({
        success: false,
        error: 'Department context must be an array',
      });
    }
  }

  next();
}

/**
 * Sanitize user input
 */
export function sanitizeInput(req, res, next) {
  if (req.body.message) {
    // Remove any potential script tags or dangerous content
    req.body.message = req.body.message
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .trim();
  }

  next();
}

export default { validateChatRequest, sanitizeInput };
