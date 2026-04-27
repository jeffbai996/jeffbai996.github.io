import { Component } from 'react'
import PropTypes from 'prop-types'

// Fallback hex values mirror the CSS custom properties defined in global.css.
// These only render if CSS variables haven't loaded (e.g. very early paint).
const COLORS = {
  bgDark: 'var(--bg-dark, #0f0f0f)',
  bgCard: 'var(--bg-card, #1a1a1a)',
  bgElevated: 'var(--bg-elevated, #252525)',
  border: 'var(--border, #2a2a2a)',
  textPrimary: 'var(--text-primary, #fafafa)',
  textSecondary: 'var(--text-secondary, #a8a8a8)',
  textMuted: 'var(--text-muted, #737373)',
  primary: 'var(--primary, #f97316)',
  errorBg: 'rgba(239, 68, 68, 0.1)',
  errorStroke: '#ef4444',
}

/**
 * Error Boundary component to catch JavaScript errors in child components
 * and display a fallback UI instead of crashing the entire app.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  handleGoHome = () => {
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '24px',
          backgroundColor: COLORS.bgDark,
          color: COLORS.textPrimary,
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '500px',
            padding: '32px',
            backgroundColor: COLORS.bgCard,
            borderRadius: '16px',
            border: `1px solid ${COLORS.border}`
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 24px',
              backgroundColor: COLORS.errorBg,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke={COLORS.errorStroke}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>

            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              marginBottom: '12px',
              color: COLORS.textPrimary
            }}>
              Something went wrong
            </h1>

            <p style={{
              fontSize: '14px',
              color: COLORS.textSecondary,
              marginBottom: '24px',
              lineHeight: '1.6'
            }}>
              We apologize for the inconvenience. An unexpected error has occurred.
              Please try reloading the page or return to the home page.
            </p>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: COLORS.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background-color 0.2s'
                }}
              >
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                style={{
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: '600',
                  backgroundColor: COLORS.bgElevated,
                  color: COLORS.textSecondary,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background-color 0.2s'
                }}
              >
                Go to Home
              </button>
            </div>

            {import.meta.env.DEV && this.state.error && (
              <details style={{
                marginTop: '24px',
                textAlign: 'left',
                fontSize: '12px',
                color: COLORS.textMuted
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                  Error Details (Development Only)
                </summary>
                <pre style={{
                  padding: '12px',
                  backgroundColor: COLORS.bgElevated,
                  borderRadius: '8px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}>
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>

          <p style={{
            marginTop: '24px',
            fontSize: '12px',
            color: COLORS.textMuted
          }}>
            If this problem persists, please contact support.
          </p>
        </div>
      )
    }

    const { children } = this.props
    return children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ErrorBoundary
