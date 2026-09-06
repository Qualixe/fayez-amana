-- Turns the Career application form's extra fields (Phone, Experience, and
-- anything added later) into a real add/remove/reorder list. Name, Email,
-- Position and CV stay fixed — they're tied to real backend logic (email
-- validation, the live positions list, private CV storage) rather than
-- being plain text inputs.
--
-- Answers for these dynamic fields are stored in career_applications.extra_fields
-- (a JSON object keyed by field_key), alongside the existing dedicated
-- phone/experience columns which are still populated when a field with that
-- exact key exists, so the admin list keeps working unchanged.
-- Run in the Supabase SQL editor. Safe to re-run.

create extension if not exists pgcrypto;

create table if not exists career_application_fields (
  id uuid primary key default gen_random_uuid(),
  field_key text unique not null,
  field_type text not null default 'text' check (field_type in ('text', 'email', 'tel', 'textarea', 'select')),
  label text not null, label_ar text not null,
  placeholder text not null default '', placeholder_ar text not null default '',
  options text not null default '', options_ar text not null default '',
  required boolean not null default false,
  sort_order int not null default 0
);

alter table career_application_fields enable row level security;

drop policy if exists "career_application_fields_public_read" on career_application_fields;
create policy "career_application_fields_public_read" on career_application_fields for select to anon using (true);

drop policy if exists "career_application_fields_admin_all" on career_application_fields;
create policy "career_application_fields_admin_all" on career_application_fields for all to authenticated using (true) with check (true);

alter table career_applications
  add column if not exists extra_fields jsonb not null default '{}'::jsonb;
