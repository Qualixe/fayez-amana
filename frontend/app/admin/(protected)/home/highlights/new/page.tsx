import HighlightForm from "../highlight-form";
import { createHighlight } from "../actions";

export default function NewHighlightPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New highlight</h1>
      <HighlightForm action={createHighlight} submitLabel="Create" />
    </div>
  );
}
