import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import OTPInput from '../../components/auth/OTPInput'
import './Auth.css'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { forgotPassword, resetPassword } = useAuth()

  const [step, setStep] = useState('email') // 'email' | 'code' | 'newPassword'
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [otpError, setOtpError] = useState(null)
  const [resendCooldown, setResendCooldown] = useState(0)

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
      setStep('code')
      setResendCooldown(60)
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOTPComplete = async (inputCode) => {
    setCode(inputCode)
    setOtpError(null)
    setStep('newPassword')
  }

  const handleResend = async () => {
    if (resendCooldown > 0) return

    try {
      await forgotPassword(email)
      setResendCooldown(60)
      const interval = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError(err.message)
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
      await resetPassword(email, code, newPassword)
      navigate('/login', {
        state: { message: 'Password reset successfully. Please login with your new password.' }
      })
    } catch (err) {
      setError(err.message)
      if (err.message.includes('code')) {
        setStep('code')
        setOtpError(err.message)
      }
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

          {step === 'email' && (
            <>
              <div className="auth-header">
                <h1>Reset your password</h1>
                <p>Enter your email and we'll send you a code to reset your password</p>
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
                      Sending code...
                    </>
                  ) : (
                    'Send reset code'
                  )}
                </button>
              </form>
            </>
          )}

          {step === 'code' && (
            <>
              <div className="auth-header">
                <h1>Enter verification code</h1>
                <p>
                  We've sent a 6-digit code to <strong>{email}</strong>
                </p>
              </div>

              <div className="auth-form">
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

                <OTPInput
                  length={6}
                  onComplete={handleOTPComplete}
                  disabled={loading}
                  error={otpError}
                />

                <div className="otp-actions">
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={handleResend}
                    disabled={resendCooldown > 0}
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : "Didn't receive the code? Resend"}
                  </button>
                </div>

                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    setStep('email')
                    setError(null)
                    setOtpError(null)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Change email
                </button>
              </div>
            </>
          )}

          {step === 'newPassword' && (
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
