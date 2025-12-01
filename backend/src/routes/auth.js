import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory store (replace with database in production)
const users = new Map()

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (users.has(email)) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const user = {
      id: uuidv4(),
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'citizen',
      createdAt: new Date().toISOString()
    }

    users.set(email, user)

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.status(201).json({
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, firstName, lastName, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = users.get(email)
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      token
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// Get current user
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  try {
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    const user = users.get(decoded.email)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role }
    })
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
})

export default router
