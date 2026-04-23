import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

// localStorage can throw in private/incognito mode or when quota is exceeded —
// these helpers isolate that risk so ThemeProvider never crashes on storage errors.
const STORAGE_KEY = 'praya-theme'

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

function writeStoredTheme(value) {
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // noop — storage disabled or full; theme still works in-memory
  }
}

function prefersDarkMode() {
  if (typeof window === 'undefined' || !window.matchMedia) return true
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = readStoredTheme()
    // Respect explicit user choice, otherwise fall back to OS preference
    return saved ? saved === 'dark' : prefersDarkMode()
  })

  useEffect(() => {
    writeStoredTheme(isDark ? 'dark' : 'light')
    document.body.classList.toggle('light', !isDark)
  }, [isDark])

  // Follow OS theme changes when the user hasn't made an explicit choice
  useEffect(() => {
    if (!window.matchMedia) return
    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      // Only auto-switch if there's no saved preference (user never toggled manually)
      if (readStoredTheme() === null) {
        setIsDark(e.matches)
      }
    }

    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
