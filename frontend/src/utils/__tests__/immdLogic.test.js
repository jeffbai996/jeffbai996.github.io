import { describe, it, expect } from 'vitest'
import {
  getVisaByCode,
  calculateOverstay,
  lookupStatus,
  recommendVisa
} from '../immdLogic'

describe('getVisaByCode', () => {
  it('returns the visa class for a known code', () => {
    const v2 = getVisaByCode('V2')
    expect(v2).toBeDefined()
    expect(v2.code).toBe('V2')
    expect(v2.fee).toBe(40)
  })

  it('is case-insensitive', () => {
    expect(getVisaByCode('v2')).toBeDefined()
    expect(getVisaByCode('V2')).toBeDefined()
  })

  it('returns null for unknown code', () => {
    expect(getVisaByCode('ZZ')).toBeNull()
  })

  it('returns null for empty or nullish input', () => {
    expect(getVisaByCode('')).toBeNull()
    expect(getVisaByCode(null)).toBeNull()
    expect(getVisaByCode(undefined)).toBeNull()
  })
})

describe('calculateOverstay', () => {
  it('tier 1 — 1 to 7 days: P$50/day, no ban', () => {
    const r = calculateOverstay(5)
    expect(r.tier).toBe('1–7 days')
    expect(r.fineTotal).toBe(250) // 5 * 50
    expect(r.ban).toBe('None')
  })

  it('tier 2 — 8 to 30 days: P$100/day, 1-year ban', () => {
    const r = calculateOverstay(20)
    expect(r.tier).toBe('8–30 days')
    expect(r.fineTotal).toBe(2000) // 20 * 100
    expect(r.ban).toBe('1-year re-entry ban')
  })

  it('tier 3 — 31+ days: deportation, 5-year ban', () => {
    const r = calculateOverstay(45)
    expect(r.tier).toBe('31+ days')
    expect(r.ban).toBe('5-year re-entry ban')
    expect(r.deportation).toBe(true)
  })

  it('rejects non-positive inputs', () => {
    expect(calculateOverstay(0)).toBeNull()
    expect(calculateOverstay(-3)).toBeNull()
    expect(calculateOverstay(null)).toBeNull()
  })

  it('honors lower boundary: 7 days is tier 1, 8 days is tier 2', () => {
    expect(calculateOverstay(7).tier).toBe('1–7 days')
    expect(calculateOverstay(8).tier).toBe('8–30 days')
  })

  it('honors upper boundary: 30 days is tier 2, 31 days is tier 3', () => {
    expect(calculateOverstay(30).tier).toBe('8–30 days')
    expect(calculateOverstay(31).tier).toBe('31+ days')
  })
})

describe('lookupStatus', () => {
  it('returns record for a known reference (case-insensitive)', () => {
    const r = lookupStatus('v2-2026-04387')
    expect(r).toBeDefined()
    expect(r.ref).toBe('V2-2026-04387')
    expect(r.status).toBe('Approved')
  })

  it('returns notFound object for unknown reference', () => {
    const r = lookupStatus('V9-9999-99999')
    expect(r.notFound).toBe(true)
    expect(r.reference).toBe('V9-9999-99999')
  })

  it('returns null for empty input', () => {
    expect(lookupStatus('')).toBeNull()
    expect(lookupStatus(null)).toBeNull()
  })
})

describe('recommendVisa', () => {
  it('recommends S2 for multi-year degree study', () => {
    const r = recommendVisa({ duration: 'years', purpose: 'study', hasEnrollment: true })
    expect(r.class).toBe('S2')
  })

  it('recommends S1 for short-term study', () => {
    const r = recommendVisa({ duration: 'months', purpose: 'study', hasEnrollment: true })
    expect(r.class).toBe('S1')
  })

  it('recommends E for work with job offer', () => {
    const r = recommendVisa({ duration: 'year', purpose: 'work', hasJobOffer: true })
    expect(r.class).toBe('E')
  })

  it('recommends F3 for family / long-term purposes', () => {
    const r = recommendVisa({ duration: 'years', purpose: 'family' })
    expect(r.class).toBe('F3')
  })

  it('recommends V3 for weeks-long visit', () => {
    const r = recommendVisa({ duration: 'weeks', purpose: 'tourism' })
    expect(r.class).toBe('V3')
  })

  it('returns null for nullish input', () => {
    expect(recommendVisa(null)).toBeNull()
    expect(recommendVisa(undefined)).toBeNull()
  })
})
