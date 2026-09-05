import ProjectForm from "../project-form";
import { createProject } from "../actions";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New project</h1>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
