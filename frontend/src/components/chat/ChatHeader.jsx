import PropTypes from 'prop-types'

export default function ChatHeader({ departmentContext, onClose }) {
  return (
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
      <button className="chat-widget-close" onClick={onClose} aria-label="Close chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

ChatHeader.propTypes = {
  departmentContext: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
}
