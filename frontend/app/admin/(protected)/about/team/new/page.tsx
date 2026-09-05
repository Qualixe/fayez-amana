import TeamCategoryForm from "../team-form";
import { createTeamCategory } from "../actions";

export default function NewTeamCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New team row</h1>
      <TeamCategoryForm action={createTeamCategory} submitLabel="Create" />
    </div>
  );
}
