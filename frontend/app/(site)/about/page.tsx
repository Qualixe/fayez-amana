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
import {
    getTeamCategories,
    getAboutSettings,
    getFounder,
    getCertifications,
    getClients,
    getAboutPageSettings,
    getAboutMilestones,
    getAboutVisionItems,
} from "@/lib/db/about";
import { getHomeStats, getCoreValues, getCoreValuesSettings, getHomeHighlights, getHomeSettings } from "@/lib/db/home";

export const metadata: Metadata = {
    title: "About | Fayez Amana Construction Company",
    description:
        "Fayez Amana Construction Company is a Jeddah general contractor with 25+ years and 300+ completed projects. ISO-certified, Saudi Contractors Authority classified.",
};

export default async function AboutPage() {
    const locale = await getLocale();
    const [
        teamCategories,
        aboutSettings,
        founder,
        certifications,
        clients,
        homeStats,
        valuesSettings,
        values,
        pageSettings,
        milestones,
        reasons,
        visionItems,
        homeSettings,
    ] = await Promise.all([
        getTeamCategories(locale),
        getAboutSettings(locale),
        getFounder(locale),
        getCertifications(locale),
        getClients(),
        getHomeStats(locale),
        getCoreValuesSettings(locale),
        getCoreValues(locale),
        getAboutPageSettings(locale),
        getAboutMilestones(locale),
        getHomeHighlights(locale),
        getAboutVisionItems(locale),
        getHomeSettings(locale),
    ]);

    return (
        <>
            <AboutHero settings={pageSettings.hero} />
            <Expertise settings={pageSettings.expertise} image={homeSettings.about.image} />
            <Journey settings={pageSettings.journey} milestones={milestones} />
            <Stats stats={homeStats} />
            <WhyChoose settings={pageSettings.why} reasons={reasons} />
            <VisionMission settings={pageSettings.vision} items={visionItems} />
            <ValuesList locale={locale} settings={valuesSettings} values={values} />
            <Founder founder={founder} />
            <Team settings={aboutSettings} breakdown={teamCategories} />
            <Certifications locale={locale} certifications={certifications} />
            <SelectedClients locale={locale} clients={clients} />
            <ContactCta locale={locale} />
        </>
    );
}
