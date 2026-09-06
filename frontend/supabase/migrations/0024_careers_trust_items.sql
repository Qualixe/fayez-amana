-- Converts the Application form's "trust badges" (Confidential / Response
-- time / Experienced engineers) from 3 fixed fields on careers_page_settings
-- into a real add/remove/reorder list, matching career_culture_items and
-- career_benefits. The old form_trust1/2/3_* columns on careers_page_settings
-- are left in place (unused from now on) rather than dropped.
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists career_trust_items (
  id uuid primary key default gen_random_uuid(),
  title text not null, title_ar text not null,
  body text not null, body_ar text not null,
  sort_order int not null default 0
);

alter table career_trust_items enable row level security;

drop policy if exists "career_trust_items_public_read" on career_trust_items;
create policy "career_trust_items_public_read" on career_trust_items for select to anon using (true);

drop policy if exists "career_trust_items_admin_all" on career_trust_items;
create policy "career_trust_items_admin_all" on career_trust_items for all to authenticated using (true) with check (true);
