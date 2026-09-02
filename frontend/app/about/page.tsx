import type { Metadata } from "next";
import AboutHero from "@/components/about/hero";
import Expertise from "@/components/about/expertise";
import Journey from "@/components/about/journey";
import Stats from "@/components/home/stats";
import WhyChoose from "@/components/about/why-choose";
import VisionMission from "@/components/about/vision-mission";
import ValuesList from "@/components/about/values-list";
import Founder from "@/components/about/founder";
import Team from "@/components/about/team";
import Certifications from "@/components/about/certifications";
import SelectedClients from "@/components/about/selected-clients";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
    title: "About | Fayez Amana Construction Company",
    description:
        "BRU CO. (Building Reference United) is a Jeddah general contractor with 25+ years and 300+ completed projects. ISO-certified, Saudi Contractors Authority classified.",
};

export default async function AboutPage() {
    const locale = await getLocale();
    return (
        <>
            <AboutHero locale={locale} />
            <Expertise locale={locale} />
            <Journey locale={locale} />
            <Stats locale={locale} />
            <WhyChoose locale={locale} />
            <VisionMission locale={locale} />
            <ValuesList locale={locale} />
            <Founder locale={locale} />
            <Team locale={locale} />
            <Certifications locale={locale} />
            <SelectedClients locale={locale} />
            <ContactCta locale={locale} />
        </>
    );
}
