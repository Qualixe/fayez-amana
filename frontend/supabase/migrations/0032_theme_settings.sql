-- Makes the site's full color palette dashboard-editable. Applied only to
-- the public (site) pages via scoped CSS custom-property overrides — the
-- admin dashboard keeps its own fixed dark palette regardless of what an
-- admin picks here, so the dashboard stays legible even with an unusual
-- brand color choice.
-- Run in the Supabase SQL editor. Safe to re-run.

create table if not exists theme_settings (
  id int primary key default 1,
  color_void text not null default '#1c242e',
  color_ink text not null default '#26313d',
  color_slab text not null default '#2f3b49',
  color_concrete text not null default '#374453',
  color_steel text not null default '#465464',
  color_rebar text not null default '#677484',
  color_edge text not null default '#2e3c4e',
  color_bone text not null default '#f5f3ef',
  color_paper text not null default '#ffffff',
  color_dust text not null default '#b9b6ae',
  color_ash text not null default '#96999f',
  color_azure text not null default '#1e68ac',
  color_azure_lift text not null default '#3d8fd8',
  color_azure_glow text not null default '#6fb4f0',
  color_azure_deep text not null default '#0f3f6d',
  color_amber text not null default '#d9a441',
  color_amber_soft text not null default '#f0cd8a',
  constraint theme_settings_singleton check (id = 1)
);

insert into theme_settings (id) values (1) on conflict (id) do nothing;

alter table theme_settings enable row level security;
drop policy if exists "theme_settings_public_read" on theme_settings;
create policy "theme_settings_public_read" on theme_settings for select to anon using (true);
drop policy if exists "theme_settings_admin_all" on theme_settings;
create policy "theme_settings_admin_all" on theme_settings for all to authenticated using (true) with check (true);
