import PropTypes from 'prop-types'

export default function VoiceModeOverlay({ voiceState, statusText, errorText, onStop }) {
  return (
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
        <p className="voice-status">{statusText}</p>
        {errorText && <p className="voice-error">{errorText}</p>}
        <button
          className="voice-stop-button"
          onClick={onStop}
          type="button"
        >
          Stop Voice Mode
        </button>
      </div>
    </div>
  )
}

VoiceModeOverlay.propTypes = {
  voiceState: PropTypes.string.isRequired,
  statusText: PropTypes.string.isRequired,
  errorText: PropTypes.string,
  onStop: PropTypes.func.isRequired,
}
