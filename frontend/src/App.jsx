import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './utils/ThemeContext'
import { AuthProvider } from './utils/AuthContext'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

// Eagerly load Portal (landing page) for fast initial load
import Portal from './pages/Portal'

// Lazy load department pages for code splitting
const NPA = lazy(() => import('./pages/NPA'))
const BOP = lazy(() => import('./pages/BOP'))
const DOJ = lazy(() => import('./pages/DOJ'))
const CTB = lazy(() => import('./pages/CTB'))
const Interior = lazy(() => import('./pages/Interior'))
const BD = lazy(() => import('./pages/BD'))
const CR = lazy(() => import('./pages/CR'))
const SWD = lazy(() => import('./pages/SWD'))
const Post = lazy(() => import('./pages/Post'))
const CBCA = lazy(() => import('./pages/CBCA'))
const Health = lazy(() => import('./pages/Health'))
const Housing = lazy(() => import('./pages/Housing'))
const Revenue = lazy(() => import('./pages/Revenue'))
const Transport = lazy(() => import('./pages/Transport'))
const LC = lazy(() => import('./pages/LC'))
const PSE = lazy(() => import('./pages/PSE'))
const AirQuality = lazy(() => import('./pages/AirQuality'))
const NationalSecurity = lazy(() => import('./pages/NationalSecurity'))
const Weather = lazy(() => import('./pages/Weather'))
const Status = lazy(() => import('./pages/Status'))
const Payments = lazy(() => import('./pages/Payments'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Terms = lazy(() => import('./pages/Terms'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Cookies = lazy(() => import('./pages/Cookies'))
const FAQ = lazy(() => import('./pages/FAQ'))
const About = lazy(() => import('./pages/About'))

// Lazy load admin pages
const AlertAdmin = lazy(() => import('./pages/admin/AlertAdmin'))

// Lazy load auth pages
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const AuthCallback = lazy(() => import('./pages/auth/AuthCallback'))

// Lazy load account pages
const Dashboard = lazy(() => import('./pages/account/Dashboard'))
const Security = lazy(() => import('./pages/account/Security'))
const Appointments = lazy(() => import('./pages/Appointments'))

// Eagerly load ProtectedRoute (small component, needed for auth check)
import ProtectedRoute from './components/auth/ProtectedRoute'

// Loading fallback component
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      color: 'var(--text-secondary)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border-color)',
          borderTopColor: 'var(--primary-color)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <p>Loading...</p>
      </div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Routes>
            {/* Admin Routes (protected, outside Layout for standalone UI) */}
            <Route
              path="/admin/alerts"
              element={
                <ProtectedRoute>
                  <AlertAdmin />
                </ProtectedRoute>
              }
            />

            {/* Standalone pages (outside Layout for custom headers) */}
            <Route path="/status" element={<Status />} />
            <Route path="/payments" element={<Payments />} />

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
              <Route path="weather/*" element={<Weather />} />

              {/* Static Pages */}
              <Route path="terms" element={<Terms />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="cookies" element={<Cookies />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="about" element={<About />} />

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
              <Route
                path="appointments"
                element={
                  <ProtectedRoute>
                    <Appointments />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Route>
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
