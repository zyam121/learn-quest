import { useState, useEffect, useCallback } from 'react'
import { createContext, useContext } from 'react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((msg, type = 'info', duration = 3500) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
  }, [])

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const ICONS = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle', xp: 'fas fa-star' }
  const COLORS = { success: 'var(--green)', error: 'var(--red)', info: 'var(--primary)', xp: 'var(--gold)' }

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      <div style={{
        position: 'fixed', bottom: '24px', right: '24px',
        zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '10px',
        pointerEvents: 'none'
      }}>
        {toasts.map(t => (
          <div key={t.id}
            onClick={() => remove(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 18px',
              background: 'rgba(8, 14, 24, 0.97)',
              border: `1px solid ${COLORS[t.type]}`,
              borderLeft: `4px solid ${COLORS[t.type]}`,
              borderRadius: '8px',
              boxShadow: `0 4px 24px rgba(0,0,0,.6), 0 0 16px ${COLORS[t.type]}33`,
              color: '#fff',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '.95rem',
              fontWeight: 600,
              minWidth: '260px',
              maxWidth: '340px',
              pointerEvents: 'all',
              cursor: 'pointer',
              animation: 'toastIn .25s ease',
            }}>
            <i className={ICONS[t.type]} style={{ color: COLORS[t.type], fontSize: '1.1rem', flexShrink: 0 }}></i>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be inside ToastProvider')
  return ctx.toast
}
