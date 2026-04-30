import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useSpectrumCart } from '../../../contexts/SpectrumCartContext'
import { SPECTRUM_PRODUCTS, SPECTRUM_CATEGORIES } from '../../../data/spectrumProducts'

function categoryColor(category) {
  const m = SPECTRUM_CATEGORIES.find(c => c.id === category)
  return m ? m.accentColor : '#6B7280'
}

export default function CartDrawer() {
  const { cart, removeItem, updateQty, subtotal, drawerOpen, closeDrawer } = useSpectrumCart()
  const [checkoutModal, setCheckoutModal] = useState(false)
  const closeRef = useRef(null)
  const drawerRef = useRef(null)

  useEffect(() => {
    if (!drawerOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer()
      if (e.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(drawerRef.current.querySelectorAll('button, [href], input'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    return () => document.removeEventListener('keydown', onKey)
  }, [drawerOpen, closeDrawer])

  const items = cart.items.map(line => {
    const p = SPECTRUM_PRODUCTS.find(x => x.id === line.productId)
    return { line, product: p }
  }).filter(x => x.product)

  return (
    <>
      <div className={`sp-drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={closeDrawer} />
      <aside
        ref={drawerRef}
        className={`sp-drawer ${drawerOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="sp-drawer-header">
          <h2>your bag</h2>
          <button ref={closeRef} className="sp-drawer-close" onClick={closeDrawer} aria-label="Close cart">×</button>
        </div>
        <div className="sp-drawer-items">
          {items.length === 0 ? (
            <div className="sp-drawer-empty">
              <p>Your bag is empty.</p>
              <Link to="/spectrum-cannabis/shop" onClick={closeDrawer} style={{ textDecoration: 'underline' }}>Browse the shop →</Link>
            </div>
          ) : items.map(({ line, product }) => (
            <div key={product.id} className="sp-drawer-item">
              <div className="sp-drawer-item-thumb" style={{ background: categoryColor(product.category) }} />
              <div className="sp-drawer-item-info">
                <span className="sp-drawer-item-name">{product.name}</span>
                <span className="sp-drawer-item-meta">{product.weight} · P${product.price}</span>
                <div className="sp-drawer-item-actions">
                  <div className="sp-qty-stepper">
                    <button onClick={() => updateQty(product.id, line.qty - 1)} aria-label={`Decrease ${product.name}`}>−</button>
                    <input type="text" value={line.qty} readOnly aria-label={`Quantity of ${product.name}`} />
                    <button onClick={() => updateQty(product.id, line.qty + 1)} aria-label={`Increase ${product.name}`}>+</button>
                  </div>
                  <button onClick={() => removeItem(product.id)} aria-label={`Remove ${product.name}`} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sp-muted)' }}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="sp-drawer-footer">
            <div className="sp-drawer-subtotal"><span>Subtotal</span><span>P${subtotal}</span></div>
            <button className="sp-btn sp-btn-primary sp-btn-large" style={{ width: '100%' }} onClick={() => setCheckoutModal(true)}>Checkout</button>
          </div>
        )}
      </aside>
      {checkoutModal && (
        <div className="sp-modal-backdrop" role="dialog" aria-modal="true" aria-label="Checkout">
          <div className="sp-modal">
            <h2>online ordering coming Q3 2026</h2>
            <p>Visit any of our 6 locations to purchase today.</p>
            <div className="sp-modal-buttons">
              <Link to="/spectrum-cannabis/locations" className="sp-btn sp-btn-primary" onClick={() => { setCheckoutModal(false); closeDrawer() }}>Find a store</Link>
              <button className="sp-btn sp-btn-secondary" onClick={() => setCheckoutModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
