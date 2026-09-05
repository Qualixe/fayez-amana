-- About page: team breakdown, founder, certifications, clients (moved here
-- from the old 0002_content.sql), plus hero/expertise/journey/vision-mission
-- sections. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists team_categories (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  role_ar text not null,
  count int not null default 0,
  sort_order int not null default 0
);

create table if not exists about_settings (
  id int primary key default 1,
  eyebrow text not null default '',
  eyebrow_ar text not null default '',
  title text not null default '',
  title_ar text not null default '',
  lede text not null default '',
  lede_ar text not null default '',
  total_count int not null default 0,
  total_label text not null default '',
  total_label_ar text not null default '',
  management_title text not null default '',
  management_title_ar text not null default '',
  management_body text not null default '',
  management_body_ar text not null default '',
  admin_title text not null default '',
  admin_title_ar text not null default '',
  admin_body text not null default '',
  admin_body_ar text not null default '',
  constraint about_settings_singleton check (id = 1)
);

create table if not exists founder (
  id int primary key default 1,
  eyebrow text not null default '',
  eyebrow_ar text not null default '',
  title text not null default '',
  title_ar text not null default '',
  name text not null default '',
  name_ar text not null default '',
  role text not null default '',
  role_ar text not null default '',
  quote text not null default '',
  quote_ar text not null default '',
  p1 text not null default '',
  p1_ar text not null default '',
  p2 text not null default '',
  p2_ar text not null default '',
  photo text not null default '/images/work-img1.avif',
  constraint founder_singleton check (id = 1)
);

create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null,
  title_ar text not null,
  description text not null,
  description_ar text not null,
  sort_order int not null default 0
);

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  image text not null,
  sort_order int not null default 0
);

create table if not exists about_page_settings (
  id int primary key default 1,

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_title1 text not null default '', hero_title1_ar text not null default '',
  hero_title2 text not null default '', hero_title2_ar text not null default '',
  hero_title3 text not null default '', hero_title3_ar text not null default '',
  hero_body text not null default '', hero_body_ar text not null default '',
  hero_stat1_label text not null default '', hero_stat1_label_ar text not null default '', hero_stat1_value text not null default '', hero_stat1_value_ar text not null default '',
  hero_stat2_label text not null default '', hero_stat2_label_ar text not null default '', hero_stat2_value text not null default '', hero_stat2_value_ar text not null default '',
  hero_stat3_label text not null default '', hero_stat3_label_ar text not null default '', hero_stat3_value text not null default '', hero_stat3_value_ar text not null default '',
  hero_stat4_label text not null default '', hero_stat4_label_ar text not null default '', hero_stat4_value text not null default '', hero_stat4_value_ar text not null default '',

  expertise_eyebrow text not null default '', expertise_eyebrow_ar text not null default '',
  expertise_p1 text not null default '', expertise_p1_ar text not null default '',
  expertise_p2 text not null default '', expertise_p2_ar text not null default '',
  expertise_tags text not null default '', expertise_tags_ar text not null default '',

  journey_eyebrow text not null default '', journey_eyebrow_ar text not null default '',
  journey_title1 text not null default '', journey_title1_ar text not null default '',
  journey_title2 text not null default '', journey_title2_ar text not null default '',
  journey_lede text not null default '', journey_lede_ar text not null default '',
  journey_counter_value int not null default 0,
  journey_counter_label text not null default '', journey_counter_label_ar text not null default '',
  journey_cta text not null default '', journey_cta_ar text not null default '',

  why_eyebrow text not null default '', why_eyebrow_ar text not null default '',
  why_tagline text not null default '', why_tagline_ar text not null default '',
  why_title text not null default '', why_title_ar text not null default '',

  vision_eyebrow text not null default '', vision_eyebrow_ar text not null default '',
  vision_title text not null default '', vision_title_ar text not null default '',
  vision_closing text not null default '', vision_closing_ar text not null default '',

  constraint about_page_settings_singleton check (id = 1)
);

create table if not exists about_milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null, year_ar text not null,
  title text not null, title_ar text not null,
  description text not null, description_ar text not null,
  sort_order int not null default 0
);

create table if not exists about_vision_items (
  id uuid primary key default gen_random_uuid(),
  number text not null,
  title text not null, title_ar text not null,
  description text not null, description_ar text not null,
  sort_order int not null default 0
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'team_categories', 'about_settings', 'founder', 'certifications', 'clients',
    'about_page_settings', 'about_milestones', 'about_vision_items'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;
