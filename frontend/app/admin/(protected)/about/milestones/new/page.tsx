import MilestoneForm from "../milestone-form";
import { createMilestone } from "../actions";

export default function NewMilestonePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New milestone</h1>
      <MilestoneForm action={createMilestone} submitLabel="Create" />
    </div>
  );
}
