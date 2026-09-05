import type { Metadata } from "next";
import ContactHero from "@/components/contact/hero";
import ContactDetails from "@/components/contact/details";
import ContactConsult from "@/components/contact/consult";
import ContactOfficeMap from "@/components/contact/office-map";
import ContactFaq from "@/components/contact/faq";
import ContactMarquee from "@/components/contact/marquee";
import { getLocale } from "@/lib/locale";
import { getContactOptions, getContactSettings, getFaqs } from "@/lib/db/contact";

export const metadata: Metadata = {
  title: "Contact | General Contractor in Jeddah & Makkah · Fayez Amana Construction Company",
  description:
    "Contact Fayez Amana, general contractor in Jeddah & Makkah. Call +966 55 535 2526 or send your project details: structural, MEP, interior and villa construction.",
};

export default async function ContactPage() {
  const locale = await getLocale();
  const [options, settings, faqs] = await Promise.all([
    getContactOptions(),
    getContactSettings(locale),
    getFaqs("contact", locale),
  ]);

  return (
    <>
      <ContactHero settings={settings.hero} />
      <ContactDetails locale={locale} settings={settings} />
      <ContactConsult
        locale={locale}
        disciplines={settings.disciplines}
        scopeOptions={options.scopeOptions}
        budgetOptions={options.budgetOptions}
        sectorOptions={options.sectorOptions}
        trustItems={settings.trustItems}
      />
      <ContactOfficeMap locale={locale} settings={settings} />
      <ContactFaq kicker={settings.faqKicker} headline={settings.faqHeadline} lede={settings.faqLede} faqs={faqs} />
      <ContactMarquee items={settings.marqueeItems} />
    </>
  );
}
