import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import { AuthProvider } from './utils/AuthContext'
import Layout from './components/Layout'
import Portal from './pages/Portal'
import NPA from './pages/NPA'
import BOP from './pages/BOP'
import DOJ from './pages/DOJ'
import CTB from './pages/CTB'
import Interior from './pages/Interior'
import BD from './pages/BD'
import CR from './pages/CR'
import SWD from './pages/SWD'
import Post from './pages/Post'
import CBCA from './pages/CBCA'
import Health from './pages/Health'
import Housing from './pages/Housing'
import Revenue from './pages/Revenue'
import Transport from './pages/Transport'
import LC from './pages/LC'
import PSE from './pages/PSE'
import AirQuality from './pages/AirQuality'
import NationalSecurity from './pages/NationalSecurity'
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

            {/* Department Pages */}
            <Route path="npa/*" element={<NPA />} />
            <Route path="bop/*" element={<BOP />} />
            <Route path="ctb/*" element={<CTB />} />
            <Route path="doj/*" element={<DOJ />} />
            <Route path="bd/*" element={<BD />} />
            <Route path="cr/*" element={<CR />} />
            <Route path="swd/*" element={<SWD />} />
            <Route path="interior/*" element={<Interior />} />
            <Route path="post/*" element={<Post />} />
            <Route path="cbca/*" element={<CBCA />} />
            <Route path="health/*" element={<Health />} />
            <Route path="housing/*" element={<Housing />} />
            <Route path="revenue/*" element={<Revenue />} />
            <Route path="transport/*" element={<Transport />} />
            <Route path="lc/*" element={<LC />} />
            <Route path="pse/*" element={<PSE />} />
            <Route path="air-quality" element={<AirQuality />} />
            <Route path="national-security" element={<NationalSecurity />} />

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
