import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { supabase, getFullUserData, recordLogin } from './supabaseClient'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch user data (auth + profile)
  const fetchUser = useCallback(async () => {
    try {
      const userData = await getFullUserData()
      setUser(userData)
      return userData
    } catch (err) {
      console.error('Error fetching user:', err)
      setUser(null)
      return null
    }
  }, [])

  // Check authentication status on mount
  useEffect(() => {
    // If Supabase is not configured, skip authentication
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUser().finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        await fetchUser()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
      } else if (event === 'USER_UPDATED') {
        await fetchUser()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchUser])

  // Register new user
  const register = async ({ firstName, lastName, email, phone, password }) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?type=signup`,
        },
      })

      if (error) throw error

      // Check if email confirmation is required
      if (data.user && !data.session) {
        return {
          user: data.user,
          requiresEmailVerification: true,
          message: 'Registration successful. Please check your email to verify your account.',
        }
      }

      // Auto-login if email confirmation is disabled
      if (data.session) {
        await fetchUser()
      }

      return {
        user: data.user,
        requiresEmailVerification: false,
        message: 'Registration successful!',
      }
    } catch (err) {
      const errorMessage = err.message || 'Registration failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Resend verification email
  const resendVerification = async (email) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      })

      if (error) throw error

      return { message: 'Verification email sent' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to resend verification email'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Login with email and password
  const login = async (email, password) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch full user data
      await fetchUser()

      // Record login
      if (data.user) {
        await recordLogin(data.user.id)
      }

      return {
        user: data.user,
        session: data.session,
        message: 'Login successful',
      }
    } catch (err) {
      const errorMessage = err.message || 'Login failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Logout
  const logout = async () => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
    } catch (err) {
      const errorMessage = err.message || 'Logout failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Logout from all devices
  const logoutAll = async () => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      // Supabase doesn't have built-in "logout all" - this logs out current session
      // You would need to implement session tracking in your database for true "logout all"
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
    } catch (err) {
      const errorMessage = err.message || 'Logout failed'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Forgot password
  const forgotPassword = async (email) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/forgot-password?type=recovery`,
      })

      if (error) throw error

      return { message: 'Password reset email sent' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to send reset email'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Reset password (called from reset link)
  const resetPassword = async (newPassword) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      return { message: 'Password updated successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to reset password'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Change password (when logged in)
  const changePassword = async (currentPassword, newPassword) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      // Re-authenticate by signing in with current password first
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser?.email) throw new Error('Not authenticated')

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: currentUser.email,
        password: currentPassword,
      })

      if (signInError) throw new Error('Current password is incorrect')

      // Now update to new password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      return { message: 'Password changed successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to change password'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Update user profile
  const updateProfile = async (updates) => {
    if (!supabase) {
      throw new Error('Authentication is not configured')
    }
    setError(null)
    try {
      if (!user) throw new Error('Not authenticated')

      // Update profile in database
      const { error } = await supabase
        .from('user_profiles')
        .update({
          first_name: updates.firstName,
          last_name: updates.lastName,
          phone: updates.phone,
          date_of_birth: updates.dateOfBirth,
          address: updates.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      // Refresh user data
      await fetchUser()

      return { message: 'Profile updated successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to update profile'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Placeholder 2FA settings (feature not implemented)
  const get2FASettings = async () => {
    return {
      enabled: false,
      method: null,
      phoneVerified: false,
      availableMethods: [],
    }
  }

  // Placeholder functions for features coming soon
  const enable2FA = async () => {
    throw new Error('Two-factor authentication coming soon')
  }

  const confirm2FA = async () => {
    throw new Error('Two-factor authentication coming soon')
  }

  const disable2FA = async () => {
    throw new Error('Two-factor authentication coming soon')
  }

  const requestPhoneVerification = async () => {
    throw new Error('Phone verification coming soon')
  }

  const confirmPhoneVerification = async () => {
    throw new Error('Phone verification coming soon')
  }

  // Placeholder session management
  const getSessions = async () => {
    return []
  }

  const revokeSession = async () => {
    throw new Error('Session management coming soon')
  }

  // Context value
  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    register,
    resendVerification,
    login,
    logout,
    logoutAll,
    forgotPassword,
    resetPassword,
    changePassword,
    updateProfile,
    get2FASettings,
    enable2FA,
    confirm2FA,
    disable2FA,
    requestPhoneVerification,
    confirmPhoneVerification,
    getSessions,
    revokeSession,
    fetchUser,
    clearError: () => setError(null),
    supabase,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
