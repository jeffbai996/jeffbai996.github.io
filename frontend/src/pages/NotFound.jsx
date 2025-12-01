import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main style={{ padding: '80px 0', textAlign: 'center' }}>
      <div className="container">
        <h1 style={{ fontSize: '72px', fontWeight: '700', color: 'var(--primary)', marginBottom: '16px' }}>404</h1>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Page Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    </main>
  )
}
