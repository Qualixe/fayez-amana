import PrivacySectionForm from "../privacy-section-form";
import { createPrivacySection } from "../actions";

export default function NewPrivacySectionPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New privacy section</h1>
      <PrivacySectionForm action={createPrivacySection} submitLabel="Create" />
    </div>
  );
}
