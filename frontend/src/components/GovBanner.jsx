import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../utils/ThemeContext'
import { useAuth } from '../utils/AuthContext'
import './GovBanner.css'

export default function GovBanner() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const { user, isAuthenticated, loading } = useAuth()

  return (
    <>
      <div className="gov-banner">
        <div className="container">
          <div className="gov-banner-left">
            <div className="gov-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
              </svg>
            </div>
            <span>An Official Government of Praya Website</span>
            <button
              className={`gov-how ${dropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Here's how you know
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
          <div className="gov-banner-right">
            {!loading && (
              isAuthenticated ? (
                <Link to="/account" className="gov-account-link">
                  <div className="gov-avatar">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <span>{user?.firstName}</span>
                </Link>
              ) : (
                <Link to="/login" className="gov-login-link">
                  <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
                    <rect width="40" height="40" rx="8" fill="url(#gov-login-gradient)" />
                    <path d="M12 20c0-4.4 3.6-8 8-8s8 3.6 8 8-3.6 8-8 8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M20 16v8M16 20h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gov-login-gradient" x1="0" y1="0" x2="40" y2="40">
                        <stop stopColor="#f97316" />
                        <stop offset="1" stopColor="#ea580c" />
                      </linearGradient>
                    </defs>
                  </svg>
                  PrayaPass
                </Link>
              )
            )}
            <button className="theme-btn" onClick={toggleTheme}>
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </div>

      <div className={`gov-dropdown ${dropdownOpen ? 'open' : ''}`}>
        <div className="container">
          <div className="gov-dropdown-inner">
            <div className="gov-dropdown-item">
              <div className="gov-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>
                </svg>
              </div>
              <div className="gov-dropdown-text">
                <h4>Official Government Website</h4>
                <p>This is an official Republic of Praya government website, managed by the Digital Services Agency.</p>
              </div>
            </div>
            <div className="gov-dropdown-item">
              <div className="gov-dropdown-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <div className="gov-dropdown-text">
                <h4>Secure Connection</h4>
                <p>Your connection to this website is encrypted and secure. Look for https:// in your browser.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
