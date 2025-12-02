import { Outlet } from 'react-router-dom'
import GovBanner from './GovBanner'
import ChatWidget from './ChatWidget'

export default function Layout() {
  return (
    <div className="app-layout">
      <GovBanner />
      <Outlet />
      <ChatWidget />
    </div>
  )
}
