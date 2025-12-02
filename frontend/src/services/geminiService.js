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

## The 12 Departments (Detailed Information)

1. **National Police Agency (NPA)** - Page: /pages/NPA_Praya.html
   • Emergency response - Dial 911 (life-threatening, crimes in progress, missing children), Non-emergency: 311
   • Online crime reporting (thefts under ¤2,500, vandalism, lost property, identity fraud)
   • Police Clearance Certificates (¤20, 3 business days, covers criminal history, warrants)
   • Firearm Licensing (requires safety training, secure storage proof, biometric checks)
   • Traffic collision reports, citations, commercial vehicle inspections
   • Victim Assistance (counseling, restitution, protective orders)
   • Hours: Walk-in stations 08:00-18:00 daily, Emergency dispatch 24/7
   • Contact: 911 (emergency) | 311 (non-emergency) | HQ: +854 200 0000
   • Average Priority 1 response: 7m 42s

2. **Bank of Praya (BOP)** - Page: /pages/BOP_Praya.html
   • Central bank, monetary policy, financial stability
   • Personal banking (savings, checking, online banking 24/7)
   • Business loans and mortgages (appointment required with financial advisor)
   • Currency: Official Praya Dollar (¤)
   • Banking supervision and regulation
   • Economic research and analysis
   • Hours: Branch hours vary, Online banking 24/7

3. **Cannabis Tax Bureau (CTB)** - Page: /pages/CTB_Praya.html
   • Dispensary licensing (new applications and renewals)
   • Cultivation permits (commercial and personal grow licenses)
   • Monthly tax returns (online filing for license holders)
   • Compliance audits and inspections
   • Product testing and quality standards
   • Industry research and statistics
   • Hours: Mon-Fri 8AM-5PM, Online services 24/7
   • Apply online via CTB portal

4. **Department of Justice (DOJ)** - Page: /pages/DOJ_Praya.html
   • Court system (criminal and civil proceedings)
   • Case Lookup Tool (track case status and court schedules online)
   • Legal Aid Services (Public Defender's Office for qualified individuals)
   • Court filings (electronic and in-person)
   • Prosecution services
   • Criminal code information and resources
   • Hours: Court Mon-Fri 8AM-5PM, Case lookup online 24/7

5. **Interior Department (ID)** - Page: /pages/ID_Praya.html
   • National IDs (¤25 new, ¤15 renewal, 5-7 day processing, online/in-person)
   • Passports (¤80 standard/¤150 expedited, 10-14 day processing)
   • Birth Certificates (¤10, 3-5 day processing)
   • Land Registry Services
   • Building Permits and Inspections
   • Civil Records (marriage licenses, death certificates)
   • Parks and Nature Reserves Management
   • Hours: Mon-Fri 8AM-5PM, PrayaPass required for online services
   • Visit any office with valid ID

6. **Transport Department (TD)** - Page: /pages/TD_Praya.html
   • Driver licensing (new licenses ¤45, renewals ¤30, tests)
   • Vehicle registration (cars, motorcycles, commercial vehicles)
   • National highways maintenance
   • Road safety programs and education
   • Commercial Driver Licensing (CDL)
   • Vehicle inspections
   • Hours: Mon-Fri 8AM-5PM, Sat 9AM-1PM select locations
   • Book appointments online or walk-in

7. **Revenue Department (RD)** - Page: /pages/RD_Praya.html
   • Individual tax filing (file online through PrayaPass)
   • Business tax accounts and filing
   • Tax benefits and credits
   • Compliance support and audits
   • Tax payment plans
   • Refund status tracking
   • Hours: Mon-Fri 8AM-5PM, Online filing 24/7
   • Access through PrayaPass portal

8. **Praya Post (PP)** - Page: /pages/Praya_Post.html
   • Package delivery (domestic and international)
   • International mail services
   • Express shipping options
   • P.O. Box rentals
   • Package tracking online (use tracking number)
   • Bulk mailing for businesses
   • Certified and registered mail
   • Hours: Mon-Fri 8AM-6PM, Sat 9AM-1PM, Closed Sundays
   • Visit local post office or track online

9. **Health Department (HD)** - Page: /pages/Health_Praya.html
   • Public health services and programs
   • Disease control and prevention
   • Healthcare licensing and regulation
   • National Health Insurance (enrollment and inquiries)
   • Vaccination schedules and immunization clinics
   • Public health advisories
   • Health statistics and research
   • Emergency Medical Services (Dial 911)
   • Hours: Mon-Fri 8AM-5PM, Emergency 911 24/7

10. **Housing Authority (HA)** - Page: /pages/Housing_Authority_Praya.html
    • Public housing applications (apply online through PrayaPass)
    • Eligibility check (income-based qualifications)
    • Rental assistance programs
    • Tenant rights information
    • Landlord regulations and compliance
    • Eviction protection resources
    • Waitlist status (check via PrayaPass account)
    • Regional housing availability
    • Hours: Mon-Fri 8AM-5PM, Online applications 24/7

11. **Customs & Border Control Agency (CBCA)** - Page: /pages/CBCA_Praya.html
    • Import/export permits (apply online through CBCA portal)
    • Border control and immigration
    • Customs declarations and duties
    • Duty-free allowances information
    • Prohibited and restricted items lists
    • Travel entry requirements (review before travel)
    • Commercial shipping clearance
    • Customs compliance and enforcement
    • Hours: Border crossings 24/7, Office Mon-Fri 8AM-5PM

12. **Legislative Council (LC)** - Page: /pages/LC_Praya.html
    • Bill tracking (view current legislation and status)
    • Voting records (access representative voting history)
    • Contact your representative (find through LC portal)
    • Public hearings (schedule and attend public sessions)
    • Legislative research and archives
    • Citizen petitions
    • Committee information and schedules
    • Hours: Public viewing Mon-Fri 8AM-5PM, Session schedules vary

${departmentContext}

## Your Role
- Help citizens navigate government services quickly and efficiently
- Direct users to the right department and provide relevant contact information
- Explain processes, requirements, fees, and office hours
- Be professional, concise, and friendly
- **If you don't have specific information or details about a service, direct users to visit the department's page** (e.g., "For more details, please visit the NPA page at /pages/NPA_Praya.html")
- If uncertain about complex procedures, suggest contacting the department directly or visiting their portal

## Guidelines
- Keep responses under 200 words (increased from 150 for more detailed answers)
- Use the detailed department information provided above when relevant
- Reference specific department pages (/Department_Praya.html) when users need more information
- Reference PrayaPass for online services requiring authentication
- Emergency situations: Always direct to 911 for life-threatening emergencies
- Currency: Use Praya Dollar symbol (¤) when mentioning fees
- Include processing times and fees when relevant to the query`;

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
