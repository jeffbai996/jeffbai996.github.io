import { describe, it, expect } from 'vitest'
import {
  getDistrictByCode,
  lookupDistrict,
  lookupVoterStatus,
  validatePreRegistration,
  getElectoralStatus
} from '../ecLogic'

describe('getDistrictByCode', () => {
  it('returns the district for a known code', () => {
    const d = getDistrictByCode('ED-04')
    expect(d).toBeDefined()
    expect(d.code).toBe('ED-04')
    expect(d.region).toBe('Oakville Metro')
  })

  it('is case-insensitive', () => {
    expect(getDistrictByCode('ed-12')).toBeDefined()
    expect(getDistrictByCode('ED-12')).toBeDefined()
  })

  it('returns null for unknown code', () => {
    expect(getDistrictByCode('ED-99')).toBeNull()
  })

  it('returns null for empty or nullish input', () => {
    expect(getDistrictByCode('')).toBeNull()
    expect(getDistrictByCode(null)).toBeNull()
    expect(getDistrictByCode(undefined)).toBeNull()
  })
})

describe('lookupDistrict', () => {
  it('resolves an Oakville Metro postal code to a single-digit-prefix district', () => {
    const d = lookupDistrict('30421')
    expect(d.code).toBe('ED-03')
    expect(d.region).toBe('Oakville Metro')
  })

  it('prefers a two-digit prefix when both could match', () => {
    // Postal '12...' should map to ED-12 (Braemar), not ED-01 (Oakville)
    const d = lookupDistrict('12345')
    expect(d.code).toBe('ED-12')
  })

  it('resolves a Coastal Regions postal code', () => {
    const d = lookupDistrict('17000')
    expect(d.code).toBe('ED-17')
    expect(d.region).toBe('Coastal Regions')
  })

  it('resolves an Insular Districts postal code', () => {
    const d = lookupDistrict('24010')
    expect(d.code).toBe('ED-24')
    expect(d.region).toBe('Insular Districts')
  })

  it('strips non-digit characters before matching', () => {
    const d = lookupDistrict(' 4-321 ')
    expect(d.code).toBe('ED-04')
  })

  it('returns notFound for an unmatched postal prefix', () => {
    // Postal codes start at digit 1; a leading-zero postal code does not
    // map to any district under the Boundary Order 2014.
    const d = lookupDistrict('00000')
    expect(d.notFound).toBe(true)
    expect(d.postalCode).toBe('00000')
  })

  it('returns null for empty or nullish input', () => {
    expect(lookupDistrict('')).toBeNull()
    expect(lookupDistrict(null)).toBeNull()
    expect(lookupDistrict('   ')).toBeNull()
  })
})

describe('lookupVoterStatus', () => {
  it('returns a record for a known reference (case-insensitive)', () => {
    const r = lookupVoterStatus('v-2026-00874')
    expect(r).toBeDefined()
    expect(r.ref).toBe('V-2026-00874')
    expect(r.status).toBe('Pre-Registered')
    expect(r.district).toBe('ED-12')
  })

  it('returns notFound for an unknown reference', () => {
    const r = lookupVoterStatus('V-2026-99999')
    expect(r.notFound).toBe(true)
    expect(r.reference).toBe('V-2026-99999')
  })

  it('returns null for empty input', () => {
    expect(lookupVoterStatus('')).toBeNull()
    expect(lookupVoterStatus(null)).toBeNull()
  })
})

describe('validatePreRegistration', () => {
  const validInput = {
    fullName: 'Alex Citizen',
    dateOfBirth: '1990-01-01',
    nationalId: 'ID-NAT-12345',
    postalCode: '40321',
    email: 'alex@example.com'
  }

  it('accepts a fully valid submission and returns the resolved district', () => {
    const r = validatePreRegistration(validInput)
    expect(r.ok).toBe(true)
    expect(r.errors).toEqual([])
    expect(r.district.code).toBe('ED-04')
  })

  it('rejects a missing full name', () => {
    const r = validatePreRegistration({ ...validInput, fullName: '' })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /name/i.test(e))).toBe(true)
  })

  it('rejects an applicant under 18', () => {
    // Use a DOB that's clearly under 18 — last year's date.
    const today = new Date()
    const dob = `${today.getFullYear() - 5}-01-01`
    const r = validatePreRegistration({ ...validInput, dateOfBirth: dob })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /18/.test(e))).toBe(true)
  })

  it('rejects a malformed date of birth', () => {
    const r = validatePreRegistration({ ...validInput, dateOfBirth: '01/01/1990' })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /YYYY-MM-DD/.test(e))).toBe(true)
  })

  it('rejects a missing or short national ID', () => {
    const r = validatePreRegistration({ ...validInput, nationalId: 'AB' })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /National ID/i.test(e))).toBe(true)
  })

  it('rejects a postal code that does not resolve to a district', () => {
    const r = validatePreRegistration({ ...validInput, postalCode: '00000' })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /district/i.test(e))).toBe(true)
  })

  it('rejects a malformed email', () => {
    const r = validatePreRegistration({ ...validInput, email: 'not-an-email' })
    expect(r.ok).toBe(false)
    expect(r.errors.some(e => /email/i.test(e))).toBe(true)
  })

  it('returns a structured error for non-object input', () => {
    const r = validatePreRegistration(null)
    expect(r.ok).toBe(false)
    expect(r.errors.length).toBeGreaterThan(0)
  })
})

describe('getElectoralStatus', () => {
  it('reports that elections are not yet activated', () => {
    const s = getElectoralStatus()
    expect(s.electionsActivated).toBe(false)
    expect(s.preRegistrationOpen).toBe(true)
    expect(typeof s.message).toBe('string')
    expect(s.message.length).toBeGreaterThan(0)
  })
})
