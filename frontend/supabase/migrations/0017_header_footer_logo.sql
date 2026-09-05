-- Splits the single site logo (0016_site_logo.sql, on home_settings) into
-- two independent logos on site_settings — one for the header, one for the
-- footer — since header/footer chrome belongs there, not on the Home page.
-- The old home_settings.logo column is left in place, unused.
-- Run in the Supabase SQL editor after 0014. Safe to re-run.

alter table site_settings
  add column if not exists header_logo text not null default '/images/fayez-amana-logo.png',
  add column if not exists footer_logo text not null default '/images/fayez-amana-logo.png';
