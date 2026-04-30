// Pure cart math for Spectrum Cannabis. No React, no localStorage — those live in
// SpectrumCartContext. Cart shape: { items: [{ productId, qty }] }.

export function emptyCart() {
  return { items: [] }
}

export function addItem(cart, productId, qty = 1) {
  const existing = cart.items.find(i => i.productId === productId)
  if (existing) {
    return {
      ...cart,
      items: cart.items.map(i =>
        i.productId === productId ? { ...i, qty: i.qty + qty } : i
      )
    }
  }
  return {
    ...cart,
    items: [...cart.items, { productId, qty }]
  }
}

export function removeItem(cart, productId) {
  return {
    ...cart,
    items: cart.items.filter(i => i.productId !== productId)
  }
}

export function updateQty(cart, productId, qty) {
  if (qty <= 0) return removeItem(cart, productId)
  const existing = cart.items.find(i => i.productId === productId)
  if (!existing) return cart
  return {
    ...cart,
    items: cart.items.map(i =>
      i.productId === productId ? { ...i, qty } : i
    )
  }
}

export function cartItemCount(cart) {
  return cart.items.reduce((sum, i) => sum + i.qty, 0)
}

export function cartSubtotal(cart, products) {
  return cart.items.reduce((sum, i) => {
    const product = products.find(p => p.id === i.productId)
    if (!product) return sum
    return sum + product.price * i.qty
  }, 0)
}
