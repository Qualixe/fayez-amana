import type { Metadata } from "next";
import ProjectsHero from "@/components/projects/hero";
import ProjectsSummary from "@/components/projects/summary";
import ProjectsSectors from "@/components/projects/sectors";
import ProjectsSpotlight from "@/components/projects/spotlight";
import ProjectsFilterableGrid from "@/components/projects/filterable-grid";
import ProjectsFaq from "@/components/projects/faq";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  title: "Projects | Villa & Commercial Construction · Fayez Amana Construction Company",
  description:
    "A selection of 300+ completed BRU CO. projects across Saudi Arabia: villa, residential, commercial, hospitality and F&B construction in Jeddah & Makkah.",
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  return (
    <>
      <ProjectsHero locale={locale} />
      <ProjectsSummary locale={locale} />
      <ProjectsSectors locale={locale} />
      <ProjectsSpotlight locale={locale} />
      <ProjectsFilterableGrid locale={locale} />
      <ProjectsFaq locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
