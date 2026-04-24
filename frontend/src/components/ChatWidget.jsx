import { useState, useEffect, useMemo, useRef } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './ChatWidget.css'
import QuickActionIcon from './chat/QuickActionIcon'
import { useGeminiLive, VoiceState, ConnectionState } from '../hooks/useGeminiLive'
import { useConversation } from '../hooks/useConversation'
import {
  getDepartmentContext,
  getDepartmentData,
} from '../utils/departmentContext'
import { parseFormattedText } from '../utils/chatMarkdown'

const VOICE_ENABLED = true // Enable voice chat feature

export default function ChatWidget({ currentPath = '/' }) {
  const navigate = useNavigate()

  // Get department context based on current route
  const departmentContext = useMemo(() => getDepartmentContext(currentPath), [currentPath])
  const currentDeptData = useMemo(() => getDepartmentData(departmentContext.id), [departmentContext.id])

  const {
    messages,
    isTyping,
    streamingMessageId,
    streamingText,
    suggestionChips,
    sendMessage,
    addGreeting,
    clearSuggestionChips,
  } = useConversation({
    departmentContext,
    currentDeptData,
    initialGreeting: departmentContext.greeting,
  })

  // Track if greeting has been updated for current department
  const [lastDeptId, setLastDeptId] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(true)

  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

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
        addGreeting(`${departmentContext.greeting}\n\nI noticed you're now on the ${departmentContext.name} page. How can I assist you?`)
      }
    }
  }, [departmentContext, lastDeptId, addGreeting])

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

  // Handle quick action chip clicks
  const handleQuickAction = (query) => {
    setShowQuickActions(false)
    setInputValue(query)
    // Trigger send after a brief delay to show the input
    setTimeout(() => {
      setInputValue('')
      sendMessage(query)
    }, 100)
  }

  // Handle navigation to sub-pages
  const handleNavigation = (url) => {
    navigate(url)
  }

  const handleSend = async () => {
    if (!inputValue.trim()) return
    const messageText = inputValue.trim()
    setInputValue('')
    setShowQuickActions(false)
    await sendMessage(messageText)
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
                    onClick={() => { clearSuggestionChips(); sendMessage(chip.query || chip.text); }}
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
