import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { TextField, ImageField } from "../../_components/settings-fields";
import { savePreloaderSettings } from "./actions";

export default async function PreloaderSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("preloader_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Preloader</h1>
        <p className="text-sm text-dust">
          The full-screen loading animation shown on a visitor&apos;s first page load. Leave the logo empty to fall
          back to Site-wide → Header &amp; footer&apos;s logo. The stage labels shown while it loads are managed under{" "}
          <Link href="/admin/site/preloader-stages" className="text-azure-glow hover:underline">
            Preloader stages
          </Link>
          . These fields are shown as-is (not translated) since the preloader has no language switch.
        </p>
      </div>

      <form action={savePreloaderSettings} className="flex max-w-2xl flex-col gap-6">
        <ImageField name="logo" label="Logo (optional — overrides the header logo)" row={s} />
        <TextField name="arabic_name" label="Arabic company name" defaultValue={s.arabic_name} dir="rtl" />
        <TextField name="english_name" label="English company name" defaultValue={s.english_name} />
        <TextField name="est_line" label="Est. line" defaultValue={s.est_line} />

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
