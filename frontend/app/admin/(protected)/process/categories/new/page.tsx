import CategoryForm from "../category-form";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New stage category</h1>
      <CategoryForm action={createCategory} submitLabel="Create" />
    </div>
  );
}
