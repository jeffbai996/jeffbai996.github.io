import { Link } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'
import './Account.css'

export default function Dashboard() {
  const { user, logout } = useAuth()

  const quickActions = [
    {
      title: 'Security Settings',
      description: 'Manage 2FA, passwords, and sessions',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      link: '/account/security',
    },
    {
      title: 'Profile Settings',
      description: 'Update your personal information',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      link: '/account/profile',
    },
    {
      title: 'Linked Services',
      description: 'View connected government services',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      link: '/account/services',
      disabled: true,
    },
  ]

  const recentActivity = [
    { action: 'Logged in', device: 'Chrome on Windows', time: 'Just now', icon: 'login' },
    { action: 'Password changed', device: 'Chrome on Windows', time: '2 days ago', icon: 'password' },
    { action: 'Account created', device: 'Safari on iPhone', time: '1 week ago', icon: 'create' },
  ]

  return (
    <div className="account-page">
      <div className="account-container">
        {/* Header */}
        <div className="account-header">
          <div className="user-welcome">
            <div className="user-avatar">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>
            <div className="user-info">
              <h1>Welcome back, {user?.firstName}</h1>
              <p>Manage your PrayaPass account and security settings</p>
            </div>
          </div>
          <button onClick={logout} className="logout-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>

        {/* Account Status */}
        <div className="account-status">
          <div className="status-card">
            <div className="status-icon verified">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="status-content">
              <h3>Email Verified</h3>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="status-card">
            <div className={`status-icon ${user?.twoFactorEnabled ? 'verified' : 'warning'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="status-content">
              <h3>Two-Factor Auth</h3>
              <p>{user?.twoFactorEnabled ? 'Enabled' : 'Not enabled'}</p>
            </div>
            {!user?.twoFactorEnabled && (
              <Link to="/account/security" className="status-action">Enable</Link>
            )}
          </div>
          <div className="status-card">
            <div className={`status-icon ${user?.phoneVerified ? 'verified' : 'neutral'}`}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div className="status-content">
              <h3>Phone Number</h3>
              <p>{user?.phoneVerified ? 'Verified' : 'Not verified'}</p>
            </div>
            {!user?.phoneVerified && (
              <Link to="/account/security" className="status-action">Add</Link>
            )}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="account-grid">
          {/* Quick Actions */}
          <section className="account-section">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  to={action.link}
                  className={`action-card ${action.disabled ? 'disabled' : ''}`}
                  onClick={action.disabled ? (e) => e.preventDefault() : undefined}
                >
                  <div className="action-icon">{action.icon}</div>
                  <div className="action-content">
                    <h3>{action.title}</h3>
                    <p>{action.description}</p>
                  </div>
                  <svg className="action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                  {action.disabled && <span className="coming-soon-badge">Coming Soon</span>}
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section className="account-section">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map((item, index) => (
                <div key={index} className="activity-item">
                  <div className={`activity-icon ${item.icon}`}>
                    {item.icon === 'login' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                        <polyline points="10 17 15 12 10 7" />
                        <line x1="15" y1="12" x2="3" y2="12" />
                      </svg>
                    )}
                    {item.icon === 'password' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                    {item.icon === 'create' && (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <line x1="20" y1="8" x2="20" y2="14" />
                        <line x1="23" y1="11" x2="17" y2="11" />
                      </svg>
                    )}
                  </div>
                  <div className="activity-content">
                    <span className="activity-action">{item.action}</span>
                    <span className="activity-device">{item.device}</span>
                  </div>
                  <span className="activity-time">{item.time}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Account Info */}
        <div className="account-info-footer">
          <p>
            <strong>Account ID:</strong> {user?.id?.slice(0, 8)}...
          </p>
          <p>
            <strong>Member since:</strong>{' '}
            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>
      </div>
    </div>
  )
}
