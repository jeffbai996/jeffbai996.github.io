import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  emptyCart,
  addItem as addItemFn,
  removeItem as removeItemFn,
  updateQty as updateQtyFn,
  cartItemCount,
  cartSubtotal
} from '../utils/spectrumCart'
import { SPECTRUM_PRODUCTS } from '../data/spectrumProducts'

const STORAGE_KEY = 'spectrum-cart'

const SpectrumCartContext = createContext(null)

function loadFromStorage() {
  if (typeof window === 'undefined') return emptyCart()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyCart()
    const parsed = JSON.parse(raw)
    if (!parsed || !Array.isArray(parsed.items)) return emptyCart()
    return parsed
  } catch {
    return emptyCart()
  }
}

function saveToStorage(cart) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  } catch {
    // Quota exceeded or storage unavailable — fail silently.
  }
}

export function SpectrumCartProvider({ children }) {
  const [cart, setCart] = useState(loadFromStorage)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    saveToStorage(cart)
  }, [cart])

  const addItem = useCallback((productId, qty = 1) => {
    setCart(c => addItemFn(c, productId, qty))
    setDrawerOpen(true)
  }, [])

  const removeItem = useCallback((productId) => {
    setCart(c => removeItemFn(c, productId))
  }, [])

  const updateQty = useCallback((productId, qty) => {
    setCart(c => updateQtyFn(c, productId, qty))
  }, [])

  const clearCart = useCallback(() => {
    setCart(emptyCart())
  }, [])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])

  const value = useMemo(() => ({
    cart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    itemCount: cartItemCount(cart),
    subtotal: cartSubtotal(cart, SPECTRUM_PRODUCTS),
    drawerOpen,
    openDrawer,
    closeDrawer
  }), [cart, drawerOpen, addItem, removeItem, updateQty, clearCart, openDrawer, closeDrawer])

  return (
    <SpectrumCartContext.Provider value={value}>
      {children}
    </SpectrumCartContext.Provider>
  )
}

SpectrumCartProvider.propTypes = {
  children: PropTypes.node
}

export function useSpectrumCart() {
  const ctx = useContext(SpectrumCartContext)
  if (!ctx) throw new Error('useSpectrumCart must be used inside SpectrumCartProvider')
  return ctx
}
