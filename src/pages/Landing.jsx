import { Link } from 'react-router-dom'
import Navbar    from '../components/Navbar'
import MatrixBg  from '../components/MatrixBg'

const PREVIEW_MODULES = [
  { icon: 'fab fa-html5',    color: '#00f2ff', title: 'Architecte Web',     desc: 'HTML5 sémantique, CSS Grid et Flexbox.', xp: 0 },
  { icon: 'fab fa-js',       color: '#00ff41', title: 'Logique JavaScript', desc: 'DOM, algorithmes et APIs modernes.',      xp: 500 },
  { icon: 'fab fa-react',    color: '#7000ff', title: 'React Mastery',      desc: 'Hooks, State, composants avancés.',       xp: 1200 },
]

const FEATURES = [
  { icon: 'fas fa-laptop-code', color: 'var(--primary)', title: 'Pratique Intensive', desc: 'Chaque concept est validé par du code réel.' },
  { icon: 'fas fa-gamepad',     color: 'var(--green)',   title: 'Gamification XP',   desc: 'Progressez, gagnez des XP, montez de rang.' },
  { icon: 'fas fa-shield-alt',  color: 'var(--red)',     title: 'Projets Concrets',  desc: 'Construisez un portfolio solide et déployable.' },
]

export default function Landing() {
  return (
    <div style={{ position: 'relative', overflowX: 'hidden' }}>
      <MatrixBg />
      <div className="cyber-grid" />
      <div className="page-content">
        <Navbar subtitle="Accueil" subtitleSub="</>  Entrez dans la Quête" />

        {/* ── HERO ── */}
        <section className="hero-section" style={{ position: 'relative' }}>
          <div style={{ maxWidth: 800, padding: '0 20px', position: 'relative', zIndex: 2 }}>
            <div style={{ fontFamily: 'Orbitron', fontSize: '.72rem', letterSpacing: 4, color: 'var(--primary)', opacity: .8, marginBottom: 12 }}>
              // SYSTÈME EN LIGNE //
            </div>
            <h1 className="brand-name mb-4" style={{ fontSize: 'clamp(2.2rem,5.5vw,3.8rem)', lineHeight: 1.1 }}>
              MAÎTRISEZ LE FUTUR
            </h1>
            <p style={{ color: '#aaa', fontSize: '1.1rem', marginBottom: 44, lineHeight: 1.75, maxWidth: 640, margin: '0 auto 44px' }}>
              Rejoignez l'élite du code. Apprenez, progressez et débloquez votre potentiel dans un univers immersif.
            </p>
            <div className="d-flex gap-3" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/login" className="btn-hero">
                <i className="fas fa-rocket" /> Commencer la Quête
              </Link>
              <a href="#modules" className="btn-cyber" style={{ padding: '14px 32px' }}>
                <i className="fas fa-compass" /> Explorer
              </a>
            </div>
          </div>
        </section>

        {/* ── MODULES PREVIEW ── */}
        <section id="modules" className="section" style={{ background: 'var(--bg)' }}>
          <div className="text-center mb-5">
            <span className="section-label">// MODULES DISPONIBLES //</span>
            <h2 className="section-title">Derniers Modules</h2>
          </div>
          <div className="course-preview-grid">
            {PREVIEW_MODULES.map(m => (
              <div key={m.title} className="cyber-card">
                <i className={m.icon} style={{ fontSize: '1.8rem', color: m.color, marginBottom: 12, display: 'block' }} />
                <h3 style={{ fontFamily: 'Orbitron', fontSize: '1rem', marginBottom: 8 }}>{m.title}</h3>
                <p style={{ color: 'var(--muted)', fontSize: '.88rem', marginBottom: 12 }}>{m.desc}</p>
                <div className="card-bar">
                  <div className="card-bar-fill" style={{ width: m.xp === 0 ? '80%' : m.xp === 500 ? '45%' : '10%', background: m.color }} />
                </div>
                <p style={{ fontSize: '.72rem', color: m.color, letterSpacing: 1, marginTop: 8 }}>XP REQUIS : {m.xp}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="section" style={{ background: 'linear-gradient(to bottom, var(--bg), rgba(10,20,35,.4))' }}>
          <div className="text-center mb-5">
            <h2 style={{ fontFamily: 'Orbitron', fontSize: '1.9rem', color: '#fff' }}>
              <span className="text-cyan">SYSTEM</span>.FEATURES
            </h2>
            <p style={{ color: 'var(--muted)', marginTop: 6 }}>Ce que vous allez débloquer dans cette formation.</p>
          </div>
          <div className="modules-grid" style={{ maxWidth: 960, margin: '0 auto' }}>
            {FEATURES.map(f => (
              <div key={f.title} className="cyber-card">
                <i className={f.icon} style={{ fontSize: '1.8rem', color: f.color, marginBottom: 14, display: 'block' }} />
                <h4 style={{ color: '#fff', fontFamily: 'Orbitron', fontSize: '.95rem', marginBottom: 8 }}>{f.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '.88rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="section text-center" style={{ background: 'var(--bg)', paddingTop: 72 }}>
          <h2 className="brand-name mb-3" style={{ fontSize: '1.9rem' }}>PRÊT À COMMENCER ?</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 36 }}>Créez votre compte gratuit et débutez votre quête.</p>
          <Link to="/login" className="btn-hero">
            <i className="fas fa-user-plus" /> Initialiser mon Agent
          </Link>
        </section>
      </div>
    </div>
  )
}
