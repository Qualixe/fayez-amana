-- Site logo (shown in the header and footer), made dashboard-editable
-- (upload via the site-images bucket from 0011_storage.sql, or paste a
-- path/URL). Defaults to the Fayez Amana logo already in /public/images/.
-- Run in the Supabase SQL editor after 0003. Safe to re-run.

alter table home_settings
  add column if not exists logo text not null default '/images/fayez-amana-logo.png';
