-- Storage bucket for admin-uploaded images (projects, services, client logos,
-- founder photo). Public read (so the site can display them), authenticated
-- admin write. Run in the Supabase SQL editor. Safe to re-run.

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do update set public = true;

drop policy if exists "site_images_public_read" on storage.objects;
create policy "site_images_public_read"
  on storage.objects for select
  to anon
  using (bucket_id = 'site-images');

drop policy if exists "site_images_admin_write" on storage.objects;
create policy "site_images_admin_write"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'site-images')
  with check (bucket_id = 'site-images');
