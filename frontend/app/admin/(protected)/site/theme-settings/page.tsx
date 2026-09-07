import { createClient } from "@/lib/supabase/server";
import { ColorField, legendClasses } from "../../_components/settings-fields";
import { saveThemeSettings } from "./actions";

export default async function ThemeSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("theme_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Colors</h1>
        <p className="text-sm text-dust">
          The site&apos;s full color palette. This only affects the public website — the dashboard keeps its own fixed
          colors so it stays legible no matter what you pick here.
        </p>
      </div>

      <form action={saveThemeSettings} className="flex max-w-2xl flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Backgrounds &amp; borders</legend>
          <ColorField name="void" label="Void (page background)" defaultValue={s.color_void} />
          <ColorField name="ink" label="Ink (panel background)" defaultValue={s.color_ink} />
          <ColorField name="slab" label="Slab (card background)" defaultValue={s.color_slab} />
          <ColorField name="concrete" label="Concrete" defaultValue={s.color_concrete} />
          <ColorField name="steel" label="Steel (borders)" defaultValue={s.color_steel} />
          <ColorField name="rebar" label="Rebar (borders, muted)" defaultValue={s.color_rebar} />
          <ColorField name="edge" label="Edge (input borders)" defaultValue={s.color_edge} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Text</legend>
          <ColorField name="bone" label="Bone (headings, primary text)" defaultValue={s.color_bone} />
          <ColorField name="paper" label="Paper (white)" defaultValue={s.color_paper} />
          <ColorField name="dust" label="Dust (body text)" defaultValue={s.color_dust} />
          <ColorField name="ash" label="Ash (muted text)" defaultValue={s.color_ash} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Brand accent (blue)</legend>
          <ColorField name="azure" label="Azure (base)" defaultValue={s.color_azure} />
          <ColorField name="azure-lift" label="Azure — lift" defaultValue={s.color_azure_lift} />
          <ColorField name="azure-glow" label="Azure — glow" defaultValue={s.color_azure_glow} />
          <ColorField name="azure-deep" label="Azure — deep" defaultValue={s.color_azure_deep} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Highlight (amber)</legend>
          <ColorField name="amber" label="Amber" defaultValue={s.color_amber} />
          <ColorField name="amber-soft" label="Amber — soft" defaultValue={s.color_amber_soft} />
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save
        </button>
      </form>
    </div>
  );
}
