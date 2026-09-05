import FaqForm from "../faq-form";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New FAQ</h1>
      <FaqForm action={createFaq} submitLabel="Create" />
    </div>
  );
}
