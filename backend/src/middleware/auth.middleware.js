import { validateSession, updateSessionActivity } from '../services/session.service.js'

// In-memory user store reference (same as auth.js - in production, use database)
let usersStore = null

/**
 * Set the users store reference
 * This allows the middleware to access the same user store as auth routes
 */
export function setUsersStore(store) {
  usersStore = store
}

/**
 * Authentication middleware
 * Validates JWT token and attaches user to request
 */
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: 'Authentication required',
      code: 'NO_TOKEN'
    })
  }

  const token = authHeader.split(' ')[1]
  const result = validateSession(token)

  if (!result.valid) {
    return res.status(401).json({
      error: result.error,
      code: result.code
    })
  }

  // Attach user info to request
  req.user = result.payload
  req.token = token

  // Update session activity
  if (result.payload.sessionId) {
    updateSessionActivity(result.payload.sessionId)
  }

  next()
}

/**
 * Optional authentication middleware
 * Attaches user to request if token is valid, but doesn't require it
 */
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1]
    const result = validateSession(token)

    if (result.valid) {
      req.user = result.payload
      req.token = token

      if (result.payload.sessionId) {
        updateSessionActivity(result.payload.sessionId)
      }
    }
  }

  next()
}

/**
 * Role-based authorization middleware
 * @param {...string} roles - Allowed roles
 */
export function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: 'Authentication required',
        code: 'NO_TOKEN'
      })
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Insufficient permissions',
        code: 'FORBIDDEN'
      })
    }

    next()
  }
}

/**
 * 2FA verification middleware
 * Ensures the user has completed 2FA for sensitive operations
 */
export function require2FA(req, res, next) {
  if (!req.user) {
    return res.status(401).json({
      error: 'Authentication required',
      code: 'NO_TOKEN'
    })
  }

  // Check if session was created with 2FA verification
  // In production, this would check a flag on the session
  if (!req.user.twoFactorVerified) {
    return res.status(403).json({
      error: 'Two-factor authentication required',
      code: '2FA_REQUIRED'
    })
  }

  next()
}

/**
 * Rate limiting for authentication endpoints
 */
const loginAttempts = new Map()

export function authRateLimiter(req, res, next) {
  const ip = req.ip || req.connection.remoteAddress
  const key = `${ip}:auth`
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxAttempts = 5

  let record = loginAttempts.get(key)

  if (!record || now - record.firstAttempt > windowMs) {
    record = { firstAttempt: now, attempts: 0 }
  }

  record.attempts++
  loginAttempts.set(key, record)

  if (record.attempts > maxAttempts) {
    const retryAfter = Math.ceil((record.firstAttempt + windowMs - now) / 1000)
    return res.status(429).json({
      error: 'Too many login attempts. Please try again later.',
      code: 'RATE_LIMITED',
      retryAfter
    })
  }

  // Attach function to reset rate limit on successful login
  req.resetAuthRateLimit = () => {
    loginAttempts.delete(key)
  }

  next()
}

/**
 * Clean up expired rate limit records periodically
 */
setInterval(() => {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000
  for (const [key, record] of loginAttempts) {
    if (now - record.firstAttempt > windowMs) {
      loginAttempts.delete(key)
    }
  }
}, 60 * 1000) // Clean up every minute

export default {
  authenticate,
  optionalAuth,
  authorize,
  require2FA,
  authRateLimiter,
  setUsersStore,
}
