import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { SPECTRUM_STRAIN_TYPES, SPECTRUM_CATEGORIES } from '../../../data/spectrumProducts'

function strainColor(strainType) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === strainType)
  return m ? m.color : '#6B7280'
}

function strainLabel(strainType) {
  const m = SPECTRUM_STRAIN_TYPES.find(s => s.id === strainType)
  return m ? m.label : 'N/A'
}

function categoryColor(category) {
  const m = SPECTRUM_CATEGORIES.find(c => c.id === category)
  return m ? m.accentColor : '#6B7280'
}

export default function ProductCard({ product }) {
  const accent = product.accentColor || categoryColor(product.category)
  return (
    <Link to={`/spectrum-cannabis/shop/${product.id}`} className="sp-product-card">
      <div className="sp-product-image" style={{ background: accent }} aria-hidden="true" />
      <div className="sp-product-body">
        <span
          className="sp-strain-badge"
          style={{ color: strainColor(product.strainType) }}
        >
          {strainLabel(product.strainType)}
        </span>
        <span className="sp-product-name">{product.name}</span>
        <span className="sp-product-meta">
          {product.weight}
          {product.thc > 0 && <> · {product.thc}% THC</>}
        </span>
        <span className="sp-product-price">P${product.price}</span>
      </div>
    </Link>
  )
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    strainType: PropTypes.string,
    thc: PropTypes.number,
    weight: PropTypes.string,
    price: PropTypes.number.isRequired,
    accentColor: PropTypes.string
  }).isRequired
}
