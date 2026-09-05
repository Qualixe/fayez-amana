import InspectionStepForm from "../inspection-step-form";
import { createInspectionStep } from "../actions";

export default function NewInspectionStepPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New inspection step</h1>
      <InspectionStepForm action={createInspectionStep} submitLabel="Create" />
    </div>
  );
}
