-- News & Insights hero background image, dashboard-editable like every
-- other page hero. Run in the Supabase SQL editor. Safe to re-run.

alter table news_page_settings
  add column if not exists hero_image text not null default '';
