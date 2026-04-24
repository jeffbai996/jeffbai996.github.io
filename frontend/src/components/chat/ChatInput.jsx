import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

// Detect iOS once at module scope — used in focus and keyboard handling
const IS_IOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

export default function ChatInput({
  value,
  onChange,
  onSend,
  isOpen,
  isVoiceModeActive,
  voiceEnabled,
  voiceState,
  onToggleVoice,
}) {
  const inputRef = useRef(null)

  // Focus input when chat opens — 300ms delay on iOS to prevent keyboard issues
  useEffect(() => {
    if (isOpen) {
      const delay = IS_IOS ? 300 : 100
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
          if (IS_IOS) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          }
        }
      }, delay)
    }
  }, [isOpen])

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSend()
      // iOS: blur then refocus so keyboard dismisses briefly on send
      if (IS_IOS) {
        inputRef.current?.blur()
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }
  }

  const handleSendClick = () => {
    onSend()
    // Keep focus on input for better UX
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div className={`chat-widget-input ${isVoiceModeActive ? 'voice-active' : ''}`}>
      <input
        ref={inputRef}
        type="text"
        placeholder={isVoiceModeActive ? 'Voice mode active...' : 'Type your question...'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={isVoiceModeActive}
      />
      {voiceEnabled && (
        <button
          className={`chat-voice-button ${isVoiceModeActive ? 'active' : ''} ${voiceState}`}
          onClick={onToggleVoice}
          type="button"
          aria-label={isVoiceModeActive ? 'Stop voice mode' : 'Start voice mode'}
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
        disabled={!value.trim() || isVoiceModeActive}
        type="button"
        aria-label="Send message"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      </button>
    </div>
  )
}

ChatInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isVoiceModeActive: PropTypes.bool.isRequired,
  voiceEnabled: PropTypes.bool.isRequired,
  voiceState: PropTypes.string.isRequired,
  onToggleVoice: PropTypes.func.isRequired,
}
