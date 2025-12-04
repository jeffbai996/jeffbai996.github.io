import React, { useState, useEffect } from 'react'
import './DarkModeToggle.css'

export default function DarkModeToggle({ position = 'fixed' }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      return saved === 'true'
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
      document.body.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
      document.body.classList.remove('dark-mode')
    }

    // Save preference
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev)
  }

  return (
    <button
      className={`dark-mode-toggle ${position}`}
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className={`toggle-track ${darkMode ? 'dark' : 'light'}`}>
        <div className="toggle-thumb">
          {darkMode ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
          )}
        </div>
      </div>
      <span className="toggle-label">
        {darkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  )
}

// Enhanced version with dropdown options
export function DarkModeSelector() {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode')
    return saved || 'auto'
  })
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const applyTheme = () => {
      let shouldBeDark = false

      if (mode === 'dark') {
        shouldBeDark = true
      } else if (mode === 'light') {
        shouldBeDark = false
      } else { // auto
        shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      }

      if (shouldBeDark) {
        document.documentElement.classList.add('dark-mode')
        document.body.classList.add('dark-mode')
      } else {
        document.documentElement.classList.remove('dark-mode')
        document.body.classList.remove('dark-mode')
      }
    }

    applyTheme()
    localStorage.setItem('themeMode', mode)

    // Listen for system theme changes if in auto mode
    if (mode === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
      return () => mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [mode])

  const options = [
    { value: 'light', label: 'Light', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    )},
    { value: 'dark', label: 'Dark', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
      </svg>
    )},
    { value: 'auto', label: 'Auto', icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
        <line x1="8" y1="21" x2="16" y2="21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    )}
  ]

  const currentOption = options.find(opt => opt.value === mode)

  return (
    <div className="dark-mode-selector">
      <button
        className="selector-trigger"
        onClick={() => setShowMenu(!showMenu)}
        aria-label="Theme selector"
      >
        {currentOption.icon}
        <span>{currentOption.label}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {showMenu && (
        <>
          <div className="selector-backdrop" onClick={() => setShowMenu(false)} />
          <div className="selector-menu">
            {options.map((option) => (
              <button
                key={option.value}
                className={`menu-option ${mode === option.value ? 'active' : ''}`}
                onClick={() => {
                  setMode(option.value)
                  setShowMenu(false)
                }}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
                {mode === option.value && (
                  <svg className="check-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
