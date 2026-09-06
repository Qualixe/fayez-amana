import type { Metadata } from "next";
import LocationPageContent from "@/components/locations/location-page";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getLocationPage } from "@/lib/db/locations";
import { spotlightProjects } from "@/lib/db/projects";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const data = await getLocationPage("jeddah", locale);
  return { title: data.seo.title, description: data.seo.description };
}

export default async function ConstructionCompanyJeddahPage() {
  const locale = await getLocale();
  const [data, projects] = await Promise.all([getLocationPage("jeddah", locale), spotlightProjects()]);

  return (
    <>
      <LocationPageContent data={data} projects={projects} locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
