-- Local-SEO landing pages for "/construction-company-jeddah" and
-- "/construction-company-makkah" — these routes were already linked from
-- every project detail page and the projects listing page (copied over from
-- the original bru.com.sa site's link structure) but the pages themselves
-- were never built, so they 404'd. This table backs both, keyed by slug.
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists location_pages (
  slug text primary key check (slug in ('jeddah', 'makkah')),

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_title1 text not null default '', hero_title1_ar text not null default '',
  hero_title2 text not null default '', hero_title2_ar text not null default '',
  hero_lede text not null default '', hero_lede_ar text not null default '',
  hero_image text not null default '',

  meta1_label text not null default '', meta1_label_ar text not null default '',
  meta1_value text not null default '', meta1_value_ar text not null default '',
  meta2_label text not null default '', meta2_label_ar text not null default '',
  meta2_value text not null default '', meta2_value_ar text not null default '',
  meta3_label text not null default '', meta3_label_ar text not null default '',
  meta3_value text not null default '', meta3_value_ar text not null default '',

  body_eyebrow text not null default '', body_eyebrow_ar text not null default '',
  body_title text not null default '', body_title_ar text not null default '',
  body_p1 text not null default '', body_p1_ar text not null default '',
  body_p2 text not null default '', body_p2_ar text not null default '',

  projects_eyebrow text not null default '', projects_eyebrow_ar text not null default '',
  projects_title text not null default '', projects_title_ar text not null default '',

  seo_title text not null default '', seo_title_ar text not null default '',
  seo_description text not null default '', seo_description_ar text not null default ''
);

insert into location_pages (slug) values ('jeddah'), ('makkah')
on conflict (slug) do nothing;

alter table location_pages enable row level security;

drop policy if exists "location_pages_public_read" on location_pages;
create policy "location_pages_public_read" on location_pages for select to anon using (true);

drop policy if exists "location_pages_admin_all" on location_pages;
create policy "location_pages_admin_all" on location_pages for all to authenticated using (true) with check (true);
