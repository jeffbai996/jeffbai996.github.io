import { GoogleGenerativeAI } from '@google/generative-ai';
import { generateNationalStatusContext } from '../utils/nationalStatus';
import {
  generatePredictiveSuggestions,
  getTimeSensitiveAlerts,
  analyzeForPredictions
} from '../utils/predictiveSuggestions';
import {
  searchForms,
  generateFormSummary,
  generateFormHelp,
  getFormById
} from '../utils/formKnowledge';

/**
 * Direct Gemini API Service for Frontend
 * Calls Google's Gemini API directly without a backend server
 *
 * Enhanced with:
 * - Dynamic system prompts based on conversation context
 * - User expertise level adaptation
 * - Conversation summary injection
 * - Proactive suggestion generation
 * - Real-time national status (AQI, Security Level)
 * - Semantic search with embeddings
 * - Document/form knowledge base
 * - Predictive suggestions engine
 */
class GeminiService {
  constructor() {
    // API key is injected at build time via GitHub Actions
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    if (!apiKey || apiKey === 'your_api_key_here') {
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
    } catch (error) {
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
   * Uses the enhanced predictive suggestions engine
   * @param {string} response - The generated response
   * @param {object} enhancedContext - Conversation context
   * @returns {object[]} - Array of suggestion objects with text and query
   */
  generateProactiveSuggestions(response, enhancedContext = {}) {
    // Use the new predictive suggestions engine
    const predictionContext = {
      lastIntent: enhancedContext.lastIntent,
      lastMessage: enhancedContext.lastMessage || '',
      sentiment: enhancedContext.sentiment,
      entities: enhancedContext.entities || {},
      discussedTopics: enhancedContext.topics || enhancedContext.currentTopics || [],
      currentService: enhancedContext.currentService
    };

    const predictions = generatePredictiveSuggestions(predictionContext);

    // Also check for time-sensitive alerts
    const alerts = getTimeSensitiveAlerts();
    if (alerts.length > 0) {
      // Add high-priority alerts as suggestions
      alerts.forEach(alert => {
        if (alert.urgency === 'critical' || alert.urgency === 'high') {
          predictions.unshift({
            text: alert.message,
            query: alert.action,
            priority: 'high',
            type: 'alert'
          });
        }
      });
    }

    // Return top 3 suggestions
    return predictions.slice(0, 3);
  }

  /**
   * Detect if message is asking about forms/documents
   * @param {string} message - User message
   * @returns {object|null} - Form info if found, null otherwise
   */
  detectFormQuery(message) {
    const formPatterns = [
      /what (documents?|forms?|papers?) (do i |should i |to )?need/i,
      /how (do i|to) (fill|complete|submit)/i,
      /what('s| is) required for/i,
      /step[- ]?by[- ]?step/i,
      /common mistakes?/i,
      /requirements? for/i,
      /checklist for/i
    ];

    const isFormQuery = formPatterns.some(pattern => pattern.test(message));

    if (isFormQuery) {
      const matchedForms = searchForms(message);
      if (matchedForms.length > 0) {
        return {
          form: matchedForms[0],
          type: 'form-query'
        };
      }
    }

    return null;
  }

  /**
   * Generate form-specific response
   * @param {object} form - Form object from formKnowledge
   * @param {string} message - Original user message
   * @returns {string} - Formatted form response
   */
  generateFormResponse(form, message) {
    const messageLower = message.toLowerCase();

    if (messageLower.includes('step') || messageLower.includes('how to') || messageLower.includes('process')) {
      return generateFormHelp(form.id, 'steps');
    }

    if (messageLower.includes('mistake') || messageLower.includes('error') || messageLower.includes('wrong')) {
      return generateFormHelp(form.id, 'mistakes');
    }

    if (messageLower.includes('document') || messageLower.includes('need') || messageLower.includes('required')) {
      return generateFormHelp(form.id, 'requirements');
    }

    if (messageLower.includes('tip') || messageLower.includes('advice')) {
      return generateFormHelp(form.id, 'tips');
    }

    // Default: provide summary
    return generateFormSummary(form.id);
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
      // Check if this is a form-specific query
      const formQuery = this.detectFormQuery(userMessage);
      if (formQuery && formQuery.form) {
        const formResponse = this.generateFormResponse(formQuery.form, userMessage);
        const suggestions = this.generateProactiveSuggestions(formResponse, {
          ...enhancedContext,
          lastMessage: userMessage,
          currentService: formQuery.form.id
        });

        return {
          success: true,
          response: formResponse,
          suggestions,
          source: 'form-knowledge',
          formInfo: {
            formId: formQuery.form.id,
            formName: formQuery.form.name,
            url: formQuery.form.url
          }
        };
      }

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
   • Police Services: Clearance certificates (¤20, standard/enhanced/international), case status lookup, community programs, crime statistics
   • Public Safety: Crime prevention tips, emergency preparedness, safety workshops, scam awareness
   • Quick Links: [File Report](/npa/report) | [Police Services](/npa/services) | [Public Safety](/npa/safety)
   • Stats: 4.2min avg response, -12% crime rate, 87% cases solved, 3,421 officers
   • Hours: Walk-in stations 08:00-18:00 daily, Emergency dispatch 24/7
   • Contact: 911 (emergency) | 311 (non-emergency) | HQ: +854 200 0000

2. **[Bank of Praya (BOP)](/bop)**
   • Central bank, monetary policy, financial stability
   • Loans: Mortgage (3.25%-4.75% APR), Personal (5.99%-12.99% APR), Business (4.5%-9.5% APR), Auto (3.99%-8.99% APR)
   • Banking Services: Investment management, retirement planning (Traditional/Roth Praya IRA), insurance, wire transfers
   • Currency: Official Praya Dollar (¤), exchange rates updated daily
   • Quick Links: [Personal Banking](/bop/personal) | [Loans](/bop/loans) | [Services](/bop/services)
   • Hours: Branch hours Mon-Fri 9AM-5PM, Sat 9AM-1PM, Online banking 24/7

3. **[Cannabis Tax Bureau (CTB)](/ctb)**
   • Dispensary licensing (new applications and renewals)
   • Taxation: 15% excise tax, quarterly filing, tax calculator, payment options (EFT, card, check)
   • Compliance: Licensing requirements, routine inspections, violation penalties (Class A/B/C), best practices
   • Research: Market stats (¤420M market, 1,247 licenses), industry reports, policy analysis, trends
   • Quick Links: [Apply for License](/ctb/apply) | [Taxation](/ctb/taxation) | [Compliance](/ctb/compliance) | [Research](/ctb/research)
   • Stats: ¤420M market size, 1,247 active licenses, 15% excise tax rate
   • Hours: Mon-Fri 8AM-5PM, Online services 24/7

4. **[Department of Justice (DOJ)](/doj)**
   • Court system: Supreme Court, Appeals Court (3 divisions), 24 District Courts
   • Prosecution Services: Case status inquiry, victim services (24/7 hotline: 1-800-VICTIM-HELP), witness assistance, prosecution guidelines
   • Criminal Code: Searchable database (8 titles), legal definitions, sentencing guidelines (felonies/misdemeanors), 2024 amendments
   • Online Services: Case lookup, e-filing system (civil/criminal/appeals), court calendar, legal forms (234 forms across 8 categories)
   • Quick Links: [Court System](/doj/courts) | [Prosecution](/doj/prosecution) | [Criminal Code](/doj/code) | [Online Services](/doj/services)
   • Stats: 12,847 cases filed FY2024, 94.3% resolution rate, 24 courts, 45 days avg resolution
   • Hours: Court Mon-Fri 8AM-5PM, Online services 24/7
   • Contact: 1-800-PRAYA-COURT (general) | 1-800-PRAYA-DOJ (prosecution) | 1-800-WITNESS (witness assistance)

5. **[Interior Department (ID)](/interior)**
   • National IDs (¤25 new, ¤15 renewal, 5-7 day processing)
   • Passports (¤80 standard/¤150 expedited, 10-14 days)
   • Birth Certificates (¤10, 3-5 days)
   • Quick Links: [National ID](/interior/id) | [Passport](/interior/passport) | [Birth Certificates](/interior/birth) | [Civil Records](/interior/records)
   • Hours: Mon-Fri 8AM-5PM, PrayaPass required for online services

6. **[Transport Department (TD)](/transport)**
   • Driver licensing (¤45 new, ¤30 renewal, tests available)
   • Vehicle Registration: New registration (¤80-¤150), renewals (¤60 annual), ownership transfer (¤40), plate replacement (¤25)
   • Special Permits: Oversized vehicle permits, temporary permits, disabled parking placards, commercial transport licenses
   • Quick Links: [Driver License](/transport/license) | [Vehicle Registration](/transport/registration) | [Special Permits](/transport/permits)
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
    • Tenant Rights: Lease agreements, repairs & maintenance, eviction protections, security deposits, fair housing laws
    • Landlord Compliance: Property registration (¤75/year), rental standards, inspections, violation appeals, tenant screening
    • Rental assistance programs, affordable housing waitlist
    • Quick Links: [Apply for Housing](/housing/apply) | [Check Eligibility](/housing/eligibility) | [Tenant Rights](/housing/tenant) | [Landlord Info](/housing/landlord)
    • Hours: Mon-Fri 8AM-5PM, Online applications 24/7

11. **[Customs & Border Control Agency (CBCA)](/cbca)**
    • Travel Requirements: Visa types (tourist/business/student/work), passport requirements, entry/exit procedures, travel advisories
    • Import/Export: Import permits, export licenses, trade compliance, tariffs & duties, prohibited items
    • Customs declarations, duty-free allowances (¤800 per person)
    • Quick Links: [Border Crossings](/cbca/crossings) | [Travel Requirements](/cbca/travel) | [Import/Export](/cbca/import-export)
    • Hours: Border crossings 24/7, Office Mon-Fri 8AM-5PM

12. **[Legislative Council (LC)](/lc)**
    • Bills & Legislation: Track active bills, browse by topic (healthcare/economy/education), view committee assignments, bill history
    • Council Sessions: Session calendar, archived recordings, upcoming hearings, public comment periods
    • Voting records, contact your representative (24 districts), committee information
    • Quick Links: [Bills & Legislation](/lc/bills) | [Sessions](/lc/sessions) | [Find Representative](/lc/representatives)
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

${generateNationalStatusContext()}

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
