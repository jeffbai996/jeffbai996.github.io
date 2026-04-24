import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
// eslint-disable-next-line no-unused-vars -- ThemeProvider is used inside JSX below; bare ESLint can't see it
import { ThemeProvider, useTheme } from '../ThemeContext'

// Helpers to control storage + matchMedia per-test.
// The global setup provides permissive mocks; here we override selectively.
function setLocalStorage(overrides) {
  const store = {}
  globalThis.localStorage = {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v) },
    removeItem: (k) => { delete store[k] },
    clear: () => { Object.keys(store).forEach(k => delete store[k]) },
    ...overrides,
  }
  return store
}

function setMatchMedia(prefersDark, listeners = []) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query) => ({
      matches: query.includes('dark') ? prefersDark : false,
      media: query,
      addEventListener: (evt, cb) => listeners.push({ evt, cb }),
      removeEventListener: (evt, cb) => {
        const idx = listeners.findIndex(l => l.evt === evt && l.cb === cb)
        if (idx >= 0) listeners.splice(idx, 1)
      },
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => {},
    }),
  })
  return listeners
}

const wrapper = ({ children }) => <ThemeProvider>{children}</ThemeProvider>

describe('ThemeContext', () => {
  beforeEach(() => {
    setLocalStorage({})
    setMatchMedia(false)
  })

  it('defaults to dark when no saved preference and OS prefers dark', () => {
    setMatchMedia(true)
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.isDark).toBe(true)
  })

  it('defaults to light when no saved preference and OS prefers light', () => {
    setMatchMedia(false)
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.isDark).toBe(false)
  })

  it('respects saved preference over OS preference', () => {
    const store = setLocalStorage({})
    store['praya-theme'] = 'light'
    setMatchMedia(true) // OS says dark
    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.isDark).toBe(false) // saved 'light' wins
  })

  it('persists theme to localStorage when toggled', () => {
    const store = setLocalStorage({})
    const { result } = renderHook(() => useTheme(), { wrapper })
    act(() => { result.current.toggleTheme() })
    expect(store['praya-theme']).toBe(result.current.isDark ? 'dark' : 'light')
  })

  it('toggleTheme flips the current value', () => {
    const { result } = renderHook(() => useTheme(), { wrapper })
    const before = result.current.isDark
    act(() => { result.current.toggleTheme() })
    expect(result.current.isDark).toBe(!before)
  })

  it('does not crash when localStorage.getItem throws (private browsing)', () => {
    setLocalStorage({
      getItem: () => { throw new Error('SecurityError: access denied') },
    })
    // Should fall through to OS preference without throwing
    expect(() => {
      renderHook(() => useTheme(), { wrapper })
    }).not.toThrow()
  })

  it('does not crash when localStorage.setItem throws (quota exceeded)', () => {
    setLocalStorage({
      setItem: () => { throw new Error('QuotaExceededError') },
    })
    const { result } = renderHook(() => useTheme(), { wrapper })
    // Toggling triggers setItem; must not bubble the error
    expect(() => {
      act(() => { result.current.toggleTheme() })
    }).not.toThrow()
  })

  it('auto-switches with OS preference when user has no saved preference', () => {
    setLocalStorage({}) // no saved theme
    const listeners = []
    setMatchMedia(false, listeners)

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.isDark).toBe(false)

    // Simulate the OS flipping to dark mode
    const changeListener = listeners.find(l => l.evt === 'change')
    expect(changeListener).toBeDefined()
    act(() => {
      changeListener.cb({ matches: true })
    })

    expect(result.current.isDark).toBe(true)
  })

  it('does NOT auto-switch with OS preference when user has saved preference', () => {
    const store = setLocalStorage({})
    store['praya-theme'] = 'light'
    const listeners = []
    setMatchMedia(false, listeners)

    const { result } = renderHook(() => useTheme(), { wrapper })
    expect(result.current.isDark).toBe(false) // started from saved 'light'

    // Simulate OS flip — user's explicit choice should win
    const changeListener = listeners.find(l => l.evt === 'change')
    act(() => {
      changeListener.cb({ matches: true })
    })

    expect(result.current.isDark).toBe(false) // unchanged
  })

  it('throws a helpful error when useTheme is used outside ThemeProvider', () => {
    // Suppress expected console.error from React
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useTheme())).toThrow(/ThemeProvider/)
    errSpy.mockRestore()
  })
})
