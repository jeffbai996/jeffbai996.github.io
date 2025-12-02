import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'
import { generateKnowledgeBase, containsProfanity, isUnintelligible, departmentData } from '../utils/departmentCrawler'
import {
  classifyIntent,
  generateIntentResponse,
  handleFollowUp,
  extractEntities
} from '../utils/intentRecognition'

// Configuration from environment variables
const GEMINI_ENABLED = import.meta.env.VITE_GEMINI_ENABLED === 'true'
const API_URL = import.meta.env.VITE_API_URL || '/api'

// Generate expanded knowledge base from department data
const knowledgeBase = generateKnowledgeBase()

// Track conversation context for follow-ups with enhanced memory
let conversationContext = {
  lastIntent: null,
  awaitingFollowUp: false,
  entities: {},
  conversationHistory: [], // Track last 5 exchanges
  currentTopics: [], // Track current discussion topics
  userPreferences: {}, // Track user preferences mentioned
  clarificationCount: 0, // Track how many times we asked for clarification
  lastResponseTime: null
}

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

// Track recent messages to detect spam/repetition
let recentMessages = []

// Find best matching response with intent recognition and keyword matching
function findResponse(message) {
  const lowerMessage = message.toLowerCase().trim()

  // Check for profanity
  if (containsProfanity(message)) {
    resetContext()
    return edgeCaseResponses.profanity
  }

  // Check for unintelligible input
  if (isUnintelligible(message)) {
    conversationContext.clarificationCount++
    if (conversationContext.clarificationCount >= 3) {
      conversationContext.clarificationCount = 0
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
      return `I found tracking number **${extractedEntities.trackingNumber}**. To check the status of your package:\n\n1. Visit the Praya Post portal\n2. Enter your tracking number\n3. View delivery status and estimated arrival\n\nWould you like help with anything else regarding your shipment?`
    }
    if (extractedEntities.caseNumber) {
      return `I found case number **${extractedEntities.caseNumber}**. To check your case status:\n\n1. Visit the NPA portal\n2. Go to "Case Lookup"\n3. Enter your case number\n\nTypically, cases are updated within 24-48 hours. Need anything else?`
    }
  }

  // Check if user is responding to a follow-up question
  if (conversationContext.awaitingFollowUp && conversationContext.lastIntent) {
    const followUpResult = handleFollowUpResponse(lowerMessage)
    if (followUpResult) {
      return followUpResult
    }
  }

  // Handle menu-style numbered responses from previous clarification
  const menuMatch = lowerMessage.match(/^[1-5]$/)
  if (menuMatch && conversationContext.clarificationCount > 0) {
    conversationContext.clarificationCount = 0
    const menuResponses = {
      '1': "Let me help you with documents. What type do you need?\n\n• **National ID** - New, renewal, or replacement\n• **Passport** - New application or renewal\n• **Birth Certificate** - Certified copies\n• **Driver's License** - New, renewal, or replacement\n\nWhich one interests you?",
      '2': "I can help with taxes! What do you need?\n\n• **File Taxes** - Individual or business returns\n• **Pay Taxes** - Make a payment or set up a plan\n• **Check Refund** - Track your tax refund status\n\nWhat would you like to do?",
      '3': "For police-related matters, I can help with:\n\n• **Report a Crime** - File a police report\n• **Check Case Status** - Track your report\n• **Police Clearance** - Background check certificate\n• **Emergency** - Call 911 for emergencies\n\nWhat do you need?",
      '4': "I can help you track something:\n\n• **Track Package** - Praya Post shipments\n• **Case Status** - Police reports\n• **Tax Refund** - Refund status\n• **Application Status** - IDs, passports, etc.\n\nWhat would you like to track?",
      '5': "No problem! Tell me in your own words what you're looking for, and I'll do my best to help."
    }
    return menuResponses[menuMatch[0]]
  }

  // Try intent classification first - this handles specific user intents
  const matchedIntent = classifyIntent(message)
  if (matchedIntent) {
    conversationContext.lastIntent = matchedIntent
    conversationContext.awaitingFollowUp = !!matchedIntent.followUp
    conversationContext.clarificationCount = 0
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
    resetContext()
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
function resetContext() {
  conversationContext = {
    lastIntent: null,
    awaitingFollowUp: false,
    entities: conversationContext.entities, // Keep entities
    conversationHistory: conversationContext.conversationHistory, // Keep history
    currentTopics: [],
    userPreferences: conversationContext.userPreferences,
    clarificationCount: 0,
    lastResponseTime: Date.now()
  }
}

// Handle follow-up responses
function handleFollowUpResponse(lowerMessage) {
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

// Parse markdown-style bold (**text**) and return React elements
function parseFormattedText(text) {
  const parts = []
  const regex = /\*\*([^*]+)\*\*/g
  let lastIndex = 0
  let match

  while ((match = regex.exec(text)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    // Add bold text
    parts.push(<strong key={match.index}>{match[1]}</strong>)
    lastIndex = regex.lastIndex
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : [text]
}

// Detect if a query needs Gemini AI assistance
function shouldUseGemini(message, intentResult, messages) {
  if (!GEMINI_ENABLED) return false

  // Trigger 1: Low confidence match (intent classifier didn't find a good match)
  const lowConfidence = !intentResult || (intentResult.confidence && intentResult.confidence < 0.6)

  // Trigger 2: Repeated clarification attempts
  const repeatedClarification = conversationContext.clarificationCount >= 2

  // Trigger 3: Complex query patterns
  const complexPatterns = [
    /multiple|several|both|and also/i,
    /what.*difference|compare|versus|vs\./i,
    /explain|how does.*work|what is the process/i,
    /i don't understand|confused|not sure|unclear/i,
    /step by step|detailed|comprehensive/i,
  ]
  const isComplexQuery = complexPatterns.some(pattern => pattern.test(message))

  // Trigger 4: Frustration detected
  const frustrationKeywords = [
    'frustrated', 'annoying', 'not helping', 'useless',
    'doesn\'t work', 'still don\'t', 'already tried',
    'same thing', 'not what i asked'
  ]
  const messageLower = message.toLowerCase()
  const hasFrustration = frustrationKeywords.some(kw => messageLower.includes(kw))

  // Trigger 5: Explicit request for more help
  const explicitHelp = /more help|explain better|need more info|tell me more/i.test(message)

  return lowConfidence || repeatedClarification || isComplexQuery || hasFrustration || explicitHelp
}

// Call Gemini API for complex queries
async function callGeminiAPI(message, messages) {
  try {
    // Prepare conversation history (last 5 messages)
    const history = messages.slice(-10).map(msg => ({
      sender: msg.type,
      text: msg.text,
      timestamp: msg.time
    }))

    // Call the backend API
    const response = await fetch(`${API_URL}/gemini/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
        departmentContext: departmentData
      })
    })

    if (!response.ok) {
      // If rate limited or error, return null to fall back
      const errorData = await response.json().catch(() => null)
      console.warn('Gemini API error:', errorData?.error || response.statusText)
      return null
    }

    const data = await response.json()

    if (data.success && data.response) {
      return data.response
    }

    return null
  } catch (error) {
    console.error('Failed to call Gemini API:', error)
    return null
  }
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm the Praya Citizen Services Assistant. How can I help you today?",
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

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Try rule-based system first
    const intentResult = classifyIntent(userMessage.text)

    // Check if we should use Gemini AI
    const useGemini = shouldUseGemini(userMessage.text, intentResult, messages)

    if (useGemini) {
      console.log('Using Gemini AI for complex query')

      // Try calling Gemini API
      const geminiResponse = await callGeminiAPI(userMessage.text, messages)

      if (geminiResponse) {
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
        let charIndex = 0
        if (streamingRef.current) {
          clearTimeout(streamingRef.current)
        }

        const streamNextChunk = () => {
          if (charIndex < geminiResponse.length) {
            const char = geminiResponse[charIndex]
            const isPunctuation = /[.,!?;:]/.test(char)
            const isEndOfSentence = /[.!?]/.test(char)
            const isNewline = char === '\n'

            let charsToAdd
            if (isPunctuation) {
              charsToAdd = 1
            } else if (isNewline) {
              charsToAdd = 1
            } else {
              charsToAdd = Math.min(Math.floor(Math.random() * 4) + 2, geminiResponse.length - charIndex)
            }

            const newText = geminiResponse.slice(0, charIndex + charsToAdd)
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
                ? { ...msg, text: geminiResponse, isStreaming: false }
                : msg
            ))
            // Reset clarification count on successful response
            conversationContext.clarificationCount = 0
          }
        }

        streamNextChunk()
        return
      }
      // If Gemini fails, fall back to rule-based system
      console.log('Gemini API unavailable, falling back to rule-based system')
    }

    // Use rule-based system (original logic)
    setTimeout(() => {
      const response = findResponse(userMessage.text)
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
        }
      }

      streamNextChunk()
    }, 400 + Math.random() * 200)
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
        <div className="chat-widget-header">
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
              <h3>Citizen Services</h3>
              <span className="chat-widget-status">
                <span className="status-dot"></span>
                Online
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
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-widget-input">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-send-button"
            onClick={handleSendClick}
            disabled={!inputValue.trim()}
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
