-- Adds a preloader-specific logo (falls back to Site settings' header logo
-- when empty) and turns the fixed 5 stage labels into a real add/remove/
-- reorder list, so the number of stages is no longer hardcoded at 5.
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists pgcrypto;

alter table preloader_settings
  add column if not exists logo text not null default '';

create table if not exists preloader_stages (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  sort_order int not null default 0
);

alter table preloader_stages enable row level security;
drop policy if exists "preloader_stages_public_read" on preloader_stages;
create policy "preloader_stages_public_read" on preloader_stages for select to anon using (true);
drop policy if exists "preloader_stages_admin_all" on preloader_stages;
create policy "preloader_stages_admin_all" on preloader_stages for all to authenticated using (true) with check (true);

-- Carry over the existing 5 fixed labels into the new list, only if the
-- list is still empty (keeps this safe to re-run and won't duplicate rows
-- or clobber stages an admin has already added/edited).
insert into preloader_stages (label, sort_order)
select label, sort_order from (
  select stage1_label as label, 0 as sort_order from preloader_settings where id = 1
  union all
  select stage2_label, 1 from preloader_settings where id = 1
  union all
  select stage3_label, 2 from preloader_settings where id = 1
  union all
  select stage4_label, 3 from preloader_settings where id = 1
  union all
  select stage5_label, 4 from preloader_settings where id = 1
) as v
where not exists (select 1 from preloader_stages);

alter table preloader_settings
  drop column if exists stage1_label,
  drop column if exists stage2_label,
  drop column if exists stage3_label,
  drop column if exists stage4_label,
  drop column if exists stage5_label;
