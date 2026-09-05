import type { Metadata } from "next";
import ProjectsHero from "@/components/projects/hero";
import ProjectsSummary from "@/components/projects/summary";
import ProjectsSectors from "@/components/projects/sectors";
import ProjectsSpotlight from "@/components/projects/spotlight";
import ProjectsFilterableGrid from "@/components/projects/filterable-grid";
import ProjectsFaq from "@/components/projects/faq";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getAllProjects, getProjectsPageSettings } from "@/lib/db/projects";
import { getFaqs } from "@/lib/db/contact";

export const metadata: Metadata = {
  title: "Projects | Villa & Commercial Construction · Fayez Amana Construction Company",
  description:
    "A selection of 300+ completed Fayez Amana projects across Saudi Arabia: villa, residential, commercial, hospitality and F&B construction in Jeddah & Makkah.",
};

export default async function ProjectsPage() {
  const locale = await getLocale();
  const [projects, faqs, settings] = await Promise.all([
    getAllProjects(),
    getFaqs("projects", locale),
    getProjectsPageSettings(locale),
  ]);
  return (
    <>
      <ProjectsHero settings={settings.hero} />
      <ProjectsSummary settings={settings.summary} />
      <ProjectsSectors settings={settings.sectors} />
      <ProjectsSpotlight locale={locale} settings={settings.spotlight} />
      <ProjectsFilterableGrid locale={locale} projects={projects} />
      <ProjectsFaq locale={locale} faqs={faqs} />
      <ContactCta locale={locale} />
    </>
  );
}
