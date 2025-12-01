import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import OTPInput from '../../components/auth/OTPInput'
import './Auth.css'

export default function Register() {
  const navigate = useNavigate()
  const { register, verifyEmail, resendVerification } = useAuth()

  const [step, setStep] = useState('details') // 'details' | 'verify'
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    // Validate password strength
    const strength = checkPasswordStrength(formData.password)
    if (!strength.every((req) => req.met)) {
      setError('Password does not meet requirements')
      return
    }

    setLoading(true)

    try {
      await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || undefined,
        password: formData.password,
      })
      setStep('verify')
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
      await verifyEmail(formData.email, code)
      navigate('/', { replace: true })
    } catch (err) {
      setOtpError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleResendVerification = async () => {
    if (resendCooldown > 0) return

    try {
      await resendVerification(formData.email)
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

  const passwordStrength = checkPasswordStrength(formData.password)

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card auth-card-wide">
          {/* PrayaPass Logo */}
          <div className="auth-logo">
            <div className="prayapass-logo">
              <svg viewBox="0 0 40 40" fill="none" className="logo-icon">
                <rect width="40" height="40" rx="8" fill="url(#logo-gradient-reg)" />
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
                  <linearGradient id="logo-gradient-reg" x1="0" y1="0" x2="40" y2="40">
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

          {step === 'details' ? (
            <>
              <div className="auth-header">
                <h1>Create your account</h1>
                <p>Get access to all government services with PrayaPass</p>
              </div>

              {/* Progress indicator */}
              <div className="register-progress">
                <div className="progress-step active">
                  <span className="step-number">1</span>
                  <span className="step-label">Your details</span>
                </div>
                <div className="progress-line" />
                <div className="progress-step">
                  <span className="step-number">2</span>
                  <span className="step-label">Verify email</span>
                </div>
              </div>

              <form onSubmit={handleRegisterSubmit} className="auth-form">
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

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Phone number <span className="optional">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+65 9123 4567"
                    disabled={loading}
                  />
                  <p className="form-hint">For SMS verification and 2FA</p>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                  {formData.password && (
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
                  <label htmlFor="confirmPassword">Confirm password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />
                </div>

                <div className="form-group terms">
                  <label className="checkbox-label">
                    <input type="checkbox" required />
                    <span>
                      I agree to the{' '}
                      <a href="#terms" target="_blank">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#privacy" target="_blank">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button type="submit" className="auth-button" disabled={loading}>
                  {loading ? (
                    <>
                      <span className="spinner" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="auth-header">
                <h1>Verify your email</h1>
                <p>
                  We've sent a 6-digit code to{' '}
                  <strong>{formData.email}</strong>
                </p>
              </div>

              {/* Progress indicator */}
              <div className="register-progress">
                <div className="progress-step completed">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="step-label">Your details</span>
                </div>
                <div className="progress-line active" />
                <div className="progress-step active">
                  <span className="step-number">2</span>
                  <span className="step-label">Verify email</span>
                </div>
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
                    onClick={handleResendVerification}
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
                    setStep('details')
                    setError(null)
                    setOtpError(null)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 12H5M12 19l-7-7 7-7" />
                  </svg>
                  Back to details
                </button>
              </div>
            </>
          )}

          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
