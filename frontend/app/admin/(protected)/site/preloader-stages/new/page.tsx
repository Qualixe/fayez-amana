import PreloaderStageForm from "../preloader-stage-form";
import { createPreloaderStage } from "../actions";

export default function NewPreloaderStagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New preloader stage</h1>
      <PreloaderStageForm action={createPreloaderStage} submitLabel="Create" />
    </div>
  );
}
