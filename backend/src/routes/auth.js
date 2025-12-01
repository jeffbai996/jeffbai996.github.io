import express from 'express'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { createOtp, verifyOtp, sendSmsOtp, sendEmailOtp, invalidateUserOtps } from '../services/otp.service.js'
import {
  createSession,
  refreshSession,
  revokeSession,
  revokeAllUserSessions,
  getUserSessions,
} from '../services/session.service.js'
import { authenticate, authRateLimiter } from '../middleware/auth.middleware.js'

const router = express.Router()

// In-memory user store (replace with Prisma database in production)
const users = new Map()

// Pending 2FA verifications (userId -> { method, expiresAt })
const pending2FA = new Map()

// Password validation
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

function validatePassword(password) {
  if (!password || password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long' }
  }
  if (!PASSWORD_REGEX.test(password)) {
    return {
      valid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    }
  }
  return { valid: true }
}

// Sanitize user object for response (remove sensitive data)
function sanitizeUser(user) {
  const { password, faceTemplateHash, ...safeUser } = user
  return safeUser
}

// ==================== REGISTRATION ====================

/**
 * Step 1: Register new user
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, phone } = req.body

    // Validation
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required (email, password, firstName, lastName)' })
    }

    if (users.has(email.toLowerCase())) {
      return res.status(409).json({ error: 'An account with this email already exists' })
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.valid) {
      return res.status(400).json({ error: passwordValidation.error })
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = {
      id: uuidv4(),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      phone: phone || null,
      role: 'CITIZEN',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),

      // PrayaPass fields
      nricNumber: null,
      identityVerified: false,
      verifiedAt: null,
      twoFactorMethod: 'SMS_OTP',
      twoFactorEnabled: false,
      phoneVerified: false,
      emailVerified: false,
      faceEnrolled: false,
      faceEnrolledAt: null,
      faceTemplateHash: null,
      failedAttempts: 0,
      lockedUntil: null,
      lastLoginAt: null,
      passwordChangedAt: new Date().toISOString(),
      avatarUrl: null,
      dateOfBirth: null,
      address: null,
    }

    users.set(email.toLowerCase(), user)

    // Send email verification OTP
    const otpResult = await createOtp(user.id, 'EMAIL', 'EMAIL_VERIFICATION')
    await sendEmailOtp(user.email, otpResult.otp, 'EMAIL_VERIFICATION')

    res.status(201).json({
      message: 'Registration successful. Please verify your email.',
      user: sanitizeUser(user),
      requiresEmailVerification: true,
      // In development, include debug info
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Registration failed. Please try again.' })
  }
})

/**
 * Verify email with OTP
 */
router.post('/verify-email', async (req, res) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required' })
    }

    const user = users.get(email.toLowerCase())
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const result = await verifyOtp(user.id, code, 'EMAIL', 'EMAIL_VERIFICATION')
    if (!result.valid) {
      return res.status(400).json({ error: result.error })
    }

    // Mark email as verified
    user.emailVerified = true
    user.updatedAt = new Date().toISOString()
    users.set(email.toLowerCase(), user)

    // Create session
    const session = await createSession(user, {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    })

    res.json({
      message: 'Email verified successfully',
      user: sanitizeUser(user),
      ...session
    })
  } catch (error) {
    console.error('Email verification error:', error)
    res.status(500).json({ error: 'Verification failed. Please try again.' })
  }
})

/**
 * Resend verification email
 */
router.post('/resend-verification', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = users.get(email.toLowerCase())
    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'If an account exists, a verification email has been sent.' })
    }

    if (user.emailVerified) {
      return res.status(400).json({ error: 'Email is already verified' })
    }

    const otpResult = await createOtp(user.id, 'EMAIL', 'EMAIL_VERIFICATION')
    await sendEmailOtp(user.email, otpResult.otp, 'EMAIL_VERIFICATION')

    res.json({
      message: 'Verification email sent',
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    if (error.message.includes('wait')) {
      return res.status(429).json({ error: error.message })
    }
    console.error('Resend verification error:', error)
    res.status(500).json({ error: 'Failed to send verification email' })
  }
})

// ==================== LOGIN ====================

/**
 * Step 1: Login with email/password
 */
router.post('/login', authRateLimiter, async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = users.get(email.toLowerCase())
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Check if account is locked
    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      const remainingMinutes = Math.ceil((new Date(user.lockedUntil) - new Date()) / 60000)
      return res.status(423).json({
        error: `Account is locked. Please try again in ${remainingMinutes} minute(s).`,
        lockedUntil: user.lockedUntil
      })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      // Increment failed attempts
      user.failedAttempts = (user.failedAttempts || 0) + 1

      // Lock account after 5 failed attempts
      if (user.failedAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000).toISOString() // 30 minutes
        users.set(email.toLowerCase(), user)
        return res.status(423).json({
          error: 'Account locked due to too many failed attempts. Please try again in 30 minutes.',
          lockedUntil: user.lockedUntil
        })
      }

      users.set(email.toLowerCase(), user)
      return res.status(401).json({
        error: 'Invalid email or password',
        attemptsRemaining: 5 - user.failedAttempts
      })
    }

    // Reset failed attempts on successful password verification
    user.failedAttempts = 0
    user.lockedUntil = null

    // Check if 2FA is enabled
    if (user.twoFactorEnabled) {
      // Generate and send OTP based on user's 2FA method
      const otpType = user.twoFactorMethod === 'EMAIL_OTP' ? 'EMAIL' : 'SMS'
      const otpResult = await createOtp(user.id, otpType, 'LOGIN')

      if (otpType === 'SMS' && user.phone) {
        await sendSmsOtp(user.phone, otpResult.otp)
      } else {
        await sendEmailOtp(user.email, otpResult.otp, 'LOGIN')
      }

      // Store pending 2FA
      pending2FA.set(user.id, {
        method: user.twoFactorMethod,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
      })

      users.set(email.toLowerCase(), user)

      return res.json({
        message: 'Verification code sent',
        requires2FA: true,
        method: user.twoFactorMethod,
        userId: user.id,
        maskedPhone: user.phone ? `****${user.phone.slice(-4)}` : null,
        maskedEmail: `${user.email[0]}***@${user.email.split('@')[1]}`,
        ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
      })
    }

    // No 2FA - create session directly
    user.lastLoginAt = new Date().toISOString()
    users.set(email.toLowerCase(), user)

    // Reset rate limit on success
    if (req.resetAuthRateLimit) req.resetAuthRateLimit()

    const session = await createSession(user, {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    })

    res.json({
      message: 'Login successful',
      user: sanitizeUser(user),
      ...session
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Login failed. Please try again.' })
  }
})

/**
 * Step 2: Verify 2FA code
 */
router.post('/verify-2fa', authRateLimiter, async (req, res) => {
  try {
    const { userId, code } = req.body

    if (!userId || !code) {
      return res.status(400).json({ error: 'User ID and verification code are required' })
    }

    // Find user by ID
    let user = null
    for (const [, u] of users) {
      if (u.id === userId) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Check pending 2FA
    const pending = pending2FA.get(userId)
    if (!pending || Date.now() > pending.expiresAt) {
      pending2FA.delete(userId)
      return res.status(400).json({ error: 'Verification session expired. Please login again.' })
    }

    // Verify OTP
    const otpType = pending.method === 'EMAIL_OTP' ? 'EMAIL' : 'SMS'
    const result = await verifyOtp(userId, code, otpType, 'LOGIN')

    if (!result.valid) {
      return res.status(400).json({ error: result.error })
    }

    // Clear pending 2FA
    pending2FA.delete(userId)

    // Update last login
    user.lastLoginAt = new Date().toISOString()
    users.set(user.email, user)

    // Reset rate limit on success
    if (req.resetAuthRateLimit) req.resetAuthRateLimit()

    // Create session with 2FA verified flag
    const session = await createSession(user, {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
    })

    res.json({
      message: 'Login successful',
      user: sanitizeUser(user),
      ...session
    })
  } catch (error) {
    console.error('2FA verification error:', error)
    res.status(500).json({ error: 'Verification failed. Please try again.' })
  }
})

/**
 * Resend 2FA code
 */
router.post('/resend-2fa', authRateLimiter, async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' })
    }

    // Find user by ID
    let user = null
    for (const [, u] of users) {
      if (u.id === userId) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const pending = pending2FA.get(userId)
    if (!pending || Date.now() > pending.expiresAt) {
      pending2FA.delete(userId)
      return res.status(400).json({ error: 'Verification session expired. Please login again.' })
    }

    // Generate and send new OTP
    const otpType = pending.method === 'EMAIL_OTP' ? 'EMAIL' : 'SMS'
    const otpResult = await createOtp(user.id, otpType, 'LOGIN')

    if (otpType === 'SMS' && user.phone) {
      await sendSmsOtp(user.phone, otpResult.otp)
    } else {
      await sendEmailOtp(user.email, otpResult.otp, 'LOGIN')
    }

    res.json({
      message: 'New verification code sent',
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    if (error.message.includes('wait')) {
      return res.status(429).json({ error: error.message })
    }
    console.error('Resend 2FA error:', error)
    res.status(500).json({ error: 'Failed to send verification code' })
  }
})

// ==================== TOKEN MANAGEMENT ====================

/**
 * Refresh access token
 */
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token is required' })
    }

    const result = await refreshSession(refreshToken)
    res.json(result)
  } catch (error) {
    console.error('Token refresh error:', error)
    res.status(401).json({ error: error.message || 'Failed to refresh token' })
  }
})

/**
 * Logout (revoke current session)
 */
router.post('/logout', authenticate, async (req, res) => {
  try {
    if (req.user.sessionId) {
      await revokeSession(req.user.sessionId)
    }
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ error: 'Logout failed' })
  }
})

/**
 * Logout from all devices
 */
router.post('/logout-all', authenticate, async (req, res) => {
  try {
    await revokeAllUserSessions(req.user.id)
    res.json({ message: 'Logged out from all devices' })
  } catch (error) {
    console.error('Logout all error:', error)
    res.status(500).json({ error: 'Failed to logout from all devices' })
  }
})

// ==================== USER PROFILE ====================

/**
 * Get current user
 */
router.get('/me', authenticate, (req, res) => {
  try {
    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({ user: sanitizeUser(user) })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({ error: 'Failed to get user information' })
  }
})

/**
 * Update user profile
 */
router.patch('/profile', authenticate, async (req, res) => {
  try {
    const { firstName, lastName, phone, dateOfBirth, address } = req.body

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update allowed fields
    if (firstName) user.firstName = firstName.trim()
    if (lastName) user.lastName = lastName.trim()
    if (phone !== undefined) user.phone = phone
    if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth
    if (address !== undefined) user.address = address
    user.updatedAt = new Date().toISOString()

    users.set(user.email, user)

    res.json({
      message: 'Profile updated',
      user: sanitizeUser(user)
    })
  } catch (error) {
    console.error('Update profile error:', error)
    res.status(500).json({ error: 'Failed to update profile' })
  }
})

// ==================== PASSWORD MANAGEMENT ====================

/**
 * Change password (authenticated)
 */
router.post('/change-password', authenticate, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify current password
    const isValid = await bcrypt.compare(currentPassword, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    // Validate new password
    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 12)
    user.passwordChangedAt = new Date().toISOString()
    user.updatedAt = new Date().toISOString()
    users.set(user.email, user)

    // Invalidate all other sessions
    await revokeAllUserSessions(user.id, req.user.sessionId)

    res.json({ message: 'Password changed successfully' })
  } catch (error) {
    console.error('Change password error:', error)
    res.status(500).json({ error: 'Failed to change password' })
  }
})

/**
 * Request password reset
 */
router.post('/forgot-password', authRateLimiter, async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    const user = users.get(email.toLowerCase())

    // Always return success to prevent email enumeration
    if (!user) {
      return res.json({ message: 'If an account exists, a password reset link has been sent.' })
    }

    const otpResult = await createOtp(user.id, 'EMAIL', 'PASSWORD_RESET')
    await sendEmailOtp(user.email, otpResult.otp, 'PASSWORD_RESET')

    res.json({
      message: 'If an account exists, a password reset code has been sent.',
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    if (error.message.includes('wait')) {
      return res.status(429).json({ error: error.message })
    }
    console.error('Forgot password error:', error)
    res.status(500).json({ error: 'Failed to process request' })
  }
})

/**
 * Reset password with OTP
 */
router.post('/reset-password', authRateLimiter, async (req, res) => {
  try {
    const { email, code, newPassword } = req.body

    if (!email || !code || !newPassword) {
      return res.status(400).json({ error: 'Email, verification code, and new password are required' })
    }

    const user = users.get(email.toLowerCase())
    if (!user) {
      return res.status(400).json({ error: 'Invalid verification code' })
    }

    // Verify OTP
    const result = await verifyOtp(user.id, code, 'EMAIL', 'PASSWORD_RESET')
    if (!result.valid) {
      return res.status(400).json({ error: result.error })
    }

    // Validate new password
    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error })
    }

    // Update password
    user.password = await bcrypt.hash(newPassword, 12)
    user.passwordChangedAt = new Date().toISOString()
    user.failedAttempts = 0
    user.lockedUntil = null
    user.updatedAt = new Date().toISOString()
    users.set(email.toLowerCase(), user)

    // Invalidate all sessions
    await revokeAllUserSessions(user.id)
    invalidateUserOtps(user.id)

    res.json({ message: 'Password reset successfully. Please login with your new password.' })
  } catch (error) {
    console.error('Reset password error:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

// ==================== 2FA SETTINGS ====================

/**
 * Get 2FA settings
 */
router.get('/2fa/settings', authenticate, (req, res) => {
  try {
    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      enabled: user.twoFactorEnabled,
      method: user.twoFactorMethod,
      phoneVerified: user.phoneVerified,
      emailVerified: user.emailVerified,
      faceEnrolled: user.faceEnrolled,
      availableMethods: [
        { id: 'SMS_OTP', name: 'SMS', available: !!user.phone && user.phoneVerified },
        { id: 'EMAIL_OTP', name: 'Email', available: user.emailVerified },
        { id: 'FACE_VERIFICATION', name: 'Face Verification', available: user.faceEnrolled },
      ]
    })
  } catch (error) {
    console.error('Get 2FA settings error:', error)
    res.status(500).json({ error: 'Failed to get 2FA settings' })
  }
})

/**
 * Enable 2FA
 */
router.post('/2fa/enable', authenticate, async (req, res) => {
  try {
    const { method } = req.body

    if (!method) {
      return res.status(400).json({ error: '2FA method is required' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Validate method availability
    if (method === 'SMS_OTP' && (!user.phone || !user.phoneVerified)) {
      return res.status(400).json({ error: 'Please verify your phone number first' })
    }

    if (method === 'EMAIL_OTP' && !user.emailVerified) {
      return res.status(400).json({ error: 'Please verify your email first' })
    }

    // Send verification OTP to confirm enabling
    const otpType = method === 'EMAIL_OTP' ? 'EMAIL' : 'SMS'
    const otpResult = await createOtp(user.id, otpType, 'TRANSACTION')

    if (otpType === 'SMS' && user.phone) {
      await sendSmsOtp(user.phone, otpResult.otp)
    } else {
      await sendEmailOtp(user.email, otpResult.otp, 'TRANSACTION')
    }

    res.json({
      message: 'Verification code sent. Please enter the code to confirm.',
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    console.error('Enable 2FA error:', error)
    res.status(500).json({ error: 'Failed to enable 2FA' })
  }
})

/**
 * Confirm 2FA enablement
 */
router.post('/2fa/confirm', authenticate, async (req, res) => {
  try {
    const { method, code } = req.body

    if (!method || !code) {
      return res.status(400).json({ error: 'Method and verification code are required' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify OTP
    const otpType = method === 'EMAIL_OTP' ? 'EMAIL' : 'SMS'
    const result = await verifyOtp(user.id, code, otpType, 'TRANSACTION')

    if (!result.valid) {
      return res.status(400).json({ error: result.error })
    }

    // Enable 2FA
    user.twoFactorEnabled = true
    user.twoFactorMethod = method
    user.updatedAt = new Date().toISOString()
    users.set(user.email, user)

    res.json({
      message: '2FA enabled successfully',
      method: user.twoFactorMethod
    })
  } catch (error) {
    console.error('Confirm 2FA error:', error)
    res.status(500).json({ error: 'Failed to enable 2FA' })
  }
})

/**
 * Disable 2FA
 */
router.post('/2fa/disable', authenticate, async (req, res) => {
  try {
    const { password } = req.body

    if (!password) {
      return res.status(400).json({ error: 'Password is required to disable 2FA' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Incorrect password' })
    }

    // Disable 2FA
    user.twoFactorEnabled = false
    user.updatedAt = new Date().toISOString()
    users.set(user.email, user)

    res.json({ message: '2FA disabled successfully' })
  } catch (error) {
    console.error('Disable 2FA error:', error)
    res.status(500).json({ error: 'Failed to disable 2FA' })
  }
})

// ==================== PHONE VERIFICATION ====================

/**
 * Request phone verification
 */
router.post('/verify-phone/request', authenticate, async (req, res) => {
  try {
    const { phone } = req.body

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Update phone number (unverified)
    user.phone = phone
    user.phoneVerified = false
    users.set(user.email, user)

    // Send OTP
    const otpResult = await createOtp(user.id, 'SMS', 'PHONE_VERIFICATION')
    await sendSmsOtp(phone, otpResult.otp)

    res.json({
      message: `Verification code sent to ****${phone.slice(-4)}`,
      ...(process.env.NODE_ENV === 'development' && { debugOtp: otpResult.otp })
    })
  } catch (error) {
    if (error.message.includes('wait')) {
      return res.status(429).json({ error: error.message })
    }
    console.error('Phone verification request error:', error)
    res.status(500).json({ error: 'Failed to send verification code' })
  }
})

/**
 * Confirm phone verification
 */
router.post('/verify-phone/confirm', authenticate, async (req, res) => {
  try {
    const { code } = req.body

    if (!code) {
      return res.status(400).json({ error: 'Verification code is required' })
    }

    let user = null
    for (const [, u] of users) {
      if (u.id === req.user.id) {
        user = u
        break
      }
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Verify OTP
    const result = await verifyOtp(user.id, code, 'SMS', 'PHONE_VERIFICATION')

    if (!result.valid) {
      return res.status(400).json({ error: result.error })
    }

    // Mark phone as verified
    user.phoneVerified = true
    user.updatedAt = new Date().toISOString()
    users.set(user.email, user)

    res.json({
      message: 'Phone number verified successfully',
      user: sanitizeUser(user)
    })
  } catch (error) {
    console.error('Phone verification confirm error:', error)
    res.status(500).json({ error: 'Failed to verify phone number' })
  }
})

// ==================== SESSION MANAGEMENT ====================

/**
 * Get active sessions
 */
router.get('/sessions', authenticate, (req, res) => {
  try {
    const sessions = getUserSessions(req.user.id)

    // Mark current session
    const currentSessionId = req.user.sessionId
    const formattedSessions = sessions.map(session => ({
      ...session,
      current: session.id === currentSessionId
    }))

    res.json({ sessions: formattedSessions })
  } catch (error) {
    console.error('Get sessions error:', error)
    res.status(500).json({ error: 'Failed to get sessions' })
  }
})

/**
 * Revoke a specific session
 */
router.delete('/sessions/:sessionId', authenticate, async (req, res) => {
  try {
    const { sessionId } = req.params

    if (sessionId === req.user.sessionId) {
      return res.status(400).json({ error: 'Cannot revoke current session. Use logout instead.' })
    }

    await revokeSession(sessionId)
    res.json({ message: 'Session revoked successfully' })
  } catch (error) {
    console.error('Revoke session error:', error)
    res.status(500).json({ error: 'Failed to revoke session' })
  }
})

export default router
