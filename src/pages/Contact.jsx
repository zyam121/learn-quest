import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { sanitize } from '../lib/supabase'
import Navbar from '../components/Navbar'
import MatrixBg from '../components/MatrixBg'
import { useToast } from '../components/Toast'

const EMAILJS_SERVICE  = 'service_y7gvodq'
const EMAILJS_TEMPLATE = 'template_gg9jkds'
const EMAILJS_KEY      = 'yUWAn3l4epD7ajbHr'

export default function Contact() {
  const { profile } = useAuth()
  const toast = useToast()

  const [form, setForm] = useState({
    name:    profile ? `${profile.prenom ?? ''} ${profile.nom ?? ''}`.trim() : '',
    email:   profile?.email ?? '',
    subject: '',
    message: ''
  })
  const [sending, setSending] = useState(false)
  const [sent,    setSent]    = useState(false)

  function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) }

  async function handleSubmit(e) {
    e.preventDefault()
    const { name, email, subject, message } = form

    if (!name)                { toast('Veuillez entrer votre nom.',        'error'); return }
    if (!isValidEmail(email)) { toast('Adresse email invalide.',           'error'); return }
    if (!subject)             { toast('Sujet requis.',                     'error'); return }
    if (message.length < 10)  { toast('Message trop court (min 10 car.).', 'error'); return }

    setSending(true)

    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE,
          template_id: EMAILJS_TEMPLATE,
          user_id:     EMAILJS_KEY,
          template_params: {
            from_name:  sanitize(name),
            from_email: sanitize(email),
            subject:    sanitize(subject),
            message:    sanitize(message),
          }
        })
      })

      if (res.ok) {
        setSent(true)
        toast('Message envoyé ! Nous vous répondrons sous 48h.', 'success', 5000)
        setForm(f => ({ ...f, subject: '', message: '' }))
      } else {
        const err = await res.text()
        console.error('EmailJS error:', err)
        toast('Erreur d\'envoi. Vérifiez votre configuration EmailJS.', 'error')
      }
    } catch (err) {
      console.error('EmailJS fetch error:', err)
      toast('Erreur réseau. Réessayez.', 'error')
    }

    setSending(false)
  }

  const charCount = form.message.length

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <MatrixBg opacity={0.2} />
      <div className="cyber-grid"></div>
      <Navbar subtitle="CANAL SÉCURISÉ" subtag="</> Transmission en cours" />

      <div className="contact-wrap">
        <div className="auth-box" style={{ maxWidth: '520px' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <i className="fas fa-satellite-dish" style={{ fontSize: '2rem', color: 'var(--primary)', display: 'block', marginBottom: '12px' }}></i>
            <h2 className="auth-title">CANAL SÉCURISÉ</h2>
            <p style={{ color: 'var(--muted)', fontSize: '.9rem' }}>Envoyez-nous un message. Réponse sous 48h.</p>
          </div>

          {sent && (
            <div className="cyber-alert success show" style={{ marginBottom: '16px', textAlign: 'center' }}>
              ✅ Message envoyé ! Nous vous répondrons sous 48h.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="cyber-form-group">
              <input type="text" id="f-name" className="cyber-input" placeholder=" "
                required maxLength={100} autoComplete="name"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <label htmlFor="f-name">Votre Nom</label>
            </div>

            <div className="cyber-form-group">
              <input type="email" id="f-email" className="cyber-input" placeholder=" "
                required maxLength={200} autoComplete="email"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              <label htmlFor="f-email">Votre Email</label>
            </div>

            <div className="cyber-form-group">
              <input type="text" id="f-subject" className="cyber-input" placeholder=" "
                required maxLength={150}
                value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
              <label htmlFor="f-subject">Sujet</label>
            </div>

            <div className="cyber-form-group" style={{ marginBottom: '8px' }}>
              <textarea id="f-message" className="cyber-textarea" placeholder=" "
                required maxLength={2000}
                value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
              <label htmlFor="f-message">Message</label>
            </div>
            <div style={{ textAlign: 'right', fontSize: '.75rem', marginBottom: '24px',
              color: charCount > 1900 ? 'var(--red)' : 'var(--muted)' }}>
              {charCount}/2000
            </div>

            <button type="submit" className="btn-cyber btn-cyber-full" disabled={sending}>
              {sending
                ? <><i className="fas fa-spinner fa-spin"></i> ENVOI EN COURS...</>
                : <><i className="fas fa-paper-plane"></i> ENVOYER LA TRANSMISSION</>}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link to={profile ? '/dashboard' : '/'} style={{ color: '#555', fontSize: '.78rem', letterSpacing: '1px' }}>
              <i className="fas fa-arrow-left" style={{ marginRight: '6px' }}></i>RETOUR
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
