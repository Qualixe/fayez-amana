import StatForm from "../stat-form";
import { createStat } from "../actions";

export default function NewStatPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New stat</h1>
      <StatForm action={createStat} submitLabel="Create" />
    </div>
  );
}
