import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import { useAuth } from '../../../utils/AuthContext'

vi.mock('../../../utils/AuthContext', () => ({
  useAuth: vi.fn(),
}))

function renderProtectedRoute(routeElement) {
  return render(
    <MemoryRouter
      initialEntries={['/admin/alerts']}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/login" element={<div>login page</div>} />
        <Route path="/unauthorized" element={<div>unauthorized page</div>} />
        <Route path="/admin/alerts" element={routeElement} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirects unauthenticated users to login', () => {
    useAuth.mockReturnValue({ loading: false, isAuthenticated: false, user: null })

    renderProtectedRoute(
      <ProtectedRoute>
        <div>admin page</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('login page')).toBeInTheDocument()
  })

  it('blocks non-admin users from admin-only routes', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      user: { id: 'u1', role: 'user' },
    })

    renderProtectedRoute(
      <ProtectedRoute requireAdmin>
        <div>admin page</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('unauthorized page')).toBeInTheDocument()
  })

  it('allows admin users through admin-only routes', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      user: { id: 'u1', role: 'admin' },
    })

    renderProtectedRoute(
      <ProtectedRoute requireAdmin>
        <div>admin page</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('admin page')).toBeInTheDocument()
  })

  it('does not trust user-controlled auth metadata for admin routes', () => {
    useAuth.mockReturnValue({
      loading: false,
      isAuthenticated: true,
      user: {
        id: 'u1',
        role: 'user',
        user_metadata: { role: 'admin' },
      },
    })

    renderProtectedRoute(
      <ProtectedRoute requireAdmin>
        <div>admin page</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('unauthorized page')).toBeInTheDocument()
  })
})
