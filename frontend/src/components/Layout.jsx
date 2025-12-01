import { Outlet } from 'react-router-dom'
import GovBanner from './GovBanner'

export default function Layout() {
  return (
    <div className="app-layout">
      <GovBanner />
      <Outlet />
    </div>
  )
}
