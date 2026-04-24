import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { parseFormattedText } from '../../utils/chatMarkdown'
import QuickActionIcon from './QuickActionIcon'

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function ChatMessageList({
  messages,
  isTyping,
  streamingMessageId,
  showQuickActions,
  quickActions,
  onQuickActionClick,
  suggestionChips,
  onSuggestionChipClick,
}) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
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

      {showQuickActions && !isTyping && quickActions && (
        <div className="chat-quick-actions">
          <p className="quick-actions-label">Quick questions:</p>
          <div className="quick-actions-chips">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="quick-action-chip"
                onClick={() => onQuickActionClick(action.query)}
                type="button"
              >
                <QuickActionIcon icon={action.icon} />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {suggestionChips.length > 0 && !isTyping && !streamingMessageId && (
        <div
          className="chat-quick-actions ai-suggestions"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="quick-actions-label">Related questions:</p>
          <div className="quick-actions-chips">
            {suggestionChips.map((chip, i) => (
              <button
                key={i}
                className="quick-action-chip ai-chip"
                onClick={() => onSuggestionChipClick(chip)}
                type="button"
              >
                <span>{chip.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}

ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      time: PropTypes.instanceOf(Date).isRequired,
      isStreaming: PropTypes.bool,
    })
  ).isRequired,
  isTyping: PropTypes.bool.isRequired,
  streamingMessageId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  showQuickActions: PropTypes.bool.isRequired,
  quickActions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string.isRequired,
      query: PropTypes.string.isRequired,
    })
  ),
  onQuickActionClick: PropTypes.func.isRequired,
  suggestionChips: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      query: PropTypes.string,
    })
  ).isRequired,
  onSuggestionChipClick: PropTypes.func.isRequired,
}
