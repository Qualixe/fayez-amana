-- Makes the loading preloader's text content dashboard-editable. The logo
-- already comes from Site settings, so it isn't duplicated here. These
-- fields are shown as-is regardless of site language (the preloader itself
-- has no locale switch today), matching its current hardcoded behavior.
-- Run in the Supabase SQL editor. Safe to re-run.

create table if not exists preloader_settings (
  id int primary key default 1,
  arabic_name text not null default 'شركة فايز أمانة للمقاولات',
  english_name text not null default 'Fayez Amana Construction Company',
  est_line text not null default 'EST. 2000 · JEDDAH, KSA',
  stage1_label text not null default 'Survey',
  stage2_label text not null default 'Foundation',
  stage3_label text not null default 'Structure',
  stage4_label text not null default 'Façade',
  stage5_label text not null default 'Finishing',
  constraint preloader_settings_singleton check (id = 1)
);

insert into preloader_settings (id) values (1) on conflict (id) do nothing;

alter table preloader_settings enable row level security;
drop policy if exists "preloader_settings_public_read" on preloader_settings;
create policy "preloader_settings_public_read" on preloader_settings for select to anon using (true);
drop policy if exists "preloader_settings_admin_all" on preloader_settings;
create policy "preloader_settings_admin_all" on preloader_settings for all to authenticated using (true) with check (true);
