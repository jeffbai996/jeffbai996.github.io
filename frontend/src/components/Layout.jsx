import { Outlet, useLocation } from 'react-router-dom'
import GovBanner from './GovBanner'
import ChatWidget from './ChatWidget'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <GovBanner />
      <main id="main-content">
        <Outlet />
      </main>
      <ChatWidget currentPath={location.pathname} />
    </div>
  )
}
