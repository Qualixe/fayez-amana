-- Makes the office map's pinned location dashboard-editable instead of
-- hardcoded in the component. Defaults match the current pin (Jeddah).
-- Run in the Supabase SQL editor. Safe to re-run.

alter table contact_settings
  add column if not exists map_latitude double precision not null default 21.5996158,
  add column if not exists map_longitude double precision not null default 39.1377514,
  add column if not exists map_zoom int not null default 17;
