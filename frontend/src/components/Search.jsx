import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Search.css'

// Searchable content database
const searchableContent = [
  // Departments
  { type: 'department', title: 'National Police Agency', description: 'Emergency response, public safety, licensing', url: '/npa', keywords: ['police', 'emergency', '911', 'crime', 'safety', 'report', 'incident'] },
  { type: 'department', title: 'Bank of Praya', description: 'Central banking, monetary policy, financial services', url: '/bop', keywords: ['bank', 'money', 'currency', 'interest', 'loan', 'financial'] },
  { type: 'department', title: 'Cannabis Tax Bureau', description: 'Licensing, taxation, compliance for cannabis', url: '/ctb', keywords: ['cannabis', 'marijuana', 'license', 'tax', 'dispensary'] },
  { type: 'department', title: 'Justice Department', description: 'Courts, legal aid, criminal code', url: '/doj', keywords: ['court', 'judge', 'law', 'legal', 'case', 'trial', 'attorney'] },
  { type: 'department', title: 'Interior Department', description: 'Land registry, building permits, civil records', url: '/interior', keywords: ['land', 'property', 'deed', 'parks', 'permit'] },
  { type: 'department', title: 'Transport Department', description: 'Driver licensing, vehicle registration', url: '/transport', keywords: ['driver', 'license', 'vehicle', 'car', 'registration', 'road'] },
  { type: 'department', title: 'Revenue Department', description: 'Tax filing, business accounts, benefits', url: '/revenue', keywords: ['tax', 'income', 'refund', 'business', 'filing'] },
  { type: 'department', title: 'Praya Post', description: 'Mail, package delivery, shipping', url: '/post', keywords: ['mail', 'package', 'shipping', 'delivery', 'postal', 'stamp'] },
  { type: 'department', title: 'Health Department', description: 'Public health, healthcare licensing', url: '/health', keywords: ['health', 'medical', 'hospital', 'doctor', 'vaccine', 'disease'] },
  { type: 'department', title: 'Housing Authority', description: 'Affordable housing, rental assistance', url: '/housing', keywords: ['housing', 'rent', 'apartment', 'subsidy', 'affordable'] },
  { type: 'department', title: 'Customs & Border Control', description: 'Immigration, customs, border services', url: '/cbca', keywords: ['customs', 'border', 'immigration', 'visa', 'passport', 'travel'] },
  { type: 'department', title: 'Legislative Council', description: 'Laws, council members, legislation', url: '/lc', keywords: ['law', 'bill', 'legislation', 'council', 'vote', 'representative'] },
  { type: 'department', title: 'Buildings Department', description: 'Building permits, inspections, codes', url: '/bd', keywords: ['building', 'permit', 'inspection', 'construction', 'code'] },
  { type: 'department', title: 'Companies Registry', description: 'Business registration, company filings', url: '/cr', keywords: ['company', 'business', 'incorporate', 'registration', 'corporate'] },
  { type: 'department', title: 'Social Welfare Department', description: 'Benefits, family services, elderly care', url: '/swd', keywords: ['welfare', 'benefits', 'social', 'family', 'elderly', 'disability'] },

  // Services
  { type: 'service', title: 'Pay Taxes Online', description: 'File and pay your taxes electronically', url: '/payments', keywords: ['pay', 'tax', 'online', 'file'] },
  { type: 'service', title: 'Renew Driver License', description: 'Renew your driver license online', url: '/transport', keywords: ['renew', 'driver', 'license'] },
  { type: 'service', title: 'Register a Vehicle', description: 'Register your vehicle with Transport Department', url: '/transport', keywords: ['register', 'vehicle', 'car', 'registration'] },
  { type: 'service', title: 'Apply for Passport', description: 'Submit passport application', url: '/cbca', keywords: ['passport', 'travel', 'apply'] },
  { type: 'service', title: 'Report a Crime', description: 'File a police report online', url: '/npa', keywords: ['report', 'crime', 'police', 'incident'] },
  { type: 'service', title: 'Check Air Quality', description: 'View current air quality index', url: '/air-quality', keywords: ['air', 'quality', 'pollution', 'aqi'] },
  { type: 'service', title: 'Track Package', description: 'Track your Praya Post package', url: '/post', keywords: ['track', 'package', 'delivery', 'shipping'] },
  { type: 'service', title: 'Apply for Housing', description: 'Submit housing assistance application', url: '/housing', keywords: ['housing', 'apply', 'assistance', 'rent'] },
  { type: 'service', title: 'Business Registration', description: 'Register a new business', url: '/cr', keywords: ['business', 'register', 'company', 'start'] },
  { type: 'service', title: 'Building Permit', description: 'Apply for a building permit', url: '/bd', keywords: ['building', 'permit', 'construction'] },
  { type: 'service', title: 'Court Case Lookup', description: 'Search court cases and records', url: '/doj', keywords: ['court', 'case', 'lookup', 'search', 'record'] },
  { type: 'service', title: 'System Status', description: 'Check government service status', url: '/status', keywords: ['status', 'uptime', 'outage', 'system'] },
  { type: 'service', title: 'Weather Forecast', description: 'View weather forecasts and alerts', url: '/weather', keywords: ['weather', 'forecast', 'rain', 'temperature'] },

  // Pages
  { type: 'page', title: 'Login to PrayaPass', description: 'Sign in to your government account', url: '/login', keywords: ['login', 'sign in', 'account'] },
  { type: 'page', title: 'Create Account', description: 'Register for a PrayaPass account', url: '/register', keywords: ['register', 'create', 'account', 'sign up'] },
  { type: 'page', title: 'Account Dashboard', description: 'Manage your account settings', url: '/account', keywords: ['account', 'dashboard', 'profile', 'settings'] },
  { type: 'page', title: 'National Security Level', description: 'Current national security status', url: '/national-security', keywords: ['security', 'threat', 'level', 'alert'] },
  { type: 'page', title: 'Make a Payment', description: 'Pay government fees and taxes', url: '/payments', keywords: ['pay', 'payment', 'fee', 'tax'] },
]

export default function Search({ isOpen, onClose }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState([])
  const inputRef = useRef(null)
  const navigate = useNavigate()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Search function
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const searchTerms = query.toLowerCase().split(' ')

    const scored = searchableContent.map(item => {
      let score = 0
      const titleLower = item.title.toLowerCase()
      const descLower = item.description.toLowerCase()

      searchTerms.forEach(term => {
        // Exact title match
        if (titleLower === term) score += 100
        // Title starts with term
        if (titleLower.startsWith(term)) score += 50
        // Title contains term
        if (titleLower.includes(term)) score += 30
        // Description contains term
        if (descLower.includes(term)) score += 15
        // Keywords match
        if (item.keywords.some(k => k.includes(term))) score += 20
        // Keywords exact match
        if (item.keywords.includes(term)) score += 35
      })

      // Boost departments slightly
      if (item.type === 'department') score *= 1.1

      return { ...item, score }
    })

    const filtered = scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    setResults(filtered)
    setSelectedIndex(0)
  }, [query])

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault()
      handleSelect(results[selectedIndex])
    }
  }

  const handleSelect = (item) => {
    // Save to recent searches
    const newRecent = [
      item,
      ...recentSearches.filter(r => r.url !== item.url)
    ].slice(0, 5)
    setRecentSearches(newRecent)
    localStorage.setItem('recentSearches', JSON.stringify(newRecent))

    // Navigate
    navigate(item.url)
    onClose()
    setQuery('')
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('recentSearches')
  }

  if (!isOpen) return null

  const typeIcons = {
    department: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
      </svg>
    ),
    service: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    page: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  }

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        <div className="search-input-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search departments, services, or pages..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <kbd className="search-shortcut">ESC</kbd>
        </div>

        <div className="search-results">
          {query && results.length === 0 && (
            <div className="search-empty">
              <p>No results found for "{query}"</p>
              <span>Try searching for departments like "Revenue" or services like "pay taxes"</span>
            </div>
          )}

          {query && results.length > 0 && (
            <div className="search-results-list">
              {results.map((item, index) => (
                <button
                  key={item.url + item.title}
                  className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className={`search-result-icon search-result-icon-${item.type}`}>
                    {typeIcons[item.type]}
                  </div>
                  <div className="search-result-content">
                    <span className="search-result-title">{item.title}</span>
                    <span className="search-result-description">{item.description}</span>
                  </div>
                  <span className="search-result-type">{item.type}</span>
                </button>
              ))}
            </div>
          )}

          {!query && recentSearches.length > 0 && (
            <div className="search-recent">
              <div className="search-recent-header">
                <span>Recent Searches</span>
                <button onClick={clearRecentSearches}>Clear</button>
              </div>
              <div className="search-results-list">
                {recentSearches.map((item, index) => (
                  <button
                    key={item.url + index}
                    className="search-result-item"
                    onClick={() => handleSelect(item)}
                  >
                    <div className="search-result-icon search-result-icon-recent">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                    </div>
                    <div className="search-result-content">
                      <span className="search-result-title">{item.title}</span>
                      <span className="search-result-description">{item.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {!query && recentSearches.length === 0 && (
            <div className="search-suggestions">
              <p className="search-suggestions-title">Popular Searches</p>
              <div className="search-suggestions-list">
                <button onClick={() => setQuery('pay taxes')}>Pay taxes</button>
                <button onClick={() => setQuery('driver license')}>Driver license</button>
                <button onClick={() => setQuery('housing')}>Housing assistance</button>
                <button onClick={() => setQuery('passport')}>Passport</button>
                <button onClick={() => setQuery('business')}>Register business</button>
                <button onClick={() => setQuery('court')}>Court services</button>
              </div>
            </div>
          )}
        </div>

        <div className="search-footer">
          <div className="search-footer-hint">
            <kbd>↑</kbd><kbd>↓</kbd> to navigate
            <kbd>↵</kbd> to select
            <kbd>esc</kbd> to close
          </div>
        </div>
      </div>
    </div>
  )
}

// Search trigger button component
export function SearchTrigger({ onClick }) {
  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        onClick()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClick])

  return (
    <button className="search-trigger" onClick={onClick} aria-label="Search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
      <span>Search...</span>
      <kbd>⌘K</kbd>
    </button>
  )
}
