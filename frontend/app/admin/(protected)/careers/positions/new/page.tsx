import PositionForm from "../position-form";
import { createPosition } from "../actions";

export default function NewPositionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New position</h1>
      <PositionForm action={createPosition} submitLabel="Create" />
    </div>
  );
}
