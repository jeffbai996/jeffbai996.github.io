// Pure functions for IMMD page logic. No side effects, fully testable.

import { VISA_CLASSES, MOCK_STATUS_RECORDS, OVERSTAY_TIERS } from '../data/immdData'

// Public API utility: lookup visa class by code. Used by tests today; available
// for future callers (chatbot service, deep-link handlers, etc.).
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
  const fineMatch = tier.fine.match(/P\$(\d+)/)
  if (!fineMatch) return null  // fine string format changed unexpectedly — fail safe
  const perDay = parseInt(fineMatch[1], 10)
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

// Eligibility wizard — v2. Full study coverage and per-recommendation caveats.
// v1's limitation (study + day|weeks falling through to V0/V3) is fixed; every
// purpose × duration combination now routes to a deliberate visa class.
// Inputs: { duration: 'day'|'weeks'|'months'|'year'|'years', purpose: 'tourism'|'work'|'study'|'family', hasJobOffer: boolean, hasEnrollment: boolean }
// Output: { class: string, recommendation: string, rationale: string, caveats: string[] }
//   Note: 'class' is a reserved word in JS. To destructure, alias it:
//     const { class: visaClass } = recommendVisa(input)
export function recommendVisa(input) {
  if (!input || typeof input !== 'object') return null
  const { duration, purpose, hasJobOffer, hasEnrollment } = input

  // Study — covers all five durations in v2 (was a gap in v1 for day/weeks)
  if (purpose === 'study') {
    if (hasEnrollment) {
      if (duration === 'years') {
        return {
          class: 'S2',
          recommendation: 'S2 Degree-program Student Permit',
          rationale: 'Full-time degree enrollment at an accredited Praya institution.',
          caveats: [
            'Accredited institution enrollment certification required',
            'Full-time enrollment must be maintained for the duration of the permit',
            'Proof of funds required'
          ]
        }
      }
      // day, weeks, months, year all map to S1 (≤6 months)
      return {
        class: 'S1',
        recommendation: 'S1 Short-term Student Permit',
        rationale: 'Short-term enrolled program (≤6 months) — language courses, exchanges, workshops.',
        caveats: [
          'Enrollment letter from a Praya institution required',
          'Proof of funds required',
          'For programs longer than 6 months, apply for S2 instead'
        ]
      }
    }
    // No enrollment letter — must take a visitor pathway and seek enrollment
    const fallback = pickVisitorByDuration(duration)
    return {
      ...fallback,
      rationale:
        'Student (S-class) permits require institutional enrollment. ' +
        'Until you secure an enrollment letter, this visitor pathway is the closest match: ' +
        fallback.rationale,
      caveats: [
        'S-class student permits require enrollment at a Praya institution — secure an enrollment letter before applying for S1/S2',
        'A visitor visa does not authorize enrollment in a formal program of study',
        ...fallback.caveats
      ]
    }
  }

  if (purpose === 'work' && hasJobOffer) {
    return {
      class: 'E',
      recommendation: 'E-class Employment Visa',
      rationale: 'Sponsored employment offer from a Praya employer.',
      caveats: [
        'Employer must file Form E-APP sponsorship',
        'Background check required',
        'Renewable; counts toward citizenship residency'
      ]
    }
  }

  // Family — refined: a job offer routes through E (spouse work pathway);
  // otherwise pick an F-class by duration.
  if (purpose === 'family') {
    if (hasJobOffer) {
      return {
        class: 'E',
        recommendation: 'E-class Employment Visa (spouse / family work pathway)',
        rationale: 'A sponsored employment offer is the strongest family-pathway option and counts toward citizenship.',
        caveats: [
          'Employer must file Form E-APP',
          'Discuss family sponsorship interactions with IMMD Central',
          'Background check required'
        ]
      }
    }
    if (duration === 'years') {
      return {
        class: 'F3',
        recommendation: 'F3 Long Residency',
        rationale: 'Long-term family residency beyond 12 months.',
        caveats: [
          'Prior F2 residency required',
          'Local address required',
          'Background check required',
          'Counts toward citizenship'
        ]
      }
    }
    if (duration === 'year' || duration === 'months') {
      return {
        class: 'F2',
        recommendation: 'F2 Extended Residency',
        rationale: 'Family residency for 6–12 months.',
        caveats: [
          'Prior F1 or equivalent residency required',
          'Local address required',
          'Background check required'
        ]
      }
    }
    // Short family visit (day, weeks)
    return {
      class: 'F1',
      recommendation: 'F1 General Residency',
      rationale: 'Family residency up to 6 months — property and vehicle registration permitted.',
      caveats: [
        'Local address required',
        'Proof of funds required',
        'F1 permits property and vehicle registration'
      ]
    }
  }

  // Tourism / default — sharper duration differentiation in v2
  if (duration === 'years') {
    return {
      class: 'F3',
      recommendation: 'F3 Long Residency',
      rationale: 'Long-term residency beyond 12 months.',
      caveats: [
        'Prior F2 residency required',
        'Local address required',
        'Counts toward citizenship'
      ]
    }
  }
  if (duration === 'year') {
    return {
      class: 'F2',
      recommendation: 'F2 Extended Residency',
      rationale: 'Residency beyond 6 months but under 1 year.',
      caveats: [
        'Prior F1 or equivalent required',
        'Local address required',
        'Background check required',
        'Counts toward citizenship'
      ]
    }
  }
  if (duration === 'months') {
    return {
      class: 'F1',
      recommendation: 'F1 General Residency',
      rationale: 'Residency up to 6 months — property and vehicle registration permitted.',
      caveats: [
        'Local address required',
        'Proof of funds required',
        'F1 (6 months) permits property and vehicle registration; the shorter F0 does not'
      ]
    }
  }
  if (duration === 'weeks') {
    return {
      class: 'V3',
      recommendation: 'V3 Exploration Visitor',
      rationale: 'Multi-week visit up to 30 days, multiple entry, renewable once.',
      caveats: [
        'Detailed itinerary required',
        'Passport must be valid 12+ months',
        'Proof of funds required',
        'For 14 days or fewer, V2 (P$40) is cheaper; for 3 days or fewer, V1 (P$25)'
      ]
    }
  }
  if (duration === 'day') {
    return {
      class: 'V0',
      recommendation: 'V0 Day Visitor',
      rationale: '24-hour visit from a signatory nation — no fee.',
      caveats: [
        'Bilateral agreement (signatory) nations only',
        'Return ticket required',
        'For stays beyond 24 hours but under 3 days, V1 (P$25) is the next step up'
      ]
    }
  }

  return {
    class: 'V2',
    recommendation: 'V2 Extended Visitor',
    rationale: 'Default recommendation for short visits up to 14 days.',
    caveats: [
      'Passport must be valid 6+ months',
      'Return ticket required',
      'Proof of funds required',
      'Single entry, non-renewable'
    ]
  }
}

// Picks the closest visitor/residency class purely by duration. Used as the
// fallback when a study applicant lacks an enrollment letter and must travel
// on a visitor pathway while securing one.
function pickVisitorByDuration(duration) {
  if (duration === 'day') {
    return {
      class: 'V0',
      recommendation: 'V0 Day Visitor',
      rationale: '24-hour visit from a signatory nation.',
      caveats: ['Bilateral agreement nations only', 'Return ticket required']
    }
  }
  if (duration === 'weeks') {
    return {
      class: 'V3',
      recommendation: 'V3 Exploration Visitor',
      rationale: 'Multi-week visit up to 30 days with a detailed itinerary.',
      caveats: ['Passport valid 12+ months', 'Detailed itinerary required', 'Proof of funds required']
    }
  }
  if (duration === 'months') {
    return {
      class: 'F1',
      recommendation: 'F1 General Residency',
      rationale: 'Residency up to 6 months.',
      caveats: ['Local address required', 'Proof of funds required']
    }
  }
  if (duration === 'year') {
    return {
      class: 'F2',
      recommendation: 'F2 Extended Residency',
      rationale: 'Residency for about 12 months.',
      caveats: ['Prior F1 or equivalent required', 'Local address required', 'Background check required']
    }
  }
  if (duration === 'years') {
    return {
      class: 'F3',
      recommendation: 'F3 Long Residency',
      rationale: 'Long-term residency beyond 12 months.',
      caveats: ['Prior F2 residency required', 'Local address required']
    }
  }
  return {
    class: 'V2',
    recommendation: 'V2 Extended Visitor',
    rationale: 'Short visit up to 14 days.',
    caveats: ['Passport valid 6+ months', 'Return ticket required', 'Proof of funds required']
  }
}
