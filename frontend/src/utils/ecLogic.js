// Pure functions for the EC page logic. No side effects, fully testable.

import { DISTRICTS, MOCK_VOTER_RECORDS, POSTAL_DISTRICT_MAP, ELECTORAL_STATUS } from '../data/ecData'

// Look up a district by its short code (e.g. 'ED-04').
export function getDistrictByCode(code) {
  if (!code || typeof code !== 'string') return null
  const normalized = code.trim().toUpperCase()
  return DISTRICTS.find(d => d.code === normalized) || null
}

// Look up a district by postal code. Praya postal codes are 5 digits;
// the leading 1–2 digits identify the district. Tries 2-digit prefix
// first (covers ED-09 onward) and falls back to 1-digit (ED-01..ED-08).
export function lookupDistrict(postalCode) {
  if (!postalCode || typeof postalCode !== 'string') return null
  const cleaned = postalCode.replace(/\D/g, '')
  if (cleaned.length === 0) return null

  const prefix2 = cleaned.slice(0, 2)
  const prefix1 = cleaned.slice(0, 1)

  // Two-digit prefixes (ED-09 through ED-24) take priority because the
  // single-digit prefix '1' or '2' would otherwise collide.
  if (POSTAL_DISTRICT_MAP[prefix2]) {
    return getDistrictByCode(POSTAL_DISTRICT_MAP[prefix2])
  }
  if (POSTAL_DISTRICT_MAP[prefix1]) {
    return getDistrictByCode(POSTAL_DISTRICT_MAP[prefix1])
  }
  return { notFound: true, postalCode: cleaned }
}

// Check the status of a voter pre-registration by reference number.
// References look like V-2026-00874.
export function lookupVoterStatus(reference) {
  if (!reference || typeof reference !== 'string') return null
  const ref = reference.trim().toUpperCase()
  const match = MOCK_VOTER_RECORDS.find(r => r.ref.toUpperCase() === ref)
  return match || { notFound: true, reference: ref }
}

// Validate a Form V-1 voter pre-registration. This mirrors what the
// EC's online intake checks before forwarding to a caseworker.
// Inputs:
//   { fullName, dateOfBirth, nationalId, postalCode, email }
// Output: { ok: boolean, errors: string[] }
export function validatePreRegistration(input) {
  if (!input || typeof input !== 'object') {
    return { ok: false, errors: ['Submission must be an object.'] }
  }
  const errors = []
  const { fullName, dateOfBirth, nationalId, postalCode, email } = input

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.push('Full legal name is required.')
  }

  // Voter eligibility: 18+ on the day of registration.
  if (!dateOfBirth || !/^\d{4}-\d{2}-\d{2}$/.test(dateOfBirth)) {
    errors.push('Date of birth is required in YYYY-MM-DD format.')
  } else {
    const dob = new Date(dateOfBirth)
    if (Number.isNaN(dob.getTime())) {
      errors.push('Date of birth is not a valid date.')
    } else {
      const ageYears = (Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
      if (ageYears < 18) {
        errors.push('Voters must be at least 18 years old.')
      }
    }
  }

  // National ID: alphanumeric, at least 5 characters. The Interior
  // Department issues the National ID under format ID-NAT.
  if (!nationalId || typeof nationalId !== 'string' || nationalId.trim().length < 5) {
    errors.push('National ID number is required (issued by the Interior Department).')
  }

  // Postal code drives the district assignment; reject if no district resolves.
  const district = lookupDistrict(postalCode)
  if (!district || district.notFound) {
    errors.push('Postal code did not resolve to a known electoral district.')
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('A valid email address is required for status notifications.')
  }

  return {
    ok: errors.length === 0,
    errors,
    district: errors.length === 0 ? district : null
  }
}

// Public API for status banners and UI gating. Returns a static object
// today; if the proclamation flips, callers don't need to change.
export function getElectoralStatus() {
  return ELECTORAL_STATUS
}
