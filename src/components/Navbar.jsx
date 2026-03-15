import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getRank } from '../lib/supabase'

export default function Navbar({ subtitle, subtag }) {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()

  const xp    = profile?.xp ?? 0
  const rank  = getRank(xp)
  const prenom = profile?.prenom ?? ''
  const nom    = profile?.nom    ?? ''
  const name   = [prenom, nom].filter(Boolean).join(' ') || profile?.email?.split('@')[0] || ''
  const avatarUrl = name
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00f2ff&color=000&size=60`
    : '/profile_logo-removebg-preview.png'

  async function handleLogout() {
    if (window.confirm('Déconnexion ?')) { await logout(); navigate('/') }
  }

  return (
    <nav className="cyber-navbar">
      {/* LEFT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Link to={profile ? '/dashboard' : '/'} className="cyber-logo-group">
          <div className="cyber-logo-box">
            <img src="/logo1.png" alt="Logo" className="brand-logo-img" />
          </div>
          <span className="brand-text">LEARNQUEST</span>
        </Link>
        {subtitle && (
          <div className="nav-tag">
            <span className="nav-tag-title">{subtitle}</span>
            {subtag && <span className="nav-tag-sub">{subtag}</span>}
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        {profile ? (
          <>
            {/* Show name only once, hidden on small screens */}
            <div className="nav-agent-info" style={{ textAlign: 'right' }}>
              <div className="nav-agent-name">{name.toUpperCase() || '—'}</div>
              <span className="nav-agent-rank">{rank.name}</span>
            </div>
            <Link to="/profile">
              <div className="avatar-radar">
                <img src={avatarUrl} alt="Avatar" />
                <div className="status-dot"></div>
              </div>
            </Link>
            <div className="nav-divider"></div>
            <Link to="/contact" className="btn-logout" title="Contact">
              <i className="fas fa-envelope"></i>
            </Link>
            <button className="btn-logout" onClick={handleLogout} title="Déconnexion">
              <i className="fas fa-power-off"></i>
            </button>
          </>
        ) : (
          <>
            <Link to="/contact"  className="btn-contact" title="Contact">
              <i className="fas fa-envelope"></i>
            </Link>
            <div className="nav-divider"></div>
            <Link to="/login" className="btn-cyber" style={{ padding: '6px 14px', fontSize: '.65rem' }}>
              <i className="fas fa-sign-in-alt"></i> CONNEXION
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
