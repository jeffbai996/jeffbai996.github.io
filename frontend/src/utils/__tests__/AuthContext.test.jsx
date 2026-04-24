import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'

// Mock the supabase client module BEFORE importing AuthContext.
// vi.hoisted() ensures these references exist when vi.mock's factory runs
// (vi.mock is hoisted to the top of the file before other top-level code).
const { mockAuth } = vi.hoisted(() => ({
  mockAuth: {
    getSession: vi.fn(),
    onAuthStateChange: vi.fn(() => ({
      data: { subscription: { unsubscribe: vi.fn() } },
    })),
    signUp: vi.fn(),
    signInWithPassword: vi.fn(),
    signOut: vi.fn(),
    resetPasswordForEmail: vi.fn(),
    updateUser: vi.fn(),
    getUser: vi.fn(),
    resend: vi.fn(),
  },
}))

vi.mock('../supabaseClient', () => ({
  supabase: { auth: mockAuth },
  getFullUserData: vi.fn(),
  recordLogin: vi.fn(),
}))

// Import AFTER the mock is set up
// eslint-disable-next-line no-unused-vars -- AuthProvider is used in the JSX wrapper below
import { AuthProvider, useAuth } from '../AuthContext'
import { getFullUserData, recordLogin } from '../supabaseClient'

const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>

// Wait for the initial async session-fetch to settle before assertions.
// The provider sets loading=true then false after getSession resolves.
async function renderAuthHook() {
  const result = renderHook(() => useAuth(), { wrapper })
  await waitFor(() => expect(result.result.current.loading).toBe(false))
  return result
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Default: no active session
    mockAuth.getSession.mockResolvedValue({ data: { session: null } })
    getFullUserData.mockResolvedValue(null)
    recordLogin.mockResolvedValue(undefined)
  })

  it('starts with loading=true and resolves to unauthenticated when no session', async () => {
    const { result } = await renderAuthHook()
    expect(result.current.loading).toBe(false)
    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('fetches user data when an existing session is found on mount', async () => {
    mockAuth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'u1', email: 'a@b.co' } } },
    })
    getFullUserData.mockResolvedValue({ id: 'u1', email: 'a@b.co', first_name: 'A' })

    const { result } = await renderAuthHook()
    expect(result.current.user).toEqual({ id: 'u1', email: 'a@b.co', first_name: 'A' })
    expect(result.current.isAuthenticated).toBe(true)
  })

  it('handles getSession rejection gracefully (does not hang in loading state)', async () => {
    mockAuth.getSession.mockRejectedValue(new Error('network error'))
    const { result } = await renderAuthHook()
    // Even on error, loading resolves to false and user stays null
    expect(result.current.user).toBe(null)
    expect(result.current.loading).toBe(false)
  })

  it('login calls signInWithPassword + fetchUser + recordLogin', async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: { user: { id: 'u2' }, session: { access_token: 'tok' } },
      error: null,
    })
    getFullUserData.mockResolvedValue({ id: 'u2', email: 'x@y.co' })

    const { result } = await renderAuthHook()

    let loginResult
    await act(async () => {
      loginResult = await result.current.login('x@y.co', 'pw')
    })

    expect(mockAuth.signInWithPassword).toHaveBeenCalledWith({ email: 'x@y.co', password: 'pw' })
    expect(recordLogin).toHaveBeenCalledWith('u2')
    expect(loginResult.message).toBe('Login successful')
    expect(result.current.user).toEqual({ id: 'u2', email: 'x@y.co' })
  })

  it('login surfaces Supabase errors as thrown Error with message', async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Invalid login credentials' },
    })

    const { result } = await renderAuthHook()

    let thrown
    await act(async () => {
      try {
        await result.current.login('x@y.co', 'wrong')
      } catch (e) {
        thrown = e
      }
    })

    expect(thrown).toBeInstanceOf(Error)
    expect(thrown.message).toBe('Invalid login credentials')
    expect(result.current.error).toBe('Invalid login credentials')
  })

  it('logout clears the user and calls signOut', async () => {
    mockAuth.getSession.mockResolvedValue({
      data: { session: { user: { id: 'u3' } } },
    })
    getFullUserData.mockResolvedValue({ id: 'u3', email: 'z@q.co' })
    mockAuth.signOut.mockResolvedValue({ error: null })

    const { result } = await renderAuthHook()
    expect(result.current.user).not.toBe(null) // logged in

    await act(async () => {
      await result.current.logout()
    })

    expect(mockAuth.signOut).toHaveBeenCalled()
    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('register returns requiresEmailVerification=true when no session is returned', async () => {
    mockAuth.signUp.mockResolvedValue({
      data: { user: { id: 'new1', email: 'n@n.co' }, session: null },
      error: null,
    })

    const { result } = await renderAuthHook()

    let regResult
    await act(async () => {
      regResult = await result.current.register({
        firstName: 'N', lastName: 'N', email: 'n@n.co', password: 'pw',
      })
    })

    expect(regResult.requiresEmailVerification).toBe(true)
    expect(regResult.user).toEqual({ id: 'new1', email: 'n@n.co' })
  })

  it('register auto-fetches user when session is returned (email verification disabled)', async () => {
    mockAuth.signUp.mockResolvedValue({
      data: {
        user: { id: 'new2', email: 'n2@n.co' },
        session: { access_token: 'tok' },
      },
      error: null,
    })
    getFullUserData.mockResolvedValue({ id: 'new2', email: 'n2@n.co', first_name: 'N' })

    const { result } = await renderAuthHook()

    await act(async () => {
      await result.current.register({
        firstName: 'N', lastName: 'N', email: 'n2@n.co', password: 'pw',
      })
    })

    expect(getFullUserData).toHaveBeenCalled()
    expect(result.current.user).toEqual({ id: 'new2', email: 'n2@n.co', first_name: 'N' })
  })

  it('clearError resets error state', async () => {
    mockAuth.signInWithPassword.mockResolvedValue({
      data: { user: null, session: null },
      error: { message: 'Bad password' },
    })

    const { result } = await renderAuthHook()

    await act(async () => {
      try { await result.current.login('a', 'b') } catch { /* expected */ }
    })
    expect(result.current.error).toBe('Bad password')

    act(() => { result.current.clearError() })
    expect(result.current.error).toBe(null)
  })

  it('fetchUser returning null from Supabase leaves user null without throwing', async () => {
    getFullUserData.mockResolvedValue(null)
    const { result } = await renderAuthHook()

    await act(async () => {
      await result.current.fetchUser()
    })

    expect(result.current.user).toBe(null)
    expect(result.current.isAuthenticated).toBe(false)
  })

  it('fetchUser swallows errors and sets user to null', async () => {
    // Suppress the DEV console.error we added yesterday
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    getFullUserData.mockRejectedValue(new Error('boom'))

    const { result } = await renderAuthHook()
    await act(async () => {
      await result.current.fetchUser()
    })
    expect(result.current.user).toBe(null)
    errSpy.mockRestore()
  })

  it('throws a helpful error when useAuth is used outside AuthProvider', () => {
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useAuth())).toThrow(/AuthProvider/)
    errSpy.mockRestore()
  })
})
