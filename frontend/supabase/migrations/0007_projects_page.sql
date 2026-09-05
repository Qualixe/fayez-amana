-- Projects page: the core `projects` table (moved here from the old
-- 0001_init.sql), plus hero/summary/sectors/spotlight and the project-detail
-- "Method & Materials" section. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  display_title text[] not null,
  category text not null check (category in ('Residential','Commercial','Hospitality','Healthcare','F&B')),
  subtitle text not null,
  teaser text not null,
  description text not null,
  client text,
  location text not null,
  scope text not null,
  size text,
  image text not null,
  featured boolean not null default false,
  sort_order int not null default 0,
  title_ar text,
  display_title_ar text[],
  subtitle_ar text,
  teaser_ar text,
  description_ar text,
  client_ar text,
  location_ar text,
  scope_ar text,
  size_ar text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  url text not null,
  sort_order int not null default 0
);

create table if not exists projects_page_settings (
  id int primary key default 1,

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_title1 text not null default '', hero_title1_ar text not null default '',
  hero_title2 text not null default '', hero_title2_ar text not null default '',
  hero_lede text not null default '', hero_lede_ar text not null default '',
  hero_meta1_label text not null default '', hero_meta1_label_ar text not null default '', hero_meta1_value text not null default '', hero_meta1_value_ar text not null default '',
  hero_meta2_label text not null default '', hero_meta2_label_ar text not null default '', hero_meta2_value text not null default '', hero_meta2_value_ar text not null default '',
  hero_meta3_label text not null default '', hero_meta3_label_ar text not null default '', hero_meta3_value text not null default '', hero_meta3_value_ar text not null default '',
  hero_meta4_label text not null default '', hero_meta4_label_ar text not null default '', hero_meta4_value text not null default '', hero_meta4_value_ar text not null default '',

  summary_eyebrow text not null default '', summary_eyebrow_ar text not null default '',
  summary_body text not null default '', summary_body_ar text not null default '',
  summary_link1_label text not null default '', summary_link1_label_ar text not null default '', summary_link1_href text not null default '',
  summary_link2_label text not null default '', summary_link2_label_ar text not null default '', summary_link2_href text not null default '',
  summary_link3_label text not null default '', summary_link3_label_ar text not null default '', summary_link3_href text not null default '',
  summary_link4_label text not null default '', summary_link4_label_ar text not null default '', summary_link4_href text not null default '',
  summary_stat1_label text not null default '', summary_stat1_label_ar text not null default '', summary_stat1_value text not null default '', summary_stat1_value_ar text not null default '',
  summary_stat2_label text not null default '', summary_stat2_label_ar text not null default '', summary_stat2_value text not null default '', summary_stat2_value_ar text not null default '',
  summary_stat3_label text not null default '', summary_stat3_label_ar text not null default '', summary_stat3_value text not null default '', summary_stat3_value_ar text not null default '',
  summary_stat4_label text not null default '', summary_stat4_label_ar text not null default '', summary_stat4_value text not null default '', summary_stat4_value_ar text not null default '',

  sectors_heading text not null default '', sectors_heading_ar text not null default '',
  sectors_list text not null default '', sectors_list_ar text not null default '',

  spotlight_eyebrow text not null default '', spotlight_eyebrow_ar text not null default '',
  spotlight_title text not null default '', spotlight_title_ar text not null default '',
  spotlight_lede text not null default '', spotlight_lede_ar text not null default '',

  constraint projects_page_settings_singleton check (id = 1)
);

create table if not exists project_detail_settings (
  id int primary key default 1,
  method_eyebrow text not null default '', method_eyebrow_ar text not null default '',
  method_heading1 text not null default '', method_heading1_ar text not null default '',
  method_heading2 text not null default '', method_heading2_ar text not null default '',
  method_lede text not null default '', method_lede_ar text not null default '',
  constraint project_detail_settings_singleton check (id = 1)
);

create table if not exists project_detail_method_articles (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null, title_ar text not null,
  body text not null, body_ar text not null,
  href text not null,
  label text not null, label_ar text not null,
  sort_order int not null default 0
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'projects', 'project_images',
    'projects_page_settings', 'project_detail_settings', 'project_detail_method_articles'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;
