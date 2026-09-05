import ClientForm from "../client-form";
import { createClientLogo } from "../actions";

export default function NewClientPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New client</h1>
      <ClientForm action={createClientLogo} submitLabel="Create" />
    </div>
  );
}
