-- Restrict the site-images bucket to the file types the app actually uses
-- (images for photos/logos, a handful of video formats for the hero
-- background). Defense-in-depth alongside the app-level check in
-- lib/supabase/storage.ts: even a direct Storage API call with a valid
-- admin session can no longer upload arbitrary file types (e.g. .html/.svg
-- with embedded scripts, or executables).
-- Run in the Supabase SQL editor after 0011_storage.sql. Safe to re-run.

update storage.buckets
set allowed_mime_types = array[
  'image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/avif',
  'video/mp4', 'video/webm', 'video/quicktime'
]
where id = 'site-images';
