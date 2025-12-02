import { useState, useRef, useEffect } from 'react'
import './ChatWidget.css'
import { generateKnowledgeBase, containsProfanity, isUnintelligible } from '../utils/departmentCrawler'

// Generate expanded knowledge base from department data
const knowledgeBase = generateKnowledgeBase()

// Polite responses for various edge cases
const edgeCaseResponses = {
  profanity: "I understand you might be frustrated, but I'd appreciate if we could keep our conversation professional. I'm here to help you with government services. How can I assist you today?",
  unintelligible: "I'm having trouble understanding that. Could you please rephrase your question? I can help you with:\n• Taxes & Revenue\n• IDs & Passports\n• Police & Legal matters\n• Banking\n• Healthcare\n• Housing\n• Postal Services\n\nWhat would you like to know?",
  repeated: "I noticed you've sent similar messages. If you're experiencing technical issues or need different information, please let me know specifically what you need help with.",
  tooShort: "Your message seems a bit short. Could you provide more details about what you need help with? I'm here to assist with government services."
}

// Track recent messages to detect spam/repetition
let recentMessages = []

// Find best matching response with enhanced intelligence
function findResponse(message) {
  const lowerMessage = message.toLowerCase().trim()

  // Check for profanity
  if (containsProfanity(message)) {
    return edgeCaseResponses.profanity
  }

  // Check for unintelligible input
  if (isUnintelligible(message)) {
    return edgeCaseResponses.unintelligible
  }

  // Check for repetition (same message within last 3 messages)
  recentMessages.push(lowerMessage)
  if (recentMessages.length > 10) {
    recentMessages.shift()
  }
  const messageCount = recentMessages.filter(m => m === lowerMessage).length
  if (messageCount >= 3) {
    recentMessages = [] // Reset to avoid getting stuck
    return edgeCaseResponses.repeated
  }

  // Enhanced keyword matching with better scoring and priority
  let bestMatch = null
  let bestScore = 0

  // Conversational patterns (greetings, goodbyes, apologies, etc.) - first 30 entries
  // These get priority for short messages
  const isShortMessage = lowerMessage.split(' ').length <= 5

  for (let i = 0; i < knowledgeBase.length; i++) {
    const entry = knowledgeBase[i]
    let score = 0
    let matchedKeywords = []

    for (const keyword of entry.keywords) {
      const keywordLower = keyword.toLowerCase()

      // Exact word match gets highest priority
      const wordBoundaryRegex = new RegExp(`\\b${keywordLower}\\b`, 'i')
      if (wordBoundaryRegex.test(lowerMessage)) {
        score += keyword.length * 2 // Double score for exact matches
        matchedKeywords.push(keyword)
      }
      // Partial match gets normal score
      else if (lowerMessage.includes(keywordLower)) {
        score += keyword.length
        matchedKeywords.push(keyword)
      }
    }

    // Bonus points for multiple keyword matches
    if (matchedKeywords.length > 1) {
      score += matchedKeywords.length * 5
    }

    // Priority boost for conversational patterns on short messages
    // Assume first 30 knowledge base entries are conversational
    if (i < 30 && isShortMessage && score > 0) {
      score *= 1.5 // 50% boost for conversational patterns on short messages
    }

    // Exact short phrase match (like "hi", "bye", "thanks") gets massive boost
    if (entry.keywords.some(k => k.toLowerCase() === lowerMessage)) {
      score *= 3
    }

    if (score > bestScore) {
      bestScore = score
      bestMatch = entry
    }
  }

  if (bestMatch && bestScore > 0) {
    return bestMatch.response
  }

  return "I'm not sure I understand that question. I can help you with:\n• Taxes & Revenue\n• IDs & Passports\n• Police & Legal matters\n• Banking\n• Healthcare\n• Housing\n• Postal Services\n\nCould you please rephrase your question or ask about one of these topics?"
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

  const handleSend = () => {
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

    // Simulate typing delay before streaming starts
    setTimeout(() => {
      const response = findResponse(userMessage.text)
      const botMessageId = Date.now() + 1

      // Create placeholder message for streaming
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

      // Stream text character by character with variable intervals
      let charIndex = 0

      // Clear any existing streaming timeout
      if (streamingRef.current) {
        clearTimeout(streamingRef.current)
      }

      const streamNextChunk = () => {
        if (charIndex < response.length) {
          // Variable chunk size to simulate LLM thinking patterns
          // Smaller chunks near punctuation, larger chunks for normal text
          const char = response[charIndex]
          const nextChars = response.slice(charIndex, charIndex + 5)
          const isPunctuation = /[.,!?;:]/.test(char)
          const isEndOfSentence = /[.!?]/.test(char)
          const isNewline = char === '\n'

          // Vary chunk size: 1-2 for punctuation, 2-5 for normal text
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

          // Variable delay to simulate LLM thinking
          let delay
          if (isEndOfSentence) {
            // Longer pause after sentences (simulate processing)
            delay = 150 + Math.random() * 100
          } else if (isPunctuation) {
            // Medium pause after commas/semicolons
            delay = 80 + Math.random() * 60
          } else if (isNewline) {
            // Pause at line breaks
            delay = 100 + Math.random() * 80
          } else if (Math.random() < 0.15) {
            // Random occasional "thinking" pauses (15% chance)
            delay = 60 + Math.random() * 90
          } else {
            // Normal streaming speed with slight variation
            delay = 12 + Math.random() * 15
          }

          streamingRef.current = setTimeout(streamNextChunk, delay)
        } else {
          // Streaming complete
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
