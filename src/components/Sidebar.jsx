import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getRank } from '../lib/supabase'

const NAV_ITEMS = [
  { to: '/dashboard', icon: 'fas fa-crosshairs',    label: 'QG'       },
  { to: '/roadmap',   icon: 'fas fa-map',            label: 'Roadmap'  },
  { to: '/profile',   icon: 'fas fa-user-astronaut', label: 'Profil'   },
  { to: '/contact',   icon: 'fas fa-satellite-dish', label: 'Contact'  },
]

export default function Sidebar() {
  const { profile, logout } = useAuth()
  const navigate = useNavigate()

  const xp     = profile?.xp ?? 0
  const rank   = getRank(xp)
  const prenom = profile?.prenom ?? ''
  const nom    = profile?.nom    ?? ''
  const name   = [prenom, nom].filter(Boolean).join(' ') || profile?.email?.split('@')[0] || 'Agent'
  const xpPct  = Math.min((xp / 3000) * 100, 100)
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00f2ff&color=000&size=60`

  async function handleLogout() {
    if (window.confirm('Déconnexion ?')) { await logout(); navigate('/') }
  }

  return (
    <aside className="sidebar">
      <NavLink to="/profile" className="user-mini">
        <div className="user-avatar-wrap">
          <img src={avatarUrl} alt="Avatar" />
        </div>
        <div className="user-name">{name.toUpperCase()}</div>
        <div className="user-rank">{rank.name}</div>
      </NavLink>

      <nav className="sidebar-nav">
        {NAV_ITEMS.map(item => (
          <NavLink key={item.to} to={item.to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
            <i className={item.icon}></i> {item.label}
          </NavLink>
        ))}
        <button className="nav-item danger" onClick={handleLogout}>
          <i className="fas fa-power-off"></i> Déconnexion
        </button>
      </nav>

      <div className="hud-panel">
        <div className="hud-title">// TERMINAL //</div>
        <div className="hud-row">
          <span>XP</span>
          <span className="hud-val text-cyan">{xp} XP</span>
        </div>
        <div className="hud-bar">
          <div className="hud-fill" style={{ width: xpPct + '%' }}></div>
        </div>
        <div className="hud-row" style={{ marginTop: '8px' }}>
          <span>Rang</span>
          <span className="hud-val">{rank.name}</span>
        </div>
        <div className="hud-row">
          <span>Statut</span>
          <span className="hud-val text-green">EN LIGNE</span>
        </div>
      </div>
    </aside>
  )
}
