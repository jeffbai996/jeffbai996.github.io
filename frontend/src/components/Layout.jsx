import { Outlet, useLocation } from 'react-router-dom'
import GovBanner from './GovBanner'
import ChatWidget from './ChatWidget'

export default function Layout() {
  const location = useLocation()

  return (
    <div className="app-layout">
      <GovBanner />
      <Outlet />
      <ChatWidget currentPath={location.pathname} />
    </div>
  )
}
