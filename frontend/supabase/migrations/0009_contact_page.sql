-- Contact page: enquiries (moved here from the old 0001_init.sql), FAQs
-- (shared with the Projects page), form dropdown options, and
-- contact_settings (moved here from the old 0002_content.sql), plus the
-- hero, business details, socials, office map and bottom marquee added to
-- contact_settings. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  scope text,
  location text,
  budget text,
  sector text,
  message text not null,
  locale text not null default 'en',
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  page text not null check (page in ('contact', 'projects')),
  question text not null,
  question_ar text not null,
  answer text not null,
  answer_ar text not null,
  sort_order int not null default 0
);

create table if not exists contact_options (
  id uuid primary key default gen_random_uuid(),
  group_name text not null check (group_name in ('scope', 'budget', 'sector')),
  value text not null,
  label text not null,
  label_ar text not null,
  sort_order int not null default 0
);

create table if not exists contact_settings (
  id int primary key default 1,
  trust_items jsonb not null default '[]',
  disciplines jsonb not null default '[]',
  faq_kicker text not null default '',
  faq_kicker_ar text not null default '',
  faq_headline text not null default '',
  faq_headline_ar text not null default '',
  faq_lede text not null default '',
  faq_lede_ar text not null default '',
  constraint contact_settings_singleton check (id = 1)
);

alter table contact_settings
  add column if not exists phone text not null default '',
  add column if not exists email text not null default '',
  add column if not exists location text not null default '',
  add column if not exists location_ar text not null default '',
  add column if not exists established_year text not null default '',
  add column if not exists website_url text not null default '',
  add column if not exists website_display text not null default '',
  add column if not exists instagram_url text not null default '',
  add column if not exists instagram_display text not null default '',
  add column if not exists x_url text not null default '',
  add column if not exists x_display text not null default '',
  add column if not exists marquee_items text not null default '',
  add column if not exists marquee_items_ar text not null default '',
  add column if not exists hero_eyebrow text not null default '',
  add column if not exists hero_eyebrow_ar text not null default '',
  add column if not exists hero_heading1 text not null default '',
  add column if not exists hero_heading1_ar text not null default '',
  add column if not exists hero_heading2 text not null default '',
  add column if not exists hero_heading2_ar text not null default '',
  add column if not exists hero_lede text not null default '',
  add column if not exists hero_lede_ar text not null default '',
  add column if not exists map_eyebrow text not null default '',
  add column if not exists map_eyebrow_ar text not null default '',
  add column if not exists map_heading1 text not null default '',
  add column if not exists map_heading1_ar text not null default '',
  add column if not exists map_heading2 text not null default '',
  add column if not exists map_heading2_ar text not null default '',
  add column if not exists map_caption text not null default '',
  add column if not exists map_caption_ar text not null default '';

do $$
declare
  t text;
begin
  foreach t in array array['faqs', 'contact_options', 'contact_settings']
  loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "%s_public_read" on %I', t, t);
    execute format('create policy "%s_public_read" on %I for select to anon using (true)', t, t);
    execute format('drop policy if exists "%s_admin_all" on %I', t, t);
    execute format('create policy "%s_admin_all" on %I for all to authenticated using (true) with check (true)', t, t);
  end loop;
end $$;

-- Enquiries are contact-form submissions: the public can submit (insert) but
-- never read anyone's submissions. Only authenticated admins can read/update/delete.
alter table enquiries enable row level security;
drop policy if exists "enquiries_public_insert" on enquiries;
create policy "enquiries_public_insert" on enquiries for insert to anon with check (true);
drop policy if exists "enquiries_admin_all" on enquiries;
create policy "enquiries_admin_all" on enquiries for all to authenticated using (true) with check (true);
