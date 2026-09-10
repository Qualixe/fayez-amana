-- Adds a dashboard-editable, bilingual pre-filled WhatsApp message,
-- appended to the WhatsApp link's ?text= parameter automatically. Leaving
-- it empty opens the chat with no pre-filled message, same as before this
-- migration.
-- Run in the Supabase SQL editor. Safe to re-run.

alter table contact_settings
  add column if not exists whatsapp_message text not null default '',
  add column if not exists whatsapp_message_ar text not null default '';

update contact_settings
set whatsapp_message = 'Hello, I''d like to know more about Fayez Amana''s services.'
where id = 1 and whatsapp_message = '';

update contact_settings
set whatsapp_message_ar = 'مرحبًا، أرغب في معرفة المزيد عن خدمات فايز أمانة.'
where id = 1 and whatsapp_message_ar = '';
