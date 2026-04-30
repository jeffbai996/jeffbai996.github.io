import LocationCard from './components/LocationCard'
import { SPECTRUM_LOCATIONS } from '../../data/spectrumLocations'

export default function SpectrumLocations() {
  return (
    <section className="sp-section container">
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ textTransform: 'lowercase' }}>locations</h1>
        <p style={{ color: 'var(--sp-muted)', marginTop: '8px' }}>6 stores across Praya. Visit us in person.</p>
      </div>
      <div className="sp-location-grid">
        {SPECTRUM_LOCATIONS.map(l => <LocationCard key={l.id} location={l} />)}
      </div>
      <p style={{ marginTop: '48px', color: 'var(--sp-muted)' }}>
        All locations carry the full catalog. Hours and contact details are listed per location above.
      </p>
    </section>
  )
}
