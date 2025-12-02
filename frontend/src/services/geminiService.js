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

      const systemPrompt = `You are a helpful assistant for GOV.PRAYA - the official Government of Praya web portal.

## About GOV.PRAYA
The Republic of Praya is a nation of 2.4 million citizens with a modern, digital-first government. The portal offers 127 online services available 24/7 across 12 major departments, committed to transparency, efficiency, and accessibility through technology.

## Key Features
- **PrayaPass**: Secure digital identity and authentication system (single sign-on across all services)
- **Online Services**: 127 services available 24/7
- **12 Major Departments**: NPA, Bank of Praya, CTB, DOJ, Interior, Transport, Revenue, Praya Post, Health, Housing Authority, CBCA, Legislative Council
- **Digital-First**: Modern, responsive interface with unified citizen dashboard

## The 12 Departments
1. **National Police Agency (NPA)**: Emergency response (911/311), crime reporting, police clearances, firearm licensing
2. **Bank of Praya (BOP)**: Central bank, personal/business banking, loans, mortgages, currency (Praya Dollar ¤)
3. **Cannabis Tax Bureau (CTB)**: Cannabis licensing, cultivation permits, dispensary regulation, tax returns
4. **Department of Justice (DOJ)**: Court system, case lookup, legal aid, public defender services, prosecution
5. **Interior Department (ID)**: National IDs, passports, birth certificates, land registry, building permits, civil records
6. **Transport Department (TD)**: Driver licensing, vehicle registration, highway maintenance, road safety
7. **Revenue Department (RD)**: Tax filing, tax payments, refund tracking, business tax accounts, benefits
8. **Praya Post (PP)**: Domestic/international mail, package delivery, tracking, express shipping, P.O. boxes
9. **Health Department (HD)**: Public health, national health insurance, vaccinations, disease control, healthcare licensing
10. **Housing Authority (HA)**: Public housing applications, rental assistance, tenant rights, eligibility checks
11. **Customs & Border Control Agency (CBCA)**: Import/export permits, border control, customs declarations, travel requirements
12. **Legislative Council (LC)**: Lawmaking body, bill tracking, voting records, contact representatives, public hearings

${departmentContext}

## Your Role
- Help citizens navigate government services quickly and efficiently
- Direct users to the right department and provide relevant contact information
- Explain processes, requirements, fees, and office hours
- Be professional, concise, and friendly
- If uncertain, suggest contacting the department directly or visiting their portal

## Guidelines
- Keep responses under 150 words
- Use department information provided above when relevant
- Reference PrayaPass for online services requiring authentication
- Emergency situations: Always direct to 911 for life-threatening emergencies
- Currency: Use Praya Dollar symbol (¤) when mentioning fees`;

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
            parts: [{ text: 'I understand. I am the GOV.PRAYA assistant for the Republic of Praya government portal. I will help citizens navigate the 12 major departments and 127 online services efficiently, providing information about processes, requirements, fees, and contact details. I will keep responses under 150 words, be professional and friendly, and direct citizens to the appropriate resources.' }],
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
