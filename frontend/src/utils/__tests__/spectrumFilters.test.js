import { describe, it, expect } from 'vitest'
import {
  filterProducts,
  sortProducts,
  applyShopFilters
} from '../spectrumFilters'

const sample = [
  { id: 'f1', name: 'Flower A', category: 'flower', strainType: 'indica', thc: 22, price: 45, featured: true },
  { id: 'f2', name: 'Flower B', category: 'flower', strainType: 'sativa', thc: 24, price: 50, featured: false },
  { id: 'p1', name: 'Pre-Roll A', category: 'pre-rolls', strainType: 'hybrid', thc: 20, price: 12, featured: false },
  { id: 'a1', name: 'Accessory', category: 'accessories', strainType: null, thc: 0, price: 18, featured: false }
]

describe('filterProducts', () => {
  it('returns all products when no filters set', () => {
    expect(filterProducts(sample, {})).toHaveLength(4)
  })

  it('filters by single category', () => {
    const r = filterProducts(sample, { categories: ['flower'] })
    expect(r).toHaveLength(2)
    expect(r.every(p => p.category === 'flower')).toBe(true)
  })

  it('filters by multiple categories (OR semantics)', () => {
    const r = filterProducts(sample, { categories: ['flower', 'pre-rolls'] })
    expect(r).toHaveLength(3)
  })

  it('filters by single strain type', () => {
    const r = filterProducts(sample, { strainTypes: ['indica'] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('f1')
  })

  it('matches strainType: null when filter includes null', () => {
    const r = filterProducts(sample, { strainTypes: [null] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('a1')
  })

  it('combines category and strain filters with AND semantics', () => {
    const r = filterProducts(sample, { categories: ['flower'], strainTypes: ['sativa'] })
    expect(r).toHaveLength(1)
    expect(r[0].id).toBe('f2')
  })

  it('empty arrays match nothing in that dimension', () => {
    const r = filterProducts(sample, { categories: [] })
    expect(r).toHaveLength(4)
  })
})

describe('sortProducts', () => {
  it('featured-first sort puts featured items at top', () => {
    const r = sortProducts(sample, 'featured')
    expect(r[0].featured).toBe(true)
  })

  it('price-asc sorts by price ascending', () => {
    const r = sortProducts(sample, 'price-asc')
    expect(r.map(p => p.price)).toEqual([12, 18, 45, 50])
  })

  it('price-desc sorts by price descending', () => {
    const r = sortProducts(sample, 'price-desc')
    expect(r.map(p => p.price)).toEqual([50, 45, 18, 12])
  })

  it('thc-desc sorts by thc descending; nulls / 0 sink', () => {
    const r = sortProducts(sample, 'thc-desc')
    expect(r[0].thc).toBe(24)
    expect(r[r.length - 1].thc).toBe(0)
  })

  it('does not mutate input', () => {
    const before = [...sample]
    sortProducts(sample, 'price-asc')
    expect(sample).toEqual(before)
  })
})

describe('applyShopFilters', () => {
  it('composes filter then sort', () => {
    const r = applyShopFilters(sample, { categories: ['flower'] }, 'price-asc')
    expect(r).toHaveLength(2)
    expect(r.map(p => p.price)).toEqual([45, 50])
  })
})
