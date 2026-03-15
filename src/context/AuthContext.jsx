import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, fetchProfile } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(undefined)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    try {
      const data = await fetchProfile(userId)
      setProfile(data)
    } catch (err) {
      console.error('loadProfile:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // getSession reads from localStorage — always works on refresh
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess)
      if (sess?.user?.id) loadProfile(sess.user.id)
      else setLoading(false)
    })

    // Listen for login/logout events
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, sess) => {
      if (event === 'SIGNED_OUT') {
        setSession(null); setProfile(null); setLoading(false)
      } else if (event === 'SIGNED_IN') {
        setSession(sess)
        if (sess?.user?.id) loadProfile(sess.user.id)
      } else if (event === 'TOKEN_REFRESHED') {
        setSession(sess)
      }
    })

    return () => subscription.unsubscribe()
  }, [loadProfile])

  const refreshProfile = useCallback(async (updatedData = null) => {
    if (updatedData) { setProfile(prev => ({ ...prev, ...updatedData })); return }
    const { data: { session: sess } } = await supabase.auth.getSession()
    if (sess?.user?.id) await loadProfile(sess.user.id)
  }, [loadProfile])

  async function logout() {
    setProfile(null); setSession(null)
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ session, profile, loading, refreshProfile, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
