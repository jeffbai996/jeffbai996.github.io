import { useState, useEffect } from 'react'
import {
  is2FAEnabled,
  get2FAMethod,
  enable2FA,
  disable2FA,
  sendSMSOTP,
  sendEmailOTP,
  verifySMSOTP,
  verifyEmailOTP,
  generateBackupCodes,
  saveBackupCodes,
  maskPhoneNumber,
  maskEmail
} from '../utils/twoFactor'
import './TwoFactorAuth.css'

export default function TwoFactorAuth() {
  const [enabled, setEnabled] = useState(false)
  const [method, setMethod] = useState('sms')
  const [showSetup, setShowSetup] = useState(false)
  const [setupStep, setSetupStep] = useState(1) // 1: choose method, 2: verify, 3: backup codes
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [backupCodes, setBackupCodes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setEnabled(is2FAEnabled())
    setMethod(get2FAMethod())
  }, [])

  const handleStartSetup = () => {
    setShowSetup(true)
    setSetupStep(1)
    setError('')
    setSuccess('')
  }

  const handleSendOTP = async () => {
    setLoading(true)
    setError('')

    try {
      let result
      if (method === 'sms') {
        if (!phoneNumber) {
          setError('Please enter your phone number')
          setLoading(false)
          return
        }
        result = await sendSMSOTP(phoneNumber)
      } else {
        if (!email) {
          setError('Please enter your email')
          setLoading(false)
          return
        }
        result = await sendEmailOTP(email)
      }

      if (result.success) {
        setSuccess(result.message)
        setSetupStep(2)
      } else {
        setError(result.error || 'Failed to send code')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  const handleVerifyOTP = () => {
    setError('')

    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter the 6-digit code')
      return
    }

    const result = method === 'sms' ? verifySMSOTP(otpCode) : verifyEmailOTP(otpCode)

    if (result.success) {
      // Generate backup codes
      const codes = generateBackupCodes(10)
      setBackupCodes(codes)
      saveBackupCodes(codes)

      // Enable 2FA
      enable2FA(method)
      setEnabled(true)

      setSuccess('2FA enabled successfully!')
      setSetupStep(3)
    } else {
      setError(result.error)
    }
  }

  const handleDisable2FA = () => {
    if (confirm('Are you sure you want to disable 2FA? This will make your account less secure.')) {
      disable2FA()
      setEnabled(false)
      setShowSetup(false)
      setSuccess('2FA has been disabled')
    }
  }

  const handleFinish = () => {
    setShowSetup(false)
    setSetupStep(1)
    setOtpCode('')
    setPhoneNumber('')
    setEmail('')
    setSuccess('2FA setup complete!')
  }

  if (showSetup) {
    return (
      <div className="twofa-container">
        <div className="twofa-header">
          <h3>Set Up Two-Factor Authentication</h3>
          <button onClick={() => setShowSetup(false)} className="twofa-close" aria-label="Close setup">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="twofa-alert error" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        {success && (
          <div className="twofa-alert success" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {success}
          </div>
        )}

        {setupStep === 1 && (
          <div className="twofa-step">
            <h4>Step 1: Choose your 2FA method</h4>
            <div className="twofa-methods">
              <label className="twofa-method">
                <input
                  type="radio"
                  name="2fa-method"
                  value="sms"
                  checked={method === 'sms'}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <div className="twofa-method-content">
                  <div className="twofa-method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                      <line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                  </div>
                  <div>
                    <strong>SMS Text Message</strong>
                    <p>Receive codes via SMS</p>
                  </div>
                </div>
              </label>

              <label className="twofa-method">
                <input
                  type="radio"
                  name="2fa-method"
                  value="email"
                  checked={method === 'email'}
                  onChange={(e) => setMethod(e.target.value)}
                />
                <div className="twofa-method-content">
                  <div className="twofa-method-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div>
                    <strong>Email</strong>
                    <p>Receive codes via email</p>
                  </div>
                </div>
              </label>
            </div>

            {method === 'sms' && (
              <div className="twofa-input-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="twofa-input"
                />
              </div>
            )}

            {method === 'email' && (
              <div className="twofa-input-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="twofa-input"
                />
              </div>
            )}

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="twofa-button primary"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </div>
        )}

        {setupStep === 2 && (
          <div className="twofa-step">
            <h4>Step 2: Enter verification code</h4>
            <p className="twofa-description">
              We've sent a 6-digit code to {method === 'sms' ? maskPhoneNumber(phoneNumber) : maskEmail(email)}
            </p>

            <div className="twofa-input-group">
              <label htmlFor="otp-code">Verification Code</label>
              <input
                id="otp-code"
                type="text"
                placeholder="000000"
                maxLength="6"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="twofa-input twofa-otp"
              />
            </div>

            <div className="twofa-button-group">
              <button
                onClick={handleVerifyOTP}
                className="twofa-button primary"
              >
                Verify Code
              </button>
              <button
                onClick={handleSendOTP}
                className="twofa-button secondary"
              >
                Resend Code
              </button>
            </div>
          </div>
        )}

        {setupStep === 3 && (
          <div className="twofa-step">
            <h4>Step 3: Save your backup codes</h4>
            <p className="twofa-description">
              Store these backup codes in a safe place. You can use them to access your account if you lose your device.
            </p>

            <div className="twofa-backup-codes">
              {backupCodes.map((code, i) => (
                <code key={i} className="twofa-backup-code">{code}</code>
              ))}
            </div>

            <button
              onClick={handleFinish}
              className="twofa-button primary"
            >
              Finish Setup
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="twofa-status">
      <div className="twofa-status-header">
        <div>
          <h3>Two-Factor Authentication</h3>
          <p>Add an extra layer of security to your account</p>
        </div>
        <div className={`twofa-badge ${enabled ? 'enabled' : 'disabled'}`}>
          {enabled ? 'Enabled' : 'Disabled'}
        </div>
      </div>

      {enabled ? (
        <div className="twofa-enabled-info">
          <div className="twofa-info-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span>Your account is protected with 2FA via {method === 'sms' ? 'SMS' : 'Email'}</span>
          </div>

          <button onClick={handleDisable2FA} className="twofa-button danger">
            Disable 2FA
          </button>
        </div>
      ) : (
        <div className="twofa-disabled-info">
          <p>Enable 2FA to add an extra layer of security to your account. You'll need to enter a code from your phone or email in addition to your password.</p>

          <button onClick={handleStartSetup} className="twofa-button primary">
            Enable 2FA
          </button>
        </div>
      )}
    </div>
  )
}
