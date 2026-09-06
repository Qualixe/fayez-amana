import CultureForm from "../culture-form";
import { createCultureItem } from "../actions";

export default function NewCultureItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New culture item</h1>
      <CultureForm action={createCultureItem} submitLabel="Create" />
    </div>
  );
}
