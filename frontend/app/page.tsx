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

export default async function Home() {
  const locale = await getLocale();
  return (
    <>
    <Hero locale={locale}/>
    <About locale={locale}/>
    <Stats locale={locale}/>
    <Services locale={locale}/>
    <Work locale={locale}/>
    <Clients locale={locale}/>
    <Values locale={locale}/>
    <Process locale={locale}/>
    <ContactCta locale={locale}/>
    </>
  );
}
