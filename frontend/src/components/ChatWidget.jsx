import { useState, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import './ChatWidget.css'
import { useGeminiLive, VoiceState, ConnectionState } from '../hooks/useGeminiLive'
import { useConversation } from '../hooks/useConversation'
import {
  getDepartmentContext,
  getDepartmentData,
} from '../utils/departmentContext'
import ChatHeader from './chat/ChatHeader'
import ChatMessageList from './chat/ChatMessageList'
import ChatInput from './chat/ChatInput'
import VoiceModeOverlay from './chat/VoiceModeOverlay'

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
    suggestionChips,
    sendMessage,
    addGreeting,
    clearSuggestionChips,
  } = useConversation({
    departmentContext,
    currentDeptData,
    initialGreeting: departmentContext.greeting,
  })

  const [lastDeptId, setLastDeptId] = useState(null)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const {
    connectionState,
    voiceState,
    isVoiceModeActive,
    toggleVoiceMode,
    stopVoiceMode,
    error: voiceError,
  } = useGeminiLive()

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
      setShowQuickActions(true)
      if (lastDeptId !== null) {
        addGreeting(`${departmentContext.greeting}\n\nI noticed you're now on the ${departmentContext.name} page. How can I assist you?`)
      }
    }
  }, [departmentContext, lastDeptId, addGreeting])

  const handleQuickAction = (query) => {
    setShowQuickActions(false)
    setInputValue(query)
    setTimeout(() => {
      setInputValue('')
      sendMessage(query)
    }, 100)
  }

  // eslint-disable-next-line no-unused-vars
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

  return (
    <>
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

      <div className={`chat-widget-panel ${isOpen ? 'open' : ''}`}>
        <ChatHeader departmentContext={departmentContext} onClose={() => setIsOpen(false)} />

        <ChatMessageList
          messages={messages}
          isTyping={isTyping}
          streamingMessageId={streamingMessageId}
          showQuickActions={showQuickActions}
          quickActions={departmentContext.quickActions}
          onQuickActionClick={handleQuickAction}
          suggestionChips={suggestionChips}
          onSuggestionChipClick={(chip) => {
            clearSuggestionChips()
            sendMessage(chip.query || chip.text)
          }}
        />

        {isVoiceModeActive && (
          <VoiceModeOverlay
            voiceState={voiceState}
            statusText={getVoiceStatusText()}
            errorText={voiceError}
            onStop={stopVoiceMode}
          />
        )}

        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleSend}
          isOpen={isOpen}
          isVoiceModeActive={isVoiceModeActive}
          voiceEnabled={VOICE_ENABLED}
          voiceState={voiceState}
          onToggleVoice={toggleVoiceMode}
        />

        <div className="chat-widget-footer">Powered by GP.AI</div>
      </div>
    </>
  )
}

ChatWidget.propTypes = {
  currentPath: PropTypes.string.isRequired,
}
