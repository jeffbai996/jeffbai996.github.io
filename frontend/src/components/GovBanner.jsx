import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../utils/ThemeContext'
import './GovBanner.css'

export default function GovBanner() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { isDark, toggleTheme } = useTheme()

  return (
    <>
      <div className="gov-banner" role="banner" aria-label="Government website banner">
        <div className="container">
          <div className="gov-banner-left">
            <Link to="/" className="gov-praya-link" aria-label="Go to GOV.PRAYA homepage">GOV.PRAYA</Link>
            <div className="gov-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3"/>
              </svg>
            </div>
            <span>An Official Government of Praya Website</span>
            <button
              className={`gov-how ${dropdownOpen ? 'open' : ''}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-label="Show information about how to verify this is an official government website"
            >
              Here's how you know
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
          </div>
          <div className="gov-banner-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={isDark}
            >
              {isDark ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`gov-dropdown ${dropdownOpen ? 'open' : ''}`}
        role="region"
        aria-label="Official website verification information"
        aria-hidden={!dropdownOpen}
      >
        <div className="container">
          <div className="gov-dropdown-inner">
            <div className="gov-dropdown-item">
              <div className="gov-dropdown-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11"/>
                </svg>
              </div>
              <div className="gov-dropdown-text">
                <h4>Official Government Website</h4>
                <p>This is an official Republic of Praya government website, managed by the Digital Services Agency.</p>
              </div>
            </div>
            <div className="gov-dropdown-item">
              <div className="gov-dropdown-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
