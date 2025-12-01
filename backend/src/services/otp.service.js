import crypto from 'crypto'
import bcrypt from 'bcryptjs'

// In-memory OTP store (replace with database in production)
const otpStore = new Map()

// OTP Configuration
const OTP_CONFIG = {
  length: 6,
  expiresIn: 5 * 60 * 1000, // 5 minutes
  maxAttempts: 3,
  cooldown: 60 * 1000, // 1 minute between resends
}

/**
 * Generate a cryptographically secure OTP
 */
function generateOtp(length = OTP_CONFIG.length) {
  const digits = '0123456789'
  let otp = ''
  const randomBytes = crypto.randomBytes(length)
  for (let i = 0; i < length; i++) {
    otp += digits[randomBytes[i] % 10]
  }
  return otp
}

/**
 * Create and store an OTP for a user
 * @param {string} userId - User ID
 * @param {string} type - OTP type (SMS, EMAIL, VOICE)
 * @param {string} purpose - OTP purpose (LOGIN, REGISTRATION, etc.)
 * @returns {Object} - OTP details including the plain OTP (for sending)
 */
export async function createOtp(userId, type, purpose) {
  const key = `${userId}:${type}:${purpose}`

  // Check for cooldown
  const existing = otpStore.get(key)
  if (existing && Date.now() - existing.createdAt < OTP_CONFIG.cooldown) {
    const remainingSeconds = Math.ceil((OTP_CONFIG.cooldown - (Date.now() - existing.createdAt)) / 1000)
    throw new Error(`Please wait ${remainingSeconds} seconds before requesting a new code`)
  }

  const plainOtp = generateOtp()
  const hashedOtp = await bcrypt.hash(plainOtp, 10)

  const otpRecord = {
    id: crypto.randomUUID(),
    userId,
    code: hashedOtp,
    type,
    purpose,
    expiresAt: Date.now() + OTP_CONFIG.expiresIn,
    usedAt: null,
    attempts: 0,
    createdAt: Date.now(),
  }

  otpStore.set(key, otpRecord)

  return {
    id: otpRecord.id,
    otp: plainOtp, // Return plain OTP for sending via SMS/Email
    expiresAt: new Date(otpRecord.expiresAt),
    type,
    purpose,
  }
}

/**
 * Verify an OTP
 * @param {string} userId - User ID
 * @param {string} code - OTP code to verify
 * @param {string} type - OTP type
 * @param {string} purpose - OTP purpose
 * @returns {Object} - Verification result
 */
export async function verifyOtp(userId, code, type, purpose) {
  const key = `${userId}:${type}:${purpose}`
  const otpRecord = otpStore.get(key)

  if (!otpRecord) {
    return { valid: false, error: 'No verification code found. Please request a new one.' }
  }

  // Check if expired
  if (Date.now() > otpRecord.expiresAt) {
    otpStore.delete(key)
    return { valid: false, error: 'Verification code has expired. Please request a new one.' }
  }

  // Check if already used
  if (otpRecord.usedAt) {
    return { valid: false, error: 'This code has already been used. Please request a new one.' }
  }

  // Check max attempts
  if (otpRecord.attempts >= OTP_CONFIG.maxAttempts) {
    otpStore.delete(key)
    return { valid: false, error: 'Too many failed attempts. Please request a new code.' }
  }

  // Verify the code
  const isValid = await bcrypt.compare(code, otpRecord.code)

  if (!isValid) {
    otpRecord.attempts += 1
    otpStore.set(key, otpRecord)
    const remaining = OTP_CONFIG.maxAttempts - otpRecord.attempts
    return {
      valid: false,
      error: `Invalid code. ${remaining} attempt${remaining === 1 ? '' : 's'} remaining.`,
      attemptsRemaining: remaining
    }
  }

  // Mark as used
  otpRecord.usedAt = Date.now()
  otpStore.set(key, otpRecord)

  // Clean up after successful verification
  setTimeout(() => otpStore.delete(key), 1000)

  return { valid: true }
}

/**
 * Invalidate all OTPs for a user
 * @param {string} userId - User ID
 */
export function invalidateUserOtps(userId) {
  for (const [key] of otpStore) {
    if (key.startsWith(`${userId}:`)) {
      otpStore.delete(key)
    }
  }
}

/**
 * Send OTP via SMS (mock implementation)
 * In production, integrate with SMS provider (Twilio, AWS SNS, etc.)
 */
export async function sendSmsOtp(phone, otp) {
  // Mock implementation - in production, use actual SMS service
  console.log(`[PrayaPass SMS] Sending OTP ${otp} to ${phone}`)

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    success: true,
    message: `Verification code sent to ${maskPhone(phone)}`,
    // In development, include OTP for testing
    ...(process.env.NODE_ENV === 'development' && { debugOtp: otp })
  }
}

/**
 * Send OTP via Email (mock implementation)
 * In production, integrate with email provider (SendGrid, AWS SES, etc.)
 */
export async function sendEmailOtp(email, otp, purpose) {
  // Mock implementation - in production, use actual email service
  console.log(`[PrayaPass Email] Sending OTP ${otp} to ${email} for ${purpose}`)

  const subjects = {
    LOGIN: 'Your PrayaPass Login Code',
    REGISTRATION: 'Verify Your PrayaPass Account',
    PASSWORD_RESET: 'Reset Your PrayaPass Password',
    EMAIL_VERIFICATION: 'Verify Your Email Address',
    TRANSACTION: 'Confirm Your Transaction',
  }

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    success: true,
    message: `Verification code sent to ${maskEmail(email)}`,
    subject: subjects[purpose] || 'Your Verification Code',
    // In development, include OTP for testing
    ...(process.env.NODE_ENV === 'development' && { debugOtp: otp })
  }
}

/**
 * Mask phone number for display
 */
function maskPhone(phone) {
  if (!phone || phone.length < 4) return '****'
  return `****${phone.slice(-4)}`
}

/**
 * Mask email for display
 */
function maskEmail(email) {
  if (!email) return '****'
  const [local, domain] = email.split('@')
  if (!domain) return '****'
  const maskedLocal = local.length > 2
    ? `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}`
    : '**'
  return `${maskedLocal}@${domain}`
}

export default {
  createOtp,
  verifyOtp,
  invalidateUserOtps,
  sendSmsOtp,
  sendEmailOtp,
}
