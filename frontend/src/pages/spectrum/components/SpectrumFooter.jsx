import { Link } from 'react-router-dom'
import SpectrumLogo from './SpectrumLogo'
import { SPECTRUM_LOCATIONS } from '../../../data/spectrumLocations'

export default function SpectrumFooter() {
  return (
    <footer className="sp-footer">
      <div className="sp-footer-inner">
        <div className="sp-footer-cols">
          <div className="sp-footer-col">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/spectrum-cannabis/shop">Flower</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Pre-Rolls</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Edibles</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Vapes</Link></li>
              <li><Link to="/spectrum-cannabis/shop">Accessories</Link></li>
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Locations</h4>
            <ul>
              {SPECTRUM_LOCATIONS.map(l => (
                <li key={l.id}><Link to="/spectrum-cannabis/locations">{l.name.replace('Spectrum ', '')}</Link></li>
              ))}
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/spectrum-cannabis/about">About</Link></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Careers</a></li>
              <li><Link to="/spectrum-cannabis/contact">Contact</Link></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Press</a></li>
            </ul>
          </div>
          <div className="sp-footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#" onClick={e => e.preventDefault()}>Terms</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>Privacy</a></li>
              <li><a href="#" onClick={e => e.preventDefault()}>License Info</a></li>
            </ul>
          </div>
        </div>
        <div className="sp-footer-bottom">
          <SpectrumLogo size="sm" wordmark={false} />
          <span>© 2026 Spectrum Cannabis · License #CTB-2019-0042</span>
        </div>
      </div>
    </footer>
  )
}
