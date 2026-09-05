-- Home page content, plus the "Core Values" block shared between the home
-- page and the About page (they show identical B/R/U content today).
-- Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists home_settings (
  id int primary key default 1,

  hero_brand_line1 text not null default 'BRU', hero_brand_line1_ar text not null default 'BRU',
  hero_brand_line2 text not null default 'CO.', hero_brand_line2_ar text not null default 'CO.',
  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_quote text not null default '', hero_quote_ar text not null default '',
  hero_services text not null default '', hero_services_ar text not null default '',
  hero_start_project text not null default '', hero_start_project_ar text not null default '',
  hero_view_portfolio text not null default '', hero_view_portfolio_ar text not null default '',
  hero_handover_label text not null default '', hero_handover_label_ar text not null default '',
  hero_handover_title1 text not null default '', hero_handover_title1_ar text not null default '',
  hero_handover_title2 text not null default '', hero_handover_title2_ar text not null default '',
  hero_handover_body text not null default '', hero_handover_body_ar text not null default '',
  hero_scroll_hint text not null default '', hero_scroll_hint_ar text not null default '',

  about_eyebrow text not null default '', about_eyebrow_ar text not null default '',
  about_title text not null default '', about_title_ar text not null default '',
  about_body text not null default '', about_body_ar text not null default '',
  about_stat1_value text not null default '', about_stat1_label text not null default '', about_stat1_label_ar text not null default '',
  about_stat2_value text not null default '', about_stat2_label text not null default '', about_stat2_label_ar text not null default '',
  about_our_story text not null default '', about_our_story_ar text not null default '',
  about_expertise_eyebrow text not null default '', about_expertise_eyebrow_ar text not null default '',
  about_expertise_p1 text not null default '', about_expertise_p1_ar text not null default '',
  about_expertise_p2 text not null default '', about_expertise_p2_ar text not null default '',
  about_expertise_tags text not null default '', about_expertise_tags_ar text not null default '',

  services_eyebrow text not null default '', services_eyebrow_ar text not null default '',
  services_title1 text not null default '', services_title1_ar text not null default '',
  services_title2 text not null default '', services_title2_ar text not null default '',
  services_lede text not null default '', services_lede_ar text not null default '',
  services_note text not null default '', services_note_ar text not null default '',
  services_explore text not null default '', services_explore_ar text not null default '',

  work_eyebrow text not null default '', work_eyebrow_ar text not null default '',
  work_title1 text not null default '', work_title1_ar text not null default '',
  work_title2 text not null default '', work_title2_ar text not null default '',
  work_lede text not null default '', work_lede_ar text not null default '',
  work_all_projects text not null default '', work_all_projects_ar text not null default '',
  work_view_project text not null default '', work_view_project_ar text not null default '',

  clients_eyebrow text not null default '', clients_eyebrow_ar text not null default '',
  clients_title1 text not null default '', clients_title1_ar text not null default '',
  clients_title2 text not null default '', clients_title2_ar text not null default '',
  clients_lede text not null default '', clients_lede_ar text not null default '',
  clients_marquee text not null default '', clients_marquee_ar text not null default '',

  process_eyebrow text not null default '', process_eyebrow_ar text not null default '',
  process_title1 text not null default '', process_title1_ar text not null default '',
  process_title2 text not null default '', process_title2_ar text not null default '',
  process_lede text not null default '', process_lede_ar text not null default '',
  process_cta text not null default '', process_cta_ar text not null default '',

  constraint home_settings_singleton check (id = 1)
);

-- In case this file is re-run after home_settings already existed without these columns.
alter table home_settings
  add column if not exists hero_brand_line1 text not null default 'BRU',
  add column if not exists hero_brand_line1_ar text not null default 'BRU',
  add column if not exists hero_brand_line2 text not null default 'CO.',
  add column if not exists hero_brand_line2_ar text not null default 'CO.';

create table if not exists home_hero_stages (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  title text not null, title_ar text not null,
  detail text not null, detail_ar text not null,
  period text not null, period_ar text not null,
  sort_order int not null default 0
);

create table if not exists home_stats (
  id uuid primary key default gen_random_uuid(),
  value int not null,
  suffix text not null default '',
  label text not null, label_ar text not null,
  description text not null, description_ar text not null,
  sort_order int not null default 0
);

create table if not exists home_highlights (
  id uuid primary key default gen_random_uuid(),
  title text not null, title_ar text not null,
  description text not null, description_ar text not null,
  sort_order int not null default 0
);

-- Shared "Core Values" (B/R/U) block, used on both the home page and About page.
create table if not exists core_values (
  id uuid primary key default gen_random_uuid(),
  letter text not null,
  title text not null, title_ar text not null,
  description text not null, description_ar text not null,
  sort_order int not null default 0
);

create table if not exists core_values_settings (
  id int primary key default 1,
  eyebrow text not null default '', eyebrow_ar text not null default '',
  title text not null default '', title_ar text not null default '',
  lede text not null default '', lede_ar text not null default '',
  closing text not null default '', closing_ar text not null default '',
  constraint core_values_settings_singleton check (id = 1)
);

do $$
declare
  t text;
begin
  foreach t in array array[
    'home_settings', 'home_hero_stages', 'home_stats', 'home_highlights',
    'core_values', 'core_values_settings'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;
