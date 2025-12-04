import React from 'react'
import './ProgressTracker.css'

export default function ProgressTracker({
  steps = [],
  currentStep = 0,
  orientation = 'horizontal', // 'horizontal' or 'vertical'
  showLabels = true,
  showDescriptions = false
}) {
  const getStepStatus = (index) => {
    if (index < currentStep) return 'completed'
    if (index === currentStep) return 'active'
    return 'pending'
  }

  const renderStepIcon = (step, status) => {
    if (status === 'completed') {
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      )
    }

    if (step.icon) {
      return step.icon
    }

    return <div className="step-number">{step.number || ''}</div>
  }

  if (orientation === 'vertical') {
    return (
      <div className="progress-tracker vertical">
        {steps.map((step, index) => {
          const status = getStepStatus(index)
          const isLast = index === steps.length - 1

          return (
            <div key={index} className={`tracker-step ${status}`}>
              <div className="step-indicator">
                <div className="step-icon">{renderStepIcon(step, status)}</div>
                {!isLast && <div className="step-connector"></div>}
              </div>

              <div className="step-content">
                {showLabels && <div className="step-label">{step.label}</div>}
                {showDescriptions && step.description && (
                  <div className="step-description">{step.description}</div>
                )}
                {step.date && <div className="step-date">{step.date}</div>}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="progress-tracker horizontal">
      {steps.map((step, index) => {
        const status = getStepStatus(index)
        const isLast = index === steps.length - 1

        return (
          <React.Fragment key={index}>
            <div className={`tracker-step ${status}`}>
              <div className="step-icon">{renderStepIcon(step, status)}</div>
              {showLabels && (
                <div className="step-content">
                  <div className="step-label">{step.label}</div>
                  {showDescriptions && step.description && (
                    <div className="step-description">{step.description}</div>
                  )}
                  {step.date && <div className="step-date">{step.date}</div>}
                </div>
              )}
            </div>

            {!isLast && (
              <div className={`step-connector ${index < currentStep ? 'completed' : 'pending'}`}>
                <div className="connector-line"></div>
              </div>
            )}
          </React.Fragment>
        )
      })}
    </div>
  )
}

// Enhanced version with timeline features
export function TimelineTracker({
  events = [],
  title = 'Timeline',
  showTime = true,
  compact = false
}) {
  return (
    <div className={`timeline-tracker ${compact ? 'compact' : ''}`}>
      {title && <h3 className="timeline-title">{title}</h3>}

      <div className="timeline-events">
        {events.map((event, index) => (
          <div key={index} className={`timeline-event ${event.status || 'default'}`}>
            <div className="event-indicator">
              <div className="event-icon">
                {event.icon || (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                )}
              </div>
              {index < events.length - 1 && <div className="event-connector"></div>}
            </div>

            <div className="event-content">
              <div className="event-header">
                <div className="event-title">{event.title}</div>
                {showTime && event.time && (
                  <div className="event-time">{event.time}</div>
                )}
              </div>

              {event.description && (
                <div className="event-description">{event.description}</div>
              )}

              {event.metadata && (
                <div className="event-metadata">
                  {Object.entries(event.metadata).map(([key, value]) => (
                    <div key={key} className="metadata-item">
                      <span className="metadata-key">{key}:</span>
                      <span className="metadata-value">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Status badge component
export function StatusBadge({ status, label }) {
  const statusColors = {
    pending: { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
    'in-progress': { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
    completed: { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0' },
    cancelled: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' },
    approved: { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0' },
    rejected: { bg: '#fee2e2', text: '#991b1b', border: '#fecaca' },
    default: { bg: '#f3f4f6', text: '#1f2937', border: '#e5e7eb' }
  }

  const colors = statusColors[status] || statusColors.default

  return (
    <span
      className="status-badge"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`
      }}
    >
      {label || status}
    </span>
  )
}
