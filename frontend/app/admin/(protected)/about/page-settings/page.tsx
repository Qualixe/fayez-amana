import { createClient } from "@/lib/supabase/server";
import AboutPageSettingsForm from "./about-page-settings-form";
import { saveAboutPageSettings } from "./actions";

export default async function AboutPageSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("about_page_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">About page settings</h1>
      <AboutPageSettingsForm action={saveAboutPageSettings} row={row ?? {}} />
    </div>
  );
}
