import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MatrixBg from '../components/MatrixBg'
import { useAuth } from '../context/AuthContext'
import { getRank } from '../lib/supabase'
import { MODULES, countCompletedModules, getPartKey } from '../data/modules'

const VIEWS = ['missions', 'progression']

export default function Dashboard() {
  const { profile } = useAuth()
  const [view,    setView]    = useState('missions')
  const [modal,   setModal]   = useState(null)  // module object

  const xp   = profile?.xp ?? 0
  const rank = getRank(xp)
  const done = profile?.completed_steps ?? []
  const completedMods = countCompletedModules(done)

  function getModuleStatus(m) {
    const p1 = done.includes(getPartKey(m.id, 'p1'))
    const p2 = done.includes(getPartKey(m.id, 'p2'))
    if (p1 && p2)    return 'completed'
    if (xp < m.xpReq) return 'locked'
    return 'active'
  }

  return (
    <div style={{ background:'var(--bg)', minHeight:'100vh' }}>
      <MatrixBg opacity={0.15} />
      <div className="cyber-grid"></div>
      <Navbar subtitle="QG AGENT" subtag="</> Tableau de Bord" />

      <div className="app-layout">
        <Sidebar />
        <main className="main-content">

          {/* View tabs (mobile friendly) */}
          <div style={{ display:'flex', gap:'8px', marginBottom:'28px', flexWrap:'wrap' }}>
            {VIEWS.map(v => (
              <button key={v} onClick={() => setView(v)}
                className={v === view ? 'btn-cyber' : 'btn-cyber'}
                style={{
                  padding:'8px 20px', fontSize:'.75rem',
                  opacity: v === view ? 1 : .5,
                  borderColor: v === view ? 'var(--primary)' : '#333',
                  color: v === view ? 'var(--primary)' : 'var(--muted)',
                }}>
                {v === 'missions' ? '⚔ MISSIONS' : '📈 PROGRESSION'}
              </button>
            ))}
          </div>

          {/* ── VIEW: MISSIONS ── */}
          {view === 'missions' && (
            <div className="view-section">
              <div style={{ marginBottom:'24px' }}>
                <h2 style={{ fontFamily:'Orbitron', fontSize:'1.5rem', color:'#fff' }}>
                  <span className="text-cyan">SYS</span>.MISSIONS
                </h2>
                <p style={{ color:'var(--muted)', fontSize:'.9rem' }}>Sélectionnez un module pour le lancer.</p>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px' }}>
                {MODULES.map(m => {
                  const status  = getModuleStatus(m)
                  const p1Done  = done.includes(getPartKey(m.id, 'p1'))
                  const p2Done  = done.includes(getPartKey(m.id, 'p2'))
                  const pct     = (p1Done ? 50 : 0) + (p2Done ? 50 : 0)
                  return (
                    <div
                      key={m.id}
                      className={`cyber-card ${status}`}
                      onClick={() => status !== 'locked' && setModal(m)}
                      style={{ cursor: status === 'locked' ? 'not-allowed' : 'pointer' }}
                    >
                      <div style={{ display:'flex', alignItems:'center', gap:'14px', marginBottom:'16px' }}>
                        <i className={m.icon} style={{ fontSize:'2.2rem', color: status === 'locked' ? '#555' : m.color }}></i>
                        <div>
                          <div style={{ fontFamily:'Orbitron', fontSize:'1rem', fontWeight:900, color: status === 'completed' ? 'var(--green)' : '#fff' }}>
                            {m.title}
                          </div>
                          <div style={{ fontSize:'.8rem', color:'var(--muted)' }}>{m.desc}</div>
                        </div>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.75rem', color:'var(--muted)', marginBottom:'6px' }}>
                        <span>Progression</span>
                        <span>{(p1Done?1:0)+(p2Done?1:0)}/2 parties</span>
                      </div>
                      <div className="card-level">
                        <div className="card-level-fill" style={{ width:`${pct}%`, background: status === 'completed' ? 'var(--green)' : m.color }}></div>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', marginTop:'12px' }}>
                        <span className="card-xp-label">XP : {m.xpReq}</span>
                        <span style={{ fontSize:'.8rem', color: status==='completed'?'var(--green)':status==='locked'?'var(--red)':'var(--primary)' }}>
                          {status==='completed'?'✓ COMPLÉTÉ':status==='locked'?'⚠ VERROUILLÉ':'► ACTIF'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* ── VIEW: PROGRESSION ── */}
          {view === 'progression' && (
            <div className="view-section">
              <div style={{ marginBottom:'24px' }}>
                <h2 style={{ fontFamily:'Orbitron', fontSize:'1.5rem', color:'#fff' }}>
                  <span className="text-cyan">SYS</span>.PROGRESSION
                </h2>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(180px, 1fr))', gap:'16px', marginBottom:'24px' }}>
                {[
                  { label:'XP TOTAL',    value:xp,              color:'var(--primary)' },
                  { label:'MODULES',     value:completedMods,   color:'var(--green)'   },
                  { label:'PARTIES',     value:done.length,     color:'var(--violet)'  },
                  { label:'RANG',        value:rank.name,       color:'var(--gold)',  small:true },
                ].map((s,i) => (
                  <div key={i} className="cyber-card" style={{ textAlign:'center' }}>
                    <div style={{ fontSize: s.small?'1.2rem':'2rem', fontFamily:'Orbitron', color:s.color, fontWeight:900 }}>{s.value}</div>
                    <div style={{ fontSize:'.7rem', color:'var(--muted)', letterSpacing:'2px', marginTop:'4px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="cyber-card">
                <div className="hud-title" style={{ marginBottom:'12px' }}>BARRE DE PROGRESSION XP</div>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.8rem', color:'var(--muted)', marginBottom:'6px' }}>
                  <span>{rank.name}</span>
                  <span>{rank.next} ({rank.nextXp} XP)</span>
                </div>
                <div className="hud-bar" style={{ height:'8px' }}>
                  <div className="hud-fill" style={{ width: Math.min((xp/3000)*100,100)+'%' }}></div>
                </div>
                <div style={{ marginTop:'24px' }}>
                  {MODULES.map(m => {
                    const p1 = done.includes(getPartKey(m.id,'p1'))
                    const p2 = done.includes(getPartKey(m.id,'p2'))
                    return (
                      <div key={m.id} style={{ marginBottom:'14px' }}>
                        <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.85rem', marginBottom:'4px' }}>
                          <span style={{ color:'#fff' }}><i className={m.icon} style={{ color:m.color, marginRight:'8px' }}></i>{m.title}</span>
                          <span style={{ color:'var(--muted)' }}>{(p1?1:0)+(p2?1:0)}/2</span>
                        </div>
                        <div className="hud-bar">
                          <div className="hud-fill" style={{ width:`${(p1?50:0)+(p2?50:0)}%`, background:m.color }}></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODULE MODAL */}
      {modal && (
        <div className="modal-overlay active" onClick={e => e.target===e.currentTarget && setModal(null)}>
          <div className="modal-box">
            <button className="modal-close" onClick={() => setModal(null)}>
              <i className="fas fa-times"></i>
            </button>
            <div style={{ textAlign:'center', marginBottom:'20px' }}>
              <i className={modal.icon} style={{ fontSize:'3rem', color:modal.color, display:'block', marginBottom:'12px' }}></i>
              <h3 style={{ fontFamily:'Orbitron', color:'var(--primary)', marginBottom:'8px' }}>{modal.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:'.9rem' }}>{modal.desc} — {modal.parts.length} parties disponibles.</p>
            </div>
            <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
              <Link
                to="/roadmap"
                className="btn-cyber"
                onClick={() => { sessionStorage.setItem('openModule', modal.id); setModal(null) }}
              >
                <i className="fas fa-rocket"></i> LANCER LA MISSION
              </Link>
              <button className="btn-cyber btn-cyber-red" onClick={() => setModal(null)}>
                <i className="fas fa-times"></i> ANNULER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
