import PropTypes from 'prop-types'

export default function LocationCard({ location }) {
  return (
    <div className={`sp-location-card ${location.isFlagship ? 'flagship' : ''}`}>
      <h3>{location.name}</h3>
      <p className="district">
        {location.district}{location.county ? ` · ${location.county}` : ''}
      </p>
      <p className="address">{location.address}</p>
      <p className="hours">{location.hours}</p>
      <p className="phone">{location.phone}</p>
      {location.blurb && <p style={{ color: 'var(--sp-muted)', fontSize: '0.9rem', marginTop: '8px' }}>{location.blurb}</p>}
      {location.status === 'open' && <span className="sp-status-badge">Open</span>}
      <a href="#" onClick={e => e.preventDefault()} style={{ marginTop: '12px', fontSize: '0.9rem', color: 'var(--sp-muted)' }}>Get directions →</a>
    </div>
  )
}

LocationCard.propTypes = {
  location: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isFlagship: PropTypes.bool,
    district: PropTypes.string.isRequired,
    county: PropTypes.string,
    address: PropTypes.string.isRequired,
    hours: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    blurb: PropTypes.string,
    status: PropTypes.string
  }).isRequired
}
