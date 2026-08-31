import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Stats from "@/components/home/stats";
import Services from "@/components/home/services";
import Work from "@/components/home/work";
import Clients from "@/components/home/clients";
import Values from "@/components/home/values";
import Process from "@/components/home/process";
import ContactCta from "@/components/home/contact-cta";

export default function Home() {
  return (
    <>
    <Hero/>
    <About/>
    <Stats/>
    <Services/>
    <Work/>
    <Clients/>
    <Values/>
    <Process/>
    <ContactCta/>
    </>
  );
}
