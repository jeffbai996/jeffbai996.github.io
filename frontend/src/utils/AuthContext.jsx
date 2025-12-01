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
    } catch (error) {
      console.error('Error fetching user:', error)
      setUser(null)
      return null
    }
  }, [])

  // Check authentication status on mount
  useEffect(() => {
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
          emailRedirectTo: `${window.location.origin}/`,
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
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
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
  const changePassword = async (newPassword) => {
    setError(null)
    try {
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

  // Get 2FA settings
  const get2FASettings = async () => {
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('user_profiles')
      .select('two_factor_enabled, two_factor_method, phone_verified')
      .eq('id', user.id)
      .single()

    if (error) throw error

    return {
      enabled: data.two_factor_enabled,
      method: data.two_factor_method,
      phoneVerified: data.phone_verified,
      availableMethods: [
        { id: 'EMAIL_OTP', name: 'Email', available: true },
        { id: 'SMS_OTP', name: 'SMS', available: data.phone_verified },
        { id: 'TOTP', name: 'Authenticator App', available: false },
      ],
    }
  }

  // Enable 2FA
  const enable2FA = async (method) => {
    setError(null)
    try {
      if (!user) throw new Error('Not authenticated')

      // Update 2FA settings in profile
      const { error } = await supabase
        .from('user_profiles')
        .update({
          two_factor_enabled: true,
          two_factor_method: method,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      // Refresh user data
      await fetchUser()

      return { message: '2FA enabled successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to enable 2FA'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Disable 2FA
  const disable2FA = async () => {
    setError(null)
    try {
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('user_profiles')
        .update({
          two_factor_enabled: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (error) throw error

      // Refresh user data
      await fetchUser()

      return { message: '2FA disabled successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to disable 2FA'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Request phone verification
  const requestPhoneVerification = async (phone) => {
    setError(null)
    try {
      if (!user) throw new Error('Not authenticated')

      // Update phone number
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({
          phone: phone,
          phone_verified: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (updateError) throw updateError

      // Note: Supabase doesn't have built-in SMS verification in free tier
      // You would need to integrate Twilio or similar service
      // For now, we'll mark it as verified immediately (development only)
      console.warn('SMS verification not implemented - marking as verified')

      const { error: verifyError } = await supabase
        .from('user_profiles')
        .update({
          phone_verified: true,
        })
        .eq('id', user.id)

      if (verifyError) throw verifyError

      await fetchUser()

      return { message: 'Phone number added' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to verify phone'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
  }

  // Get sessions
  const getSessions = async () => {
    if (!user) throw new Error('Not authenticated')

    const { data, error } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('user_id', user.id)
      .is('revoked_at', null)
      .order('created_at', { ascending: false })

    if (error) throw error

    return data || []
  }

  // Revoke session
  const revokeSession = async (sessionId) => {
    setError(null)
    try {
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase
        .from('user_sessions')
        .update({ revoked_at: new Date().toISOString() })
        .eq('id', sessionId)
        .eq('user_id', user.id)

      if (error) throw error

      return { message: 'Session revoked successfully' }
    } catch (err) {
      const errorMessage = err.message || 'Failed to revoke session'
      setError(errorMessage)
      throw new Error(errorMessage)
    }
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
    disable2FA,
    requestPhoneVerification,
    getSessions,
    revokeSession,
    fetchUser,
    clearError: () => setError(null),
    supabase, // Export supabase client for advanced usage
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
