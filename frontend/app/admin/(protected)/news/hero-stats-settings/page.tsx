import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveNewsHeroStatsSettings } from "./actions";

export default async function NewsHeroStatsSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("news_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">News page — Hero stats</h1>

      <form action={saveNewsHeroStatsSettings} className="flex max-w-4xl flex-col gap-6">
        <FieldPair name="meta_author" label="Author (English)" labelAr="الكاتب (عربي)" row={s} />
        <FieldPair name="meta_languages" label="Languages (English)" labelAr="اللغات (عربي)" row={s} />

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
