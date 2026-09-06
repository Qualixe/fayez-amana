import type { Metadata } from "next";
import CareersHero from "@/components/careers/hero";
import CareersCulture from "@/components/careers/culture";
import CareersBenefits from "@/components/careers/benefits";
import CareersPositions from "@/components/careers/positions";
import ApplicationSection from "@/components/careers/application-section";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import {
  getCareersPageSettings,
  getCultureItems,
  getBenefits,
  getPositions,
  getApplicationFields,
  getTrustItems,
} from "@/lib/db/careers";
import { getTeamCategories } from "@/lib/db/about";
import { getContactSettings } from "@/lib/db/contact";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await getCareersPageSettings(locale);
  return { title: data.seo.title, description: data.seo.description };
}

export default async function CareersPage() {
  const locale = await getLocale();
  const [settings, culture, benefits, positions, breakdown, fields, trust, contactSettings] = await Promise.all([
    getCareersPageSettings(locale),
    getCultureItems(locale),
    getBenefits(locale),
    getPositions(locale),
    getTeamCategories(locale),
    getApplicationFields(locale),
    getTrustItems(locale),
    getContactSettings(locale),
  ]);

  return (
    <>
      <CareersHero settings={settings.hero} />
      <CareersCulture settings={settings.culture} items={culture} breakdown={breakdown} />
      <CareersBenefits settings={settings.benefits} items={benefits} />
      <CareersPositions settings={settings.positions} items={positions} locale={locale} />
      <ApplicationSection
        settings={settings.application}
        positions={positions}
        fields={fields}
        trust={trust}
        locale={locale}
        phone={contactSettings.phone}
        email={contactSettings.email}
      />
      <ContactCta locale={locale} />
    </>
  );
}
