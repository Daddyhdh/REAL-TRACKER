-- REAL TRACKER 5.5 Shared Autofill Table
-- Run this in Supabase SQL Editor.
-- This lets one account's saved player/card dates become autofill suggestions for another account.

create table if not exists public.card_templates (
  id uuid primary key default gen_random_uuid(),
  template_key text not null,
  player_key text not null,
  player_name text not null,
  sport text,
  team text,
  season text,
  card_type text not null default 'otd',
  rarity text,
  multiplier numeric,
  claims jsonb not null default '[]'::jsonb,
  notes text,
  updated_by uuid references auth.users(id) on delete set null,
  updated_at timestamptz not null default now()
);

create index if not exists card_templates_player_key_idx
on public.card_templates(player_key);

create index if not exists card_templates_updated_at_idx
on public.card_templates(updated_at desc);

alter table public.card_templates enable row level security;

drop policy if exists "Signed in users can read shared card templates" on public.card_templates;
create policy "Signed in users can read shared card templates"
on public.card_templates
for select
to authenticated
using (true);

drop policy if exists "Signed in users can add shared card templates" on public.card_templates;
create policy "Signed in users can add shared card templates"
on public.card_templates
for insert
to authenticated
with check (auth.uid() = updated_by);

grant select, insert on table public.card_templates to authenticated;
grant usage on schema public to authenticated;
