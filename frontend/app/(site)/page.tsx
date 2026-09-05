import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Stats from "@/components/home/stats";
import Services from "@/components/home/services";
import Work from "@/components/home/work";
import Clients from "@/components/home/clients";
import Values from "@/components/home/values";
import Process from "@/components/home/process";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import {
  getHomeSettings,
  getHeroStages,
  getHomeStats,
  getHomeHighlights,
  getCoreValues,
  getCoreValuesSettings,
} from "@/lib/db/home";
import { getAllServices } from "@/lib/db/services";
import { getAllProjects } from "@/lib/db/projects";
import { getClients } from "@/lib/db/about";
import { getWorkflowPhases } from "@/lib/db/process";

export default async function Home() {
  const locale = await getLocale();
  const [settings, heroStages, homeStats, services, allProjects, clients, highlights, valuesSettings, values, phases] =
    await Promise.all([
      getHomeSettings(locale),
      getHeroStages(locale),
      getHomeStats(locale),
      getAllServices(locale),
      getAllProjects(),
      getClients(),
      getHomeHighlights(locale),
      getCoreValuesSettings(locale),
      getCoreValues(locale),
      getWorkflowPhases(),
    ]);

  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <>
    <Hero locale={locale} settings={settings.hero} stages={heroStages} stats={homeStats}/>
    <About settings={settings.about}/>
    <Stats stats={homeStats}/>
    <Services settings={settings.services} services={services}/>
    <Work locale={locale} settings={settings.work} projects={featuredProjects}/>
    <Clients settings={settings.clients} clients={clients} highlights={highlights}/>
    <Values locale={locale} settings={valuesSettings} values={values}/>
    <Process locale={locale} settings={settings.process} phases={phases}/>
    <ContactCta locale={locale}/>
    </>
  );
}
