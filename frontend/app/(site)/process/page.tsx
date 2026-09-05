import type { Metadata } from "next";
import ProcessHero from "@/components/process/hero";
import ProcessBilingualIntro from "@/components/process/bilingual-intro";
import ProcessWorkflow from "@/components/process/workflow";
import ProcessStages from "@/components/process/stages";
import ProcessFinishing from "@/components/process/finishing";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getStages, getStageCategories, getWorkflowPhases, getProcessPageSettings } from "@/lib/db/process";

export const metadata: Metadata = {
  title: "Construction Process | The 21 Structural Stages · Fayez Amana Construction Company",
  description:
    "How BRU CO. builds: 21 consecutive structural stages from excavation to a completed structure, governed by approved engineering specifications and inspected throughout.",
};

export default async function ProcessPage() {
  const locale = await getLocale();
  const [stages, categories, phases, settings] = await Promise.all([
    getStages(),
    getStageCategories(),
    getWorkflowPhases(),
    getProcessPageSettings(locale),
  ]);

  return (
    <>
      <ProcessHero settings={settings.hero} />
      <ProcessBilingualIntro settings={settings.intro} />
      <ProcessWorkflow locale={locale} phases={phases} />
      <ProcessStages locale={locale} stages={stages} categories={categories} />
      <ProcessFinishing settings={settings.finishing} />
      <ContactCta locale={locale} />
    </>
  );
}
