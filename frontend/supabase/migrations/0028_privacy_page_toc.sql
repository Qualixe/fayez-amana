-- Adds the "On this page" jump-link index label and the closing "Contact"
-- block heading to the Privacy page, to match the bru.com.sa reference
-- layout (numbered table of contents + dedicated contact block at the end).
-- Run in the Supabase SQL editor. Safe to re-run.

alter table privacy_page_settings
  add column if not exists toc_label text not null default 'On this page',
  add column if not exists toc_label_ar text not null default 'في هذه الصفحة',
  add column if not exists contact_heading text not null default 'Contact',
  add column if not exists contact_heading_ar text not null default 'تواصل معنا';
