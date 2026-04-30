import { Outlet } from 'react-router-dom'
import { SpectrumCartProvider } from '../../contexts/SpectrumCartContext'
import { SpectrumAgeGateProvider } from '../../contexts/SpectrumAgeGateContext'
import SpectrumHeader from './components/SpectrumHeader'
import SpectrumFooter from './components/SpectrumFooter'
import AgeGate from './components/AgeGate'
import CartDrawer from './components/CartDrawer'
import './Spectrum.css'

export default function SpectrumLayout() {
  return (
    <SpectrumAgeGateProvider>
      <SpectrumCartProvider>
        <div className="layout-spectrum">
          <a href="#sp-main" className="sp-skip-link">Skip to main content</a>
          <SpectrumHeader />
          <main id="sp-main">
            <Outlet />
          </main>
          <SpectrumFooter />
          <AgeGate />
          <CartDrawer />
        </div>
      </SpectrumCartProvider>
    </SpectrumAgeGateProvider>
  )
}
