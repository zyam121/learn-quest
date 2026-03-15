import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { session, loading } = useAuth()

  // Still checking localStorage for session — show spinner
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column', gap: '16px',
        background: 'var(--bg)'
      }}>
        <div className="spinner"></div>
        <span style={{ color: 'var(--primary)', fontFamily: 'Orbitron', fontSize: '.8rem', letterSpacing: '3px' }}>
          CHARGEMENT...
        </span>
      </div>
    )
  }

  if (!session) return <Navigate to="/login" replace />
  return children
}
