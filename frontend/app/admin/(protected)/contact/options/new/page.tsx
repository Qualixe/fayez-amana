import OptionForm from "../option-form";
import { createOption } from "../actions";

export default function NewOptionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New option</h1>
      <OptionForm action={createOption} submitLabel="Create" />
    </div>
  );
}
