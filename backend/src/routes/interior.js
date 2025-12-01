import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory stores (replace with database in production)
const landRecords = new Map()
const permits = new Map()
const civilRecords = new Map()

// Sample land records
const sampleLandRecords = [
  {
    id: uuidv4(),
    parcelNumber: 'PRY-001-234-567',
    address: '123 Main Street, Praya City',
    owner: 'John Smith',
    area: 2500,
    areaUnit: 'sqm',
    zoning: 'residential',
    registeredDate: '2018-05-15',
    lastTransfer: '2022-03-20'
  },
  {
    id: uuidv4(),
    parcelNumber: 'PRY-002-345-678',
    address: '456 Commerce Ave, Praya City',
    owner: 'ABC Corporation',
    area: 15000,
    areaUnit: 'sqm',
    zoning: 'commercial',
    registeredDate: '2015-09-10',
    lastTransfer: '2021-11-05'
  }
]

sampleLandRecords.forEach(r => landRecords.set(r.id, r))

// Permit types
const PERMIT_TYPES = {
  'PERM-NEW': { name: 'New Construction', fee: 500, processingDays: 10 },
  'PERM-REN': { name: 'Renovation', fee: 250, processingDays: 7 },
  'PERM-DEM': { name: 'Demolition', fee: 300, processingDays: 5 },
  'PERM-ZON': { name: 'Zoning Variance', fee: 750, processingDays: 21 }
}

// Search land records
router.get('/land/search', (req, res) => {
  const { parcel, address, owner } = req.query
  let results = Array.from(landRecords.values())

  if (parcel) {
    results = results.filter(r => r.parcelNumber.toLowerCase().includes(parcel.toLowerCase()))
  }

  if (address) {
    results = results.filter(r => r.address.toLowerCase().includes(address.toLowerCase()))
  }

  if (owner) {
    results = results.filter(r => r.owner.toLowerCase().includes(owner.toLowerCase()))
  }

  res.json({ records: results, total: results.length })
})

// Get land record by parcel number
router.get('/land/:parcelNumber', (req, res) => {
  const record = Array.from(landRecords.values()).find(
    r => r.parcelNumber === req.params.parcelNumber
  )

  if (!record) {
    return res.status(404).json({ error: 'Land record not found' })
  }

  res.json({ record })
})

// Get permit types
router.get('/permits/types', (req, res) => {
  res.json({ permitTypes: PERMIT_TYPES })
})

// Apply for permit
router.post('/permits', (req, res) => {
  try {
    const { type, parcelNumber, address, description, ownerName, email, phone } = req.body

    if (!type || !PERMIT_TYPES[type]) {
      return res.status(400).json({ error: 'Invalid permit type' })
    }

    if (!parcelNumber || !address || !description || !ownerName || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const permit = {
      id: uuidv4(),
      permitNumber: `${type}-${Date.now().toString(36).toUpperCase()}`,
      type,
      typeName: PERMIT_TYPES[type].name,
      parcelNumber,
      address,
      description,
      ownerName,
      email,
      phone,
      status: 'pending',
      fee: PERMIT_TYPES[type].fee,
      submittedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + PERMIT_TYPES[type].processingDays * 24 * 60 * 60 * 1000).toISOString()
    }

    permits.set(permit.id, permit)

    res.status(201).json({
      message: 'Permit application submitted successfully',
      permit
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit permit application' })
  }
})

// Get permit by number
router.get('/permits/:permitNumber', (req, res) => {
  const permit = Array.from(permits.values()).find(
    p => p.permitNumber === req.params.permitNumber
  )

  if (!permit) {
    return res.status(404).json({ error: 'Permit not found' })
  }

  res.json({ permit })
})

// Civil record types
router.get('/civil/types', (req, res) => {
  res.json({
    types: [
      { id: 'birth', name: 'Birth Certificate', fee: 25 },
      { id: 'death', name: 'Death Certificate', fee: 25 },
      { id: 'marriage', name: 'Marriage Certificate', fee: 35 },
      { id: 'divorce', name: 'Divorce Decree', fee: 50 },
      { id: 'name-change', name: 'Name Change', fee: 100 }
    ]
  })
})

// Request civil record
router.post('/civil/request', (req, res) => {
  try {
    const { type, firstName, lastName, dateOfEvent, purpose, email } = req.body

    if (!type || !firstName || !lastName || !dateOfEvent || !email) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    const request = {
      id: uuidv4(),
      requestNumber: `CIV-${Date.now().toString(36).toUpperCase()}`,
      type,
      firstName,
      lastName,
      dateOfEvent,
      purpose,
      email,
      status: 'processing',
      submittedAt: new Date().toISOString(),
      estimatedCompletion: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()
    }

    civilRecords.set(request.id, request)

    res.status(201).json({
      message: 'Civil record request submitted successfully',
      request
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit request' })
  }
})

// Get parks information
router.get('/parks', (req, res) => {
  res.json({
    parks: [
      { id: 'praya-national', name: 'Praya National Park', area: 500000, unit: 'hectares', visitors: 125000 },
      { id: 'coastal-reserve', name: 'Coastal Marine Reserve', area: 200000, unit: 'hectares', visitors: 80000 },
      { id: 'mountain-preserve', name: 'Mountain Forest Preserve', area: 350000, unit: 'hectares', visitors: 45000 },
      { id: 'wetlands', name: 'Central Wetlands', area: 75000, unit: 'hectares', visitors: 30000 }
    ],
    totalArea: 2400000,
    totalVisitors: 450000
  })
})

// Get fee schedule
router.get('/fees', (req, res) => {
  res.json({
    fees: {
      land: {
        titleSearch: 50,
        titleTransfer: 500,
        lienRecording: 100,
        surveyRecord: 75
      },
      permits: PERMIT_TYPES,
      civil: {
        birthCert: 25,
        deathCert: 25,
        marriageCert: 35,
        divorceCert: 50,
        nameChange: 100
      },
      parks: {
        dayPass: 15,
        weekPass: 50,
        annualPass: 150,
        campingPerNight: 25
      }
    }
  })
})

// Get statistics
router.get('/stats', (req, res) => {
  res.json({
    landParcels: 847000,
    permitsIssued: 23481,
    parkArea: 2400000,
    avgProcessingDays: 5
  })
})

export default router
