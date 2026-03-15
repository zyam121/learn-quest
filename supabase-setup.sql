-- ============================================================
--  LearnQuest — Supabase Database Setup
--  Run this in your Supabase SQL Editor (one time)
-- ============================================================

-- 1. Profiles table (linked to auth.users)
create table if not exists public.profiles (
  id               uuid primary key references auth.users on delete cascade,
  email            text not null,
  prenom           text default '',
  nom              text default '',
  xp               integer default 0,
  rank             text default 'Recrue',
  completed_steps  jsonb default '[]'::jsonb,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- 2. Contact messages table (optional)
create table if not exists public.contact_messages (
  id         bigint generated always as identity primary key,
  name       text not null,
  email      text not null,
  subject    text not null,
  message    text not null,
  created_at timestamptz default now()
);

-- 3. Row Level Security — profiles
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

-- 4. Row Level Security — contact_messages
alter table public.contact_messages enable row level security;

create policy "Anyone can insert contact message"
  on public.contact_messages for insert
  with check (true);

-- 5. Auto-update updated_at on profiles
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

-- ============================================================
--  Done! Now copy your Project URL and anon key to .env
-- ============================================================
