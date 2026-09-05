-- Replaces the fixed-position header/footer nav labels (site_settings.nav_*
-- from 0014_site_chrome.sql, now unused) with a real list the admin can add
-- to, remove from, and reorder. Run in the Supabase SQL editor after 0014.
-- Safe to re-run.

create table if not exists site_nav_links (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  label_ar text not null,
  href text not null,
  show_in_primary_nav boolean not null default false,
  sort_order int not null default 0
);

alter table site_nav_links enable row level security;
drop policy if exists "site_nav_links_public_read" on site_nav_links;
create policy "site_nav_links_public_read" on site_nav_links for select to anon using (true);
drop policy if exists "site_nav_links_admin_all" on site_nav_links;
create policy "site_nav_links_admin_all" on site_nav_links for all to authenticated using (true) with check (true);
