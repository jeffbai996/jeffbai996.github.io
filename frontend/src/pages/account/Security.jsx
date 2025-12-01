import { useState, useEffect } from 'react'
import { useAuth } from '../../utils/AuthContext'
import OTPInput from '../../components/auth/OTPInput'
import './Account.css'

export default function Security() {
  const {
    user,
    changePassword,
    get2FASettings,
    enable2FA,
    confirm2FA,
    disable2FA,
    requestPhoneVerification,
    confirmPhoneVerification,
    getSessions,
    revokeSession,
    logoutAll,
  } = useAuth()

  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [twoFASettings, setTwoFASettings] = useState(null)
  const [sessions, setSessions] = useState([])

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showEnable2FAModal, setShowEnable2FAModal] = useState(false)
  const [showDisable2FAModal, setShowDisable2FAModal] = useState(false)
  const [showPhoneModal, setShowPhoneModal] = useState(false)

  // Form states
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  const [selected2FAMethod, setSelected2FAMethod] = useState('EMAIL_OTP')
  const [disablePassword, setDisablePassword] = useState('')
  const [phone, setPhone] = useState('')
  const [otpStep, setOtpStep] = useState(false)
  const [otpError, setOtpError] = useState(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [settings, sessionList] = await Promise.all([
        get2FASettings(),
        getSessions(),
      ])
      setTwoFASettings(settings)
      setSessions(sessionList)
    } catch (err) {
      console.error('Failed to load security data:', err)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError(null)

    if (passwordForm.new !== passwordForm.confirm) {
      setError('New passwords do not match')
      return
    }

    setLoading(true)
    try {
      await changePassword(passwordForm.current, passwordForm.new)
      setSuccess('Password changed successfully')
      setShowPasswordModal(false)
      setPasswordForm({ current: '', new: '', confirm: '' })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEnable2FA = async () => {
    setError(null)
    setLoading(true)
    try {
      await enable2FA(selected2FAMethod)
      setOtpStep(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm2FA = async (code) => {
    setOtpError(null)
    setLoading(true)
    try {
      await confirm2FA(selected2FAMethod, code)
      setSuccess('Two-factor authentication enabled')
      setShowEnable2FAModal(false)
      setOtpStep(false)
      await loadData()
    } catch (err) {
      setOtpError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDisable2FA = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await disable2FA(disablePassword)
      setSuccess('Two-factor authentication disabled')
      setShowDisable2FAModal(false)
      setDisablePassword('')
      await loadData()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneRequest = async () => {
    setError(null)
    setLoading(true)
    try {
      await requestPhoneVerification(phone)
      setOtpStep(true)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handlePhoneConfirm = async (code) => {
    setOtpError(null)
    setLoading(true)
    try {
      await confirmPhoneVerification(code)
      setSuccess('Phone number verified')
      setShowPhoneModal(false)
      setOtpStep(false)
      setPhone('')
      await loadData()
    } catch (err) {
      setOtpError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRevokeSession = async (sessionId) => {
    try {
      await revokeSession(sessionId)
      setSessions(sessions.filter(s => s.id !== sessionId))
      setSuccess('Session revoked')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleLogoutAll = async () => {
    if (window.confirm('This will sign you out from all devices including this one. Continue?')) {
      await logoutAll()
    }
  }

  const closeModals = () => {
    setShowPasswordModal(false)
    setShowEnable2FAModal(false)
    setShowDisable2FAModal(false)
    setShowPhoneModal(false)
    setOtpStep(false)
    setError(null)
    setOtpError(null)
  }

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Header */}
        <div className="security-header">
          <h1>Security Settings</h1>
          <p>Manage your account security and authentication methods</p>
        </div>

        {/* Alerts */}
        {success && (
          <div className="alert alert-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            {success}
            <button onClick={() => setSuccess(null)} className="alert-close">&times;</button>
          </div>
        )}

        {/* Password Section */}
        <section className="security-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Password</h2>
              <p>Change your account password</p>
            </div>
            <button className="section-action" onClick={() => setShowPasswordModal(true)}>
              Change password
            </button>
          </div>
        </section>

        {/* Two-Factor Authentication */}
        <section className="security-section">
          <div className="section-header">
            <div className={`section-icon ${twoFASettings?.enabled ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Two-Factor Authentication</h2>
              <p>
                {twoFASettings?.enabled
                  ? `Enabled via ${twoFASettings.method === 'SMS_OTP' ? 'SMS' : 'Email'}`
                  : 'Add an extra layer of security to your account'}
              </p>
            </div>
            {twoFASettings?.enabled ? (
              <button className="section-action danger" onClick={() => setShowDisable2FAModal(true)}>
                Disable
              </button>
            ) : (
              <button className="section-action primary" onClick={() => setShowEnable2FAModal(true)}>
                Enable
              </button>
            )}
          </div>
        </section>

        {/* Phone Verification */}
        <section className="security-section">
          <div className="section-header">
            <div className={`section-icon ${user?.phoneVerified ? 'active' : ''}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Phone Number</h2>
              <p>
                {user?.phoneVerified
                  ? `Verified: ****${user.phone?.slice(-4) || ''}`
                  : 'Add a phone number for SMS verification'}
              </p>
            </div>
            <button className="section-action" onClick={() => setShowPhoneModal(true)}>
              {user?.phoneVerified ? 'Change' : 'Add'}
            </button>
          </div>
        </section>

        {/* Active Sessions */}
        <section className="security-section sessions-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Active Sessions</h2>
              <p>Manage your logged-in devices</p>
            </div>
            <button className="section-action danger" onClick={handleLogoutAll}>
              Sign out all
            </button>
          </div>
          <div className="sessions-list">
            {sessions.map((session) => (
              <div key={session.id} className={`session-item ${session.current ? 'current' : ''}`}>
                <div className="session-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <div className="session-info">
                  <span className="session-device">{session.userAgent?.split(' ')[0] || 'Unknown Device'}</span>
                  <span className="session-details">
                    {session.ipAddress} • Last active: {new Date(session.lastActiveAt).toLocaleDateString()}
                  </span>
                </div>
                {session.current ? (
                  <span className="current-badge">Current</span>
                ) : (
                  <button className="revoke-btn" onClick={() => handleRevokeSession(session.id)}>
                    Revoke
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Modals */}
        {showPasswordModal && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Change Password</h2>
              <form onSubmit={handlePasswordChange}>
                {error && <div className="modal-error">{error}</div>}
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.current}
                    onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    value={passwordForm.new}
                    onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={closeModals}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showEnable2FAModal && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Enable Two-Factor Authentication</h2>
              {!otpStep ? (
                <>
                  {error && <div className="modal-error">{error}</div>}
                  <p>Choose your preferred 2FA method:</p>
                  <div className="twofa-options">
                    <label className={`twofa-option ${selected2FAMethod === 'EMAIL_OTP' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="2fa"
                        value="EMAIL_OTP"
                        checked={selected2FAMethod === 'EMAIL_OTP'}
                        onChange={(e) => setSelected2FAMethod(e.target.value)}
                      />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span>Email OTP</span>
                    </label>
                    <label className={`twofa-option ${selected2FAMethod === 'SMS_OTP' ? 'selected' : ''} ${!user?.phoneVerified ? 'disabled' : ''}`}>
                      <input
                        type="radio"
                        name="2fa"
                        value="SMS_OTP"
                        checked={selected2FAMethod === 'SMS_OTP'}
                        onChange={(e) => setSelected2FAMethod(e.target.value)}
                        disabled={!user?.phoneVerified}
                      />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" />
                        <line x1="12" y1="18" x2="12.01" y2="18" />
                      </svg>
                      <span>SMS OTP</span>
                      {!user?.phoneVerified && <small>Verify phone first</small>}
                    </label>
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={closeModals}>Cancel</button>
                    <button type="button" className="btn-primary" onClick={handleEnable2FA} disabled={loading}>
                      {loading ? 'Sending code...' : 'Continue'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Enter the 6-digit code sent to your {selected2FAMethod === 'EMAIL_OTP' ? 'email' : 'phone'}:</p>
                  <OTPInput length={6} onComplete={handleConfirm2FA} disabled={loading} error={otpError} />
                  <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={() => setOtpStep(false)}>Back</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {showDisable2FAModal && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Disable Two-Factor Authentication</h2>
              <p className="warning-text">This will reduce the security of your account. Are you sure?</p>
              <form onSubmit={handleDisable2FA}>
                {error && <div className="modal-error">{error}</div>}
                <div className="form-group">
                  <label>Enter your password to confirm</label>
                  <input
                    type="password"
                    value={disablePassword}
                    onChange={(e) => setDisablePassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-secondary" onClick={closeModals}>Cancel</button>
                  <button type="submit" className="btn-danger" disabled={loading}>
                    {loading ? 'Disabling...' : 'Disable 2FA'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showPhoneModal && (
          <div className="modal-overlay" onClick={closeModals}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>{user?.phoneVerified ? 'Change Phone Number' : 'Add Phone Number'}</h2>
              {!otpStep ? (
                <>
                  {error && <div className="modal-error">{error}</div>}
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+65 9123 4567"
                      disabled={loading}
                    />
                  </div>
                  <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={closeModals}>Cancel</button>
                    <button type="button" className="btn-primary" onClick={handlePhoneRequest} disabled={loading || !phone}>
                      {loading ? 'Sending code...' : 'Send Code'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>Enter the 6-digit code sent to your phone:</p>
                  <OTPInput length={6} onComplete={handlePhoneConfirm} disabled={loading} error={otpError} />
                  <div className="modal-actions">
                    <button type="button" className="btn-secondary" onClick={() => setOtpStep(false)}>Back</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
