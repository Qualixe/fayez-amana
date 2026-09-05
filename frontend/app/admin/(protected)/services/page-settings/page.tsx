import { createClient } from "@/lib/supabase/server";
import ServicesPageSettingsForm from "./services-page-settings-form";
import { saveServicesPageSettings } from "./actions";

export default async function ServicesPageSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Services page settings</h1>
      <ServicesPageSettingsForm action={saveServicesPageSettings} row={row ?? {}} />
    </div>
  );
}
