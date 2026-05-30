import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <main style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '48px', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>403</h1>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Access Restricted</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          This page is available only to authorized administrators.
        </p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    </main>
  )
}
