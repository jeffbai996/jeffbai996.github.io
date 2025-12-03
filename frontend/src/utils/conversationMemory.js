/**
 * Enhanced Conversation Memory
 *
 * Provides intelligent conversation tracking with:
 * - Long-term topic memory
 * - Entity persistence across messages
 * - User goal tracking
 * - Conversation summarization
 */

import { extractEntities, extractTopics, detectSentiment, detectUrgency } from './intentRecognition'

/**
 * Conversation memory manager
 */
class ConversationMemory {
  constructor() {
    this.reset()
  }

  /**
   * Reset conversation to initial state
   */
  reset() {
    this.messages = []
    this.entities = {}
    this.topics = new Map() // topic -> { count, lastMentioned, resolved }
    this.userGoals = []
    this.pendingQuestions = []
    this.clarificationCount = 0
    this.sentiment = {
      history: [],
      current: 'neutral'
    }
    this.sessionStart = Date.now()
    this.lastInteraction = Date.now()
    this.departmentHistory = []
    this.followUpContext = null
    this.unresolvedIntents = []
  }

  /**
   * Add a message to memory and extract insights
   * @param {object} message - Message object { sender, text, timestamp }
   */
  addMessage(message) {
    const processed = {
      ...message,
      id: Date.now(),
      timestamp: message.timestamp || new Date(),
      processed: {
        entities: {},
        topics: [],
        sentiment: 'neutral',
        urgency: 'low'
      }
    }

    // Process user messages for insights
    if (message.sender === 'user' || message.type === 'user') {
      const text = message.text || ''

      // Extract entities
      const newEntities = extractEntities(text)
      processed.processed.entities = newEntities
      this.mergeEntities(newEntities)

      // Extract topics
      const newTopics = extractTopics(text)
      processed.processed.topics = newTopics
      this.updateTopics(newTopics)

      // Detect sentiment
      const sentiment = detectSentiment(text)
      processed.processed.sentiment = sentiment
      this.updateSentiment(sentiment)

      // Detect urgency
      const urgency = detectUrgency(text)
      processed.processed.urgency = urgency

      // Detect potential goals
      this.detectGoals(text)
    }

    this.messages.push(processed)
    this.lastInteraction = Date.now()

    // Trim old messages if too many (keep last 50)
    if (this.messages.length > 50) {
      this.messages = this.messages.slice(-50)
    }

    return processed
  }

  /**
   * Merge new entities into memory
   */
  mergeEntities(newEntities) {
    for (const [key, value] of Object.entries(newEntities)) {
      this.entities[key] = value
    }
  }

  /**
   * Update topic tracking
   */
  updateTopics(newTopics) {
    const now = Date.now()
    for (const topic of newTopics) {
      if (this.topics.has(topic)) {
        const existing = this.topics.get(topic)
        existing.count++
        existing.lastMentioned = now
      } else {
        this.topics.set(topic, {
          count: 1,
          firstMentioned: now,
          lastMentioned: now,
          resolved: false
        })
      }
    }
  }

  /**
   * Update sentiment tracking
   */
  updateSentiment(sentiment) {
    this.sentiment.history.push({
      sentiment,
      timestamp: Date.now()
    })

    // Keep last 10 sentiment readings
    if (this.sentiment.history.length > 10) {
      this.sentiment.history.shift()
    }

    // Calculate current sentiment trend
    const recent = this.sentiment.history.slice(-3)
    const frustrationCount = recent.filter(s => s.sentiment === 'frustrated').length
    const negativeCount = recent.filter(s => s.sentiment === 'negative' || s.sentiment === 'frustrated').length

    if (frustrationCount >= 2) {
      this.sentiment.current = 'frustrated'
    } else if (negativeCount >= 2) {
      this.sentiment.current = 'negative'
    } else {
      this.sentiment.current = sentiment
    }
  }

  /**
   * Detect user goals from message
   */
  detectGoals(text) {
    const lower = text.toLowerCase()

    const goalPatterns = [
      { pattern: /\b(want|need|trying) to (get|obtain|apply|renew)\b/i, goal: 'document_acquisition' },
      { pattern: /\b(file|submit|pay)\s+(tax|taxes|return)\b/i, goal: 'tax_filing' },
      { pattern: /\b(report|file).*(crime|theft|incident)\b/i, goal: 'crime_reporting' },
      { pattern: /\b(track|status|check|where is)\b/i, goal: 'status_tracking' },
      { pattern: /\b(how much|cost|fee|price)\b/i, goal: 'cost_inquiry' },
      { pattern: /\b(how to|process|procedure|steps)\b/i, goal: 'process_understanding' },
      { pattern: /\b(contact|reach|call|email)\b/i, goal: 'contact_info' },
      { pattern: /\b(hours|when|open|schedule)\b/i, goal: 'schedule_inquiry' },
      { pattern: /\b(location|where|address|office)\b/i, goal: 'location_inquiry' },
      { pattern: /\b(eligibility|qualify|requirements)\b/i, goal: 'eligibility_check' }
    ]

    for (const { pattern, goal } of goalPatterns) {
      if (pattern.test(lower)) {
        if (!this.userGoals.includes(goal)) {
          this.userGoals.push(goal)
        }
      }
    }

    // Keep only recent goals (last 5)
    if (this.userGoals.length > 5) {
      this.userGoals = this.userGoals.slice(-5)
    }
  }

  /**
   * Get conversation summary for AI context
   */
  getSummary() {
    const messageCount = this.messages.length
    const userMessages = this.messages.filter(m => m.sender === 'user' || m.type === 'user')
    const duration = Date.now() - this.sessionStart

    // Get active topics (mentioned more than once or recently)
    const now = Date.now()
    const activeTopics = []
    for (const [topic, data] of this.topics.entries()) {
      const isRecent = now - data.lastMentioned < 60000 // Last minute
      const isFrequent = data.count >= 2
      if (isRecent || isFrequent) {
        activeTopics.push(topic)
      }
    }

    // Build summary text
    let summary = ''

    if (activeTopics.length > 0) {
      summary += `The user has been asking about: ${activeTopics.join(', ')}. `
    }

    if (Object.keys(this.entities).length > 0) {
      const entityList = Object.entries(this.entities)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
      summary += `Mentioned references: ${entityList}. `
    }

    if (this.userGoals.length > 0) {
      summary += `User appears to want: ${this.userGoals.slice(-2).join(', ')}. `
    }

    if (this.sentiment.current === 'frustrated') {
      summary += `Note: User seems frustrated, provide extra helpful response. `
    }

    if (this.clarificationCount >= 2) {
      summary += `The user has needed clarification ${this.clarificationCount} times. `
    }

    return {
      text: summary,
      messageCount,
      userMessageCount: userMessages.length,
      duration,
      activeTopics,
      entities: this.entities,
      userGoals: this.userGoals,
      sentiment: this.sentiment.current,
      clarificationCount: this.clarificationCount
    }
  }

  /**
   * Get the most relevant context for the current query
   */
  getRelevantContext(currentMessage) {
    const summary = this.getSummary()
    const currentTopics = extractTopics(currentMessage)

    // Find related previous messages
    const relatedMessages = this.messages
      .filter(m => {
        if (!m.processed || !m.processed.topics) return false
        return m.processed.topics.some(t => currentTopics.includes(t))
      })
      .slice(-3)
      .map(m => ({
        sender: m.sender || m.type,
        text: m.text,
        topics: m.processed?.topics || []
      }))

    return {
      summary,
      relatedMessages,
      entities: this.entities,
      followUpContext: this.followUpContext,
      unresolvedIntents: this.unresolvedIntents
    }
  }

  /**
   * Set follow-up context for multi-turn conversations
   */
  setFollowUp(intent, options) {
    this.followUpContext = {
      intent,
      options,
      timestamp: Date.now()
    }
  }

  /**
   * Clear follow-up context
   */
  clearFollowUp() {
    this.followUpContext = null
  }

  /**
   * Check if follow-up context is active and not expired
   */
  hasActiveFollowUp() {
    if (!this.followUpContext) return false

    // Expire after 5 minutes
    const maxAge = 5 * 60 * 1000
    if (Date.now() - this.followUpContext.timestamp > maxAge) {
      this.followUpContext = null
      return false
    }

    return true
  }

  /**
   * Track unresolved intent for potential follow-up
   */
  addUnresolvedIntent(intent) {
    this.unresolvedIntents.push({
      intent,
      timestamp: Date.now()
    })

    // Keep only last 3 unresolved intents
    if (this.unresolvedIntents.length > 3) {
      this.unresolvedIntents.shift()
    }
  }

  /**
   * Mark topic as resolved
   */
  resolveTopic(topic) {
    if (this.topics.has(topic)) {
      this.topics.get(topic).resolved = true
    }
  }

  /**
   * Mark department as visited
   */
  addDepartmentVisit(departmentId) {
    if (!this.departmentHistory.includes(departmentId)) {
      this.departmentHistory.push(departmentId)
    }
  }

  /**
   * Get proactive suggestions based on conversation history
   */
  getProactiveSuggestions() {
    const suggestions = []
    const summary = this.getSummary()

    // Suggest related services based on topics
    const topicSuggestions = {
      police: ['Check crime statistics', 'Find nearby police stations'],
      taxes: ['View tax deadline calendar', 'Calculate estimated taxes'],
      identity: ['Renew other documents', 'Update contact information'],
      transport: ['Check vehicle registration', 'View traffic updates'],
      health: ['Find covered medications', 'View provider network']
    }

    for (const topic of summary.activeTopics) {
      if (topicSuggestions[topic]) {
        suggestions.push(...topicSuggestions[topic])
      }
    }

    // Suggest based on detected goals
    const goalSuggestions = {
      document_acquisition: ['Check required documents', 'Find office locations'],
      tax_filing: ['View deduction checklist', 'Check filing deadline'],
      status_tracking: ['Set up notifications', 'View processing times'],
      cost_inquiry: ['View fee schedule', 'Check payment methods']
    }

    for (const goal of summary.userGoals) {
      if (goalSuggestions[goal]) {
        suggestions.push(...goalSuggestions[goal])
      }
    }

    // Return unique suggestions, max 3
    return [...new Set(suggestions)].slice(0, 3)
  }

  /**
   * Increment clarification counter
   */
  incrementClarification() {
    this.clarificationCount++
    return this.clarificationCount
  }

  /**
   * Reset clarification counter (after successful response)
   */
  resetClarification() {
    this.clarificationCount = 0
  }

  /**
   * Get recent messages for Gemini context
   */
  getRecentMessages(count = 10) {
    return this.messages.slice(-count).map(m => ({
      sender: m.sender || m.type,
      text: m.text,
      timestamp: m.timestamp
    }))
  }

  /**
   * Check if user appears stuck or confused
   */
  isUserStuck() {
    return this.clarificationCount >= 2 || this.sentiment.current === 'frustrated'
  }

  /**
   * Export memory state (for debugging or analytics)
   */
  export() {
    return {
      messages: this.messages,
      entities: this.entities,
      topics: Object.fromEntries(this.topics),
      userGoals: this.userGoals,
      sentiment: this.sentiment,
      clarificationCount: this.clarificationCount,
      sessionStart: this.sessionStart,
      departmentHistory: this.departmentHistory
    }
  }
}

// Export singleton instance
const conversationMemory = new ConversationMemory()

export default conversationMemory
export { ConversationMemory }
