import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MatrixBg from '../components/MatrixBg'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import { updateProfile, getRank, RANKS } from '../lib/supabase'
import { MODULES, getPartKey, countCompletedModules } from '../data/modules'
import { useState } from 'react'

const BADGES = [
  { id: 'html',      name: 'Architecte HTML',  icon: 'fab fa-html5',     partKey: '1-p2' },
  { id: 'css',       name: 'Designer CSS',      icon: 'fab fa-css3-alt',  partKey: '2-p2' },
  { id: 'bootstrap', name: 'Maître Bootstrap',  icon: 'fab fa-bootstrap', partKey: '3-p2' },
  { id: 'js',        name: 'Développeur JS',    icon: 'fab fa-js',        partKey: '4-p2' },
]

export default function Profile() {
  const { profile, session, refreshProfile } = useAuth()
  const toast = useToast()
  const [resetting, setResetting] = useState(false)

  const xp    = profile?.xp ?? 0
  const rank  = getRank(xp)
  const done  = profile?.completed_steps ?? []
  const prenom = profile?.prenom ?? ''
  const nom    = profile?.nom    ?? ''
  const name  = [prenom, nom].filter(Boolean).join(' ') || profile?.email?.split('@')[0] || 'Agent'
  const email = profile?.email ?? '—'
  const completedMods = countCompletedModules(done)
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=00f2ff&color=000&size=120`

  const rankInfo = RANKS.find(r => xp >= r.min && xp <= r.max) ?? RANKS[0]
  const rangePct = rankInfo.max === Infinity ? 100
    : ((xp - rankInfo.min) / (rankInfo.max - rankInfo.min + 1)) * 100

  async function handleReset() {
    if (!window.confirm('⚠️ Effacer toute votre progression ? Action irréversible.')) return
    setResetting(true)
    const updated = await updateProfile(session.user.id, { xp: 0, rank: 'Recrue', completed_steps: [] })
    if (updated) {
      refreshProfile(updated)
      toast('Progression réinitialisée.', 'info')
    } else {
      toast('Erreur lors de la réinitialisation.', 'error')
    }
    setResetting(false)
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <MatrixBg opacity={0.15} />
      <div className="cyber-grid"></div>
      <Navbar subtitle="PROFIL" subtag="</> Fiche Agent" />

      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.3rem', color: '#fff' }}>
              <span className="text-cyan">SYS</span>.PROFIL
            </h2>
          </div>

          <div className="profile-grid">
            {/* Avatar Card */}
            <div className="cyber-card" style={{ textAlign: 'center' }}>
              <div className="profile-avatar-wrap" style={{ margin: '0 auto 12px' }}>
                <img src={avatarUrl} alt="Avatar" />
              </div>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '.9rem', color: '#fff', marginBottom: '3px' }}>
                {name.toUpperCase()}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '.78rem', marginBottom: '10px' }}>{email}</p>
              <div className="user-rank">{rank.name}</div>
              <div style={{ margin: '12px 0 4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.7rem', color: 'var(--muted)', marginBottom: '4px' }}>
                  <span>{rankInfo.name}</span>
                  <span>{rankInfo.next} ({rankInfo.nextXp} XP)</span>
                </div>
                <div className="xp-bar-wrap">
                  <div className="xp-bar-fill" style={{ width: `${Math.min(rangePct, 100)}%` }}></div>
                </div>
              </div>
              <div style={{ fontSize: '1.4rem', color: 'var(--primary)', fontFamily: 'Orbitron', fontWeight: 900, marginTop: '10px' }}>
                {xp} XP
              </div>
            </div>

            {/* Stats & Badges */}
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {[
                  { label: 'MODULES',  value: completedMods, color: 'var(--primary)' },
                  { label: 'PARTIES',  value: done.length,   color: 'var(--green)'   },
                  { label: 'XP TOTAL', value: xp,            color: 'var(--violet)'  },
                  { label: 'RANG',     value: rank.name,     color: 'var(--gold)',    small: true },
                ].map((s, i) => (
                  <div key={i} className="cyber-card" style={{ textAlign: 'center', padding: '14px' }}>
                    <div style={{ fontSize: s.small ? '1rem' : '1.6rem', fontFamily: 'Orbitron', color: s.color, fontWeight: 900 }}>
                      {s.value}
                    </div>
                    <div style={{ fontSize: '.65rem', color: 'var(--muted)', letterSpacing: '2px', marginTop: '3px' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Module progress */}
              <div className="cyber-card" style={{ marginBottom: '14px' }}>
                <div className="hud-title" style={{ marginBottom: '12px' }}>// PROGRESSION PAR MODULE //</div>
                {MODULES.map(m => {
                  const p1 = done.includes(getPartKey(m.id, 'p1'))
                  const p2 = done.includes(getPartKey(m.id, 'p2'))
                  return (
                    <div key={m.id} style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem', marginBottom: '3px' }}>
                        <span style={{ color: '#fff' }}>
                          <i className={m.icon} style={{ color: m.color, marginRight: '7px' }}></i>{m.title}
                        </span>
                        <span style={{ color: 'var(--muted)' }}>{(p1 ? 1 : 0) + (p2 ? 1 : 0)}/2</span>
                      </div>
                      <div className="hud-bar">
                        <div className="hud-fill" style={{ width: `${(p1 ? 50 : 0) + (p2 ? 50 : 0)}%`, background: m.color }}></div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Badges */}
              <div className="cyber-card" style={{ marginBottom: '14px' }}>
                <div className="hud-title" style={{ marginBottom: '12px' }}>// BADGES //</div>
                {BADGES.map(b => {
                  const earned = done.includes(b.partKey)
                  return (
                    <span key={b.id} className={`badge-item ${earned ? 'earned' : 'locked'}`}>
                      <i className={b.icon}></i> {b.name}
                      {earned
                        ? <i className="fas fa-check-circle" style={{ color: 'var(--primary)' }}></i>
                        : <i className="fas fa-lock" style={{ opacity: .5 }}></i>}
                    </span>
                  )
                })}
              </div>

              {/* Reset */}
              <div className="cyber-card">
                <div className="hud-title" style={{ marginBottom: '8px' }}>// SYSTÈME //</div>
                <p style={{ color: 'var(--muted)', fontSize: '.82rem', marginBottom: '12px' }}>
                  Réinitialisez votre progression. Cette action est irréversible.
                </p>
                <button className="btn-cyber btn-cyber-red" style={{ padding: '7px 16px', fontSize: '.7rem' }}
                  onClick={handleReset} disabled={resetting}>
                  {resetting
                    ? <><i className="fas fa-spinner fa-spin"></i> EN COURS...</>
                    : <><i className="fas fa-exclamation-triangle"></i> RÉINITIALISER</>}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
