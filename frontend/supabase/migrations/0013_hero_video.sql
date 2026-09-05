-- Home page hero background video, made dashboard-editable (upload via the
-- site-images bucket from 0011_storage.sql, or paste a path/URL).
-- Also raises that bucket's file size limit so video uploads aren't rejected.
-- Run in the Supabase SQL editor after 0003 and 0011. Safe to re-run.

alter table home_settings
  add column if not exists hero_video text not null default '/videos/construction-build.mp4';

update storage.buckets set file_size_limit = 104857600 where id = 'site-images'; -- 100 MB
