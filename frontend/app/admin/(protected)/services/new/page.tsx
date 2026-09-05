import ServiceForm from "../service-form";
import { createService } from "../actions";

export default function NewServicePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New service</h1>
      <ServiceForm action={createService} submitLabel="Create service" />
    </div>
  );
}
