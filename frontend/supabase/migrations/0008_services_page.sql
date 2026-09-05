-- Services page: the core `services` table (moved here from the old
-- 0001_init.sql; service_gallery references projects, so run this after
-- 0007_projects_page.sql), plus hero, inspection process and compliance
-- sections. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  number text not null,
  title text not null,
  title_ar text not null,
  description text not null,
  description_ar text not null,
  capabilities text[] not null,
  capabilities_ar text[] not null,
  image text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists service_gallery (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  sort_order int not null default 0
);

create table if not exists services_page_settings (
  id int primary key default 1,

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_title1 text not null default '', hero_title1_ar text not null default '',
  hero_title2 text not null default '', hero_title2_ar text not null default '',
  hero_lede text not null default '', hero_lede_ar text not null default '',

  inspection_eyebrow text not null default '', inspection_eyebrow_ar text not null default '',
  inspection_title text not null default '', inspection_title_ar text not null default '',
  inspection_lede text not null default '', inspection_lede_ar text not null default '',
  inspection_phases text not null default '', inspection_phases_ar text not null default '',

  quality_metric1_value int not null default 0, quality_metric1_suffix text not null default '', quality_metric1_suffix_ar text not null default '', quality_metric1_label text not null default '', quality_metric1_label_ar text not null default '',
  quality_metric2_value int not null default 0, quality_metric2_suffix text not null default '', quality_metric2_suffix_ar text not null default '', quality_metric2_label text not null default '', quality_metric2_label_ar text not null default '',
  quality_metric3_value int not null default 0, quality_metric3_suffix text not null default '', quality_metric3_suffix_ar text not null default '', quality_metric3_label text not null default '', quality_metric3_label_ar text not null default '',
  quality_metric4_value int not null default 0, quality_metric4_suffix text not null default '', quality_metric4_suffix_ar text not null default '', quality_metric4_label text not null default '', quality_metric4_label_ar text not null default '',

  compliance_eyebrow text not null default '', compliance_eyebrow_ar text not null default '',
  compliance_title text not null default '', compliance_title_ar text not null default '',
  compliance_standards text not null default '', compliance_standards_ar text not null default '',
  compliance_request_docs text not null default '', compliance_request_docs_ar text not null default '',
  compliance_certifications_label text not null default '', compliance_certifications_label_ar text not null default '',
  compliance_cert_body text not null default '', compliance_cert_body_ar text not null default '',
  compliance_cert_cta text not null default '', compliance_cert_cta_ar text not null default '',

  constraint services_page_settings_singleton check (id = 1)
);

create table if not exists services_inspection_steps (
  id uuid primary key default gen_random_uuid(),
  title text not null, title_ar text not null,
  body text not null, body_ar text not null,
  sort_order int not null default 0
);

do $$
declare
  t text;
begin
  foreach t in array array['services', 'service_gallery', 'services_page_settings', 'services_inspection_steps']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;
