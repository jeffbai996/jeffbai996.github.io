import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ProductCard from './components/ProductCard'
import { SPECTRUM_PRODUCTS, SPECTRUM_STRAIN_TYPES, SPECTRUM_CATEGORIES } from '../../data/spectrumProducts'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'
import { useSpectrumCart } from '../../contexts/SpectrumCartContext'

function strainLabel(t) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === t)
  return m ? m.label : 'N/A'
}
function strainColor(t) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === t)
  return m ? m.color : '#6B7280'
}
function categoryColor(c) {
  const m = SPECTRUM_CATEGORIES.find(x => x.id === c)
  return m ? m.accentColor : '#6B7280'
}

export default function SpectrumProduct() {
  const { productId } = useParams()
  const { addItem } = useSpectrumCart()
  const [qty, setQty] = useState(1)
  const [storeId, setStoreId] = useState(SPECTRUM_LOCATIONS[0].id)

  const product = SPECTRUM_PRODUCTS.find(p => p.id === productId)
  if (!product) {
    return (
      <section className="sp-section container">
        <h1>Product not found</h1>
        <p style={{ marginTop: '16px' }}><Link to="/spectrum-cannabis/shop">← Back to shop</Link></p>
      </section>
    )
  }

  const related = SPECTRUM_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <section className="container">
      <div className="sp-product-detail">
        <div className="sp-product-detail-image" style={{ background: product.accentColor || categoryColor(product.category) }} />
        <div className="sp-product-detail-info">
          <span className="sp-strain-badge" style={{ color: strainColor(product.strainType), alignSelf: 'flex-start' }}>
            {strainLabel(product.strainType)}
          </span>
          <h1>{product.name}</h1>
          <span className="sp-product-price" style={{ fontSize: '1.5rem' }}>P${product.price}</span>
          <span style={{ color: 'var(--sp-muted)' }}>{product.weight}</span>
          {(product.thc > 0 || product.cbd > 0) && (
            <div className="sp-thc-cbd">
              {product.thc > 0 && <span className="pill">{product.thc}% THC</span>}
              {product.cbd > 0 && <span className="pill">{product.cbd}% CBD</span>}
            </div>
          )}
          {product.terpenes.length > 0 && (
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Dominant terpenes</span>
              <div className="sp-terpenes" style={{ marginTop: '4px' }}>
                {product.terpenes.map(t => <span key={t} className="pill">{t}</span>)}
              </div>
            </div>
          )}
          <p className="sp-product-description">{product.description}</p>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '8px' }}>
            <div className="sp-qty-stepper">
              <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
              <input type="text" value={qty} readOnly aria-label="Quantity" />
              <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity">+</button>
            </div>
            <button className="sp-btn sp-btn-primary sp-btn-large" onClick={() => addItem(product.id, qty)}>Add to Bag</button>
          </div>
          <div style={{ marginTop: '8px' }}>
            <label style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Available at:&nbsp;
              <select value={storeId} onChange={e => setStoreId(e.target.value)} className="sp-sort-select" style={{ marginLeft: '4px' }}>
                {SPECTRUM_LOCATIONS.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
              </select>
            </label>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="sp-section">
          <div className="sp-section-heading"><h2>related products</h2></div>
          <div className="sp-products-grid">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </section>
  )
}
