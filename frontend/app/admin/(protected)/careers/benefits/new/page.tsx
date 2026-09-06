import BenefitForm from "../benefit-form";
import { createBenefit } from "../actions";

export default function NewBenefitPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New benefit</h1>
      <BenefitForm action={createBenefit} submitLabel="Create" />
    </div>
  );
}
