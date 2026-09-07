import { createClient } from "@/lib/supabase/server";
import { TextField } from "../../_components/settings-fields";
import { saveProcessIntroSettings } from "./actions";

export default async function ProcessIntroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("process_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? ({} as Record<string, string | null | undefined>);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Process page — Bilingual intro</h1>
        <p className="text-sm text-dust">Shown as one Arabic block + one English block, side by side, regardless of site language.</p>
      </div>

      <form action={saveProcessIntroSettings} className="flex max-w-4xl flex-col gap-6">
        <TextField name="intro_kicker" label="Kicker (Arabic text, shown as-is)" defaultValue={s.intro_kicker} dir="rtl" />
        <TextField name="intro_arabic_lede" label="Arabic lede" defaultValue={s.intro_arabic_lede} multiline rows={4} dir="rtl" />
        <TextField name="intro_english_lede" label="English lede" defaultValue={s.intro_english_lede} multiline rows={4} />

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
