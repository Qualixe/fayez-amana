-- Shared "Start a Project" CTA block shown at the bottom of six pages
-- (Home, About, Services, Projects, Project detail, Process).
-- Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists site_cta_settings (
  id int primary key default 1,
  eyebrow text not null default '', eyebrow_ar text not null default '',
  title1 text not null default '', title1_ar text not null default '',
  title2 text not null default '', title2_ar text not null default '',
  lede text not null default '', lede_ar text not null default '',
  start_project text not null default '', start_project_ar text not null default '',
  constraint site_cta_settings_singleton check (id = 1)
);

alter table site_cta_settings enable row level security;
drop policy if exists "site_cta_settings_public_read" on site_cta_settings;
create policy "site_cta_settings_public_read" on site_cta_settings for select to anon using (true);
drop policy if exists "site_cta_settings_admin_all" on site_cta_settings;
create policy "site_cta_settings_admin_all" on site_cta_settings for all to authenticated using (true) with check (true);
