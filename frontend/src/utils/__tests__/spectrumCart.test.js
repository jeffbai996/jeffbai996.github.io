import { describe, it, expect } from 'vitest'
import {
  emptyCart,
  addItem,
  removeItem,
  updateQty,
  cartItemCount,
  cartSubtotal
} from '../spectrumCart'

const products = [
  { id: 'a', price: 10 },
  { id: 'b', price: 25 },
  { id: 'c', price: 5 }
]

describe('emptyCart', () => {
  it('returns a cart with empty items array', () => {
    expect(emptyCart()).toEqual({ items: [] })
  })
})

describe('addItem', () => {
  it('adds new item to empty cart with qty 1 by default', () => {
    const r = addItem(emptyCart(), 'a')
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })

  it('adds new item with explicit qty', () => {
    const r = addItem(emptyCart(), 'a', 3)
    expect(r.items).toEqual([{ productId: 'a', qty: 3 }])
  })

  it('increments qty when same product added twice', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'a')
    expect(cart.items).toEqual([{ productId: 'a', qty: 2 }])
  })

  it('keeps separate lines for different products', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'b', 2)
    expect(cart.items).toHaveLength(2)
    expect(cart.items.find(i => i.productId === 'b').qty).toBe(2)
  })

  it('does not mutate the input cart', () => {
    const before = emptyCart()
    addItem(before, 'a')
    expect(before.items).toEqual([])
  })
})

describe('removeItem', () => {
  it('removes the matching line', () => {
    const cart = addItem(addItem(emptyCart(), 'a'), 'b')
    const r = removeItem(cart, 'a')
    expect(r.items).toEqual([{ productId: 'b', qty: 1 }])
  })

  it('returns same cart shape if product not found', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = removeItem(cart, 'zzz')
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })
})

describe('updateQty', () => {
  it('updates qty for an existing line', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = updateQty(cart, 'a', 5)
    expect(r.items).toEqual([{ productId: 'a', qty: 5 }])
  })

  it('removes line when qty <= 0', () => {
    const cart = addItem(emptyCart(), 'a')
    expect(updateQty(cart, 'a', 0).items).toEqual([])
    expect(updateQty(cart, 'a', -3).items).toEqual([])
  })

  it('is a no-op for unknown product', () => {
    const cart = addItem(emptyCart(), 'a')
    const r = updateQty(cart, 'zzz', 5)
    expect(r.items).toEqual([{ productId: 'a', qty: 1 }])
  })
})

describe('cartItemCount', () => {
  it('returns 0 for empty cart', () => {
    expect(cartItemCount(emptyCart())).toBe(0)
  })

  it('sums quantities across lines', () => {
    let cart = addItem(emptyCart(), 'a', 2)
    cart = addItem(cart, 'b', 3)
    expect(cartItemCount(cart)).toBe(5)
  })
})

describe('cartSubtotal', () => {
  it('returns 0 for empty cart', () => {
    expect(cartSubtotal(emptyCart(), products)).toBe(0)
  })

  it('computes price × qty across lines', () => {
    let cart = addItem(emptyCart(), 'a', 2) // 2 × 10 = 20
    cart = addItem(cart, 'b', 1)            // 1 × 25 = 25
    expect(cartSubtotal(cart, products)).toBe(45)
  })

  it('skips lines whose product is not found in catalog', () => {
    let cart = addItem(emptyCart(), 'a')
    cart = addItem(cart, 'ghost', 5)
    expect(cartSubtotal(cart, products)).toBe(10)
  })
})
