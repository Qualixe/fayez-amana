import HeroStageForm from "../hero-stage-form";
import { createHeroStage } from "../actions";

export default function NewHeroStagePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New hero stage</h1>
      <HeroStageForm action={createHeroStage} submitLabel="Create" />
    </div>
  );
}
