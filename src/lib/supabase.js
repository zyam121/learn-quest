import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(SUPABASE_URL || '', SUPABASE_KEY || '', {
  auth: {
    persistSession:     true,
    autoRefreshToken:   true,
    detectSessionInUrl: true,
    storageKey:         'learnquest-auth',
  }
})

/* ─── XP / Rank ─────────────────────────────── */
export const RANKS = [
  { name: 'Recrue',      min: 0,    max: 499,      next: 'Apprenti',    nextXp: 500  },
  { name: 'Apprenti',    min: 500,  max: 1199,     next: 'Développeur', nextXp: 1200 },
  { name: 'Développeur', min: 1200, max: 1999,     next: 'Expert',      nextXp: 2000 },
  { name: 'Expert',      min: 2000, max: 2999,     next: 'Architecte',  nextXp: 3000 },
  { name: 'Architecte',  min: 3000, max: Infinity, next: '—',           nextXp: 3000 },
]
export function getRank(xp = 0) {
  return RANKS.find(r => xp >= r.min && xp <= r.max) || RANKS[0]
}

export function sanitize(str = '') {
  const d = document.createElement('div')
  d.appendChild(document.createTextNode(String(str)))
  return d.innerHTML
}

/* ─── Profile ────────────────────────────────── */
export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('profiles').select('*').eq('id', userId).maybeSingle()
  if (error) console.error('fetchProfile:', error.message)
  return data || null
}

export async function updateProfile(userId, fields) {
  // Use upsert so it works even if the row is missing
  const { data, error } = await supabase
    .from('profiles')
    .upsert({ id: userId, ...fields }, { onConflict: 'id' })
    .select()
    .single()
  if (error) { console.error('updateProfile:', error.message); return null }
  return data
}
