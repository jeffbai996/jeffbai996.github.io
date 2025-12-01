import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import './Auth.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { forgotPassword, resetPassword } = useAuth()

  // Check if we're in reset mode (came from email link)
  const isResetMode = searchParams.get('type') === 'recovery'

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [emailSent, setEmailSent] = useState(false)

  const passwordRequirements = [
    { regex: /.{8,}/, label: 'At least 8 characters' },
    { regex: /[A-Z]/, label: 'One uppercase letter' },
    { regex: /[a-z]/, label: 'One lowercase letter' },
    { regex: /\d/, label: 'One number' },
    { regex: /[@$!%*?&]/, label: 'One special character (@$!%*?&)' },
  ]

  const checkPasswordStrength = (password) => {
    return passwordRequirements.map((req) => ({
      ...req,
      met: req.regex.test(password),
    }))
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await forgotPassword(email)
      setEmailSent(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setError(null)

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const strength = checkPasswordStrength(newPassword)
    if (!strength.every((req) => req.met)) {
      setError('Password does not meet requirements')
      return
    }

    setLoading(true)

    try {
      await resetPassword(newPassword)
      navigate('/login', {
        state: { message: 'Password reset successfully. Please login with your new password.' }
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const passwordStrength = checkPasswordStrength(newPassword)

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* PrayaPass Logo */}
          <div className="auth-logo">
            <div className="prayapass-logo">
              <svg viewBox="0 0 40 40" fill="none" className="logo-icon">
                <rect width="40" height="40" rx="8" fill="url(#logo-gradient-fp)" />
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
                  <linearGradient id="logo-gradient-fp" x1="0" y1="0" x2="40" y2="40">
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

          {/* Reset Mode - User clicked email link */}
          {isResetMode && (
            <>
              <div className="auth-header">
                <h1>Create new password</h1>
                <p>Choose a strong password for your account</p>
              </div>

              <form onSubmit={handleResetPassword} className="auth-form">
                {error && (
                  <div className="auth-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="newPassword">New password</label>
                  <input
                    type="password"
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  {newPassword && (
                    <ul className="password-requirements">
                      {passwordStrength.map((req, i) => (
                        <li key={i} className={req.met ? 'met' : ''}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            {req.met ? (
                              <path d="M20 6L9 17l-5-5" />
                            ) : (
                              <circle cx="12" cy="12" r="10" />
                            )}
                          </svg>
                          {req.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm new password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Resetting password...
                    </>
                  ) : (
                    'Reset password'
                  )}
                </button>
              </form>
            </>
          )}

          {/* Email Sent Success */}
          {!isResetMode && emailSent && (
            <>
              <div className="auth-header">
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h1>Check your email</h1>
                <p>
                  We've sent a password reset link to <strong>{email}</strong>.
                  Click the link in the email to reset your password.
                </p>
              </div>

              <div className="auth-form">
                <p className="email-note">
                  Didn't receive the email? Check your spam folder or{' '}
                  <button
                    type="button"
                    className="link-button"
                    onClick={() => setEmailSent(false)}
                  >
                    try again
                  </button>
                </p>
              </div>
            </>
          )}

          {/* Request Reset Form */}
          {!isResetMode && !emailSent && (
            <>
              <div className="auth-header">
                <h1>Reset your password</h1>
                <p>Enter your email and we'll send you a link to reset your password</p>
              </div>

              <form onSubmit={handleEmailSubmit} className="auth-form">
                {error && (
                  <div className="auth-error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Sending link...
                    </>
                  ) : (
                    'Send reset link'
                  )}
                </button>
              </form>
            </>
          )}

          <div className="auth-footer">
            <p>
              Remember your password?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
