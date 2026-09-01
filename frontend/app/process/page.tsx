import type { Metadata } from "next";
import ProcessHero from "@/components/process/hero";
import ProcessBilingualIntro from "@/components/process/bilingual-intro";
import ProcessWorkflow from "@/components/process/workflow";
import ProcessStages from "@/components/process/stages";
import ProcessFinishing from "@/components/process/finishing";
import ContactCta from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "Construction Process | The 21 Structural Stages · Fayez Amana Construction Company",
  description:
    "How BRU CO. builds: 21 consecutive structural stages from excavation to a completed structure, governed by approved engineering specifications and inspected throughout.",
};

export default function ProcessPage() {
  return (
    <>
      <ProcessHero />
      <ProcessBilingualIntro />
      <ProcessWorkflow />
      <ProcessStages />
      <ProcessFinishing />
      <ContactCta />
    </>
  );
}
