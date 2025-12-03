/**
 * Smart Chat Service
 *
 * Integrates all intelligent chatbot features:
 * - Semantic search using embeddings
 * - Document/form knowledge base
 * - Predictive suggestions
 * - Enhanced context understanding
 *
 * This is the main entry point for intelligent chatbot responses.
 */

import semanticSearchService from './semanticSearchService';
import geminiService from './geminiService';
import {
  formDatabase,
  getFormById,
  searchForms,
  generateFormHelp,
  generateFormSummary,
  getAllFormEntries
} from '../utils/formKnowledge';
import {
  generatePredictiveSuggestions,
  detectUserJourney,
  getJourneyProgressMessage,
  getTimeSensitiveAlerts,
  analyzeForPredictions
} from '../utils/predictiveSuggestions';
import { generateKnowledgeBase, departmentData } from '../utils/departmentCrawler';
import { classifyIntent, extractEntities, extractTopics, detectSentiment } from '../utils/intentRecognition';

class SmartChatService {
  constructor() {
    this.initialized = false;
    this.knowledgeBase = [];
    this.formEntries = [];
    this.conversationContext = {
      messages: [],
      detectedJourney: null,
      currentService: null,
      completedServices: [],
      entities: {},
      topics: [],
      sentiment: 'neutral'
    };

    this.initialize();
  }

  async initialize() {
    try {
      // Build combined knowledge base
      this.knowledgeBase = generateKnowledgeBase();
      this.formEntries = getAllFormEntries();

      // Index knowledge base for semantic search (if available)
      if (semanticSearchService.isAvailable()) {
        const allEntries = [
          ...this.knowledgeBase.map((entry, i) => ({
            id: `kb-${i}`,
            keywords: entry.keywords,
            title: entry.keywords?.slice(0, 3).join(' ') || '',
            summary: entry.response?.substring(0, 200) || '',
            response: entry.response
          })),
          ...this.formEntries
        ];

        // Index asynchronously to not block initialization
        semanticSearchService.indexKnowledgeBase(allEntries).catch(err => {
          console.warn('Failed to index knowledge base:', err);
        });
      }

      this.initialized = true;
      console.log('Smart Chat Service initialized with', this.knowledgeBase.length, 'KB entries and', this.formEntries.length, 'form entries');
    } catch (error) {
      console.error('Failed to initialize Smart Chat Service:', error);
    }
  }

  /**
   * Update conversation context with new message
   */
  updateContext(message, role = 'user') {
    this.conversationContext.messages.push({ text: message, role, timestamp: Date.now() });

    // Keep last 20 messages
    if (this.conversationContext.messages.length > 20) {
      this.conversationContext.messages = this.conversationContext.messages.slice(-20);
    }

    if (role === 'user') {
      // Extract entities and topics
      const newEntities = extractEntities(message);
      this.conversationContext.entities = { ...this.conversationContext.entities, ...newEntities };

      const newTopics = extractTopics(message);
      this.conversationContext.topics = [...new Set([...this.conversationContext.topics, ...newTopics])].slice(-10);

      // Update sentiment
      this.conversationContext.sentiment = detectSentiment(message);

      // Detect user journey
      const journey = detectUserJourney(this.conversationContext.messages);
      if (journey) {
        this.conversationContext.detectedJourney = journey;
      }
    }
  }

  /**
   * Detect if message is asking about forms/documents
   */
  detectFormQuery(message) {
    const formPatterns = [
      /what (documents?|forms?|papers?) (do i |should i |to )?need/i,
      /how (do i|to) (fill|complete|submit) /i,
      /what('s| is) required for/i,
      /step[- ]?by[- ]?step/i,
      /common mistakes?/i,
      /requirements? for/i,
      /checklist for/i,
      /form for/i,
      /apply for/i,
      /how (long|much)/i
    ];

    return formPatterns.some(pattern => pattern.test(message));
  }

  /**
   * Find relevant form based on message
   */
  findRelevantForm(message) {
    const messageLower = message.toLowerCase();

    // Direct form ID match
    for (const formId of Object.keys(formDatabase)) {
      if (messageLower.includes(formId.replace(/-/g, ' '))) {
        return getFormById(formId);
      }
    }

    // Keyword search
    const matchedForms = searchForms(message);
    if (matchedForms.length > 0) {
      return matchedForms[0];
    }

    // Topic-based matching
    const topics = extractTopics(message);
    const topicToForm = {
      identity: 'national-id-application',
      transport: 'driver-license-application',
      taxes: 'individual-tax-return',
      police: 'police-report-form',
      health: 'health-insurance-enrollment',
      housing: 'housing-application'
    };

    for (const topic of topics) {
      if (topicToForm[topic]) {
        return getFormById(topicToForm[topic]);
      }
    }

    return null;
  }

  /**
   * Generate form-aware response
   */
  generateFormResponse(form, message) {
    const messageLower = message.toLowerCase();

    // Determine what aspect of the form they're asking about
    if (messageLower.includes('step') || messageLower.includes('how to') || messageLower.includes('process')) {
      return generateFormHelp(form.id, 'steps');
    }

    if (messageLower.includes('mistake') || messageLower.includes('error') || messageLower.includes('wrong')) {
      return generateFormHelp(form.id, 'mistakes');
    }

    if (messageLower.includes('document') || messageLower.includes('need') || messageLower.includes('required')) {
      return generateFormHelp(form.id, 'requirements');
    }

    if (messageLower.includes('tip') || messageLower.includes('advice') || messageLower.includes('recommend')) {
      return generateFormHelp(form.id, 'tips');
    }

    // Default: full summary
    return generateFormHelp(form.id, 'all');
  }

  /**
   * Main processing function - generates intelligent response
   */
  async processMessage(message, options = {}) {
    const {
      departmentId = null,
      conversationHistory = [],
      useAI = true
    } = options;

    // Update context
    this.updateContext(message, 'user');

    const result = {
      response: null,
      suggestions: [],
      source: null,
      confidence: 0,
      formInfo: null,
      journeyInfo: null,
      alerts: []
    };

    try {
      // 1. Check for time-sensitive alerts
      const alerts = getTimeSensitiveAlerts();
      if (alerts.length > 0) {
        result.alerts = alerts;
      }

      // 2. Check for form-related queries
      if (this.detectFormQuery(message)) {
        const form = this.findRelevantForm(message);
        if (form) {
          result.response = this.generateFormResponse(form, message);
          result.source = 'form-knowledge';
          result.confidence = 0.9;
          result.formInfo = {
            formId: form.id,
            formName: form.name,
            url: form.url
          };
        }
      }

      // 3. Try semantic search if no form match
      if (!result.response && semanticSearchService.isAvailable()) {
        const searchResults = await semanticSearchService.hybridSearch(
          message,
          [...this.knowledgeBase.map((e, i) => ({ id: `kb-${i}`, ...e })), ...this.formEntries],
          { threshold: 0.5, topK: 3 }
        );

        if (searchResults.results.length > 0 && searchResults.results[0].score > 0.6) {
          const topResult = searchResults.results[0];
          result.response = topResult.response;
          result.source = `semantic-${searchResults.method}`;
          result.confidence = topResult.score;
        }
      }

      // 4. Try traditional intent classification
      if (!result.response) {
        const intent = classifyIntent(message);
        if (intent) {
          result.source = 'intent-match';
          result.confidence = 0.85;
          // Let Gemini handle the response with intent context
        }
      }

      // 5. Fall back to Gemini AI if available
      if (!result.response && useAI && geminiService.isAvailable()) {
        // Build enhanced context
        const enhancedContext = {
          conversationSummary: this.getConversationSummary(),
          entities: this.conversationContext.entities,
          topics: this.conversationContext.topics,
          sentiment: this.conversationContext.sentiment,
          currentTopics: this.conversationContext.topics.slice(-3),
          apparentGoal: this.detectGoal(message)
        };

        // Get relevant departments
        const relevantDepts = this.getRelevantDepartments(message, departmentId);

        const aiResponse = await geminiService.generateResponse(
          message,
          relevantDepts,
          conversationHistory,
          enhancedContext
        );

        if (aiResponse.success) {
          result.response = aiResponse.response;
          result.source = 'gemini-ai';
          result.confidence = 0.75;
        }
      }

      // 6. Generate predictive suggestions
      const predictionContext = {
        lastIntent: classifyIntent(message)?.intent,
        lastMessage: message,
        sentiment: this.conversationContext.sentiment,
        entities: this.conversationContext.entities,
        discussedTopics: this.conversationContext.topics,
        currentService: this.conversationContext.currentService
      };

      result.suggestions = generatePredictiveSuggestions(predictionContext);

      // 7. Include journey progress if detected
      if (this.conversationContext.detectedJourney) {
        result.journeyInfo = {
          ...this.conversationContext.detectedJourney,
          progressMessage: getJourneyProgressMessage(this.conversationContext.detectedJourney)
        };
      }

      // Update context with response
      if (result.response) {
        this.updateContext(result.response, 'assistant');
      }

      return result;

    } catch (error) {
      console.error('Smart Chat processing error:', error);
      return {
        response: "I apologize, but I'm having trouble processing your request. Please try again or visit the relevant department's portal for assistance.",
        suggestions: [
          { text: 'Browse all services', query: 'list all services' },
          { text: 'Contact support', query: 'contact customer service' }
        ],
        source: 'error-fallback',
        confidence: 0
      };
    }
  }

  /**
   * Get relevant departments for a query
   */
  getRelevantDepartments(message, currentDepartmentId = null) {
    const topics = extractTopics(message);
    const messageLower = message.toLowerCase();

    const relevantDepts = [];

    // Priority to current department
    if (currentDepartmentId) {
      const currentDept = departmentData.find(d => d.id === currentDepartmentId);
      if (currentDept) {
        relevantDepts.push(currentDept);
      }
    }

    // Match by keywords
    for (const dept of departmentData) {
      if (relevantDepts.some(d => d.id === dept.id)) continue;

      const matchScore = dept.keywords.filter(kw => messageLower.includes(kw.toLowerCase())).length;
      if (matchScore > 0) {
        relevantDepts.push({ ...dept, matchScore });
      }
    }

    // Sort by match score and return top 3
    return relevantDepts
      .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
      .slice(0, 3);
  }

  /**
   * Detect user's apparent goal
   */
  detectGoal(message) {
    const goals = {
      'completing an application': /apply|submit|application|register|enroll/i,
      'tracking a status': /status|track|where|check on|follow up/i,
      'understanding costs': /cost|fee|price|how much|pay/i,
      'understanding a process': /how (do|to|can)|process|steps|guide|what do i need/i,
      'getting help': /help|assist|support|confused|stuck/i,
      'filing a complaint': /complain|problem|issue|wrong|error/i
    };

    for (const [goal, pattern] of Object.entries(goals)) {
      if (pattern.test(message)) {
        return goal;
      }
    }

    return null;
  }

  /**
   * Generate conversation summary
   */
  getConversationSummary() {
    const userMessages = this.conversationContext.messages
      .filter(m => m.role === 'user')
      .slice(-5);

    if (userMessages.length === 0) return null;

    const topics = [...new Set(userMessages.flatMap(m => extractTopics(m.text)))];
    const entities = this.conversationContext.entities;

    let summary = '';

    if (topics.length > 0) {
      summary += `Topics discussed: ${topics.join(', ')}. `;
    }

    if (Object.keys(entities).length > 0) {
      summary += `Referenced: ${Object.entries(entities).map(([k, v]) => `${k}: ${v}`).join(', ')}. `;
    }

    if (this.conversationContext.detectedJourney) {
      summary += `User appears to be on a ${this.conversationContext.detectedJourney.journeyName} journey. `;
    }

    return summary || null;
  }

  /**
   * Get service status
   */
  getStatus() {
    return {
      initialized: this.initialized,
      semanticSearchAvailable: semanticSearchService.isAvailable(),
      geminiAvailable: geminiService.isAvailable(),
      knowledgeBaseSize: this.knowledgeBase.length,
      formEntriesSize: this.formEntries.length,
      semanticIndexSize: semanticSearchService.getStatus().indexedEntries
    };
  }

  /**
   * Reset conversation context
   */
  resetContext() {
    this.conversationContext = {
      messages: [],
      detectedJourney: null,
      currentService: null,
      completedServices: [],
      entities: {},
      topics: [],
      sentiment: 'neutral'
    };
  }
}

// Create singleton instance
const smartChatService = new SmartChatService();

export default smartChatService;
