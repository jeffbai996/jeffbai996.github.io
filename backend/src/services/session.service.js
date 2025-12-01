import crypto from 'crypto'
import jwt from 'jsonwebtoken'

// In-memory session store (replace with database in production)
const sessionStore = new Map()
const refreshTokenStore = new Map()

// Session Configuration
const SESSION_CONFIG = {
  accessTokenExpiry: 15 * 60 * 1000, // 15 minutes
  refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
  maxSessionsPerUser: 5,
}

/**
 * Generate a secure random token
 */
function generateToken(length = 32) {
  return crypto.randomBytes(length).toString('hex')
}

/**
 * Create a new session for a user
 * @param {Object} user - User object
 * @param {Object} metadata - Session metadata (IP, user agent, device)
 * @returns {Object} - Session tokens and info
 */
export async function createSession(user, metadata = {}) {
  const { ipAddress = 'unknown', userAgent = 'unknown', deviceId = null } = metadata

  // Generate tokens
  const accessToken = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      sessionId: crypto.randomUUID(),
    },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '15m' }
  )

  const refreshToken = generateToken(64)
  const sessionId = crypto.randomUUID()

  const session = {
    id: sessionId,
    userId: user.id,
    token: accessToken,
    refreshToken,
    deviceId,
    ipAddress,
    userAgent,
    expiresAt: Date.now() + SESSION_CONFIG.accessTokenExpiry,
    refreshExpiresAt: Date.now() + SESSION_CONFIG.refreshTokenExpiry,
    lastActiveAt: Date.now(),
    createdAt: Date.now(),
    revokedAt: null,
  }

  // Store session
  sessionStore.set(sessionId, session)
  refreshTokenStore.set(refreshToken, sessionId)

  // Enforce max sessions per user
  await enforceMaxSessions(user.id)

  return {
    accessToken,
    refreshToken,
    sessionId,
    expiresIn: SESSION_CONFIG.accessTokenExpiry / 1000,
    refreshExpiresIn: SESSION_CONFIG.refreshTokenExpiry / 1000,
  }
}

/**
 * Refresh an access token using a refresh token
 * @param {string} refreshToken - The refresh token
 * @returns {Object} - New access token
 */
export async function refreshSession(refreshToken) {
  const sessionId = refreshTokenStore.get(refreshToken)
  if (!sessionId) {
    throw new Error('Invalid refresh token')
  }

  const session = sessionStore.get(sessionId)
  if (!session) {
    refreshTokenStore.delete(refreshToken)
    throw new Error('Session not found')
  }

  // Check if revoked
  if (session.revokedAt) {
    throw new Error('Session has been revoked')
  }

  // Check if refresh token expired
  if (Date.now() > session.refreshExpiresAt) {
    sessionStore.delete(sessionId)
    refreshTokenStore.delete(refreshToken)
    throw new Error('Refresh token expired')
  }

  // Generate new access token
  const decoded = jwt.decode(session.token)
  const newAccessToken = jwt.sign(
    {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
      sessionId: session.id,
    },
    process.env.JWT_SECRET || 'dev-secret',
    { expiresIn: '15m' }
  )

  // Update session
  session.token = newAccessToken
  session.expiresAt = Date.now() + SESSION_CONFIG.accessTokenExpiry
  session.lastActiveAt = Date.now()
  sessionStore.set(sessionId, session)

  return {
    accessToken: newAccessToken,
    expiresIn: SESSION_CONFIG.accessTokenExpiry / 1000,
  }
}

/**
 * Validate a session token
 * @param {string} token - The access token
 * @returns {Object} - Decoded token payload if valid
 */
export function validateSession(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    return { valid: true, payload: decoded }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return { valid: false, error: 'Token expired', code: 'TOKEN_EXPIRED' }
    }
    return { valid: false, error: 'Invalid token', code: 'INVALID_TOKEN' }
  }
}

/**
 * Revoke a specific session
 * @param {string} sessionId - Session ID to revoke
 */
export async function revokeSession(sessionId) {
  const session = sessionStore.get(sessionId)
  if (session) {
    session.revokedAt = Date.now()
    sessionStore.set(sessionId, session)
    refreshTokenStore.delete(session.refreshToken)
  }
}

/**
 * Revoke all sessions for a user
 * @param {string} userId - User ID
 * @param {string} exceptSessionId - Session to keep (optional)
 */
export async function revokeAllUserSessions(userId, exceptSessionId = null) {
  for (const [sessionId, session] of sessionStore) {
    if (session.userId === userId && sessionId !== exceptSessionId) {
      session.revokedAt = Date.now()
      sessionStore.set(sessionId, session)
      refreshTokenStore.delete(session.refreshToken)
    }
  }
}

/**
 * Get all active sessions for a user
 * @param {string} userId - User ID
 * @returns {Array} - List of active sessions
 */
export function getUserSessions(userId) {
  const sessions = []
  for (const [sessionId, session] of sessionStore) {
    if (session.userId === userId && !session.revokedAt && Date.now() < session.refreshExpiresAt) {
      sessions.push({
        id: sessionId,
        deviceId: session.deviceId,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        lastActiveAt: new Date(session.lastActiveAt),
        createdAt: new Date(session.createdAt),
        current: false, // Will be set by caller
      })
    }
  }
  return sessions.sort((a, b) => b.lastActiveAt - a.lastActiveAt)
}

/**
 * Enforce maximum sessions per user
 * Removes oldest sessions if limit exceeded
 */
async function enforceMaxSessions(userId) {
  const sessions = getUserSessions(userId)
  if (sessions.length > SESSION_CONFIG.maxSessionsPerUser) {
    // Sort by lastActiveAt ascending (oldest first)
    sessions.sort((a, b) => a.lastActiveAt - b.lastActiveAt)
    const toRemove = sessions.slice(0, sessions.length - SESSION_CONFIG.maxSessionsPerUser)
    for (const session of toRemove) {
      await revokeSession(session.id)
    }
  }
}

/**
 * Update session activity
 * @param {string} sessionId - Session ID
 */
export function updateSessionActivity(sessionId) {
  const session = sessionStore.get(sessionId)
  if (session) {
    session.lastActiveAt = Date.now()
    sessionStore.set(sessionId, session)
  }
}

/**
 * Get session by ID
 * @param {string} sessionId - Session ID
 * @returns {Object|null} - Session object or null
 */
export function getSession(sessionId) {
  return sessionStore.get(sessionId) || null
}

export default {
  createSession,
  refreshSession,
  validateSession,
  revokeSession,
  revokeAllUserSessions,
  getUserSessions,
  updateSessionActivity,
  getSession,
}
