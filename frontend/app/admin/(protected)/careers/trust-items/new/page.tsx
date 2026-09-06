import TrustItemForm from "../trust-item-form";
import { createTrustItem } from "../actions";

export default function NewTrustItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New trust badge</h1>
      <TrustItemForm action={createTrustItem} submitLabel="Create" />
    </div>
  );
}
