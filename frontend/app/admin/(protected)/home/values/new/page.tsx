import ValueForm from "../value-form";
import { createValue } from "../actions";

export default function NewValuePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New core value</h1>
      <ValueForm action={createValue} submitLabel="Create" />
    </div>
  );
}
