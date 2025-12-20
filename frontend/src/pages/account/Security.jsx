import { useState } from 'react'
import { useAuth } from '../../utils/AuthContext'
import TwoFactorAuth from '../../components/TwoFactorAuth'
import './Account.css'

export default function Security() {
  const { user, changePassword, logout } = useAuth()

  // State
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false)

  // Form states
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    setError(null)

    if (passwordForm.new !== passwordForm.confirm) {
      setError('New passwords do not match')
      return
    }

    if (passwordForm.new.length < 8) {
      setError('Password must be at least 8 characters')
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

  const closeModal = () => {
    setShowPasswordModal(false)
    setError(null)
    setPasswordForm({ current: '', new: '', confirm: '' })
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
        <TwoFactorAuth />

        {/* Phone Verification - Coming Soon */}
        <section className="security-section">
          <div className="section-header">
            <div className="section-icon disabled">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Phone Number</h2>
              <p>Add a phone number for SMS verification</p>
            </div>
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        </section>

        {/* Active Sessions - Coming Soon */}
        <section className="security-section">
          <div className="section-header">
            <div className="section-icon disabled">
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
            <span className="coming-soon-badge">Coming Soon</span>
          </div>
        </section>

        {/* Sign Out */}
        <section className="security-section">
          <div className="section-header">
            <div className="section-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </div>
            <div className="section-info">
              <h2>Sign Out</h2>
              <p>Sign out of your current session</p>
            </div>
            <button className="section-action danger" onClick={logout}>
              Sign out
            </button>
          </div>
        </section>

        {/* Password Modal */}
        {showPasswordModal && (
          <div className="modal-overlay" onClick={closeModal}>
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
                    minLength={8}
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
                  <button type="button" className="btn-secondary" onClick={closeModal}>Cancel</button>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Changing...' : 'Change Password'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
