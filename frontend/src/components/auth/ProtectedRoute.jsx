import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'

function isAdminUser(user) {
  return Boolean(
    user?.role === 'admin' ||
    user?.role === 'super_admin' ||
    user?.is_admin === true ||
    user?.isAdmin === true ||
    user?.app_metadata?.role === 'admin' ||
    user?.user_metadata?.role === 'admin'
  )
}

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, loading, user } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-spinner" />
        <p>Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated) {
    // Redirect to login, but save the location they were trying to go to
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (requireAdmin && !isAdminUser(user)) {
    return <Navigate to="/unauthorized" replace />
  }

  return children
}
