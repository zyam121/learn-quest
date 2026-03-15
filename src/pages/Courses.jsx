import { useState, useEffect } from 'react'
import Navbar    from '../components/Navbar'
import Sidebar   from '../components/Sidebar'
import MatrixBg  from '../components/MatrixBg'
import { useAuth } from '../context/AuthContext'
import { MODULES, ALL_PART_KEYS } from '../data/modules'
import { getRank } from '../lib/supabase'

/* ── Mission Reader Overlay ─────────────────── */
function MissionReader({ mod, part, onClose, onFinish }) {
  const [stepIdx, setStepIdx] = useState(0)
  const steps = part.steps
  const step  = steps[stepIdx]

  return (
    <div className="mission-overlay">
      {/* Header */}
      <div className="mission-header">
        <div>
          <div style={{ fontSize: '.68rem', letterSpacing: 2, color: 'var(--muted)', marginBottom: 2 }}>
            MISSION EN COURS
          </div>
          <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: 'var(--primary)', margin: 0 }}>
            {mod.title} — {part.title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '.82rem', color: 'var(--muted)' }}>
            Étape {stepIdx + 1} / {steps.length}
          </span>
          {/* Step dots */}
          <div style={{ display: 'flex', gap: 6 }}>
            {steps.map((_, i) => (
              <div key={i} style={{
                width: 8, height: 8, borderRadius: '50%',
                background: i === stepIdx ? 'var(--primary)' : i < stepIdx ? 'var(--green)' : '#2a3a4a',
                boxShadow: i === stepIdx ? '0 0 6px var(--primary)' : 'none',
                transition: '.3s'
              }} />
            ))}
          </div>
          <button className="btn-cyber red sm" onClick={onClose}>
            <i className="fas fa-times" /> QUITTER
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="mission-body">
        <h2 style={{
          fontFamily: 'Orbitron', fontSize: '1.35rem', color: '#fff',
          marginBottom: 28, paddingBottom: 16,
          borderBottom: '1px solid rgba(0,242,255,.12)'
        }}>
          {step.title}
        </h2>
        <div
          style={{ lineHeight: 1.75, fontSize: '1rem' }}
          dangerouslySetInnerHTML={{ __html: step.content }}
        />
      </div>

      {/* Footer */}
      <div className="mission-footer">
        {stepIdx > 0 && (
          <button className="btn-cyber red sm" onClick={() => setStepIdx(i => i - 1)}>
            <i className="fas fa-arrow-left" /> PRÉCÉDENT
          </button>
        )}
        {stepIdx < steps.length - 1 ? (
          <button className="btn-cyber" onClick={() => setStepIdx(i => i + 1)}>
            SUIVANT <i className="fas fa-arrow-right" />
          </button>
        ) : (
          <button className="btn-cyber green" onClick={onFinish}>
            <i className="fas fa-check" /> VALIDER LA PARTIE
          </button>
        )}
      </div>
    </div>
  )
}

/* ── XP Toast ─────────────────────────────── */
function XpToast({ data, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3200)
    return () => clearTimeout(t)
  }, [onDone])

  if (!data) return null
  return (
    <div style={{
      position: 'fixed', bottom: 36, right: 36, zIndex: 5000,
      background: 'rgba(10,18,28,.97)', border: '1px solid var(--green)',
      borderRadius: 12, padding: '20px 28px', textAlign: 'center',
      boxShadow: '0 0 40px rgba(0,255,65,.25)',
      animation: 'slideDown .4s ease-out'
    }}>
      <div style={{ fontSize: '2rem', marginBottom: 6 }}>⚡</div>
      <div style={{ fontFamily: 'Orbitron', color: 'var(--green)', fontSize: '1.1rem', fontWeight: 900 }}>
        +{data.xpGained} XP
      </div>
      <div style={{ color: '#fff', fontSize: '.88rem', marginTop: 4 }}>Partie validée !</div>
      {data.rankChanged && (
        <div style={{ color: 'var(--gold)', fontSize: '.82rem', marginTop: 6, fontFamily: 'Orbitron' }}>
          🏆 Nouveau rang : {data.newRank}
        </div>
      )}
    </div>
  )
}

/* ── Certificate ──────────────────────────── */
function Certificate({ name, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.97)',
      zIndex: 6000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', padding: 20, animation: 'fadeIn .3s ease'
    }} id="cert-overlay">
      <div style={{
        background: '#fff', color: '#000',
        width: 'min(780px, 95vw)', padding: 'clamp(28px, 6vw, 60px)',
        textAlign: 'center',
        border: '10px solid #1a1a1a', outline: '5px solid #d4af37',
        boxShadow: '0 0 60px rgba(212,175,55,.4)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', inset: 18,
          border: '2px double #d4af37', pointerEvents: 'none'
        }} />
        <div style={{ fontSize: '3.5rem', marginBottom: 12 }}>🏆</div>
        <div style={{ fontFamily: 'Orbitron', fontSize: 'clamp(1.2rem,3vw,1.8rem)', fontWeight: 900, marginBottom: 10 }}>
          CERTIFICAT DE COMPLÉTION
        </div>
        <p style={{ color: '#555', margin: '0 0 4px' }}>Décerné à</p>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem,5vw,2.8rem)', margin: '12px 0', color: '#000' }}>
          {name}
        </div>
        <p style={{ color: '#333', fontSize: '.95rem', maxWidth: 480, margin: '0 auto 20px' }}>
          Pour avoir complété avec succès l'intégralité des modules LearnQuest.
        </p>
        <div style={{
          margin: '20px 0', padding: '14px 0',
          borderTop: '2px solid #d4af37', borderBottom: '2px solid #d4af37',
          fontWeight: 700, fontSize: '1rem', letterSpacing: 2
        }}>
          HTML5 · CSS3 · BOOTSTRAP · JAVASCRIPT
        </div>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 24 }}>
          <button
            className="btn-cyber"
            onClick={() => window.print()}
            style={{ background: '#000', color: 'var(--primary)' }}
          >
            <i className="fas fa-print" /> IMPRIMER
          </button>
          <button className="btn-cyber red" onClick={onClose}>
            <i className="fas fa-times" /> FERMER
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ──────────────────────────────── */
export default function Courses() {
  const { profile, completePart } = useAuth()
  const [mission, setMission]     = useState(null) // { mod, part }
  const [toast, setToast]         = useState(null)
  const [showCert, setShowCert]   = useState(false)

  const completedSteps = profile?.completed_steps || []
  const xp             = profile?.xp || 0

  // Auto-launch if coming from Dashboard modal
  useEffect(() => {
    const autoId = sessionStorage.getItem('autoLaunchModule')
    if (autoId) {
      sessionStorage.removeItem('autoLaunchModule')
      const mod = MODULES.find(m => m.id === parseInt(autoId, 10))
      if (mod) {
        // Launch first incomplete part
        const part = mod.parts.find(p => !completedSteps.includes(`${mod.id}-${p.id}`)) || mod.parts[0]
        setMission({ mod, part })
      }
    }
  }, []) // eslint-disable-line

  async function handleFinishPart() {
    const { mod, part } = mission
    setMission(null)

    const prevRank = getRank(profile.xp || 0).name
    const result   = await completePart(mod.id, part.id)

    if (result?.alreadyDone) {
      return // already completed, no toast
    }

    const newRankName = result?.newRank || prevRank
    setToast({
      xpGained:    result?.xpGained  || 0,
      newRank:     newRankName,
      rankChanged: newRankName !== prevRank,
    })

    // Check for full completion
    const updatedDone = [...completedSteps, `${mod.id}-${part.id}`]
    if (ALL_PART_KEYS.every(k => updatedDone.includes(k))) {
      setTimeout(() => setShowCert(true), 3600)
    }
  }

  const name = profile ? `${profile.prenom} ${profile.nom}`.trim() : 'Agent'

  return (
    <div style={{ position: 'relative' }}>
      <MatrixBg opacity={0.13} />
      <div className="cyber-grid" />

      <div className="page-content">
        <Navbar subtitle="ROADMAP" subtitleSub="</> Carte des Missions" />

        <div className="app-shell">
          <Sidebar />

          <main className="main-content">
            <div className="mb-5" style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.6rem', color: '#fff' }}>
                <span className="text-cyan">SYS</span>.ROADMAP
              </h2>
              <p style={{ color: 'var(--muted)', marginTop: 6 }}>
                Complétez les parties dans l'ordre pour débloquer votre progression.
              </p>
            </div>

            {/* Roadmap timeline */}
            <div className="roadmap-track">
              {MODULES.flatMap(mod =>
                mod.parts.map(part => {
                  const key     = `${mod.id}-${part.id}`
                  const done    = completedSteps.includes(key)
                  const locked  = xp < mod.xpRequired
                  const active  = !done && !locked

                  return (
                    <div
                      key={key}
                      className={`roadmap-card ${done ? 'completed' : active ? 'active' : ''}`}
                    >
                      {/* Module badge */}
                      <div style={{
                        fontSize: '.68rem', letterSpacing: 2,
                        color: done ? 'var(--green)' : locked ? 'var(--red)' : mod.color,
                        marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8,
                        justifyContent: 'inherit'
                      }}>
                        <i className={mod.icon} />
                        {mod.title} — {done ? '✓ COMPLÉTÉ' : locked ? '⚠ VERROUILLÉ' : '► EN COURS'}
                      </div>

                      <h4>{part.title}</h4>
                      <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginTop: 4 }}>
                        {part.desc} — {part.steps.length} étapes
                      </p>

                      <div style={{ marginTop: 14 }}>
                        {locked ? (
                          <div style={{ fontSize: '.8rem', color: 'var(--red)' }}>
                            🔒 {mod.xpRequired} XP requis (vous avez {xp} XP)
                          </div>
                        ) : (
                          <button
                            className={`btn-cyber sm ${done ? 'green' : ''}`}
                            onClick={() => setMission({ mod, part })}
                          >
                            <i className={`fas fa-${done ? 'redo' : 'rocket'}`} />
                            {done ? 'REVOIR' : 'LANCER'}
                          </button>
                        )}
                      </div>
                    </div>
                  )
                })
              )}
            </div>

            {/* Full completion check */}
            {ALL_PART_KEYS.every(k => completedSteps.includes(k)) && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🏆</div>
                <h3 style={{ fontFamily: 'Orbitron', color: 'var(--gold)', marginBottom: 12 }}>
                  FORMATION COMPLÉTÉE !
                </h3>
                <button className="btn-cyber" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}
                  onClick={() => setShowCert(true)}>
                  <i className="fas fa-certificate" /> VOIR MON CERTIFICAT
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mission reader */}
      {mission && (
        <MissionReader
          mod={mission.mod}
          part={mission.part}
          onClose={() => setMission(null)}
          onFinish={handleFinishPart}
        />
      )}

      {/* XP Toast */}
      {toast && <XpToast data={toast} onDone={() => setToast(null)} />}

      {/* Certificate */}
      {showCert && <Certificate name={name} onClose={() => setShowCert(false)} />}
    </div>
  )
}
