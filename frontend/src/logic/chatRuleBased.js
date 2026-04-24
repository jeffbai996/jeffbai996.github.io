// frontend/src/logic/chatRuleBased.js
// Rule-based chat classifier: profanity/unintelligibility checks, entity extraction,
// menu handling, hybrid intent classification, and keyword fallback.
//
// All three exported functions mutate the `conversationContext` argument in-place
// (it's a bag of conversation state the caller owns as a useRef). They return
// response strings (findResponse) or updated state markers (handleFollowUpResponse).

import { generateKnowledgeBase, containsProfanity, isUnintelligible } from '../utils/departmentCrawler'
import {
  classifyIntent,
  generateIntentResponse,
  handleFollowUp,
  extractEntities
} from '../utils/intentRecognition'
import conversationMemory from '../utils/conversationMemory'
import { classifyIntentHybrid } from '../utils/semanticClassifier'
import { edgeCaseResponses } from '../utils/chatEdgeCases'

// Precomputed — populated once at module load, same as the original
const knowledgeBase = generateKnowledgeBase()

// Find best matching response with enhanced semantic intent recognition
// Now accepts refs as parameters to avoid global state issues
export function findResponse(message, conversationContext, recentMessages) {
  const lowerMessage = message.toLowerCase().trim()

  // Check for profanity
  if (containsProfanity(message)) {
    resetContext(conversationContext)
    conversationMemory.resetClarification()
    return edgeCaseResponses.profanity
  }

  // Check for unintelligible input
  if (isUnintelligible(message)) {
    conversationContext.clarificationCount++
    conversationMemory.incrementClarification()
    if (conversationContext.clarificationCount >= 3) {
      conversationContext.clarificationCount = 0
      conversationMemory.resetClarification()
      return edgeCaseResponses.stillConfused
    }
    return edgeCaseResponses.unintelligible
  }

  // Check for repetition (same message within last 3 messages)
  recentMessages.push(lowerMessage)
  if (recentMessages.length > 10) {
    recentMessages.shift()
  }
  const messageCount = recentMessages.filter(m => m === lowerMessage).length
  if (messageCount >= 3) {
    recentMessages = []
    return edgeCaseResponses.repeated
  }

  // Extract any entities from the message (case numbers, tracking numbers, etc.)
  const extractedEntities = extractEntities(message)
  if (Object.keys(extractedEntities).length > 0) {
    conversationContext.entities = { ...conversationContext.entities, ...extractedEntities }
    // If we got a tracking number, try to provide tracking info
    if (extractedEntities.trackingNumber) {
      conversationMemory.resetClarification()
      return `I found tracking number **${extractedEntities.trackingNumber}**. To check the status of your package:\n\n1. Visit the [Praya Post tracking page](/post/track)\n2. Enter your tracking number\n3. View delivery status and estimated arrival\n\nWould you like help with anything else regarding your shipment?`
    }
    if (extractedEntities.caseNumber) {
      conversationMemory.resetClarification()
      return `I found case number **${extractedEntities.caseNumber}**. To check your case status:\n\n1. Visit the [NPA Case Lookup](/npa/lookup)\n2. Enter your case number\n3. View status and updates\n\nTypically, cases are updated within 24-48 hours. Need anything else?`
    }
  }

  // Check if user is responding to a follow-up question
  if (conversationContext.awaitingFollowUp && conversationContext.lastIntent) {
    const followUpResult = handleFollowUpResponse(lowerMessage, conversationContext)
    if (followUpResult) {
      conversationMemory.resetClarification()
      return followUpResult
    }
  }

  // Handle menu-style numbered responses from previous clarification
  const menuMatch = lowerMessage.match(/^[1-5]$/)
  if (menuMatch && conversationContext.clarificationCount > 0) {
    conversationContext.clarificationCount = 0
    conversationMemory.resetClarification()
    const menuResponses = {
      '1': "Let me help you with documents. What type do you need?\n\n• **National ID** - New, renewal, or replacement\n• **Passport** - New application or renewal\n• **Birth Certificate** - Certified copies\n• **Driver's License** - New, renewal, or replacement\n\nWhich one interests you?",
      '2': "I can help with taxes! What do you need?\n\n• **File Taxes** - Individual or business returns\n• **Pay Taxes** - Make a payment or set up a plan\n• **Check Refund** - Track your tax refund status\n\nWhat would you like to do?",
      '3': "For police-related matters, I can help with:\n\n• **Report a Crime** - File a police report\n• **Check Case Status** - Track your report\n• **Police Clearance** - Background check certificate\n• **Emergency** - Call 911 for emergencies\n\nWhat do you need?",
      '4': "I can help you track something:\n\n• **Track Package** - Praya Post shipments\n• **Case Status** - Police reports\n• **Tax Refund** - Refund status\n• **Application Status** - IDs, passports, etc.\n\nWhat would you like to track?",
      '5': "No problem! Tell me in your own words what you're looking for, and I'll do my best to help."
    }
    return menuResponses[menuMatch[0]]
  }

  // Use hybrid intent classification (semantic + regex)
  const hybridResult = classifyIntentHybrid(message, {
    lastIntent: conversationContext.lastIntent,
    topics: conversationMemory.getSummary().activeTopics
  })

  // If hybrid classification found a confident match
  if (hybridResult.intent && hybridResult.confidence >= 0.5 && hybridResult.details) {
    conversationContext.lastIntent = hybridResult.details
    conversationContext.awaitingFollowUp = !!hybridResult.details.followUp
    conversationContext.clarificationCount = 0
    conversationMemory.resetClarification()

    // Track the matched intent in memory
    if (hybridResult.intent) {
      conversationMemory.resolveTopic(hybridResult.intent)
    }

    return generateIntentResponse(hybridResult.details, true)
  }

  // Fall back to standard regex classification
  const matchedIntent = classifyIntent(message)
  if (matchedIntent) {
    conversationContext.lastIntent = matchedIntent
    conversationContext.awaitingFollowUp = !!matchedIntent.followUp
    conversationContext.clarificationCount = 0
    conversationMemory.resetClarification()
    return generateIntentResponse(matchedIntent, true)
  }

  // Simple keyword matching
  let bestMatch = null
  let bestScore = 0

  for (let i = 0; i < knowledgeBase.length; i++) {
    const entry = knowledgeBase[i]
    let score = 0

    for (const keyword of entry.keywords) {
      const keywordLower = keyword.toLowerCase()

      // Exact word match (word boundary)
      const wordBoundaryRegex = new RegExp(`\\b${keywordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i')
      if (wordBoundaryRegex.test(lowerMessage)) {
        score += keyword.length * 3
      }
      // Partial match (substring)
      else if (lowerMessage.includes(keywordLower)) {
        score += keyword.length * 1.5
      }
    }

    // Bonus for exact short phrase match
    if (entry.keywords.some(k => k.toLowerCase() === lowerMessage)) {
      score *= 4
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore > 5) {
    resetContext(conversationContext)
    return bestMatch.response
  }

  // Smart fallback with categories
  conversationContext.clarificationCount++
  if (conversationContext.clarificationCount >= 2) {
    return edgeCaseResponses.stillConfused
  }

  return "I want to make sure I help you correctly. Could you tell me a bit more about what you're looking for?\n\nFor example:\n• \"I need to renew my passport\"\n• \"How do I file my taxes?\"\n• \"I want to report a theft\"\n• \"Where can I track my package?\"\n\nWhat brings you here today?"
}

// Helper function to reset conversation context
export function resetContext(conversationContext) {
  Object.assign(conversationContext, {
    lastIntent: null,
    awaitingFollowUp: false,
    entities: conversationContext.entities, // Keep entities
    conversationHistory: conversationContext.conversationHistory, // Keep history
    currentTopics: [],
    userPreferences: conversationContext.userPreferences,
    clarificationCount: 0,
    lastResponseTime: Date.now()
  })
}

// Handle follow-up responses
export function handleFollowUpResponse(lowerMessage, conversationContext) {
  const intent = conversationContext.lastIntent

  // Check for numbered selection (1-5)
  const numberMatch = lowerMessage.match(/^[1-5]$/)
  if (numberMatch && intent.followUp && intent.followUp.options) {
    const optionIndex = parseInt(numberMatch[0]) - 1
    if (optionIndex >= 0 && optionIndex < intent.followUp.options.length) {
      const selectedOption = intent.followUp.options[optionIndex]
      conversationContext.awaitingFollowUp = false
      const followUpResponse = handleFollowUp(intent.intent, selectedOption.value)
      if (followUpResponse) {
        return followUpResponse
      }
    }
  }

  // Check if message matches an option label
  if (intent.followUp && intent.followUp.options) {
    for (const option of intent.followUp.options) {
      const optionLower = option.label.toLowerCase()

      // Exact match
      if (lowerMessage === optionLower) {
        conversationContext.awaitingFollowUp = false
        return handleFollowUp(intent.intent, option.value)
      }

      // Partial match
      if (lowerMessage.includes(optionLower) || optionLower.includes(lowerMessage)) {
        conversationContext.awaitingFollowUp = false
        return handleFollowUp(intent.intent, option.value)
      }
    }
  }

  return null
}
