import CertificationForm from "../certification-form";
import { createCertification } from "../actions";

export default function NewCertificationPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New certification</h1>
      <CertificationForm action={createCertification} submitLabel="Create" />
    </div>
  );
}
