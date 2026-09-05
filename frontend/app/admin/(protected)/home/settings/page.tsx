import { createClient } from "@/lib/supabase/server";
import HomeSettingsForm from "./home-settings-form";
import { saveHomeSettings } from "./actions";

export default async function HomeSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home page settings</h1>
      <HomeSettingsForm action={saveHomeSettings} row={row ?? {}} />
    </div>
  );
}
