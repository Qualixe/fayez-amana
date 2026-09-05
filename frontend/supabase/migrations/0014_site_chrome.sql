-- Header/Footer chrome: nav labels and footer-only copy, made
-- dashboard-editable. Everything else in the header/footer (phone, email,
-- socials, location, "Start a Project" text, brand wordmark, disciplines
-- list, sectors list, tagline) is reused from existing tables — see
-- lib/db/site.ts getSiteSettings() callers. Safe to re-run.

create table if not exists site_settings (
  id int primary key default 1,

  nav_home text not null default 'Home', nav_home_ar text not null default 'الرئيسية',
  nav_about text not null default 'About', nav_about_ar text not null default 'من نحن',
  nav_services text not null default 'Services', nav_services_ar text not null default 'خدماتنا',
  nav_projects text not null default 'Projects', nav_projects_ar text not null default 'مشاريعنا',
  nav_process text not null default 'Process', nav_process_ar text not null default 'آلية العمل',
  nav_news text not null default 'News', nav_news_ar text not null default 'الأخبار',
  nav_careers text not null default 'Careers', nav_careers_ar text not null default 'الوظائف',
  nav_contact text not null default 'Contact', nav_contact_ar text not null default 'تواصل معنا',

  footer_quote text not null default 'Your vision, our craft, since 2000',
  footer_quote_ar text not null default 'رؤيتك، حرفتنا، منذ عام 2000',
  footer_est_line text not null default 'EST. 2000 · ISO CERTIFIED · JEDDAH, KSA',
  footer_est_line_ar text not null default 'تأسست 2000 · معتمدة ISO · جدة، السعودية',
  footer_marquee text not null default '',
  footer_marquee_ar text not null default '',

  constraint site_settings_singleton check (id = 1)
);

alter table site_settings enable row level security;
drop policy if exists "site_settings_public_read" on site_settings;
create policy "site_settings_public_read" on site_settings for select to anon using (true);
drop policy if exists "site_settings_admin_all" on site_settings;
create policy "site_settings_admin_all" on site_settings for all to authenticated using (true) with check (true);
