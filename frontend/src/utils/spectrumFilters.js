// Pure filter + sort logic for the Spectrum shop. Tested in isolation.

export function filterProducts(products, filters = {}) {
  const { categories, strainTypes } = filters
  return products.filter(p => {
    if (categories && categories.length > 0 && !categories.includes(p.category)) return false
    if (strainTypes && strainTypes.length > 0 && !strainTypes.includes(p.strainType)) return false
    return true
  })
}

export function sortProducts(products, mode) {
  const copy = [...products]
  switch (mode) {
    case 'featured':
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured))
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price)
    case 'thc-desc':
      return copy.sort((a, b) => (b.thc || 0) - (a.thc || 0))
    default:
      return copy
  }
}

export function applyShopFilters(products, filters, sortMode) {
  return sortProducts(filterProducts(products, filters), sortMode)
}
