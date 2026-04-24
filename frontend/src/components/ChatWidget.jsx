import { useState, useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './ChatWidget.css'
import QuickActionIcon from './chat/QuickActionIcon'
import {
  classifyIntent,
} from '../utils/intentRecognition'
import { findResponse } from '../logic/chatRuleBased'
import geminiService from '../services/geminiService'
import { useGeminiLive, VoiceState, ConnectionState } from '../hooks/useGeminiLive'
import {
  getDepartmentContext,
  getDepartmentData,
  findRelevantSubPage,
  generateNavigationOffer,
  getDepartmentPriorityBoost
} from '../utils/departmentContext'
import conversationMemory from '../utils/conversationMemory'
import { callGeminiAPI, shouldUseGemini, GEMINI_ENABLED } from '../logic/chatGemini'
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
import { parseFormattedText } from '../utils/chatMarkdown'

const VOICE_ENABLED = true // Enable voice chat feature

// NOTE: conversationContext and recentMessages are now managed as refs inside the ChatWidget component
// to prevent issues with multiple instances and proper React lifecycle management

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
  const [suggestionChips, setSuggestionChips] = useState([])
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

  // Cancel any in-flight Gemini request when the widget unmounts
  useEffect(() => {
    return () => {
      geminiService.cancel()
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
    // Cancel any previous in-flight request
    geminiService.cancel()

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: messageText,
      time: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)
    setShowQuickActions(false)
    setSuggestionChips([])

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
          charsToAdd = Math.min(Math.floor(Math.random() * 5) + 3, response.length - charIndex)
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
          delay = 100 + Math.random() * 80
        } else if (isPunctuation) {
          delay = 50 + Math.random() * 40
        } else if (isNewline) {
          delay = 70 + Math.random() * 50
        } else if (Math.random() < 0.12) {
          delay = 40 + Math.random() * 60
        } else {
          delay = 8 + Math.random() * 12
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
        // Show AI suggestion chips if available
        if (conversationContextRef.current.geminiSuggestions?.length > 0) {
          setSuggestionChips(conversationContextRef.current.geminiSuggestions)
          conversationContextRef.current.geminiSuggestions = []
        }
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
          {/* AI Suggestion Chips */}
          {suggestionChips.length > 0 && !isTyping && !streamingMessageId && (
            <div className="chat-quick-actions ai-suggestions" role="status" aria-live="polite" aria-atomic="true">
              <p className="quick-actions-label">Related questions:</p>
              <div className="quick-actions-chips">
                {suggestionChips.map((chip, i) => (
                  <button key={i} className="quick-action-chip ai-chip"
                    onClick={() => { setSuggestionChips([]); processMessage(chip.query || chip.text); }}
                    type="button">
                    <span>{chip.text}</span>
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

ChatWidget.propTypes = {
  currentPath: PropTypes.string.isRequired,
}
