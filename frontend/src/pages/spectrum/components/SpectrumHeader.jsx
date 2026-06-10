import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SpectrumLogo from './SpectrumLogo'
import { useSpectrumCart } from '../../../contexts/SpectrumCartContext'

export default function SpectrumHeader() {
  const [scrolled, setScrolled] = useState(false)
  const { itemCount, openDrawer } = useSpectrumCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`sp-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="sp-header-inner">
        <Link to="/spectrum-cannabis"><SpectrumLogo size="md" /></Link>
        <nav className="sp-nav" aria-label="Main">
          <Link to="/spectrum-cannabis/shop">Shop</Link>
          <Link to="/spectrum-cannabis/locations">Locations</Link>
          <Link to="/spectrum-cannabis/about">About</Link>
          <Link to="/spectrum-cannabis/contact">Contact</Link>
        </nav>
        <button className="sp-cart-btn" onClick={openDrawer} aria-label={`Open cart, ${itemCount} items`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M3 3h2l3 12h12l2-7H6"/>
            <circle cx="9" cy="20" r="1.5"/>
            <circle cx="18" cy="20" r="1.5"/>
          </svg>
          {itemCount > 0 && <span className="sp-cart-badge">{itemCount}</span>}
        </button>
      </div>
    </header>
  )
}
