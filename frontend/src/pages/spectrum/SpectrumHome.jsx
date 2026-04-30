import { Link } from 'react-router-dom'
import SpectrumLogo from './components/SpectrumLogo'
import ProductCard from './components/ProductCard'
import LocationCard from './components/LocationCard'
import { SPECTRUM_PRODUCTS } from '../../data/spectrumProducts'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'

export default function SpectrumHome() {
  const featured = SPECTRUM_PRODUCTS.filter(p => p.featured)
  return (
    <>
      <section className="sp-hero">
        <SpectrumLogo size="lg" />
        <h1>cannabis, for everyone.</h1>
        <Link to="/spectrum-cannabis/shop" className="sp-btn sp-btn-primary sp-btn-large">Shop the menu →</Link>
      </section>

      <section className="sp-section container">
        <div className="sp-section-heading">
          <h2>this week&apos;s highlights</h2>
          <Link to="/spectrum-cannabis/shop">See all →</Link>
        </div>
        <div className="sp-products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      <section className="sp-section container">
        <div className="sp-section-heading">
          <h2>find us</h2>
          <Link to="/spectrum-cannabis/locations">All locations →</Link>
        </div>
        <div className="sp-location-grid">
          {SPECTRUM_LOCATIONS.map(l => <LocationCard key={l.id} location={l} />)}
        </div>
      </section>

      <section className="sp-brand-strip">
        <div className="sp-brand-strip-image" aria-hidden="true" />
        <div className="sp-brand-strip-copy">
          <h2>family-owned. praya-grown. since 2019.</h2>
          <p>We started Spectrum to do cannabis right — single-origin Praya cultivation, full transparency on every batch, and a staff that actually knows what they&apos;re selling.</p>
          <p>Six stores, one supply chain, zero shortcuts.</p>
        </div>
      </section>
    </>
  )
}
