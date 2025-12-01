import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory store (replace with database in production)
const cases = new Map()

// Sample case data
const sampleCases = [
  {
    id: uuidv4(),
    caseNumber: 'CV-2024-001234',
    title: 'Smith v. Jones',
    type: 'civil',
    court: 'District Court - Central',
    status: 'active',
    filedDate: '2024-03-15',
    nextHearing: '2024-12-15',
    judge: 'Hon. Maria Santos'
  },
  {
    id: uuidv4(),
    caseNumber: 'CR-2024-005678',
    title: 'Republic v. Doe',
    type: 'criminal',
    court: 'District Court - North',
    status: 'pending',
    filedDate: '2024-06-20',
    nextHearing: '2024-12-20',
    judge: 'Hon. James Chen'
  }
]

// Initialize sample data
sampleCases.forEach(c => cases.set(c.id, c))

// Search cases
router.get('/cases/search', (req, res) => {
  const { q, type, status } = req.query
  let results = Array.from(cases.values())

  if (q) {
    const query = q.toLowerCase()
    results = results.filter(c =>
      c.caseNumber.toLowerCase().includes(query) ||
      c.title.toLowerCase().includes(query)
    )
  }

  if (type) {
    results = results.filter(c => c.type === type)
  }

  if (status) {
    results = results.filter(c => c.status === status)
  }

  res.json({ cases: results, total: results.length })
})

// Get case by number
router.get('/cases/:caseNumber', (req, res) => {
  const caseData = Array.from(cases.values()).find(
    c => c.caseNumber === req.params.caseNumber
  )

  if (!caseData) {
    return res.status(404).json({ error: 'Case not found' })
  }

  res.json({ case: caseData })
})

// Get court locations
router.get('/courts', (req, res) => {
  res.json({
    courts: [
      { id: 'supreme', name: 'Supreme Court', location: 'Capitol Building, Praya City', type: 'supreme' },
      { id: 'appeals', name: 'Court of Appeals', location: '100 Justice Way, Praya City', type: 'appeals' },
      { id: 'district-central', name: 'District Court - Central', location: '50 Main St, Praya City', type: 'district' },
      { id: 'district-north', name: 'District Court - North', location: '200 North Ave, Northtown', type: 'district' },
      { id: 'district-south', name: 'District Court - South', location: '300 South Blvd, Southport', type: 'district' },
      { id: 'district-east', name: 'District Court - East', location: '400 East Rd, Eastville', type: 'district' },
      { id: 'district-west', name: 'District Court - West', location: '500 West Lane, Westbrook', type: 'district' }
    ]
  })
})

// Get court calendar
router.get('/calendar', (req, res) => {
  const { court, date } = req.query

  // Mock calendar data
  const hearings = [
    { time: '09:00', caseNumber: 'CV-2024-001234', title: 'Smith v. Jones', courtroom: 'A' },
    { time: '10:30', caseNumber: 'CR-2024-005678', title: 'Republic v. Doe', courtroom: 'B' },
    { time: '14:00', caseNumber: 'CV-2024-002345', title: 'Brown v. City of Praya', courtroom: 'A' }
  ]

  res.json({
    date: date || new Date().toISOString().split('T')[0],
    court: court || 'all',
    hearings
  })
})

// Get criminal code sections
router.get('/code', (req, res) => {
  res.json({
    sections: [
      { id: 'title-1', title: 'Title I: Crimes Against Persons', chapters: 12 },
      { id: 'title-2', title: 'Title II: Crimes Against Property', chapters: 8 },
      { id: 'title-3', title: 'Title III: Crimes Against Public Order', chapters: 6 },
      { id: 'title-4', title: 'Title IV: Drug Offenses', chapters: 4 },
      { id: 'title-5', title: 'Title V: Traffic Violations', chapters: 5 },
      { id: 'title-6', title: 'Title VI: Regulatory Offenses', chapters: 7 }
    ]
  })
})

// Get statistics
router.get('/stats', (req, res) => {
  res.json({
    casesFiled: 12847,
    resolutionRate: 94.3,
    courtLocations: 24,
    avgResolutionDays: 45
  })
})

export default router
