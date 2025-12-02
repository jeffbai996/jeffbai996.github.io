import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Direct Gemini API Service for Frontend
 * Calls Google's Gemini API directly without a backend server
 */
class GeminiService {
  constructor() {
    // API key is injected at build time via GitHub Actions
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
      console.warn('Gemini API key not configured. AI features will be disabled.');
      this.initialized = false;
      return;
    }

    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({
        model: 'gemini-2.0-flash-lite',
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 500,
          topP: 0.95,
          topK: 40,
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
      this.initialized = true;
      console.log('Gemini API initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini API:', error);
      this.initialized = false;
    }
  }

  /**
   * Check if Gemini service is available
   */
  isAvailable() {
    return this.initialized;
  }

  /**
   * Build context from relevant departments
   */
  buildContext(relevantDepartments) {
    if (!relevantDepartments || relevantDepartments.length === 0) {
      return '';
    }

    let context = '\n\nRelevant Department Information:\n';
    relevantDepartments.forEach(dept => {
      context += `\n${dept.name}:\n`;
      context += `Description: ${dept.description}\n`;
      if (dept.services && dept.services.length > 0) {
        context += `Services: ${dept.services.join(', ')}\n`;
      }
      if (dept.contact) {
        context += `Contact: ${dept.contact}\n`;
      }
    });

    return context;
  }

  /**
   * Format conversation history for Gemini
   */
  formatHistory(history) {
    if (!history || history.length === 0) {
      return [];
    }

    return history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));
  }

  /**
   * Generate a response using Gemini API
   */
  async generateResponse(userMessage, relevantDepartments = [], conversationHistory = []) {
    if (!this.initialized) {
      throw new Error('Gemini API not initialized');
    }

    try {
      // Build the system context
      const departmentContext = this.buildContext(relevantDepartments);

      const systemPrompt = `You are a helpful assistant for GOV.PRAYA - the Government of Praya web portal. You help citizens find information about government services, departments, and resources.

${departmentContext}

Guidelines:
- Be concise and friendly
- Use the department information provided when relevant
- If you don't have enough information, suggest the user contact the relevant department
- Keep responses under 150 words
- Be professional and helpful`;

      // Format conversation history
      const history = this.formatHistory(conversationHistory.slice(-6)); // Last 6 messages for context

      // Start a chat session with history
      const chat = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: systemPrompt }],
          },
          {
            role: 'model',
            parts: [{ text: 'I understand. I will help citizens find information about government departments and services, keeping my responses concise and professional.' }],
          },
          ...history,
        ],
      });

      // Send the user's message
      const result = await chat.sendMessage(userMessage);
      const response = result.response;
      const text = response.text();

      return {
        success: true,
        response: text,
        tokensUsed: {
          prompt: result.response.usageMetadata?.promptTokenCount || 0,
          completion: result.response.usageMetadata?.candidatesTokenCount || 0,
          total: result.response.usageMetadata?.totalTokenCount || 0,
        },
      };
    } catch (error) {
      console.error('Gemini API error:', error);

      // Handle specific error types
      if (error.message?.includes('quota') || error.message?.includes('429')) {
        throw new Error('API quota exceeded. Please try again later.');
      } else if (error.message?.includes('safety')) {
        throw new Error('Response blocked due to safety filters. Please rephrase your question.');
      } else {
        throw new Error('Failed to generate response. Please try again.');
      }
    }
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      available: this.initialized,
      model: 'gemini-2.0-flash-lite',
    };
  }
}

// Create a singleton instance
const geminiService = new GeminiService();

export default geminiService;
