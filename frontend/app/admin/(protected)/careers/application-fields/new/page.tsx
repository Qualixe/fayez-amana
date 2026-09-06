import ApplicationFieldForm from "../application-field-form";
import { createApplicationField } from "../actions";

export default function NewApplicationFieldPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New application form field</h1>
      <ApplicationFieldForm action={createApplicationField} submitLabel="Create" />
    </div>
  );
}
