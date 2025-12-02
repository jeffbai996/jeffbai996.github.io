import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('Gemini API key is required');
    }

    this.genAI = new GoogleGenerativeAI(apiKey);
    // Use Gemini 2.0 Flash for fast, cost-effective responses
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash-exp',
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 500, // Keep responses concise
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_HARASSMENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_HATE_SPEECH',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
        {
          category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
          threshold: 'BLOCK_MEDIUM_AND_ABOVE',
        },
      ],
    });

    // Track request count for rate limiting (free tier: 15 RPM)
    this.requestCount = 0;
    this.windowStart = Date.now();
    this.RATE_LIMIT_WINDOW = 60000; // 1 minute
    this.MAX_REQUESTS_PER_WINDOW = 15; // Gemini 2.0 Flash free tier limit
  }

  /**
   * Check if we're within rate limits
   */
  checkRateLimit() {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - this.windowStart > this.RATE_LIMIT_WINDOW) {
      this.requestCount = 0;
      this.windowStart = now;
    }

    if (this.requestCount >= this.MAX_REQUESTS_PER_WINDOW) {
      const resetIn = Math.ceil((this.RATE_LIMIT_WINDOW - (now - this.windowStart)) / 1000);
      throw new Error(`Rate limit exceeded. Try again in ${resetIn} seconds.`);
    }

    this.requestCount++;
  }

  /**
   * Build system prompt with department context
   */
  buildSystemPrompt(departmentData, conversationHistory) {
    return `You are a helpful assistant for the Government of Praya's citizen services portal (GOV.PRAYA).

Your role is to help citizens find information about government services, answer questions, and guide them to the right departments.

Available Government Departments and Services:
${JSON.stringify(departmentData, null, 2)}

Guidelines:
- Be concise and helpful (keep responses under 150 words)
- Reference specific departments with their services and contact information when relevant
- Provide step-by-step guidance for common processes
- If you don't have exact information from the department data above, say so and direct users to contact the relevant department
- Maintain a professional, friendly, and respectful tone
- Never make up information - only use the provided department data
- If a query is outside government services scope, politely explain that you can only help with government-related matters
- For emergencies, immediately direct to appropriate emergency services
- Include operating hours and contact info when relevant

Previous conversation context:
${conversationHistory.slice(-5).map(m => `${m.sender === 'user' ? 'User' : 'Assistant'}: ${m.text}`).join('\n')}`;
  }

  /**
   * Generate response using Gemini API
   */
  async generateResponse(userMessage, departmentData, conversationHistory = []) {
    try {
      // Check rate limits
      this.checkRateLimit();

      // Build the full prompt with context
      const systemPrompt = this.buildSystemPrompt(departmentData, conversationHistory);
      const fullPrompt = `${systemPrompt}\n\nUser query: ${userMessage}\n\nProvide a helpful, concise response:`;

      // Generate response
      const result = await this.model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      return {
        success: true,
        text: text,
        tokensUsed: {
          prompt: result.response.usageMetadata?.promptTokenCount || 0,
          completion: result.response.usageMetadata?.candidatesTokenCount || 0,
          total: result.response.usageMetadata?.totalTokenCount || 0,
        }
      };
    } catch (error) {
      console.error('Gemini API error:', error);

      // Handle specific error types
      if (error.message?.includes('Rate limit')) {
        throw error; // Re-throw rate limit errors
      }

      if (error.message?.includes('API key')) {
        throw new Error('Invalid API key configuration');
      }

      // Generic error
      throw new Error('Failed to generate response from Gemini API');
    }
  }

  /**
   * Generate streaming response (for future enhancement)
   */
  async generateStreamingResponse(userMessage, departmentData, conversationHistory = []) {
    try {
      this.checkRateLimit();

      const systemPrompt = this.buildSystemPrompt(departmentData, conversationHistory);
      const fullPrompt = `${systemPrompt}\n\nUser query: ${userMessage}\n\nProvide a helpful, concise response:`;

      const result = await this.model.generateContentStream(fullPrompt);

      return result.stream;
    } catch (error) {
      console.error('Gemini streaming error:', error);
      throw error;
    }
  }

  /**
   * Get current rate limit status
   */
  getRateLimitStatus() {
    const now = Date.now();
    const windowElapsed = now - this.windowStart;
    const windowRemaining = Math.max(0, this.RATE_LIMIT_WINDOW - windowElapsed);

    return {
      requestsUsed: this.requestCount,
      requestsRemaining: this.MAX_REQUESTS_PER_WINDOW - this.requestCount,
      windowResetIn: Math.ceil(windowRemaining / 1000),
    };
  }
}

export default GeminiService;
