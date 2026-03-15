import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import MatrixBg from '../components/MatrixBg'

const FEATURES = [
  { icon: 'fas fa-laptop-code', color: 'var(--primary)', title: 'Pratique Intensive',    desc: 'Oubliez la théorie pure. Chaque concept est validé par du code réel.' },
  { icon: 'fas fa-gamepad',     color: 'var(--green)',   title: 'Gamification XP',       desc: 'Votre progression est un jeu. Gagnez de l\'XP et montez de rang.' },
  { icon: 'fas fa-shield-alt',  color: 'var(--red)',     title: 'Projets Concrets',       desc: 'À la fin de la quête, vous aurez un portfolio solide.' },
]

const COURSES = [
  { icon: 'fab fa-html5',    color: 'var(--primary)', title: 'Architecte Web',    desc: 'HTML5 sémantique, structure et médias.', xp: 0    },
  { icon: 'fab fa-js',       color: 'var(--green)',   title: 'Logique JavaScript', desc: 'Algorithmes, DOM et Fetch API.',          xp: 500  },
  { icon: 'fab fa-react',    color: 'var(--violet)',  title: 'React Mastery',      desc: 'Composants, Hooks, State Management.',    xp: 1200 },
]

export default function Home() {
  const { session } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (session) navigate('/dashboard')
  }, [session])

  return (
    <div>
      <MatrixBg opacity={0.18} />
      <div className="cyber-grid"></div>
      <Navbar />

      {/* HERO */}
      <section className="hero-section">
        <div style={{ maxWidth:'820px', padding:'20px', position:'relative', zIndex:20, textAlign:'center' }}>
          <div style={{ fontFamily:'Orbitron', fontSize:'.8rem', letterSpacing:'4px', color:'var(--primary)', opacity:.8, marginBottom:'12px' }}>
            // SYSTÈME EN LIGNE //
          </div>
          <h1 className="brand-text" style={{ fontSize:'clamp(2.4rem,6vw,4.2rem)', lineHeight:1.1, marginBottom:'20px' }}>
            MAÎTRISEZ LE FUTUR
          </h1>
          <p style={{ color:'#aaa', fontSize:'1.15rem', marginBottom:'44px', lineHeight:1.8 }}>
            Rejoignez l'élite du code. Apprenez, progressez et débloquez<br />
            votre potentiel dans un univers immersif.
          </p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link to="/login" className="btn-hero">Commencer la Quête</Link>
            <a href="#modules" className="btn-cyber" style={{ padding:'14px 36px' }}>
              <i className="fas fa-compass"></i> Explorer
            </a>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" style={{ padding:'60px 8%', background:'var(--bg)' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <span style={{ fontFamily:'Orbitron', fontSize:'.75rem', letterSpacing:'4px', color:'var(--primary)' }}>// MODULES DISPONIBLES //</span>
          <h2 className="brand-text" style={{ fontSize:'2.2rem', marginTop:'8px' }}>Derniers Modules</h2>
        </div>
        <div className="course-grid">
          {COURSES.map((c, i) => (
            <div key={i} className="cyber-card">
              <div style={{ color:c.color, fontSize:'1.8rem', marginBottom:'10px' }}>
                <i className={c.icon}></i>
              </div>
              <h3 style={{ fontFamily:'Orbitron', fontSize:'1rem', marginBottom:'8px', color:'#fff' }}>{c.title}</h3>
              <p style={{ color:'var(--muted)', fontSize:'.9rem', marginBottom:'12px' }}>{c.desc}</p>
              <div className="card-level">
                <div className="card-level-fill" style={{ width:`${20 + i*30}%`, background:c.color }}></div>
              </div>
              <p className="card-xp-label">XP REQUIS : {c.xp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'60px 8%' }}>
        <div style={{ textAlign:'center', marginBottom:'48px' }}>
          <h2 style={{ fontFamily:'Orbitron', fontSize:'2rem', color:'#fff' }}>
            <span style={{ color:'var(--primary)' }}>SYSTEM</span>.FEATURES
          </h2>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(260px, 1fr))', gap:'22px' }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="cyber-card" style={{ height:'100%' }}>
              <i className={f.icon} style={{ fontSize:'2rem', color:f.color, marginBottom:'12px', display:'block' }}></i>
              <h4 style={{ color:'#fff', fontFamily:'Orbitron', fontSize:'1rem', marginBottom:'8px' }}>{f.title}</h4>
              <p style={{ color:'var(--muted)', fontSize:'.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 8%', textAlign:'center', background:'var(--bg)' }}>
        <h2 className="brand-text" style={{ fontSize:'2rem', marginBottom:'12px' }}>PRÊT À COMMENCER ?</h2>
        <p style={{ color:'var(--muted)', marginBottom:'32px' }}>Créez votre compte gratuit et débutez votre quête.</p>
        <Link to="/login" className="btn-hero">Initialiser mon Agent</Link>
      </section>
    </div>
  )
}
