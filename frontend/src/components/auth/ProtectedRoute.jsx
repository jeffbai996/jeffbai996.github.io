import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../utils/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
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

  return children
}
