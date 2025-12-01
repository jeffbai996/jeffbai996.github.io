import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import OTPInput from '../../components/auth/OTPInput'
import './Auth.css'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, verify2FA, resend2FA } = useAuth()

  const [step, setStep] = useState('credentials') // 'credentials' | '2fa'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [otpError, setOtpError] = useState(null)

  // 2FA state
  const [userId, setUserId] = useState(null)
  const [twoFactorMethod, setTwoFactorMethod] = useState(null)
  const [maskedContact, setMaskedContact] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  const from = location.state?.from?.pathname || '/'

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const result = await login(email, password)

      if (result.requires2FA) {
        setUserId(result.userId)
        setTwoFactorMethod(result.method)
        setMaskedContact(result.method === 'EMAIL_OTP' ? result.maskedEmail : result.maskedPhone)
        setStep('2fa')
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleOTPComplete = async (code) => {
    setOtpError(null)
    setLoading(true)

    try {
      await verify2FA(userId, code)
      navigate(from, { replace: true })
    } catch (err) {
      setOtpError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend2FA = async () => {
    if (resendCooldown > 0) return

    try {
      await resend2FA(userId)
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

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          {/* PrayaPass Logo */}
          <div className="auth-logo">
            <div className="prayapass-logo">
              <svg viewBox="0 0 40 40" fill="none" className="logo-icon">
                <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
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
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
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

          {step === 'credentials' ? (
            <>
              <div className="auth-header">
                <h1>Welcome back</h1>
                <p>Sign in to access government services</p>
              </div>

              <form onSubmit={handleCredentialsSubmit} className="auth-form">
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

                <div className="form-group">
                  <div className="label-row">
                    <label htmlFor="password">Password</label>
                    <Link to="/forgot-password" className="forgot-link">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>

                <div className="form-group disclaimer">
                  <label className="radio-disclaimer-label">
                    <input type="radio" name="disclaimer" required />
                    <span>
                      By signing in, I agree to the{' '}
                      <a href="#terms" target="_blank" rel="noopener noreferrer">Terms of Use</a>
                      {' '}and acknowledge the{' '}
                      <a href="#privacy" target="_blank" rel="noopener noreferrer">Privacy Statement</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Signing in...
                    </>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </form>

              <div className="auth-divider">
                <span>or</span>
              </div>

              <div className="auth-alt-methods">
                <button className="alt-method-btn" disabled>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12.01" y2="18" />
                  </svg>
                  Login with PrayaPass App
                  <span className="coming-soon">Coming soon</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="auth-header">
                <h1>Verify your identity</h1>
                <p>
                  Enter the 6-digit code sent to{' '}
                  <strong>{maskedContact}</strong>
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
                    onClick={handleResend2FA}
                    disabled={resendCooldown > 0}
                  >
                    {resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : 'Resend code'}
                  </button>
                </div>

                <button
                  type="button"
                  className="back-btn"
                  onClick={() => {
                    setStep('credentials')
                    setError(null)
                    setOtpError(null)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to login
                </button>
              </div>
            </>
          )}

          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>

        <div className="auth-info">
          <div className="info-header">
            <h3>What is PrayaPass?</h3>
            <p>Your trusted digital identity for seamless access to government services</p>
          </div>

          <div className="info-features">
            <div className="info-feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Bank-Level Security</h4>
                <p>Multi-factor authentication and advanced encryption protect your data</p>
              </div>
            </div>

            <div className="info-feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>One Login, All Services</h4>
                <p>Access 20+ government agencies with a single secure account</p>
              </div>
            </div>

            <div className="info-feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Mobile App Available</h4>
                <p>Quick and convenient login with biometrics via PrayaPass app</p>
              </div>
            </div>

            <div className="info-feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>Digital Services</h4>
                <p>File taxes, apply for permits, and manage documents digitally</p>
              </div>
            </div>

            <div className="info-feature">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
              </div>
              <div className="feature-content">
                <h4>24/7 Support</h4>
                <p>Get help anytime with our dedicated support team</p>
              </div>
            </div>
          </div>

          <div className="info-help">
            <div className="help-links">
              <a href="#help" className="help-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
                </svg>
                Need help?
              </a>
              <a href="#faq" className="help-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                View FAQ
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
