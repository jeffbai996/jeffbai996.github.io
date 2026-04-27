import { describe, it, expect } from 'vitest'
import {
  getVisaByCode,
  calculateOverstay
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
})
