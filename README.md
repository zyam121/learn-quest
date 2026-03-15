# 🚀 LearnQuest — Full Stack React App

**Stack:** React 18 + Vite + React Router 6 + Supabase (Auth + PostgreSQL)

---

## ⚡ Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) → Create a free project
2. In **SQL Editor** → paste and run the contents of **`supabase-setup.sql`**
3. In **Project Settings → API** copy your keys

### 3. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env`:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run the dev server
```bash
npm run dev
# → http://localhost:3000
```

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── MatrixBg.jsx      ← Canvas Matrix rain animation
│   ├── Navbar.jsx        ← Top navigation (auth-aware)
│   ├── Sidebar.jsx       ← Left sidebar with nav + HUD
│   └── ProtectedRoute.jsx← Auth guard (redirects to /login)
│
├── context/
│   └── AuthContext.jsx   ← Global auth + profile state
│
├── data/
│   └── modules.js        ← All course content (4 modules × 2 parts × steps)
│
├── lib/
│   └── supabase.js       ← Supabase client + helpers (getRank, sanitize…)
│
├── pages/
│   ├── Home.jsx          ← Landing page (public)
│   ├── Login.jsx         ← Sign up / Sign in (Supabase Auth)
│   ├── Dashboard.jsx     ← Modules overview + XP progression
│   ├── Roadmap.jsx       ← Full course reader + progress saving
│   ├── Profile.jsx       ← User stats, badges, reset
│   └── Contact.jsx       ← Sanitized contact form
│
├── App.jsx               ← Routes definition
├── main.jsx              ← Entry point
└── index.css             ← Global cyberpunk design system
```

---

## 🗄️ Database Schema

| Table | Purpose |
|---|---|
| `auth.users` | Managed by Supabase Auth |
| `public.profiles` | XP, rank, completed steps per user |
| `public.contact_messages` | Contact form submissions |

---

## 🎮 XP & Ranks

| Rang | XP requis |
|---|---|
| Recrue | 0 |
| Apprenti | 500 |
| Développeur | 1 200 |
| Expert | 2 000 |
| Architecte | 3 000 |

Each part completed = **+200 XP** (8 parts total = 1 600 XP max)

---

## 🌐 Deploy

**Vercel (recommended):**
```bash
npm install -g vercel
vercel
# Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in Vercel dashboard
```

**Netlify:**
```bash
npm run build
# Deploy the dist/ folder
# Add env vars in Netlify dashboard
```

---

## 🔧 Add Email to Contact Form

In `src/pages/Contact.jsx`, replace the `console.log`:

```js
// Option A: Supabase Edge Function
await supabase.functions.invoke('send-contact', { body: payload })

// Option B: Resend (https://resend.com)
await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_RESEND_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    from: 'noreply@yourdomain.com',
    to: 'you@example.com',
    subject: payload.subject,
    html: `<p>${payload.message}</p>`
  })
})
```
