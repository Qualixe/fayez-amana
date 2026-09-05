import { createClient } from "@/lib/supabase/server";
import ProjectsPageSettingsForm from "./projects-page-settings-form";
import { saveProjectsPageSettings } from "./actions";

export default async function ProjectsPageSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("projects_page_settings").select("*").eq("id", 1).maybeSingle();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects page settings</h1>
      <ProjectsPageSettingsForm action={saveProjectsPageSettings} row={row ?? {}} />
    </div>
  );
}
