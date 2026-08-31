import type { Metadata } from "next";
import ServicesHero from "@/components/services/hero";
import ServicesDetail from "@/components/services/detail";
import QualityMetrics from "@/components/services/quality-metrics";
import InspectionProcess from "@/components/services/inspection-process";
import Compliance from "@/components/services/compliance";
import ContactCta from "@/components/home/contact-cta";

export const metadata: Metadata = {
  title: "Services | Fayez Amana Construction Company",
  description:
    "Structural & construction, architectural, electromechanical and interior & finishing works, delivered under one roof by BRU CO., a Jeddah general contractor with 25+ years and 300+ completed projects.",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesDetail />
      <QualityMetrics />
      <InspectionProcess />
      <Compliance />
      <ContactCta />
    </>
  );
}
