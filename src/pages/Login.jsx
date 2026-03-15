import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import MatrixBg from '../components/MatrixBg'

export default function Login() {
  const { session } = useAuth()
  const navigate    = useNavigate()

  const [mode,     setMode]     = useState('login')
  const [prenom,   setPrenom]   = useState('')
  const [nom,      setNom]      = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [alert,    setAlert]    = useState(null)
  const [busy,     setBusy]     = useState(false)

  useEffect(() => { if (session) navigate('/dashboard') }, [session])

  function translateError(msg = '') {
    if (msg.includes('already registered') || msg.includes('already in use')) return 'Cet email est déjà utilisé.'
    if (msg.includes('Invalid login credentials')) return 'Email ou mot de passe incorrect.'
    if (msg.includes('Invalid email'))   return 'Adresse email invalide.'
    if (msg.includes('Password should')) return 'Le mot de passe doit contenir au moins 6 caractères.'
    if (msg.includes('Email not confirmed')) return 'Confirmez votre email avant de vous connecter.'
    return 'Erreur : ' + msg
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setAlert(null)
    if (!email || !password) { setAlert({ msg: 'Remplissez tous les champs.', type: 'error' }); return }
    if (password.length < 6) { setAlert({ msg: 'Mot de passe trop court (min. 6 car.).', type: 'error' }); return }
    setBusy(true)

    if (mode === 'signup') {
      if (!prenom.trim() || !nom.trim()) {
        setAlert({ msg: 'Prénom et nom requis.', type: 'error' })
        setBusy(false); return
      }

      // Pass prenom + nom as metadata so the DB trigger can use them
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            prenom: prenom.trim(),
            nom:    nom.trim(),
          }
        }
      })

      if (error) { setAlert({ msg: translateError(error.message), type: 'error' }); setBusy(false); return }

      if (!data?.user?.id) {
        setAlert({ msg: 'Vérifiez votre email pour confirmer le compte.', type: 'success' })
        setBusy(false); return
      }

      // Also try a direct insert as backup (trigger might not have fired yet)
      await supabase.from('profiles').upsert({
        id:              data.user.id,
        email:           data.user.email,
        prenom:          prenom.trim(),
        nom:             nom.trim(),
        xp:              0,
        rank:            'Recrue',
        completed_steps: []
      }, { onConflict: 'id' })

      navigate('/dashboard')

    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) { setAlert({ msg: translateError(error.message), type: 'error' }); setBusy(false); return }
      navigate('/dashboard')
    }
    setBusy(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <MatrixBg opacity={0.18} />
      <div className="cyber-grid"></div>

      <nav className="cyber-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" className="cyber-logo-group">
            <div className="cyber-logo-box">
              <img src="/logo1.png" alt="Logo" className="brand-logo-img" />
            </div>
            <span className="brand-text">LEARNQUEST</span>
          </Link>
          <div className="nav-tag">
            <span className="nav-tag-title">Authentification</span>
            <span className="nav-tag-sub">&lt;/&gt; Protocole de connexion</span>
          </div>
        </div>
        <div className="nav-right">
          <span style={{ fontSize: '.65rem', color: 'var(--red)', border: '1px solid var(--red)', padding: '2px 7px', borderRadius: '4px', fontFamily: 'Orbitron' }}>
            VERROUILLÉ
          </span>
        </div>
      </nav>

      <div className="login-page">
        <div className="auth-box">
          <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '6px', overflow: 'hidden', marginBottom: '22px' }}>
            {[['login', 'SE CONNECTER'], ['signup', 'NOUVEL AGENT']].map(([m, label]) => (
              <button key={m} onClick={() => { setMode(m); setAlert(null) }}
                style={{
                  flex: 1, padding: '8px', border: 'none', cursor: 'pointer',
                  fontFamily: 'Orbitron', fontSize: '.65rem', fontWeight: 700, letterSpacing: '1px',
                  background: mode === m ? 'var(--primary)' : 'transparent',
                  color: mode === m ? '#000' : 'var(--muted)', transition: '.25s'
                }}>
                {label}
              </button>
            ))}
          </div>

          <h2 className="auth-title">&gt; {mode === 'login' ? 'CONNEXION' : 'NOUVEL AGENT'}</h2>

          {alert && <div className={`cyber-alert ${alert.type} show`}>{alert.msg}</div>}

          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input className="form-control" placeholder="Prénom *"
                  value={prenom} onChange={e => setPrenom(e.target.value)} required maxLength={60} />
                <input className="form-control" placeholder="Nom *"
                  value={nom} onChange={e => setNom(e.target.value)} required maxLength={60} />
              </div>
            )}
            <input type="email" className="form-control" placeholder="Email"
              value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
            <input type="password" className="form-control" placeholder="Mot de passe (min. 6)"
              value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            <button type="submit" className="btn-cyber btn-cyber-full" style={{ marginTop: '12px' }} disabled={busy}>
              <i className={`fas fa-${busy ? 'spinner fa-spin' : mode === 'login' ? 'lock-open' : 'power-off'}`}></i>
              {busy ? 'CHARGEMENT...' : mode === 'login' ? 'ACCÈS SYSTÈME' : 'INITIALISER'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '18px' }}>
            <Link to="/" style={{ color: '#555', fontSize: '.78rem', letterSpacing: '1px' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i>RETOUR BASE
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
