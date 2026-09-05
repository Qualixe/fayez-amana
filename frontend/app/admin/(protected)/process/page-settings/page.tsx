import { createClient } from "@/lib/supabase/server";
import ProcessPageSettingsForm from "./process-page-settings-form";
import { saveProcessPageSettings } from "./actions";

export default async function ProcessPageSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("process_page_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Process page settings</h1>
      <ProcessPageSettingsForm action={saveProcessPageSettings} row={row ?? {}} />
    </div>
  );
}
