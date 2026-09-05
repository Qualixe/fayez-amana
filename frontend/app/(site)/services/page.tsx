import type { Metadata } from "next";
import ServicesHero from "@/components/services/hero";
import ServicesDetail from "@/components/services/detail";
import QualityMetrics from "@/components/services/quality-metrics";
import InspectionProcess from "@/components/services/inspection-process";
import Compliance from "@/components/services/compliance";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getAllServices, getServicesPageSettings, getInspectionSteps } from "@/lib/db/services";
import { getHomeSettings } from "@/lib/db/home";

export const metadata: Metadata = {
  title: "Services | Fayez Amana Construction Company",
  description:
    "Structural & construction, architectural, electromechanical and interior & finishing works, delivered under one roof by BRU CO., a Jeddah general contractor with 25+ years and 300+ completed projects.",
};

export default async function ServicesPage() {
  const locale = await getLocale();
  const [services, settings, inspectionSteps, homeSettings] = await Promise.all([
    getAllServices(locale),
    getServicesPageSettings(locale),
    getInspectionSteps(locale),
    getHomeSettings(locale),
  ]);
  return (
    <>
      <ServicesHero settings={settings.hero} disciplines={homeSettings.hero.services} />
      <ServicesDetail locale={locale} services={services} />
      <QualityMetrics counters={settings.qualityMetrics} />
      <InspectionProcess settings={settings.inspection} steps={inspectionSteps} />
      <Compliance settings={settings.compliance} />
      <ContactCta locale={locale} />
    </>
  );
}
