-- Hero/section background images that were hardcoded in components, made
-- dashboard-editable (upload via the site-images bucket from 0011_storage.sql,
-- or paste a path/URL). Run in the Supabase SQL editor after 0003-0011.
-- Safe to re-run.

alter table home_settings
  add column if not exists about_image text not null default '/images/about-img1.avif';

alter table about_page_settings
  add column if not exists hero_image text not null default '/images/about-hero-banner.avif',
  add column if not exists why_image text not null default '/images/why-choose-bg.avif';

alter table process_page_settings
  add column if not exists hero_image text not null default '/images/work-img5.avif';

alter table projects_page_settings
  add column if not exists hero_image text not null default '/images/project-hero-bg.avif';

alter table services_page_settings
  add column if not exists hero_image text not null default '/images/service-hero-bg.avif';

alter table contact_settings
  add column if not exists hero_image text not null default '/images/work-img6.avif';

alter table site_cta_settings
  add column if not exists background_image text not null default '/images/work-img4.avif';
