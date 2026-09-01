import type { Metadata } from "next";
import ContactHero from "@/components/contact/hero";
import ContactDetails from "@/components/contact/details";
import ContactConsult from "@/components/contact/consult";
import ContactOfficeMap from "@/components/contact/office-map";
import ContactFaq from "@/components/contact/faq";
import ContactMarquee from "@/components/contact/marquee";

export const metadata: Metadata = {
  title: "Contact | General Contractor in Jeddah & Makkah · Fayez Amana Construction Company",
  description:
    "Contact BRU CO., general contractor in Jeddah & Makkah. Call +966 55 535 2526 or send your project details: structural, MEP, interior and villa construction.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactDetails />
      <ContactConsult />
      <ContactOfficeMap />
      <ContactFaq />
      <ContactMarquee />
    </>
  );
}
