-- Company Culture section image (right column, next to the culture items and
-- team breakdown). Run in the Supabase SQL editor. Safe to re-run.

alter table careers_page_settings
  add column if not exists culture_image text not null default '';
