import { useState, useMemo } from 'react'
import ProductCard from './components/ProductCard'
import { SPECTRUM_PRODUCTS, SPECTRUM_CATEGORIES, SPECTRUM_STRAIN_TYPES } from '../../data/spectrumProducts'
import { applyShopFilters } from '../../utils/spectrumFilters'

export default function SpectrumShop() {
  const [categories, setCategories] = useState([])
  const [strainTypes, setStrainTypes] = useState([])
  const [sortMode, setSortMode] = useState('featured')

  const visible = useMemo(
    () => applyShopFilters(SPECTRUM_PRODUCTS, { categories, strainTypes }, sortMode),
    [categories, strainTypes, sortMode]
  )

  const toggleCategory = (id) =>
    setCategories(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id])
  const toggleStrain = (id) =>
    setStrainTypes(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id])
  const clearFilters = () => { setCategories([]); setStrainTypes([]) }

  return (
    <>
      <div className="container sp-shop-header">
        <h1>shop</h1>
        <p className="sp-shop-count">{visible.length} of {SPECTRUM_PRODUCTS.length} products</p>
      </div>

      <div className="sp-filter-bar container">
        <div className="sp-filter-group" role="group" aria-label="Category filters">
          {SPECTRUM_CATEGORIES.map(c => (
            <button
              key={c.id}
              type="button"
              className="sp-filter-chip"
              aria-pressed={categories.includes(c.id)}
              onClick={() => toggleCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <div className="sp-filter-group" role="group" aria-label="Strain filters">
          {SPECTRUM_STRAIN_TYPES.map(s => (
            <button
              key={String(s.id)}
              type="button"
              className="sp-filter-chip"
              aria-pressed={strainTypes.includes(s.id)}
              onClick={() => toggleStrain(s.id)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <label style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--sp-muted)' }}>Sort</span>
          <select className="sp-sort-select" value={sortMode} onChange={e => setSortMode(e.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="thc-desc">Strongest THC</option>
          </select>
        </label>
      </div>

      <section className="sp-section container">
        {visible.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--sp-muted)' }}>
            <p>No products match these filters.</p>
            <button className="sp-btn sp-btn-secondary" onClick={clearFilters} style={{ marginTop: '16px' }}>Clear filters →</button>
          </div>
        ) : (
          <div className="sp-products-grid">
            {visible.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}
