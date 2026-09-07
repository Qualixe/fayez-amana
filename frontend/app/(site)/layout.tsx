import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smoothScroll";
import Preloader from "@/components/preloader";
import PageTransition from "@/components/page-transition";
import { getLocale } from "@/lib/locale";
import { getSiteSettings, getNavLinks, getPreloaderSettings, getPreloaderStages } from "@/lib/db/site";
import { getContactSettings } from "@/lib/db/contact";
import { getHomeSettings } from "@/lib/db/home";
import { getProjectsPageSettings } from "@/lib/db/projects";
import { getAboutPageSettings } from "@/lib/db/about";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const [
    siteSettings,
    contactSettings,
    homeSettings,
    projectsSettings,
    aboutSettings,
    allNavLinks,
    preloaderSettings,
    preloaderStages,
  ] = await Promise.all([
    getSiteSettings(locale),
    getContactSettings(locale),
    getHomeSettings(locale),
    getProjectsPageSettings(locale),
    getAboutPageSettings(locale),
    getNavLinks(locale),
    getPreloaderSettings(),
    getPreloaderStages(),
  ]);

  const menuLinks = allNavLinks.map(({ label, href }) => ({ label, href }));
  const navLinks = allNavLinks.filter((link) => link.showInPrimaryNav).map(({ label, href }) => ({ label, href }));

  return (
    <>
      <Preloader
        logo={preloaderSettings.logo || siteSettings.headerLogo}
        arabicName={preloaderSettings.arabicName}
        englishName={preloaderSettings.englishName}
        estLine={preloaderSettings.estLine}
        stageLabels={preloaderStages.map((stage) => stage.label)}
      />
      <PageTransition />
      <Header
        locale={locale}
        navLinks={navLinks}
        menuLinks={menuLinks}
        startProject={homeSettings.hero.startProject}
        logo={siteSettings.headerLogo}
        brandLine1={homeSettings.hero.brandLine1}
        brandLine2={homeSettings.hero.brandLine2}
        phone={contactSettings.phone}
        email={contactSettings.email}
        instagramUrl={contactSettings.instagramUrl}
        instagramDisplay={contactSettings.instagramDisplay}
        location={contactSettings.location}
      />
      <SmoothScroll />
      {children}
      <Footer
        locale={locale}
        navLinks={menuLinks}
        disciplines={homeSettings.hero.services}
        sectors={projectsSettings.sectors.list}
        marqueeItems={siteSettings.footerMarquee}
        quote={siteSettings.footerQuote}
        estLine={siteSettings.footerEstLine}
        tagline={aboutSettings.why.tagline}
        logo={siteSettings.footerLogo}
        brandLine1={homeSettings.hero.brandLine1}
        brandLine2={homeSettings.hero.brandLine2}
        phone={contactSettings.phone}
        email={contactSettings.email}
        websiteUrl={contactSettings.websiteUrl}
        websiteDisplay={contactSettings.websiteDisplay}
        instagramUrl={contactSettings.instagramUrl}
        instagramDisplay={contactSettings.instagramDisplay}
        xUrl={contactSettings.xUrl}
        xDisplay={contactSettings.xDisplay}
        location={contactSettings.location}
      />
    </>
  );
}
