import { useState, useEffect, useCallback } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import MatrixBg from '../components/MatrixBg'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../components/Toast'
import { updateProfile, getRank } from '../lib/supabase'
import { MODULES, XP_PER_PART, getPartKey } from '../data/modules'

export default function Roadmap() {
  const { profile, session, refreshProfile } = useAuth()
  const toast = useToast()

  const [mission,  setMission]  = useState(null)
  const [stepIdx,  setStepIdx]  = useState(0)
  const [saving,   setSaving]   = useState(false)
  const [certOpen, setCertOpen] = useState(false)

  // Use local copies so XP updates instantly without waiting for DB round-trip
  const [localDone, setLocalDone] = useState(null)
  const [localXp,   setLocalXp]   = useState(null)

  const done = localDone ?? profile?.completed_steps ?? []
  const xp   = localXp   ?? profile?.xp ?? 0

  // Sync local state when profile loads/changes from server
  useEffect(() => {
    if (profile) {
      setLocalDone(profile.completed_steps ?? [])
      setLocalXp(profile.xp ?? 0)
    }
  }, [profile])

  // Auto-open from dashboard click
  useEffect(() => {
    const mId = sessionStorage.getItem('openModule')
    if (mId) {
      sessionStorage.removeItem('openModule')
      const mod = MODULES.find(m => m.id === parseInt(mId))
      if (mod) { setMission({ module: mod, part: mod.parts[0] }); setStepIdx(0) }
    }
  }, [])

  const openMission  = useCallback((mod, part) => { setMission({ module: mod, part }); setStepIdx(0) }, [])
  const closeMission = useCallback(() => setMission(null), [])

  async function finishPart() {
    if (!mission || saving) return
    setSaving(true)

    const { module: mod, part } = mission
    const partKey = getPartKey(mod.id, part.id)

    if (done.includes(partKey)) {
      setSaving(false)
      closeMission()
      toast('Bonne révision ! Partie déjà validée.', 'info')
      return
    }

    const newDone = [...done, partKey]
    const newXp   = xp + XP_PER_PART
    const newRank = getRank(newXp)

    // 1. Update local state immediately (instant UI feedback)
    setLocalDone(newDone)
    setLocalXp(newXp)
    closeMission()

    // 2. Persist to Supabase
    const updated = await updateProfile(session.user.id, {
      completed_steps: newDone,
      xp: newXp,
      rank: newRank.name,
    })

    if (updated) {
      // 3. Sync AuthContext with the returned data (no extra DB call needed)
      refreshProfile(updated)
      setSaving(false)

      // Show XP toast
      const allKeys = MODULES.flatMap(m => m.parts.map(p => getPartKey(m.id, p.id)))
      if (allKeys.every(k => newDone.includes(k))) {
        setCertOpen(true)
      } else {
        toast(`+${XP_PER_PART} XP — Partie validée ! Rang : ${newRank.name}`, 'xp', 4000)
      }
    } else {
      // DB error — revert local state
      setLocalDone(done)
      setLocalXp(xp)
      setSaving(false)
      toast('Erreur de sauvegarde. Réessayez.', 'error')
    }
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <MatrixBg opacity={0.15} />
      <div className="cyber-grid"></div>
      <Navbar subtitle="ROADMAP" subtag="</> Carte des missions" />

      <div className="app-layout">
        <Sidebar />
        <main className="main-content">
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.5rem', color: '#fff' }}>
              <span className="text-cyan">SYS</span>.ROADMAP
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '.85rem' }}>
              Complétez les parties dans l'ordre pour progresser.
            </p>
          </div>

          <div className="roadmap-track">
            {MODULES.flatMap(mod =>
              mod.parts.map(part => {
                const key    = getPartKey(mod.id, part.id)
                const isDone = done.includes(key)
                const locked = xp < mod.xpReq
                const active = !isDone && !locked
                return (
                  <div key={key} className={`roadmap-card ${isDone ? 'completed' : active ? 'active' : ''}`}>
                    <div style={{ fontSize: '.65rem', letterSpacing: '2px', marginBottom: '5px',
                      color: isDone ? 'var(--green)' : locked ? 'var(--red)' : 'var(--primary)' }}>
                      <i className={mod.icon} style={{ marginRight: '5px' }}></i>
                      {mod.title} — {isDone ? '✓ COMPLÉTÉ' : locked ? '⚠ VERROUILLÉ' : '► EN COURS'}
                    </div>
                    <h4>{part.title}</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '.82rem', margin: '6px 0 12px' }}>
                      {part.desc} — {part.steps.length} étapes
                    </p>
                    {!locked ? (
                      <button
                        className={`btn-cyber ${isDone ? 'btn-cyber-green' : ''}`}
                        style={{ padding: '6px 14px', fontSize: '.68rem' }}
                        onClick={() => openMission(mod, part)}>
                        <i className={`fas fa-${isDone ? 'redo' : 'rocket'}`}></i>
                        {isDone ? ' REVOIR' : ' LANCER'}
                      </button>
                    ) : (
                      <div style={{ fontSize: '.78rem', color: 'var(--red)', marginTop: '8px' }}>
                        🔒 Requis : {mod.xpReq} XP
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </main>
      </div>

      {/* ─── MISSION OVERLAY ─── */}
      {mission && (
        <div className="mission-overlay active">
          <div className="mission-header">
            <div>
              <div style={{ fontSize: '.65rem', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '2px' }}>
                MISSION EN COURS
              </div>
              <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', color: 'var(--primary)' }}>
                {mission.module.title} — {mission.part.title}
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                Étape {stepIdx + 1} / {mission.part.steps.length}
              </span>
              <button className="btn-cyber btn-cyber-red" style={{ padding: '5px 12px', fontSize: '.65rem' }}
                onClick={closeMission}>
                <i className="fas fa-times"></i> QUITTER
              </button>
            </div>
          </div>

          <div className="mission-body">
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.15rem', color: '#fff', marginBottom: '20px' }}>
              {mission.part.steps[stepIdx].title}
            </h2>
            <div dangerouslySetInnerHTML={{ __html: mission.part.steps[stepIdx].content }} />
          </div>

          <div className="mission-footer">
            {stepIdx > 0 && (
              <button className="btn-cyber btn-cyber-red" onClick={() => setStepIdx(i => i - 1)}>
                <i className="fas fa-arrow-left"></i> PRÉCÉDENT
              </button>
            )}
            {stepIdx < mission.part.steps.length - 1 ? (
              <button className="btn-cyber" onClick={() => setStepIdx(i => i + 1)}>
                SUIVANT <i className="fas fa-arrow-right"></i>
              </button>
            ) : (
              <button className="btn-cyber btn-cyber-green" onClick={finishPart} disabled={saving}>
                {saving
                  ? <><i className="fas fa-spinner fa-spin"></i> SAUVEGARDE...</>
                  : <><i className="fas fa-check"></i> VALIDER LA PARTIE</>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── CERTIFICATE ─── */}
      {certOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,.97)', zIndex: 5000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            background: '#fff', color: '#000', width: 'min(760px,95vw)',
            padding: '50px', textAlign: 'center',
            border: '8px solid #333', outline: '4px solid var(--gold)',
            boxShadow: '0 0 50px rgba(212,175,55,.5)'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '14px' }}>🏆</div>
            <h1 style={{ fontFamily: 'Orbitron', fontSize: '1.6rem', color: '#000', marginBottom: '6px' }}>
              CERTIFICAT DE COMPLÉTION
            </h1>
            <p style={{ color: '#777', marginBottom: '8px' }}>Décerné à</p>
            <h2 style={{ fontSize: '2rem', fontFamily: 'serif', margin: '12px 0' }}>
              {profile ? `${profile.prenom} ${profile.nom}` : 'Agent'}
            </h2>
            <p style={{ color: '#444' }}>Pour avoir complété avec succès tous les modules LearnQuest.</p>
            <div style={{ margin: '20px 0', borderTop: '2px solid var(--gold)', borderBottom: '2px solid var(--gold)', padding: '12px' }}>
              <strong>HTML5 · CSS3 · Bootstrap · JavaScript</strong>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn-cyber" onClick={() => window.print()}>
                <i className="fas fa-print"></i> IMPRIMER
              </button>
              <button className="btn-cyber btn-cyber-red" onClick={() => setCertOpen(false)}>
                <i className="fas fa-times"></i> FERMER
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
