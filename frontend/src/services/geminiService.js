import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Direct Gemini API Service for Frontend
 * Calls Google's Gemini API directly without a backend server
 *
 * Enhanced with:
 * - Dynamic system prompts based on conversation context
 * - User expertise level adaptation
 * - Conversation summary injection
 * - Proactive suggestion generation
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
          maxOutputTokens: 1500,
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
   * Build dynamic context additions based on enhanced context
   * @param {object} enhancedContext - Context from conversation memory
   * @returns {string} - Additional context for system prompt
   */
  buildDynamicContext(enhancedContext = {}) {
    let dynamicContext = '';

    // Add conversation summary if available
    if (enhancedContext.conversationSummary) {
      dynamicContext += `\n\n## Current Conversation Context\n${enhancedContext.conversationSummary}`;
    }

    // Adapt response style based on user expertise
    if (enhancedContext.expertiseLevel === 'technical') {
      dynamicContext += `\n\n## Response Style Note\nThe user appears technically proficient. You may use more specific terminology and provide detailed technical information where relevant.`;
    } else if (enhancedContext.expertiseLevel === 'general') {
      dynamicContext += `\n\n## Response Style Note\nKeep explanations clear and avoid jargon. Use step-by-step instructions where helpful.`;
    }

    // Add apparent goal context
    if (enhancedContext.apparentGoal) {
      dynamicContext += `\n\n## User's Apparent Goal\nThe user appears to be: ${enhancedContext.apparentGoal}. Focus your response on helping them achieve this goal.`;
    }

    // Add entity references for continuity
    if (enhancedContext.entities && Object.keys(enhancedContext.entities).length > 0) {
      dynamicContext += `\n\n## Referenced Information\nThe user has mentioned these specific references: `;
      dynamicContext += Object.entries(enhancedContext.entities)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      dynamicContext += `. Reference these naturally in your response if relevant.`;
    }

    // Handle frustrated user
    if (enhancedContext.sentiment === 'frustrated') {
      dynamicContext += `\n\n## Important: User Assistance Note\nThe user seems frustrated. Please:\n- Acknowledge their situation empathetically\n- Provide an especially clear and helpful response\n- Offer multiple ways to get help (online, phone, in-person)\n- Be extra patient and thorough`;
    }

    // First message context
    if (enhancedContext.isFirstMessage) {
      dynamicContext += `\n\n## First Interaction\nThis is the user's first message. Be welcoming and offer to help them navigate available services.`;
    }

    // Add related topics for comprehensive response
    if (enhancedContext.topics && enhancedContext.topics.length > 0) {
      dynamicContext += `\n\n## Related Topics in Conversation\nTopics discussed: ${enhancedContext.topics.join(', ')}. Consider mentioning related services if relevant.`;
    }

    return dynamicContext;
  }

  /**
   * Generate proactive suggestions based on context
   * @param {string} response - The generated response
   * @param {object} enhancedContext - Conversation context
   * @returns {string[]} - Array of suggestion strings
   */
  generateProactiveSuggestions(response, enhancedContext = {}) {
    const suggestions = [];

    // Based on apparent goal, suggest next steps
    const goalSuggestions = {
      'completing an application': [
        'Would you like to know the required documents?',
        'Should I explain the processing timeline?'
      ],
      'tracking a status': [
        'Want me to explain what each status means?',
        'Would you like contact information for follow-up?'
      ],
      'understanding costs': [
        'Are you interested in payment plan options?',
        'Would you like to know about fee waivers?'
      ],
      'understanding a process': [
        'Should I provide a step-by-step checklist?',
        'Would you like to know common mistakes to avoid?'
      ]
    };

    if (enhancedContext.apparentGoal && goalSuggestions[enhancedContext.apparentGoal]) {
      suggestions.push(...goalSuggestions[enhancedContext.apparentGoal]);
    }

    // Based on current topics
    if (enhancedContext.currentTopics) {
      const topicSuggestions = {
        police: ['Do you need information about police station locations?'],
        taxes: ['Would you like to know about common deductions?'],
        transport: ['Do you need to schedule a driving test?'],
        health: ['Want to find healthcare providers in your area?'],
        housing: ['Are you interested in rental assistance programs?']
      };

      for (const topic of enhancedContext.currentTopics) {
        if (topicSuggestions[topic] && !suggestions.includes(topicSuggestions[topic][0])) {
          suggestions.push(...topicSuggestions[topic]);
        }
      }
    }

    return suggestions.slice(0, 2); // Return max 2 suggestions
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
      context += `\n**[${dept.name}](${dept.url || '/' + dept.id})**:\n`;
      context += `Description: ${dept.description}\n`;
      if (dept.url) {
        context += `Portal URL: ${dept.url}\n`;
      }
      if (dept.subPages && dept.subPages.length > 0) {
        context += `Quick Links: ${dept.subPages.map(p => `[${p.name}](${p.url})`).join(' | ')}\n`;
      }
      if (dept.services && dept.services.length > 0) {
        context += `Services: ${dept.services.slice(0, 5).join(', ')}\n`;
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
   * @param {string} userMessage - The user's message
   * @param {array} relevantDepartments - Array of relevant department data
   * @param {array} conversationHistory - Previous messages in conversation
   * @param {object} enhancedContext - Enhanced context from conversation memory
   */
  async generateResponse(userMessage, relevantDepartments = [], conversationHistory = [], enhancedContext = {}) {
    if (!this.initialized) {
      throw new Error('Gemini API not initialized');
    }

    try {
      // Build the system context
      const departmentContext = this.buildContext(relevantDepartments);

      // Build dynamic context based on conversation state
      const dynamicContext = this.buildDynamicContext(enhancedContext);

      const systemPrompt = `You are a helpful assistant for GOV.PRAYA - the official Government of Praya web portal.

## About GOV.PRAYA
The Republic of Praya is a nation of 2.4 million citizens with a modern, digital-first government. The portal offers 127 online services available 24/7 across 15 major departments, committed to transparency, efficiency, and accessibility through technology.

## Key Features
- **PrayaPass**: Secure digital identity and authentication system (single sign-on across all services)
- **Online Services**: 127 services available 24/7
- **15 Major Departments**: NPA, Bank of Praya, CTB, DOJ, Interior, Transport, Revenue, Praya Post, Health, Housing Authority, CBCA, Legislative Council, Buildings Department, Companies Registry, Social Welfare
- **Digital-First**: Modern, responsive interface with unified citizen dashboard

## The 15 Departments (Detailed Information with URLs)

**IMPORTANT: When mentioning departments, always include a hyperlink to the relevant page using markdown format: [Department Name](/url)**

1. **[National Police Agency (NPA)](/npa)**
   • Emergency response - Dial 911 (life-threatening, crimes in progress, missing children), Non-emergency: 311
   • Online crime reporting (thefts under ¤2,500, vandalism, lost property, identity fraud)
   • Police Clearance Certificates (¤20, 3 business days, covers criminal history, warrants)
   • Quick Links: [File Report](/npa/report) | [Services](/npa/services) | [Public Safety](/npa/safety)
   • Stats: 4.2min avg response, -12% crime rate, 87% cases solved, 3,421 officers
   • Hours: Walk-in stations 08:00-18:00 daily, Emergency dispatch 24/7
   • Contact: 911 (emergency) | 311 (non-emergency) | HQ: +854 200 0000

2. **[Bank of Praya (BOP)](/bop)**
   • Central bank, monetary policy, financial stability
   • Personal banking (savings, checking, online banking 24/7)
   • Business loans and mortgages (appointment required)
   • Currency: Official Praya Dollar (¤)
   • Quick Links: [Personal Banking](/bop/personal) | [Business Banking](/bop/business) | [Currency Exchange](/bop/exchange)
   • Hours: Branch hours vary, Online banking 24/7

3. **[Cannabis Tax Bureau (CTB)](/ctb)**
   • Dispensary licensing (new applications and renewals)
   • Cultivation permits (commercial and personal grow licenses)
   • Monthly tax returns (online filing for license holders)
   • Quick Links: [Apply for License](/ctb/apply) | [Tax Filing](/ctb/taxes) | [Compliance](/ctb/compliance)
   • Hours: Mon-Fri 8AM-5PM, Online services 24/7

4. **[Department of Justice (DOJ)](/doj)**
   • Court system (criminal and civil proceedings)
   • Case Lookup Tool (track case status online)
   • Legal Aid Services (Public Defender's Office)
   • Quick Links: [Case Lookup](/doj/lookup) | [Legal Aid](/doj/legal-aid) | [Court Filings](/doj/filings)
   • Hours: Court Mon-Fri 8AM-5PM, Case lookup online 24/7

5. **[Interior Department (ID)](/interior)**
   • National IDs (¤25 new, ¤15 renewal, 5-7 day processing)
   • Passports (¤80 standard/¤150 expedited, 10-14 days)
   • Birth Certificates (¤10, 3-5 days)
   • Quick Links: [National ID](/interior/id) | [Passport](/interior/passport) | [Birth Certificates](/interior/birth) | [Civil Records](/interior/records)
   • Hours: Mon-Fri 8AM-5PM, PrayaPass required for online services

6. **[Transport Department (TD)](/transport)**
   • Driver licensing (¤45 new, ¤30 renewal, tests available)
   • Vehicle registration (cars, motorcycles, commercial)
   • Quick Links: [Driver License](/transport/license) | [Vehicle Registration](/transport/registration) | [Schedule Test](/transport/test)
   • Hours: Mon-Fri 8AM-5PM, Sat 9AM-1PM select locations

7. **[Revenue Department (RD)](/revenue)**
   • Individual tax filing (free e-file for income under ¤75,000)
   • Business tax accounts and filing
   • Tax deadline: April 15 annually
   • Quick Links: [File Taxes](/revenue/file) | [Make Payment](/revenue/payment) | [Refund Status](/revenue/refunds)
   • Stats: 2.8M returns filed, 87% e-file rate, ¤2,840 avg refund, 21 days processing
   • Hours: Mon-Fri 8AM-5PM, Online filing 24/7
   • Contact: 1-800-TAX-HELP

8. **[Praya Post (PP)](/post)**
   • Package delivery (domestic and international)
   • Express shipping, P.O. Box rentals
   • Package tracking (format: PP followed by numbers)
   • Quick Links: [Track Package](/post/track) | [Ship Package](/post/ship) | [Find Location](/post/locations)
   • Hours: Mon-Fri 8AM-6PM, Sat 9AM-1PM, Closed Sundays

9. **[Health Department (HD)](/health)**
   • National Health Insurance enrollment
   • Standard Plan: ¤50-¤350/month, Premium: ¤180-¤520/month (income-based)
   • Open Enrollment: November 1 - December 31
   • Quick Links: [Health Insurance](/health/insurance) | [Vaccinations](/health/vaccinations) | [Find Provider](/health/providers) | [Health Alerts](/health/alerts)
   • Stats: 94.2% insured, 1,247 facilities, 81.3 yr life expectancy, 89% vaccination rate
   • Contact: 1-800-HEALTH-PY | Crisis: 988 | Poison Control: 1-800-POISON | Emergency: 911

10. **[Housing Authority (HA)](/housing)**
    • Public housing applications (income-based eligibility)
    • Rental assistance programs, tenant rights
    • Quick Links: [Apply for Housing](/housing/apply) | [Check Eligibility](/housing/eligibility) | [Tenant Rights](/housing/rights) | [Waitlist Status](/housing/waitlist)
    • Hours: Mon-Fri 8AM-5PM, Online applications 24/7

11. **[Customs & Border Control Agency (CBCA)](/cbca)**
    • Import/export permits, customs declarations
    • Travel entry requirements, duty-free allowances
    • Quick Links: [Import/Export](/cbca/permits) | [Travel Requirements](/cbca/travel) | [Prohibited Items](/cbca/prohibited)
    • Hours: Border crossings 24/7, Office Mon-Fri 8AM-5PM

12. **[Legislative Council (LC)](/lc)**
    • Bill tracking, voting records
    • Contact your representative
    • Quick Links: [Bills & Legislation](/lc/bills) | [Find Representative](/lc/representatives) | [Voting Records](/lc/voting) | [Public Hearings](/lc/hearings)
    • Hours: Public viewing Mon-Fri 8AM-5PM, Session schedules vary

13. **[Buildings Department (BD)](/bd)**
    • Building permits (new construction, renovations)
    • Inspections, contractor licensing
    • Quick Links: [Apply for Permit](/bd/permits) | [Schedule Inspection](/bd/inspections) | [Contractor License](/bd/contractors) | [Building Codes](/bd/codes)
    • Hours: Mon-Fri 8AM-5PM, Online permit applications 24/7

14. **[Companies Registry (CR)](/cr)**
    • Company registration, annual filings
    • Company search, name reservation
    • Quick Links: [Register Company](/cr/register) | [Company Search](/cr/search) | [Annual Filings](/cr/filings) | [Name Reservation](/cr/name)
    • Hours: Mon-Fri 8AM-5PM, Online registration 24/7

15. **[Social Welfare Department (SWD)](/swd)**
    • Social benefits, family services
    • Elderly care, disability support
    • Quick Links: [Apply for Benefits](/swd/benefits) | [Family Services](/swd/family) | [Elderly Care](/swd/elderly) | [Disability Support](/swd/disability)
    • Hours: Mon-Fri 8AM-5PM, Emergency services 24/7

${departmentContext}
${dynamicContext}

## Your Role
- Help citizens navigate government services quickly and efficiently
- Direct users to the right department and provide relevant contact information
- Explain processes, requirements, fees, and office hours
- Be professional, concise, and friendly
- **If you don't have specific information or details about a service, direct users to visit the department's page** (e.g., "For more details, please visit the NPA page at /npa")
- If uncertain about complex procedures, suggest contacting the department directly or visiting their portal
- **Proactively offer related helpful information** when relevant (e.g., if user asks about passport renewal, mention required documents)
- **Anticipate follow-up questions** and address them proactively when appropriate

## Guidelines
- Keep responses under 200 words (increased from 150 for more detailed answers)
- **ALWAYS include hyperlinks** to relevant department pages using markdown format: [Department Name](/url) or [Service Name](/department/service)
- When directing users to a department, provide the direct link (e.g., "Visit the [National Police Agency](/npa) to file a report")
- Use the Quick Links provided above to direct users to specific services (e.g., [File Report](/npa/report), [File Taxes](/revenue/file))
- Reference PrayaPass for online services requiring authentication
- Emergency situations: Always direct to 911 for life-threatening emergencies
- Currency: Use Praya Dollar symbol (¤) when mentioning fees
- Include processing times and fees when relevant to the query
- **End complex answers with a brief follow-up question** to ensure the user's needs are fully met (e.g., "Would you like more details about the required documents?")`;

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
            parts: [{ text: 'I understand. I am the GOV.PRAYA assistant for the Republic of Praya government portal. I will help citizens navigate the 15 major departments and 127 online services efficiently, providing information about processes, requirements, fees, and contact details. I will keep responses concise but thorough, be professional and friendly, proactively offer helpful related information, and direct citizens to appropriate resources with direct links.' }],
          },
          ...history,
        ],
      });

      // Send the user's message
      const result = await chat.sendMessage(userMessage);
      const response = result.response;
      const text = response.text();

      // Generate proactive suggestions if context available
      const suggestions = this.generateProactiveSuggestions(text, enhancedContext);

      return {
        success: true,
        response: text,
        suggestions,
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
