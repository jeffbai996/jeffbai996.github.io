import { useState, useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import './ChatWidget.css'
import { generateKnowledgeBase, containsProfanity, isUnintelligible, departmentData } from '../utils/departmentCrawler'
import {
  classifyIntent,
  generateIntentResponse,
  handleFollowUp,
  extractEntities
} from '../utils/intentRecognition'
import geminiService from '../services/geminiService'
import { useGeminiLive, VoiceState, ConnectionState } from '../hooks/useGeminiLive'
import {
  getDepartmentContext,
  getDepartmentData,
  findRelevantSubPage,
  generateNavigationOffer,
  getDepartmentPriorityBoost
} from '../utils/departmentContext'
// Enhanced intelligence modules
import {
  analyzeQueryComplexity,
  determineResponseStrategy,
  buildEnhancedContext,
  ResponseStrategy
} from '../utils/intelligentRouter'
import conversationMemory from '../utils/conversationMemory'
import { classifyIntentHybrid } from '../utils/semanticClassifier'
import {
  extractAndLinkEntities,
  generateEntityContext,
  getServicePrerequisites,
  generateServiceChain
} from '../utils/entityLinker'
import {
  generateProactiveSuggestions,
  generateProactiveTip,
  detectProactiveIntervention
} from '../utils/proactiveSuggestions'

// Configuration - Gemini is enabled if API key is available
const GEMINI_ENABLED = geminiService.isAvailable()
const VOICE_ENABLED = true // Enable voice chat feature

// Generate expanded knowledge base from department data
const knowledgeBase = generateKnowledgeBase()

// NOTE: conversationContext and recentMessages are now managed as refs inside the ChatWidget component
// to prevent issues with multiple instances and proper React lifecycle management

// Polite responses for various edge cases with more natural language
const edgeCaseResponses = {
  profanity: "I understand you might be frustrated, and I'm sorry if something isn't working as expected. I'm here to help you navigate government services - let's work together to solve your issue. What do you need help with?",
  unintelligible: "I'm not quite sure what you mean. Could you try rephrasing that? Here's what I can help with:\n• **Documents**: IDs, passports, birth certificates\n• **Financial**: Taxes, banking, loans\n• **Services**: Police, courts, healthcare, housing\n• **Other**: Postal, customs, cannabis licensing, transport\n\nJust tell me what you're trying to do!",
  repeated: "It looks like you're asking about the same thing. If my previous answer wasn't helpful, could you tell me more specifically what you need? I want to make sure I give you the right information.",
  tooShort: "I'd love to help, but I need a bit more detail. What service are you looking for?",
  stillConfused: "I'm still having trouble understanding. Let me try to help differently - are you looking to:\n\n1. Get a document (ID, passport, certificate)\n2. File or pay taxes\n3. Report something to police\n4. Track a package or case\n5. Something else\n\nJust type the number or describe what you need!",
  contextualHelp: "Based on our conversation, it seems like you might need help with {topic}. Is that right? If not, please tell me what you're looking for."
}

// Smart suggestions based on partial matches
const smartSuggestions = {
  document: ["National ID", "Passport", "Birth Certificate", "Driver's License"],
  money: ["File Taxes", "Pay Taxes", "Open Bank Account", "Apply for Loan"],
  legal: ["File Police Report", "Court Case Lookup", "Legal Aid", "Police Clearance"],
  tracking: ["Track Package", "Check Case Status", "Tax Refund Status"],
  license: ["Driver's License", "Cannabis License", "Vehicle Registration"]
}

// Find best matching response with enhanced semantic intent recognition
// Now accepts refs as parameters to avoid global state issues
function findResponse(message, conversationContext, recentMessages) {
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
function resetContext(conversationContext) {
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
function handleFollowUpResponse(lowerMessage, conversationContext) {
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

// Get helpful suggestions based on detected topic
function getTopicSuggestions(topic) {
  const suggestions = {
    police: "It looks like you might need police services. I can help with:\n• **Report a Crime** - File a police report\n• **Check Case Status** - Track your report\n• **Police Clearance** - Background check certificate\n• **Emergency** - Call 911 for emergencies\n\nWhich one do you need?",
    banking: "It seems like you need banking assistance. I can help with:\n• **Open Account** - Personal or business\n• **Loans** - Mortgage, personal, or business loans\n• **Banking Info** - General Bank of Praya services\n\nWhat would you like to know?",
    taxes: "Looks like you have a tax-related question! I can help with:\n• **File Taxes** - Individual or business\n• **Make Payment** - Pay taxes or set up a plan\n• **Check Refund** - Track your refund status\n\nWhat do you need?",
    identity: "It seems you need help with identity documents. Options include:\n• **National ID** - New, renew, or replace\n• **Passport** - Applications and renewals\n• **Birth Certificate** - Certified copies\n\nWhich one interests you?",
    transport: "It looks like you need transport services. I can help with:\n• **Driver's License** - New, renew, or test scheduling\n• **Vehicle Registration** - Register or renew\n• **Title Transfer** - Change vehicle ownership\n\nWhat do you need?",
    health: "It seems you need health-related assistance. I can help with:\n• **Health Insurance** - National insurance enrollment\n• **Vaccinations** - Schedule appointments\n• **Health Info** - General Health Department services\n\nWhat would you like to know?",
    housing: "It looks like you need housing assistance. Options include:\n• **Public Housing** - Apply for housing\n• **Rental Assistance** - Financial help programs\n• **Tenant Rights** - Eviction, rent disputes\n\nWhat do you need help with?",
    postal: "It seems you need postal services. I can help with:\n• **Track Package** - Check delivery status\n• **Ship Package** - Domestic or international\n• **Postal Info** - General Praya Post services\n\nWhat would you like to do?",
    legal: "It looks like you have a legal question. I can help with:\n• **Court Cases** - Civil or criminal matters\n• **Legal Aid** - Public defender, eligibility\n• **Case Lookup** - Find case information\n\nWhat do you need?",
    customs: "It seems you need customs/border information. I can help with:\n• **Import/Export** - Permits and duties\n• **Travel Requirements** - Visa, entry rules\n• **Customs Info** - General CBCA services\n\nWhat would you like to know?"
  }

  return suggestions[topic] || null
}

// Generate guidance based on question type
function generateQuestionGuidance(questionType, message) {
  const guidance = {
    howTo: "I'd be happy to explain how to do something! Could you specify what service you're interested in? For example:\n• How to get a passport\n• How to file taxes\n• How to report a crime\n• How to track a package",
    howMuch: "I can help with fee information! Which service are you asking about? Common fees:\n• **National ID**: ¤25 (new), ¤15 (renewal)\n• **Passport**: ¤80 (standard), ¤150 (expedited)\n• **Driver's License**: ¤45 (new), ¤30 (renewal)\n• **Police Clearance**: ¤20",
    whereIs: "I can help you find locations! Are you looking for:\n• A government office location\n• Where to submit documents\n• Which department handles your request\n\nPlease specify what you're looking for.",
    whenIs: "I can provide timing information! Most government offices are open:\n• **Mon-Fri**: 8AM-5PM\n• **Some Sat**: 9AM-1PM\n• **Online**: 24/7\n\nWhat specific service do you need hours for?",
    canI: "I can help determine if you're eligible for something. What service or benefit are you asking about?",
    default: "I'm here to help with Praya government services! Could you rephrase your question? For example:\n• \"How do I apply for X?\"\n• \"What documents do I need for Y?\"\n• \"Where can I find Z?\""
  }

  return guidance[questionType] || guidance.default
}

// Parse markdown-style formatting (bold, links) and return React elements
function parseFormattedText(text) {
  const parts = []
  // Combined regex for bold (**text**), markdown links [text](url), and plain URLs
  const regex = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\(([^)]+)\))|(https?:\/\/[^\s<>"\)]+)/g
  let lastIndex = 0
  let match
  let keyIndex = 0

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    if (match[1]) {
      // Bold text: **text**
      parts.push(<strong key={`bold-${keyIndex++}`}>{match[2]}</strong>)
    } else if (match[3]) {
      // Markdown link: [text](url)
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={match[5]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[4]}
        </a>
      )
    } else if (match[6]) {
      // Plain URL
      parts.push(
        <a
          key={`url-${keyIndex++}`}
          href={match[6]}
          target="_blank"
          rel="noopener noreferrer"
          className="chat-link"
        >
          {match[6]}
        </a>
      )
    }

    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

// Quick action icon component
function QuickActionIcon({ icon }) {
  const icons = {
    shield: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    syringe: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M18 2l4 4M7.5 8.5l7 7M10.5 5.5l7 7M5.5 15.5l-2 2a2 2 0 0 0 0 3l1 1a2 2 0 0 0 3 0l2-2M14 4l6 6" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
    alert: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    document: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    money: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    'credit-card': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    help: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    briefcase: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    refresh: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    'id-card': (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 11h4M14 15h2" />
      </svg>
    ),
    car: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M5 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0M15 17a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
        <path d="M5 17H3v-6l2-4h12l2 4v6h-2M5 17h10" />
        <path d="M3 7l2-4h12l2 4" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    package: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    location: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    mailbox: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    list: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    plane: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  }

  return icons[icon] || icons.document
}

// Detect if a query needs Gemini AI assistance using enhanced intelligence
function shouldUseGemini(message, intentResult, messages, conversationContext) {
  if (!GEMINI_ENABLED) return { useGemini: false, strategy: ResponseStrategy.RULE_BASED }

  // Use intelligent router for decision making
  const complexity = analyzeQueryComplexity(message, {
    clarificationCount: conversationContext.clarificationCount
  })

  const strategy = determineResponseStrategy(intentResult, complexity, {
    geminiEnabled: GEMINI_ENABLED
  })

  // Store the strategy for later use
  conversationContext.lastStrategy = strategy

  return {
    useGemini: strategy.useGemini,
    strategy: strategy.strategy,
    reason: strategy.reason,
    enhancedContext: strategy.enhancedContext || false,
    complexity
  }
}

// Call Gemini API for complex queries with enhanced context
async function callGeminiAPI(message, messages, currentDeptData = null, useEnhancedContext = false, conversationContext = {}) {
  try {
    // Prepare conversation history (last 10 messages)
    const history = messages.slice(-10).map(msg => ({
      sender: msg.type,
      text: msg.text,
      timestamp: msg.time
    }))

    // Find relevant departments for context, prioritizing current department
    let relevantDepartments = []

    // If we're on a department page, prioritize that department's data
    if (currentDeptData) {
      relevantDepartments.push(currentDeptData)
    }

    // Add other relevant departments based on query
    const additionalDepts = departmentData.filter(dept => {
      // Skip if already added
      if (currentDeptData && dept.id === currentDeptData.id) return false

      const searchText = message.toLowerCase()
      return dept.keywords?.some(kw => searchText.includes(kw.toLowerCase())) ||
             dept.name.toLowerCase().includes(searchText) ||
             dept.description.toLowerCase().includes(searchText)
    })

    relevantDepartments = [...relevantDepartments, ...additionalDepts]

    // Build enhanced context if requested
    let enhancedContext = {}
    if (useEnhancedContext) {
      const memorySummary = conversationMemory.getSummary()
      enhancedContext = buildEnhancedContext(
        message,
        history,
        conversationContext.entities,
        currentDeptData
      )
      // Add memory summary data
      enhancedContext.sentiment = memorySummary.sentiment
      enhancedContext.userGoals = memorySummary.userGoals
      enhancedContext.activeTopics = memorySummary.activeTopics
    }

    // Call Gemini service with enhanced context
    const result = await geminiService.generateResponse(
      message,
      relevantDepartments,
      history,
      enhancedContext
    )

    if (result.success && result.response) {
      // If there are proactive suggestions from Gemini, store them
      if (result.suggestions && result.suggestions.length > 0) {
        conversationContext.geminiSuggestions = result.suggestions
      }
      return result.response
    }

    return null
  } catch (error) {
    return null
  }
}

export default function ChatWidget({ currentPath = '/' }) {
  const navigate = useNavigate()

  // Get department context based on current route
  const departmentContext = useMemo(() => getDepartmentContext(currentPath), [currentPath])
  const currentDeptData = useMemo(() => getDepartmentData(departmentContext.id), [departmentContext.id])

  // Track if greeting has been updated for current department
  const [lastDeptId, setLastDeptId] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: departmentContext.greeting,
      time: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState(null)
  const [streamingText, setStreamingText] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const streamingRef = useRef(null)

  // Track conversation context for follow-ups with enhanced memory
  // Using useRef to persist across renders without triggering re-renders
  const conversationContextRef = useRef({
    lastIntent: null,
    awaitingFollowUp: false,
    entities: {},
    conversationHistory: [],
    currentTopics: [],
    userPreferences: {},
    clarificationCount: 0,
    lastResponseTime: null,
    lastStrategy: null,
    offeredRelated: false
  })

  // Track recent messages to detect spam/repetition
  const recentMessagesRef = useRef([])

  // Voice chat integration
  const {
    connectionState,
    voiceState,
    isVoiceModeActive,
    toggleVoiceMode,
    stopVoiceMode,
    error: voiceError,
    clearError: clearVoiceError,
    transcripts
  } = useGeminiLive()

  // Voice status text
  const getVoiceStatusText = () => {
    if (connectionState === ConnectionState.CONNECTING) return 'Connecting...'
    if (voiceState === VoiceState.LISTENING) return 'Listening...'
    if (voiceState === VoiceState.SPEAKING) return 'Speaking...'
    if (voiceState === VoiceState.PROCESSING) return 'Processing...'
    return 'Voice Mode'
  }

  // Update greeting when department context changes
  useEffect(() => {
    if (departmentContext.id !== lastDeptId) {
      setLastDeptId(departmentContext.id)
      // Reset quick actions visibility when changing departments
      setShowQuickActions(true)
      // Add new greeting for the department (only if chat has been opened before)
      if (lastDeptId !== null) {
        const greetingMessage = {
          id: Date.now(),
          type: 'bot',
          text: `${departmentContext.greeting}\n\nI noticed you're now on the ${departmentContext.name} page. How can I assist you?`,
          time: new Date()
        }
        setMessages(prev => [...prev, greetingMessage])
      }
    }
  }, [departmentContext, lastDeptId])

  // Scroll to bottom when new messages arrive or streaming updates
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streamingText])

  // Focus input when chat opens (with iOS consideration)
  useEffect(() => {
    if (isOpen) {
      // Delay focus on iOS to prevent keyboard issues
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
      const delay = isIOS ? 300 : 100
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          // Scroll input into view on iOS
          if (isIOS) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }
      }, delay)
    }
  }, [isOpen])

  // Cleanup streaming timeout on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (streamingRef.current) {
        clearTimeout(streamingRef.current)
        streamingRef.current = null
      }
    }
  }, [])

  // Handle quick action chip clicks
  const handleQuickAction = (query) => {
    setShowQuickActions(false)
    setInputValue(query)
    // Trigger send after a brief delay to show the input
    setTimeout(() => {
      const syntheticEvent = { target: { value: query } }
      setInputValue('')
      processMessage(query)
    }, 100)
  }

  // Handle navigation to sub-pages
  const handleNavigation = (url) => {
    navigate(url)
  }

  // Process a message (extracted for reuse) - Enhanced with intelligent routing
  const processMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setShowQuickActions(false)

    // Track message in conversation memory
    conversationMemory.addMessage({ sender: 'user', text: messageText })

    // Check for linked entities (case numbers, tracking numbers, etc.)
    const linkedEntities = extractAndLinkEntities(messageText)
    if (linkedEntities.length > 0) {
      // Merge entities into context
      linkedEntities.forEach(entity => {
        conversationContextRef.current.entities[entity.type] = entity.value
      })
    }

    // Check for relevant sub-page to offer navigation
    const relevantSubPage = findRelevantSubPage(messageText, departmentContext.id)

    // Use hybrid intent classification (semantic + regex)
    const hybridResult = classifyIntentHybrid(messageText, {
      lastIntent: conversationContextRef.current.lastIntent,
      topics: conversationMemory.getSummary().activeTopics
    })

    // Also get standard intent result for compatibility
    const intentResult = hybridResult.intent ? {
      intent: hybridResult.intent,
      ...hybridResult.details,
      confidence: hybridResult.confidence
    } : classifyIntent(messageText)

    // Get department priority boost
    const priorityBoost = getDepartmentPriorityBoost(messageText, departmentContext.id)

    // Check if we should use Gemini AI using intelligent routing
    const routingDecision = shouldUseGemini(messageText, intentResult, messages, conversationContextRef.current)

    // Check for proactive intervention needs
    const intervention = detectProactiveIntervention(messageText, {
      topics: conversationMemory.getSummary().activeTopics,
      messageCount: conversationMemory.getSummary().messageCount,
      offeredRelated: conversationContextRef.current.offeredRelated
    })

    if (routingDecision.useGemini) {
      // Try calling Gemini API with enhanced context
      const geminiResponse = await callGeminiAPI(
        messageText,
        messages,
        currentDeptData,
        routingDecision.enhancedContext,
        conversationContextRef.current
      )

      if (geminiResponse) {
        // Build final response with enhancements
        let finalResponse = geminiResponse

        // Add entity context if we found linked entities
        if (linkedEntities.length > 0) {
          const entityInfo = generateEntityContext(linkedEntities)
          if (entityInfo && !finalResponse.includes(entityInfo)) {
            finalResponse = entityInfo + '\n\n' + finalResponse
          }
        }

        // Append navigation offer if relevant
        if (relevantSubPage) {
          finalResponse += generateNavigationOffer(relevantSubPage)
        }

        // Add proactive tip if relevant
        const memorySummary = conversationMemory.getSummary()
        if (memorySummary.activeTopics.length > 0) {
          const tip = generateProactiveTip(memorySummary.activeTopics[0])
          if (tip && !finalResponse.includes(tip)) {
            finalResponse += `\n\n💡 ${tip}`
          }
        }

        // Track bot response in memory
        conversationMemory.addMessage({ sender: 'bot', text: finalResponse })

        // Use Gemini response
        const botMessageId = Date.now() + 1
        const botMessage = {
          id: botMessageId,
          type: 'bot',
          text: '',
          time: new Date(),
          isStreaming: true
        }

        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
        setStreamingMessageId(botMessageId)
        setStreamingText('')

        // Stream the Gemini response
        streamResponse(finalResponse, botMessageId)
        return
      }
      // If Gemini fails, fall back to rule-based system
    }

    // Use rule-based system with semantic enhancement
    setTimeout(() => {
      let response = findResponse(messageText, conversationContextRef.current, recentMessagesRef.current)

      // Add entity context if we found linked entities
      if (linkedEntities.length > 0) {
        const entityInfo = generateEntityContext(linkedEntities)
        if (entityInfo && !response.includes(entityInfo)) {
          response = entityInfo + '\n\n' + response
        }
      }

      // Append navigation offer if relevant
      if (relevantSubPage) {
        response += generateNavigationOffer(relevantSubPage)
      }

      // Add intervention response if needed
      if (intervention && intervention.type === 'assistance') {
        response = intervention.message + '\n\n' + response
      }

      // Track bot response in memory
      conversationMemory.addMessage({ sender: 'bot', text: response })

      const botMessageId = Date.now() + 1
      const botMessage = {
        id: botMessageId,
        type: 'bot',
        text: '',
        time: new Date(),
        isStreaming: true
      }

      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
      setStreamingMessageId(botMessageId)
      setStreamingText('')

      streamResponse(response, botMessageId)
    }, 400 + Math.random() * 200)
  }

  // Stream response with typing effect
  const streamResponse = (response, botMessageId) => {
    let charIndex = 0
    if (streamingRef.current) {
      clearTimeout(streamingRef.current)
    }

    const streamNextChunk = () => {
      if (charIndex < response.length) {
        const char = response[charIndex]
        const isPunctuation = /[.,!?;:]/.test(char)
        const isEndOfSentence = /[.!?]/.test(char)
        const isNewline = char === '\n'

        let charsToAdd
        if (isPunctuation) {
          charsToAdd = 1
        } else if (isNewline) {
          charsToAdd = 1
        } else {
          charsToAdd = Math.min(Math.floor(Math.random() * 4) + 2, response.length - charIndex)
        }

        const newText = response.slice(0, charIndex + charsToAdd)
        charIndex += charsToAdd

        setStreamingText(newText)
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: newText }
            : msg
        ))

        let delay
        if (isEndOfSentence) {
          delay = 150 + Math.random() * 100
        } else if (isPunctuation) {
          delay = 80 + Math.random() * 60
        } else if (isNewline) {
          delay = 100 + Math.random() * 80
        } else if (Math.random() < 0.15) {
          delay = 60 + Math.random() * 90
        } else {
          delay = 12 + Math.random() * 15
        }

        streamingRef.current = setTimeout(streamNextChunk, delay)
      } else {
        streamingRef.current = null
        setStreamingMessageId(null)
        setStreamingText('')
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { ...msg, text: response, isStreaming: false }
            : msg
        ))
        // Reset clarification count on successful response
        conversationContextRef.current.clarificationCount = 0
      }
    }

    streamNextChunk()
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return
    const messageText = inputValue.trim()
    setInputValue('')
    await processMessage(messageText)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
      // Blur input on iOS to hide keyboard after send
      if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        inputRef.current?.blur()
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
  }

  // Handle send button click with iOS keyboard management
  const handleSendClick = () => {
    handleSend()
    // Keep focus on input for better UX
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Button */}
      <button
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Panel */}
      <div className={`chat-widget-panel ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className={`chat-widget-header ${departmentContext.id !== 'portal' ? 'department-specific' : ''}`}>
          <div className="chat-widget-header-info">
            <div className="chat-widget-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <div>
              <h3>{departmentContext.id !== 'portal' ? departmentContext.name : 'Citizen Services'}</h3>
              <span className="chat-widget-status">
                <span className="status-dot"></span>
                {departmentContext.id !== 'portal' ? 'Department Assistant' : 'Online'}
              </span>
            </div>
          </div>
          <button className="chat-widget-close" onClick={() => setIsOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-widget-messages">
          {messages.map(msg => (
            <div key={msg.id} className={`chat-message ${msg.type}${msg.isStreaming ? ' streaming' : ''}`}>
              <div className="chat-message-content">
                {msg.text.split('\n').map((line, i, arr) => (
                  <span key={i}>
                    {parseFormattedText(line)}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
                {msg.isStreaming && <span className="streaming-cursor">▌</span>}
              </div>
              {!msg.isStreaming && (
                <span className="chat-message-time">{formatTime(msg.time)}</span>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="chat-message bot">
              <div className="chat-typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          {/* Quick Action Chips */}
          {showQuickActions && !isTyping && departmentContext.quickActions && (
            <div className="chat-quick-actions">
              <p className="quick-actions-label">Quick questions:</p>
              <div className="quick-actions-chips">
                {departmentContext.quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="quick-action-chip"
                    onClick={() => handleQuickAction(action.query)}
                    type="button"
                  >
                    <QuickActionIcon icon={action.icon} />
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Voice Mode Overlay */}
        {isVoiceModeActive && (
          <div className="voice-mode-overlay">
            <div className="voice-mode-content">
              <div className={`voice-indicator ${voiceState}`}>
                <div className="voice-rings">
                  <div className="voice-ring"></div>
                  <div className="voice-ring"></div>
                  <div className="voice-ring"></div>
                </div>
                <div className="voice-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                  </svg>
                </div>
              </div>
              <p className="voice-status">{getVoiceStatusText()}</p>
              {voiceError && <p className="voice-error">{voiceError}</p>}
              <button
                className="voice-stop-button"
                onClick={stopVoiceMode}
                type="button"
              >
                Stop Voice Mode
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className={`chat-widget-input ${isVoiceModeActive ? 'voice-active' : ''}`}>
          <input
            ref={inputRef}
            type="text"
            placeholder={isVoiceModeActive ? "Voice mode active..." : "Type your question..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isVoiceModeActive}
          />
          {VOICE_ENABLED && (
            <button
              className={`chat-voice-button ${isVoiceModeActive ? 'active' : ''} ${voiceState}`}
              onClick={toggleVoiceMode}
              type="button"
              title={isVoiceModeActive ? 'Stop voice mode' : 'Start voice mode'}
            >
              {isVoiceModeActive ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                </svg>
              )}
            </button>
          )}
          <button
            className="chat-send-button"
            onClick={handleSendClick}
            disabled={!inputValue.trim() || isVoiceModeActive}
            type="button"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <div className="chat-widget-footer">
          Powered by GP.AI
        </div>
      </div>
    </>
  )
}
