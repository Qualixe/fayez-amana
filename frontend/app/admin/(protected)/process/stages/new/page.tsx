import StageForm from "../stage-form";
import { createStage } from "../actions";

export default function NewStagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New stage</h1>
      <StageForm action={createStage} submitLabel="Create" />
    </div>
  );
}
