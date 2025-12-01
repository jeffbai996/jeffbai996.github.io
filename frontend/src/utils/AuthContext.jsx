import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const AuthContext = createContext(null)

const API_BASE = import.meta.env.VITE_API_URL || '/api'

// Token storage keys
const ACCESS_TOKEN_KEY = 'prayapass_access_token'
const REFRESH_TOKEN_KEY = 'prayapass_refresh_token'
const USER_KEY = 'prayapass_user'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(USER_KEY)
    return saved ? JSON.parse(saved) : null
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get stored tokens
  const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY)
  const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY)

  // Store tokens
  const setTokens = (accessToken, refreshToken) => {
    if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }

  // Clear all auth data
  const clearAuth = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  // Make authenticated API request
  const authFetch = useCallback(async (endpoint, options = {}) => {
    const accessToken = getAccessToken()

    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    }

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    let response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
    })

    // If token expired, try to refresh
    if (response.status === 401) {
      const refreshToken = getRefreshToken()
      if (refreshToken) {
        try {
          const refreshResponse = await fetch(`${API_BASE}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken }),
          })

          if (refreshResponse.ok) {
            const { accessToken: newToken } = await refreshResponse.json()
            localStorage.setItem(ACCESS_TOKEN_KEY, newToken)

            // Retry original request with new token
            headers.Authorization = `Bearer ${newToken}`
            response = await fetch(`${API_BASE}${endpoint}`, {
              ...options,
              headers,
            })
          } else {
            clearAuth()
            throw new Error('Session expired. Please login again.')
          }
        } catch {
          clearAuth()
          throw new Error('Session expired. Please login again.')
        }
      }
    }

    return response
  }, [clearAuth])

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = getAccessToken()
      if (!accessToken) {
        setLoading(false)
        return
      }

      try {
        const response = await authFetch('/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
          localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        } else {
          clearAuth()
        }
      } catch {
        clearAuth()
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [authFetch, clearAuth])

  // Register
  const register = async (data) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Registration failed')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Verify email
  const verifyEmail = async (email, code) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/verify-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Verification failed')
      }

      // Store tokens and user
      setTokens(result.accessToken, result.refreshToken)
      setUser(result.user)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Resend verification
  const resendVerification = async (email) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to resend verification')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Login (step 1)
  const login = async (email, password) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Login failed')
      }

      // Check if 2FA is required
      if (result.requires2FA) {
        return { requires2FA: true, ...result }
      }

      // No 2FA - login complete
      setTokens(result.accessToken, result.refreshToken)
      setUser(result.user)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Verify 2FA (step 2)
  const verify2FA = async (userId, code) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/verify-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, code }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || '2FA verification failed')
      }

      // Login complete
      setTokens(result.accessToken, result.refreshToken)
      setUser(result.user)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Resend 2FA code
  const resend2FA = async (userId) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/resend-2fa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to resend code')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Logout
  const logout = async () => {
    try {
      await authFetch('/auth/logout', { method: 'POST' })
    } catch {
      // Ignore errors, clear auth anyway
    } finally {
      clearAuth()
    }
  }

  // Logout from all devices
  const logoutAll = async () => {
    try {
      await authFetch('/auth/logout-all', { method: 'POST' })
    } catch {
      // Ignore errors
    } finally {
      clearAuth()
    }
  }

  // Forgot password
  const forgotPassword = async (email) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to process request')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Reset password
  const resetPassword = async (email, code, newPassword) => {
    setError(null)
    try {
      const response = await fetch(`${API_BASE}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to reset password')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Update profile
  const updateProfile = async (data) => {
    setError(null)
    try {
      const response = await authFetch('/auth/profile', {
        method: 'PATCH',
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update profile')
      }

      setUser(result.user)
      localStorage.setItem(USER_KEY, JSON.stringify(result.user))

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Change password
  const changePassword = async (currentPassword, newPassword) => {
    setError(null)
    try {
      const response = await authFetch('/auth/change-password', {
        method: 'POST',
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to change password')
      }

      return result
    } catch (err) {
      setError(err.message)
      throw err
    }
  }

  // Get 2FA settings
  const get2FASettings = async () => {
    const response = await authFetch('/auth/2fa/settings')
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get 2FA settings')
    }
    return result
  }

  // Enable 2FA
  const enable2FA = async (method) => {
    const response = await authFetch('/auth/2fa/enable', {
      method: 'POST',
      body: JSON.stringify({ method }),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to enable 2FA')
    }
    return result
  }

  // Confirm 2FA
  const confirm2FA = async (method, code) => {
    const response = await authFetch('/auth/2fa/confirm', {
      method: 'POST',
      body: JSON.stringify({ method, code }),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to confirm 2FA')
    }
    // Refresh user data
    const userResponse = await authFetch('/auth/me')
    if (userResponse.ok) {
      const userData = await userResponse.json()
      setUser(userData.user)
      localStorage.setItem(USER_KEY, JSON.stringify(userData.user))
    }
    return result
  }

  // Disable 2FA
  const disable2FA = async (password) => {
    const response = await authFetch('/auth/2fa/disable', {
      method: 'POST',
      body: JSON.stringify({ password }),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to disable 2FA')
    }
    // Refresh user data
    const userResponse = await authFetch('/auth/me')
    if (userResponse.ok) {
      const userData = await userResponse.json()
      setUser(userData.user)
      localStorage.setItem(USER_KEY, JSON.stringify(userData.user))
    }
    return result
  }

  // Request phone verification
  const requestPhoneVerification = async (phone) => {
    const response = await authFetch('/auth/verify-phone/request', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to send verification code')
    }
    return result
  }

  // Confirm phone verification
  const confirmPhoneVerification = async (code) => {
    const response = await authFetch('/auth/verify-phone/confirm', {
      method: 'POST',
      body: JSON.stringify({ code }),
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to verify phone')
    }
    setUser(result.user)
    localStorage.setItem(USER_KEY, JSON.stringify(result.user))
    return result
  }

  // Get sessions
  const getSessions = async () => {
    const response = await authFetch('/auth/sessions')
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to get sessions')
    }
    return result.sessions
  }

  // Revoke session
  const revokeSession = async (sessionId) => {
    const response = await authFetch(`/auth/sessions/${sessionId}`, {
      method: 'DELETE',
    })
    const result = await response.json()
    if (!response.ok) {
      throw new Error(result.error || 'Failed to revoke session')
    }
    return result
  }

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    verifyEmail,
    resendVerification,
    login,
    verify2FA,
    resend2FA,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    updateProfile,
    changePassword,
    get2FASettings,
    enable2FA,
    confirm2FA,
    disable2FA,
    requestPhoneVerification,
    confirmPhoneVerification,
    getSessions,
    revokeSession,
    authFetch,
    clearError: () => setError(null),
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
