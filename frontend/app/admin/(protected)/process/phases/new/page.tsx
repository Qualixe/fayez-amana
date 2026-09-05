import PhaseForm from "../phase-form";
import { createPhase } from "../actions";

export default function NewPhasePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New workflow phase</h1>
      <PhaseForm action={createPhase} submitLabel="Create" />
    </div>
  );
}
