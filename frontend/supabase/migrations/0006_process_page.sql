-- Process page: structural stages, stage categories, workflow phases (moved
-- here from the old 0002_content.sql), plus hero/bilingual-intro/finishing
-- sections. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists process_stages (
  no int primary key,
  title text not null,
  title_ar text not null,
  body text not null,
  body_ar text not null
);

create table if not exists process_categories (
  id uuid primary key default gen_random_uuid(),
  key text unique not null,
  label text not null,
  label_ar text not null,
  from_stage int not null,
  to_stage int not null,
  sort_order int not null default 0
);

create table if not exists process_phases (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_ar text not null,
  body text not null,
  body_ar text not null,
  sort_order int not null default 0
);

create table if not exists process_page_settings (
  id int primary key default 1,

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_heading1 text not null default '', hero_heading1_ar text not null default '',
  hero_heading2 text not null default '', hero_heading2_ar text not null default '',
  hero_heading3 text not null default '', hero_heading3_ar text not null default '',
  hero_lede text not null default '', hero_lede_ar text not null default '',
  hero_meta1_label text not null default '', hero_meta1_label_ar text not null default '', hero_meta1_value text not null default '', hero_meta1_value_ar text not null default '',
  hero_meta2_label text not null default '', hero_meta2_label_ar text not null default '', hero_meta2_value text not null default '', hero_meta2_value_ar text not null default '',
  hero_meta3_label text not null default '', hero_meta3_label_ar text not null default '', hero_meta3_value text not null default '', hero_meta3_value_ar text not null default '',
  hero_meta4_label text not null default '', hero_meta4_label_ar text not null default '', hero_meta4_value text not null default '', hero_meta4_value_ar text not null default '',

  intro_kicker text not null default '',
  intro_arabic_lede text not null default '',
  intro_english_lede text not null default '',

  finishing_eyebrow text not null default '', finishing_eyebrow_ar text not null default '',
  finishing_heading text not null default '', finishing_heading_ar text not null default '',
  finishing_body text not null default '', finishing_body_ar text not null default '',
  finishing_cta text not null default '', finishing_cta_ar text not null default '',
  finishing_image_alt text not null default '', finishing_image_alt_ar text not null default '',

  constraint process_page_settings_singleton check (id = 1)
);

do $$
declare
  t text;
begin
  foreach t in array array['process_stages', 'process_categories', 'process_phases', 'process_page_settings']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;
