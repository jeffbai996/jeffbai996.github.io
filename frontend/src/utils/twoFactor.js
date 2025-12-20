/**
 * Two-Factor Authentication Utilities
 * Handles TOTP (Time-based One-Time Password) and SMS OTP
 */

/**
 * Generate a 6-digit OTP code
 */
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Verify OTP code
 * In production, this would verify against server-side generated code
 */
export function verifyOTP(enteredCode, storedCode) {
  return enteredCode === storedCode
}

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone) {
  if (!phone) return ''

  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '')

  // Format as (XXX) XXX-XXXX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }

  return phone
}

/**
 * Mask phone number for security
 */
export function maskPhoneNumber(phone) {
  if (!phone) return ''

  const cleaned = phone.replace(/\D/g, '')

  if (cleaned.length === 10) {
    return `(***) ***-${cleaned.slice(6)}`
  }

  return '***-***-****'
}

/**
 * Mask email for security
 */
export function maskEmail(email) {
  if (!email) return ''

  const [username, domain] = email.split('@')

  if (!domain) return email

  const maskedUsername = username.length > 2
    ? username.charAt(0) + '*'.repeat(username.length - 2) + username.charAt(username.length - 1)
    : username.charAt(0) + '*'

  return `${maskedUsername}@${domain}`
}

/**
 * Send OTP via SMS (mock implementation)
 * In production, integrate with Twilio, AWS SNS, or similar
 */
export async function sendSMSOTP(phoneNumber) {
  const otp = generateOTP()

  // Mock delay to simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In production, call SMS API here
  console.log(`SMS OTP sent to ${phoneNumber}: ${otp}`)

  // Store in localStorage for demo (in production, store server-side)
  localStorage.setItem('sms_otp', otp)
  localStorage.setItem('sms_otp_expires', Date.now() + 5 * 60 * 1000) // 5 minutes

  return {
    success: true,
    message: `Verification code sent to ${maskPhoneNumber(phoneNumber)}`
  }
}

/**
 * Send OTP via Email (mock implementation)
 */
export async function sendEmailOTP(email) {
  const otp = generateOTP()

  // Mock delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  console.log(`Email OTP sent to ${email}: ${otp}`)

  // Store in localStorage for demo
  localStorage.setItem('email_otp', otp)
  localStorage.setItem('email_otp_expires', Date.now() + 5 * 60 * 1000) // 5 minutes

  return {
    success: true,
    message: `Verification code sent to ${maskEmail(email)}`
  }
}

/**
 * Verify SMS OTP
 */
export function verifySMSOTP(code) {
  const storedOTP = localStorage.getItem('sms_otp')
  const expiresAt = parseInt(localStorage.getItem('sms_otp_expires') || '0')

  if (!storedOTP) {
    return {
      success: false,
      error: 'No OTP found. Please request a new code.'
    }
  }

  if (Date.now() > expiresAt) {
    localStorage.removeItem('sms_otp')
    localStorage.removeItem('sms_otp_expires')
    return {
      success: false,
      error: 'OTP expired. Please request a new code.'
    }
  }

  if (code !== storedOTP) {
    return {
      success: false,
      error: 'Invalid code. Please try again.'
    }
  }

  // Clear OTP after successful verification
  localStorage.removeItem('sms_otp')
  localStorage.removeItem('sms_otp_expires')

  return {
    success: true,
    message: 'Phone number verified successfully'
  }
}

/**
 * Verify Email OTP
 */
export function verifyEmailOTP(code) {
  const storedOTP = localStorage.getItem('email_otp')
  const expiresAt = parseInt(localStorage.getItem('email_otp_expires') || '0')

  if (!storedOTP) {
    return {
      success: false,
      error: 'No OTP found. Please request a new code.'
    }
  }

  if (Date.now() > expiresAt) {
    localStorage.removeItem('email_otp')
    localStorage.removeItem('email_otp_expires')
    return {
      success: false,
      error: 'OTP expired. Please request a new code.'
    }
  }

  if (code !== storedOTP) {
    return {
      success: false,
      error: 'Invalid code. Please try again.'
    }
  }

  localStorage.removeItem('email_otp')
  localStorage.removeItem('email_otp_expires')

  return {
    success: true,
    message: 'Email verified successfully'
  }
}

/**
 * Check if 2FA is enabled for user
 */
export function is2FAEnabled() {
  return localStorage.getItem('2fa_enabled') === 'true'
}

/**
 * Enable 2FA
 */
export function enable2FA(method = 'sms') {
  localStorage.setItem('2fa_enabled', 'true')
  localStorage.setItem('2fa_method', method)

  return {
    success: true,
    message: '2FA enabled successfully'
  }
}

/**
 * Disable 2FA
 */
export function disable2FA() {
  localStorage.removeItem('2fa_enabled')
  localStorage.removeItem('2fa_method')

  return {
    success: true,
    message: '2FA disabled successfully'
  }
}

/**
 * Get 2FA method
 */
export function get2FAMethod() {
  return localStorage.getItem('2fa_method') || 'sms'
}

/**
 * Generate backup codes
 */
export function generateBackupCodes(count = 10) {
  const codes = []

  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase()
    codes.push(code)
  }

  return codes
}

/**
 * Save backup codes
 */
export function saveBackupCodes(codes) {
  localStorage.setItem('2fa_backup_codes', JSON.stringify(codes))

  return {
    success: true,
    message: 'Backup codes saved successfully'
  }
}

/**
 * Verify backup code
 */
export function verifyBackupCode(code) {
  const codesStr = localStorage.getItem('2fa_backup_codes')

  if (!codesStr) {
    return {
      success: false,
      error: 'No backup codes found'
    }
  }

  const codes = JSON.parse(codesStr)
  const index = codes.indexOf(code.toUpperCase())

  if (index === -1) {
    return {
      success: false,
      error: 'Invalid backup code'
    }
  }

  // Remove used code
  codes.splice(index, 1)
  localStorage.setItem('2fa_backup_codes', JSON.stringify(codes))

  return {
    success: true,
    message: 'Backup code verified',
    remainingCodes: codes.length
  }
}
