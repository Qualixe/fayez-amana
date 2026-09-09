-- Adds a dashboard-editable WhatsApp link, used by the sticky WhatsApp
-- button shown on every public page. Defaults to a wa.me link built from
-- the existing phone number, so it works immediately; leaving the field
-- empty later hides the button.
-- Run in the Supabase SQL editor. Safe to re-run.

alter table contact_settings
  add column if not exists whatsapp_url text not null default '';

update contact_settings
set whatsapp_url = 'https://wa.me/' || regexp_replace(phone, '[^0-9]', '', 'g')
where id = 1 and whatsapp_url = '' and coalesce(phone, '') <> '';
