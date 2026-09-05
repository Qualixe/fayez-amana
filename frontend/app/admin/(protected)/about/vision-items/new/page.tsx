import VisionItemForm from "../vision-item-form";
import { createVisionItem } from "../actions";

export default function NewVisionItemPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New vision/mission item</h1>
      <VisionItemForm action={createVisionItem} submitLabel="Create" />
    </div>
  );
}
