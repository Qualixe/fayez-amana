-- Custom 404 page, fully editable from the dashboard.
-- Phone/email are NOT stored here — the page pulls those live from Contact
-- page settings, so there is one source of truth.
-- Run in the Supabase SQL editor. Safe to re-run.

create table if not exists site_not_found_settings (
  id int primary key default 1,
  eyebrow text not null default 'Error 404 · Off the site plan',
  eyebrow_ar text not null default 'خطأ 404 · خارج المخطط',
  message text not null default 'This page isn''t in the drawing set. Head back to the survey line and start again.',
  message_ar text not null default 'هذه الصفحة غير موجودة في المخطط. عد إلى خط المساحة وابدأ من جديد.',
  primary_label text not null default 'Back to home',
  primary_label_ar text not null default 'العودة إلى الرئيسية',
  secondary_label text not null default 'View projects',
  secondary_label_ar text not null default 'عرض المشاريع',
  call_prefix text not null default 'Or call',
  call_prefix_ar text not null default 'أو اتصل على',
  email_prefix text not null default 'Email',
  email_prefix_ar text not null default 'البريد الإلكتروني',
  constraint site_not_found_settings_singleton check (id = 1)
);

insert into site_not_found_settings (id) values (1) on conflict (id) do nothing;

alter table site_not_found_settings enable row level security;
drop policy if exists "site_not_found_settings_public_read" on site_not_found_settings;
create policy "site_not_found_settings_public_read" on site_not_found_settings for select to anon using (true);
drop policy if exists "site_not_found_settings_admin_all" on site_not_found_settings;
create policy "site_not_found_settings_admin_all" on site_not_found_settings for all to authenticated using (true) with check (true);
