-- REAL TRACKER 4.0 Smart Card Engine shared tables
-- Run in Supabase SQL Editor when ready to enable shared date/performance learning.

create table if not exists public.player_dates (
  id uuid primary key default gen_random_uuid(),
  player_name text not null,
  player_key text not null,
  sport text not null,
  team text,
  season text not null,
  game_date date not null,
  card_type text not null default 'current',
  source text,
  verified boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique(player_key, sport, season, game_date, card_type)
);

create table if not exists public.rax_samples (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  player_name text not null,
  player_key text not null,
  sport text not null,
  team text,
  season text,
  game_date date not null,
  card_type text not null,
  rarity text,
  multiplier numeric not null,
  actual_rax numeric not null,
  base_rax numeric not null,
  booster_rax numeric not null default 0,
  booster_json jsonb,
  stats_json jsonb,
  stats_confirmed boolean not null default false,
  verified boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.player_dates enable row level security;
alter table public.rax_samples enable row level security;

drop policy if exists "Anyone signed in can read player dates" on public.player_dates;
create policy "Anyone signed in can read player dates"
on public.player_dates for select
to authenticated
using (true);

drop policy if exists "Signed in users can submit player dates" on public.player_dates;
create policy "Signed in users can submit player dates"
on public.player_dates for insert
to authenticated
with check (auth.uid() = created_by);

drop policy if exists "Anyone signed in can read verified rax samples" on public.rax_samples;
create policy "Anyone signed in can read verified rax samples"
on public.rax_samples for select
to authenticated
using (verified = true or user_id = auth.uid());

drop policy if exists "Signed in users can submit own rax samples" on public.rax_samples;
create policy "Signed in users can submit own rax samples"
on public.rax_samples for insert
to authenticated
with check (auth.uid() = user_id);

grant select, insert on table public.player_dates to authenticated;
grant select, insert on table public.rax_samples to authenticated;
grant usage on schema public to authenticated;
