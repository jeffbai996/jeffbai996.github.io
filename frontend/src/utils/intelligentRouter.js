/**
 * Intelligent Response Router
 *
 * This module determines the optimal response strategy for each user query:
 * - When to use rule-based intent matching
 * - When to escalate to Gemini AI
 * - How to blend responses for best results
 */

import { detectSentiment, detectUrgency, extractTopics, detectQuestionType } from './intentRecognition'

/**
 * Query complexity levels for routing decisions
 */
export const ComplexityLevel = {
  SIMPLE: 'simple',      // Direct question with clear intent
  MODERATE: 'moderate',  // Needs some context or has multiple parts
  COMPLEX: 'complex',    // Requires AI reasoning or explanation
  CRITICAL: 'critical'   // Emergency or urgent matters
}

/**
 * Response strategy recommendations
 */
export const ResponseStrategy = {
  RULE_BASED: 'rule_based',           // Use intent patterns only
  RULE_WITH_AI_FALLBACK: 'rule_ai',   // Try rules first, AI if confidence low
  AI_PRIMARY: 'ai_primary',           // Use AI with rule context
  AI_ONLY: 'ai_only',                 // Complex query, AI only
  EMERGENCY: 'emergency'              // Emergency response
}

/**
 * Analyze query complexity based on multiple factors
 * @param {string} message - User message
 * @param {object} context - Conversation context
 * @returns {object} - Complexity analysis
 */
export function analyzeQueryComplexity(message, context = {}) {
  const lower = message.toLowerCase()
  const wordCount = message.split(/\s+/).length
  const sentiment = detectSentiment(message)
  const urgency = detectUrgency(message)
  const questionType = detectQuestionType(message)
  const topics = extractTopics(message)

  let complexityScore = 0
  const factors = []

  // Factor 1: Question structure complexity
  if (/\b(and|also|both|as well|plus|additionally)\b/i.test(message)) {
    complexityScore += 15
    factors.push('multi-part question')
  }

  // Factor 2: Comparison or explanation requests
  if (/\b(difference|compare|versus|vs\.?|explain|how does|why does)\b/i.test(message)) {
    complexityScore += 20
    factors.push('explanation needed')
  }

  // Factor 3: Hypothetical or conditional questions
  if (/\b(if|would|could|should|might|what happens when)\b/i.test(message)) {
    complexityScore += 10
    factors.push('conditional logic')
  }

  // Factor 4: Open-ended questions
  if (/\b(best|recommend|suggest|advice|opinion|think)\b/i.test(message)) {
    complexityScore += 15
    factors.push('recommendation needed')
  }

  // Factor 5: Long queries with multiple concepts
  if (wordCount > 20) {
    complexityScore += 10
    factors.push('detailed query')
  }

  // Factor 6: Multiple topics detected
  if (topics.length > 1) {
    complexityScore += 15
    factors.push('multiple topics')
  }

  // Factor 7: Frustration or confusion indicators
  if (sentiment === 'frustrated' || sentiment === 'negative') {
    complexityScore += 20
    factors.push('user needs extra help')
  }

  // Factor 8: Follow-up context dependency
  if (context.clarificationCount >= 2) {
    complexityScore += 25
    factors.push('repeated clarification')
  }

  // Factor 9: Explicit request for more detail
  if (/\b(more|detail|elaborate|step.?by.?step|comprehensive|thorough)\b/i.test(message)) {
    complexityScore += 15
    factors.push('detail requested')
  }

  // Factor 10: Process or procedure questions
  if (/\b(process|procedure|steps|how to|guide|walk me through)\b/i.test(message)) {
    complexityScore += 10
    factors.push('process explanation')
  }

  // Determine complexity level
  let level
  if (urgency === 'high' || /\b(911|emergency|dying|hurt)\b/i.test(message)) {
    level = ComplexityLevel.CRITICAL
  } else if (complexityScore >= 40) {
    level = ComplexityLevel.COMPLEX
  } else if (complexityScore >= 20) {
    level = ComplexityLevel.MODERATE
  } else {
    level = ComplexityLevel.SIMPLE
  }

  return {
    level,
    score: complexityScore,
    factors,
    sentiment,
    urgency,
    questionType,
    topics,
    wordCount
  }
}

/**
 * Determine the optimal response strategy based on intent match and complexity
 * @param {object} intentResult - Result from intent classifier
 * @param {object} complexityAnalysis - Result from complexity analysis
 * @param {object} config - Configuration options
 * @returns {object} - Recommended strategy with confidence
 */
export function determineResponseStrategy(intentResult, complexityAnalysis, config = {}) {
  const { geminiEnabled = true } = config
  const { level, sentiment, urgency, factors } = complexityAnalysis

  // Emergency handling always takes priority
  if (level === ComplexityLevel.CRITICAL) {
    return {
      strategy: ResponseStrategy.EMERGENCY,
      confidence: 1.0,
      reason: 'Emergency or urgent situation detected',
      useGemini: false
    }
  }

  // Calculate intent match confidence
  let intentConfidence = 0
  if (intentResult) {
    // High confidence if matched with strong pattern
    intentConfidence = 0.8

    // Reduce confidence for ambiguous matches
    if (complexityAnalysis.topics.length > 1) {
      intentConfidence -= 0.2
    }

    // Reduce confidence if question type doesn't match typical patterns
    if (complexityAnalysis.questionType.type === 'howTo' && !intentResult.details) {
      intentConfidence -= 0.15
    }
  }

  // Decision logic
  if (!geminiEnabled) {
    // AI not available, use rule-based only
    return {
      strategy: ResponseStrategy.RULE_BASED,
      confidence: intentConfidence,
      reason: 'AI assistance not available',
      useGemini: false
    }
  }

  if (level === ComplexityLevel.SIMPLE && intentConfidence >= 0.7) {
    // Simple query with good intent match - use rules
    return {
      strategy: ResponseStrategy.RULE_BASED,
      confidence: intentConfidence,
      reason: 'Clear intent match for simple query',
      useGemini: false
    }
  }

  if (level === ComplexityLevel.SIMPLE && intentConfidence < 0.7) {
    // Simple query but uncertain match - try rules with AI fallback
    return {
      strategy: ResponseStrategy.RULE_WITH_AI_FALLBACK,
      confidence: intentConfidence,
      reason: 'Low confidence match, AI fallback ready',
      useGemini: intentConfidence < 0.5
    }
  }

  if (level === ComplexityLevel.MODERATE) {
    if (intentConfidence >= 0.6) {
      // Moderate complexity with decent match - blend responses
      return {
        strategy: ResponseStrategy.RULE_WITH_AI_FALLBACK,
        confidence: intentConfidence,
        reason: 'Moderate query with partial match',
        useGemini: true,
        blendResponses: true
      }
    } else {
      // Moderate complexity with weak match - prefer AI
      return {
        strategy: ResponseStrategy.AI_PRIMARY,
        confidence: 0.7,
        reason: 'Moderate complexity needs AI assistance',
        useGemini: true
      }
    }
  }

  if (level === ComplexityLevel.COMPLEX) {
    // Complex queries should use AI with enhanced context
    return {
      strategy: ResponseStrategy.AI_ONLY,
      confidence: 0.85,
      reason: 'Complex query requires AI reasoning: ' + factors.slice(0, 2).join(', '),
      useGemini: true,
      enhancedContext: true
    }
  }

  // Default fallback
  return {
    strategy: ResponseStrategy.RULE_WITH_AI_FALLBACK,
    confidence: 0.5,
    reason: 'Default strategy',
    useGemini: true
  }
}

/**
 * Build enhanced context for AI requests
 * @param {string} message - Current user message
 * @param {object} conversationHistory - Previous messages
 * @param {object} extractedEntities - Entities from messages
 * @param {object} departmentContext - Current department info
 * @returns {object} - Enhanced context for AI
 */
export function buildEnhancedContext(message, conversationHistory = [], extractedEntities = {}, departmentContext = null) {
  const recentMessages = conversationHistory.slice(-10)
  const topics = new Set()
  const entities = { ...extractedEntities }

  // Extract topics from recent conversation
  recentMessages.forEach(msg => {
    if (msg.text) {
      const msgTopics = extractTopics(msg.text)
      msgTopics.forEach(t => topics.add(t))
    }
  })

  // Build conversation summary
  let conversationSummary = ''
  if (recentMessages.length > 0) {
    const userMessages = recentMessages.filter(m => m.sender === 'user' || m.type === 'user')
    if (userMessages.length > 0) {
      conversationSummary = `User has been asking about: ${Array.from(topics).join(', ')}.`
      if (Object.keys(entities).length > 0) {
        conversationSummary += ` Referenced entities: ${Object.entries(entities).map(([k, v]) => `${k}: ${v}`).join(', ')}.`
      }
    }
  }

  // Determine user expertise level
  let expertiseLevel = 'general'
  const technicalTerms = /\b(api|json|webhook|ssl|dns|http|tcp|database|schema|endpoint)\b/i
  if (recentMessages.some(m => technicalTerms.test(m.text || ''))) {
    expertiseLevel = 'technical'
  }

  // Detect user's apparent goal
  const currentTopics = extractTopics(message)
  let apparentGoal = 'seeking information'
  if (/\b(apply|submit|file|register)\b/i.test(message)) {
    apparentGoal = 'completing an application'
  } else if (/\b(track|status|check|follow up)\b/i.test(message)) {
    apparentGoal = 'tracking a status'
  } else if (/\b(cost|fee|price|how much)\b/i.test(message)) {
    apparentGoal = 'understanding costs'
  } else if (/\b(how|steps|process|procedure)\b/i.test(message)) {
    apparentGoal = 'understanding a process'
  }

  return {
    conversationSummary,
    topics: Array.from(topics),
    currentTopics,
    entities,
    expertiseLevel,
    apparentGoal,
    departmentContext,
    messageCount: recentMessages.length,
    isFirstMessage: recentMessages.length === 0
  }
}

/**
 * Calculate response quality score for A/B testing and improvement
 * @param {string} response - Bot response
 * @param {string} strategy - Strategy used
 * @param {object} userFeedback - Any user feedback signals
 * @returns {object} - Quality metrics
 */
export function calculateResponseQuality(response, strategy, userFeedback = {}) {
  let qualityScore = 50 // Base score
  const factors = []

  // Check response length (not too short, not too long)
  const wordCount = response.split(/\s+/).length
  if (wordCount < 10) {
    qualityScore -= 15
    factors.push('too brief')
  } else if (wordCount > 300) {
    qualityScore -= 10
    factors.push('too verbose')
  } else if (wordCount >= 30 && wordCount <= 150) {
    qualityScore += 10
    factors.push('good length')
  }

  // Check for actionable content
  if (/\b(you can|here's how|to do this|steps?:|follow these)\b/i.test(response)) {
    qualityScore += 15
    factors.push('actionable')
  }

  // Check for links/resources
  if (/\[.+\]\(.+\)/.test(response) || /\bhttps?:\/\//.test(response)) {
    qualityScore += 10
    factors.push('includes links')
  }

  // Check for structured content (lists, headers)
  if (/^[\d•\-\*]\s/m.test(response) || /^\*\*.+\*\*/m.test(response)) {
    qualityScore += 10
    factors.push('well structured')
  }

  // Negative signals
  if (/\b(i don't know|not sure|can't help)\b/i.test(response)) {
    qualityScore -= 20
    factors.push('uncertainty expressed')
  }

  // User feedback signals
  if (userFeedback.followedUp) {
    qualityScore -= 15
    factors.push('user needed clarification')
  }

  if (userFeedback.clickedLink) {
    qualityScore += 10
    factors.push('user engaged with links')
  }

  return {
    score: Math.max(0, Math.min(100, qualityScore)),
    factors,
    strategy
  }
}

/**
 * Smart response cache with similarity matching
 */
class ResponseCache {
  constructor(maxSize = 100) {
    this.cache = new Map()
    this.maxSize = maxSize
  }

  /**
   * Generate a cache key from message
   */
  generateKey(message) {
    // Normalize the message for caching
    return message
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
  }

  /**
   * Store a response
   */
  set(message, response, metadata = {}) {
    const key = this.generateKey(message)

    // Evict oldest if at capacity
    if (this.cache.size >= this.maxSize) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }

    this.cache.set(key, {
      response,
      metadata,
      timestamp: Date.now(),
      hits: 0
    })
  }

  /**
   * Retrieve a cached response
   */
  get(message) {
    const key = this.generateKey(message)
    const cached = this.cache.get(key)

    if (cached) {
      cached.hits++
      return cached
    }

    // Try fuzzy matching for similar queries
    const words = key.split(' ')
    if (words.length >= 3) {
      for (const [cacheKey, value] of this.cache.entries()) {
        const cacheWords = cacheKey.split(' ')
        const commonWords = words.filter(w => cacheWords.includes(w))
        const similarity = commonWords.length / Math.max(words.length, cacheWords.length)

        if (similarity >= 0.8) {
          value.hits++
          return { ...value, fuzzyMatch: true }
        }
      }
    }

    return null
  }

  /**
   * Clear the cache
   */
  clear() {
    this.cache.clear()
  }
}

// Export singleton cache instance
export const responseCache = new ResponseCache()

export default {
  analyzeQueryComplexity,
  determineResponseStrategy,
  buildEnhancedContext,
  calculateResponseQuality,
  responseCache,
  ComplexityLevel,
  ResponseStrategy
}
