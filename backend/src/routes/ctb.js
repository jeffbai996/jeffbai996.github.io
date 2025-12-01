import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory store (replace with database in production)
const licenses = new Map()
const taxFilings = new Map()

// License types
const LICENSE_TYPES = {
  'CTB-CUL': { name: 'Cultivation License', fee: 5000, processingDays: 14 },
  'CTB-PRO': { name: 'Processing License', fee: 7500, processingDays: 21 },
  'CTB-RET': { name: 'Retail License', fee: 10000, processingDays: 21 },
  'CTB-TST': { name: 'Testing License', fee: 3000, processingDays: 14 }
}

// Get all license types
router.get('/license-types', (req, res) => {
  res.json({ licenseTypes: LICENSE_TYPES })
})

// Apply for a license
router.post('/licenses', (req, res) => {
  try {
    const { type, businessName, ownerName, address, email, phone } = req.body

    if (!type || !LICENSE_TYPES[type]) {
      return res.status(400).json({ error: 'Invalid license type' })
    }

    if (!businessName || !ownerName || !address || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const license = {
      id: uuidv4(),
      applicationNumber: `CTB-${Date.now().toString(36).toUpperCase()}`,
      type,
      typeName: LICENSE_TYPES[type].name,
      businessName,
      ownerName,
      address,
      email,
      phone,
      status: 'pending',
      fee: LICENSE_TYPES[type].fee,
      submittedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + LICENSE_TYPES[type].processingDays * 24 * 60 * 60 * 1000).toISOString()
    }

    licenses.set(license.id, license)

    res.status(201).json({
      message: 'License application submitted successfully',
      license
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' })
  }
})

// Get license by ID
router.get('/licenses/:id', (req, res) => {
  const license = licenses.get(req.params.id)
  if (!license) {
    return res.status(404).json({ error: 'License not found' })
  }
  res.json({ license })
})

// Get license by application number
router.get('/licenses/lookup/:applicationNumber', (req, res) => {
  const license = Array.from(licenses.values()).find(
    l => l.applicationNumber === req.params.applicationNumber
  )
  if (!license) {
    return res.status(404).json({ error: 'License not found' })
  }
  res.json({ license })
})

// Get tax rates
router.get('/tax-rates', (req, res) => {
  res.json({
    rates: {
      excise: { rate: 15, unit: 'percent', effectiveDate: '2024-01-01' },
      cultivation: { rate: 9.25, unit: 'per_ounce', effectiveDate: '2024-01-01' },
      processing: { rate: 2.75, unit: 'per_unit', effectiveDate: '2024-01-01' },
      retail: { rate: 8, unit: 'percent', effectiveDate: '2024-01-01' }
    },
    lastUpdated: '2024-01-01'
  })
})

// Submit tax filing
router.post('/tax-filings', (req, res) => {
  try {
    const { licenseNumber, period, grossSales, taxableAmount } = req.body

    if (!licenseNumber || !period || grossSales === undefined) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const taxDue = (taxableAmount || grossSales) * 0.15 // 15% excise rate

    const filing = {
      id: uuidv4(),
      confirmationNumber: `TF-${Date.now().toString(36).toUpperCase()}`,
      licenseNumber,
      period,
      grossSales,
      taxableAmount: taxableAmount || grossSales,
      taxDue,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    }

    taxFilings.set(filing.id, filing)

    res.status(201).json({
      message: 'Tax filing submitted successfully',
      filing
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit tax filing' })
  }
})

// Get statistics
router.get('/stats', (req, res) => {
  res.json({
    activeLicenses: 1247,
    taxRevenue: 84000000,
    complianceRate: 97.2,
    avgProcessingDays: 14
  })
})

export default router
