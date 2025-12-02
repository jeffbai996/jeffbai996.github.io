import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import './Auth.css'

export default function AuthCallback() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { supabase } = useAuth()

  const [status, setStatus] = useState('verifying') // verifying, success, error
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check what type of callback this is
        const type = searchParams.get('type')
        const errorDescription = searchParams.get('error_description')
        const error = searchParams.get('error')

        // Handle errors from Supabase
        if (error || errorDescription) {
          setStatus('error')
          setError(errorDescription || error || 'Verification failed')
          return
        }

        // Get the current session (Supabase should have already processed the URL)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        if (session) {
          // Successfully verified and logged in
          if (type === 'signup') {
            setStatus('success')
            setMessage('Email verified successfully! Welcome to PrayaPass.')
          } else if (type === 'recovery') {
            setStatus('success')
            setMessage('Email verified. You can now reset your password.')
            // Redirect to password reset page
            setTimeout(() => {
              navigate('/forgot-password?type=recovery', { replace: true })
            }, 2000)
            return
          } else {
            setStatus('success')
            setMessage('Verification successful!')
          }

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/account', { replace: true })
          }, 3000)
        } else {
          // No session means verification failed or expired
          setStatus('error')
          setError('Verification link expired or invalid. Please try registering again.')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        setStatus('error')
        setError(err.message || 'Verification failed. Please try again.')
      }
    }

    handleAuthCallback()
  }, [navigate, searchParams, supabase])

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* PrayaPass Logo */}
          <div className="auth-logo">
            <div className="prayapass-logo">
              <svg viewBox="0 0 40 40" fill="none" className="logo-icon">
                <rect width="40" height="40" rx="8" fill="url(#logo-gradient-callback)" />
                <path
                  d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <path
                  d="M20 16v8M16 20h8"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="logo-gradient-callback" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#f97316" />
                    <stop offset="1" stopColor="#ea580c" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="logo-text">
                <span className="logo-name">PrayaPass</span>
                <span className="logo-tagline">Republic of Praya</span>
              </div>
            </div>
          </div>

          {/* Verifying State */}
          {status === 'verifying' && (
            <>
              <div className="auth-header">
                <div className="verifying-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.3" />
                  </svg>
                  <span className="spinner-large" />
                </div>
                <h1>Verifying your email</h1>
                <p>Please wait while we confirm your email address...</p>
              </div>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className="auth-header">
                <div className="success-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h1>Email Verified!</h1>
                <p>{message}</p>
              </div>

              <div className="auth-info-box success">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p>Redirecting you to your dashboard...</p>
              </div>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className="auth-header">
                <div className="error-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                </div>
                <h1>Verification Failed</h1>
                <p>{error}</p>
              </div>

              <div className="auth-form">
                <button
                  onClick={() => navigate('/register')}
                  className="auth-button"
                >
                  Back to Registration
                </button>

                <div className="auth-divider">
                  <span>or</span>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="auth-button-secondary"
                >
                  Go to Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
