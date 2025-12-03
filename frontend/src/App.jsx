import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import { AuthProvider } from './utils/AuthContext'
import Layout from './components/Layout'
import Portal from './pages/Portal'
import DOJ from './pages/DOJ'
import CTB from './pages/CTB'
import Interior from './pages/Interior'
import BD from './pages/BD'
import CR from './pages/CR'
import SWD from './pages/SWD'
import NotFound from './pages/NotFound'

// Auth pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import AuthCallback from './pages/auth/AuthCallback'

// Account pages
import Dashboard from './pages/account/Dashboard'
import Security from './pages/account/Security'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Portal />} />
            <Route path="npa/*" element={<Navigate to="/pages/NPA_Praya.html" replace />} />
            <Route path="bop/*" element={<Navigate to="/pages/BOP_Praya.html" replace />} />
            <Route path="ctb/*" element={<CTB />} />
            <Route path="doj/*" element={<DOJ />} />
            <Route path="bd/*" element={<BD />} />
            <Route path="cr/*" element={<CR />} />
            <Route path="swd/*" element={<SWD />} />
            <Route path="interior/*" element={<Interior />} />
            <Route path="post/*" element={<Navigate to="/pages/Praya_Post.html" replace />} />
            <Route path="cbca/*" element={<Navigate to="/pages/CBCA_Praya.html" replace />} />

            {/* Auth Routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="auth/callback" element={<AuthCallback />} />

            {/* Protected Account Routes */}
            <Route
              path="account"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="account/security"
              element={
                <ProtectedRoute>
                  <Security />
                </ProtectedRoute>
              }
            />
            <Route
              path="account/profile"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
