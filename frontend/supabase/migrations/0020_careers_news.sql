-- Careers and News & Insights sections — the "/careers" and "/news" nav
-- links already existed in site_nav_links (copied from bru.com.sa's link
-- structure) but neither page was ever built, so both 404'd. This migration
-- backs both, dashboard-editable. Run in the Supabase SQL editor. Safe to
-- re-run.

create extension if not exists pgcrypto;

-- ============================== CAREERS ==============================

create table if not exists careers_page_settings (
  id int primary key default 1,
  constraint careers_page_settings_singleton check (id = 1),

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
  meta4_label text not null default '', meta4_label_ar text not null default '',
  meta4_value text not null default '', meta4_value_ar text not null default '',

  culture_eyebrow text not null default '', culture_eyebrow_ar text not null default '',
  culture_title text not null default '', culture_title_ar text not null default '',

  benefits_eyebrow text not null default '', benefits_eyebrow_ar text not null default '',
  benefits_title text not null default '', benefits_title_ar text not null default '',

  positions_eyebrow text not null default '', positions_eyebrow_ar text not null default '',
  positions_title text not null default '', positions_title_ar text not null default '',
  positions_lede text not null default '', positions_lede_ar text not null default '',

  application_eyebrow text not null default '', application_eyebrow_ar text not null default '',
  application_title text not null default '', application_title_ar text not null default '',
  application_note text not null default '', application_note_ar text not null default '',

  seo_title text not null default '', seo_title_ar text not null default '',
  seo_description text not null default '', seo_description_ar text not null default ''
);

insert into careers_page_settings (id) values (1) on conflict (id) do nothing;

create table if not exists career_culture_items (
  id uuid primary key default gen_random_uuid(),
  title text not null, title_ar text not null,
  body text not null, body_ar text not null,
  sort_order int not null default 0
);

create table if not exists career_benefits (
  id uuid primary key default gen_random_uuid(),
  body text not null, body_ar text not null,
  sort_order int not null default 0
);

create table if not exists career_positions (
  id uuid primary key default gen_random_uuid(),
  title text not null, title_ar text not null,
  discipline text not null default '', discipline_ar text not null default '',
  employment_type text not null default 'Full-time', employment_type_ar text not null default 'دوام كامل',
  location text not null default 'Jeddah, KSA', location_ar text not null default 'جدة، السعودية',
  team_size int not null default 1,
  sort_order int not null default 0
);

create table if not exists career_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  position text,
  experience text,
  cv_url text,
  locale text not null default 'en',
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'rejected')),
  created_at timestamptz not null default now()
);

-- ============================ NEWS & INSIGHTS ============================

create table if not exists news_page_settings (
  id int primary key default 1,
  constraint news_page_settings_singleton check (id = 1),

  hero_eyebrow text not null default '', hero_eyebrow_ar text not null default '',
  hero_title1 text not null default '', hero_title1_ar text not null default '',
  hero_title2 text not null default '', hero_title2_ar text not null default '',
  hero_lede text not null default '', hero_lede_ar text not null default '',

  meta_author text not null default '', meta_author_ar text not null default '',
  meta_languages text not null default '', meta_languages_ar text not null default '',

  seo_title text not null default '', seo_title_ar text not null default '',
  seo_description text not null default '', seo_description_ar text not null default ''
);

insert into news_page_settings (id) values (1) on conflict (id) do nothing;

create table if not exists news_articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('Construction Guides', 'Industry Insights', 'Case Studies', 'Company News')),
  title text not null, title_ar text not null,
  excerpt text not null, excerpt_ar text not null,
  author text not null default '', author_ar text not null default '',
  read_minutes int not null default 5,
  published_at date not null default current_date,
  featured boolean not null default false,
  image text not null default '',
  sort_order int not null default 0
);

create table if not exists news_article_blocks (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references news_articles(id) on delete cascade,
  block_type text not null check (block_type in ('heading', 'paragraph', 'bullets', 'steps', 'callout', 'table', 'process_stages')),
  heading text not null default '', heading_ar text not null default '',
  body text not null default '', body_ar text not null default '',
  callout_title text not null default '', callout_title_ar text not null default '',
  table_headers text not null default '', table_headers_ar text not null default '',
  table_rows text not null default '', table_rows_ar text not null default '',
  sort_order int not null default 0
);

create table if not exists news_article_faqs (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references news_articles(id) on delete cascade,
  question text not null, question_ar text not null,
  answer text not null, answer_ar text not null,
  sort_order int not null default 0
);

create table if not exists news_article_related_services (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references news_articles(id) on delete cascade,
  service_id uuid not null references services(id) on delete cascade,
  sort_order int not null default 0
);

create table if not exists news_article_related_projects (
  id uuid primary key default gen_random_uuid(),
  article_id uuid not null references news_articles(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  sort_order int not null default 0
);

-- ============================== RLS ==============================

do $$
declare
  t text;
begin
  foreach t in array array[
    'careers_page_settings', 'career_culture_items', 'career_benefits', 'career_positions',
    'news_page_settings', 'news_articles', 'news_article_blocks', 'news_article_faqs',
    'news_article_related_services', 'news_article_related_projects'
  ]
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;

-- career_applications: public can submit (insert only), never read anyone
-- else's application. Only authenticated admins can read/update/delete.
alter table career_applications enable row level security;
drop policy if exists "career_applications_public_insert" on career_applications;
create policy "career_applications_public_insert" on career_applications for insert to anon with check (true);
drop policy if exists "career_applications_admin_all" on career_applications;
create policy "career_applications_admin_all" on career_applications for all to authenticated using (true) with check (true);

-- Private CV storage bucket. Unlike "site-images" (public marketing assets),
-- CVs are personal documents: the bucket is NOT public, applicants (anon)
-- may only upload, and only authenticated admins can read (via signed URLs)
-- or manage files.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('career-cvs', 'career-cvs', false, 3145728, array['application/pdf'])
on conflict (id) do update set public = false, file_size_limit = 3145728, allowed_mime_types = array['application/pdf'];

drop policy if exists "career_cvs_public_insert" on storage.objects;
create policy "career_cvs_public_insert"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'career-cvs');

drop policy if exists "career_cvs_admin_all" on storage.objects;
create policy "career_cvs_admin_all"
  on storage.objects for all
  to authenticated
  using (bucket_id = 'career-cvs')
  with check (bucket_id = 'career-cvs');
