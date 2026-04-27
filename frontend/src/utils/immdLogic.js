// Pure functions for IMMD page logic. No side effects, fully testable.

import { VISA_CLASSES, MOCK_STATUS_RECORDS, OVERSTAY_TIERS } from '../data/immdData'

export function getVisaByCode(code) {
  if (!code || typeof code !== 'string') return null
  const match = VISA_CLASSES.find(v => v.code.toLowerCase() === code.toLowerCase())
  return match || null
}

export function calculateOverstay(days) {
  if (!days || typeof days !== 'number' || days <= 0) return null

  const tier = OVERSTAY_TIERS.find(t => days >= t.minDays && days <= t.maxDays)
  if (!tier) return null

  // Tier 3 has no per-day fine — triggers deportation instead
  const isDeportation = tier.maxDays === Infinity

  if (isDeportation) {
    return {
      tier: tier.range,
      fineTotal: null,
      fineDisplay: 'Deportation + full fine owed',
      ban: tier.ban,
      deportation: true
    }
  }

  // Parse per-day fine from data: 'P$50 per day' → 50
  const perDay = parseInt(tier.fine.match(/P\$(\d+)/)[1], 10)
  return {
    tier: tier.range,
    fineTotal: days * perDay,
    fineDisplay: `P$${days * perDay}`,
    ban: tier.ban,
    deportation: false
  }
}

export function lookupStatus(reference) {
  if (!reference || typeof reference !== 'string') return null
  const ref = reference.trim().toUpperCase()
  const match = MOCK_STATUS_RECORDS.find(r => r.ref.toUpperCase() === ref)
  return match || { notFound: true, reference: ref }
}

// Eligibility wizard — basic v1. Improvements parked for later pass.
// Inputs: { duration: 'day'|'weeks'|'months'|'year'|'years', purpose: 'tourism'|'work'|'study'|'family', hasJobOffer: boolean, hasEnrollment: boolean }
// Output: { recommendation: string, rationale: string, class: string }
export function recommendVisa(input) {
  if (!input || typeof input !== 'object') return null
  const { duration, purpose, hasJobOffer, hasEnrollment } = input

  if (purpose === 'study' && hasEnrollment) {
    if (duration === 'months' || duration === 'year') {
      return { class: 'S1', recommendation: 'S1 Short-term Student Permit', rationale: 'Enrolled program ≤6 months.' }
    }
    if (duration === 'years') {
      return { class: 'S2', recommendation: 'S2 Degree-program Student Permit', rationale: 'Full-time degree enrollment at an accredited Praya institution.' }
    }
  }

  if (purpose === 'work' && hasJobOffer) {
    return { class: 'E', recommendation: 'E-class Employment Visa', rationale: 'Sponsored employment offer from a Praya employer.' }
  }

  if (purpose === 'family' || duration === 'years') {
    return { class: 'F3', recommendation: 'F3 Long Residency', rationale: 'Long-term residency beyond 12 months.' }
  }

  if (duration === 'year' || duration === 'months') {
    return { class: 'F2', recommendation: 'F2 Extended Residency', rationale: 'Residency beyond 6 months but under 1 year.' }
  }

  if (duration === 'weeks') {
    return { class: 'V3', recommendation: 'V3 Exploration Visitor', rationale: 'Visit up to 30 days with a detailed itinerary.' }
  }

  if (duration === 'day') {
    return { class: 'V0', recommendation: 'V0 Day Visitor', rationale: '24-hour visit from a signatory nation.' }
  }

  return { class: 'V2', recommendation: 'V2 Extended Visitor', rationale: 'Default recommendation for short visits up to 14 days.' }
}
