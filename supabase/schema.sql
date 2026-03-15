-- ============================================================
--  LEARNQUEST — SUPABASE SCHEMA
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id              uuid references auth.users(id) on delete cascade primary key,
  email           text not null,
  prenom          text not null default '',
  nom             text not null default '',
  xp              integer not null default 0,
  rank            text not null default 'Recrue',
  completed_steps text[] not null default '{}',
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- 2. Row Level Security
alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 3. Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger on_profiles_updated
  before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- 4. Contact messages table
create table if not exists public.contact_messages (
  id         bigserial primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

-- Only insert is allowed (public can submit contact forms)
alter table public.contact_messages enable row level security;

create policy "Anyone can submit contact"
  on public.contact_messages for insert
  with check (true);

-- Admins only can read (add your user ID here)
-- create policy "Admin reads contact" on public.contact_messages
--   for select using (auth.uid() = 'your-admin-uuid');
