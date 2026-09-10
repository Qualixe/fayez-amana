import type { CSSProperties, ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smoothScroll";
import Preloader from "@/components/preloader";
import PageTransition from "@/components/page-transition";
import WhatsappButton from "@/components/whatsapp-button";
import { getLocale } from "@/lib/locale";
import { getSiteSettings, getNavLinks, getPreloaderSettings, getPreloaderStages, getThemeSettings } from "@/lib/db/site";
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
    theme,
  ] = await Promise.all([
    getSiteSettings(locale),
    getContactSettings(locale),
    getHomeSettings(locale),
    getProjectsPageSettings(locale),
    getAboutPageSettings(locale),
    getNavLinks(locale),
    getPreloaderSettings(),
    getPreloaderStages(),
    getThemeSettings(),
  ]);

  const menuLinks = allNavLinks.map(({ label, href }) => ({ label, href }));
  const navLinks = allNavLinks.filter((link) => link.showInPrimaryNav).map(({ label, href }) => ({ label, href }));

  // display:contents keeps this div out of the flex layout entirely, while
  // still scoping these CSS variable overrides to every page underneath —
  // the admin dashboard renders outside this tree, so it always keeps the
  // fixed default palette no matter what an admin picks here.
  const themeStyle = {
    "--void": theme.void,
    "--ink": theme.ink,
    "--slab": theme.slab,
    "--concrete": theme.concrete,
    "--steel": theme.steel,
    "--rebar": theme.rebar,
    "--edge": theme.edge,
    "--bone": theme.bone,
    "--paper": theme.paper,
    "--dust": theme.dust,
    "--ash": theme.ash,
    "--azure": theme.azure,
    "--azure-lift": theme["azure-lift"],
    "--azure-glow": theme["azure-glow"],
    "--azure-deep": theme["azure-deep"],
    "--amber": theme.amber,
    "--amber-soft": theme["amber-soft"],
  } as CSSProperties;

  return (
    <div className="contents" style={themeStyle}>
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
      <WhatsappButton url={contactSettings.whatsappUrl} message={contactSettings.whatsappMessage} />
    </div>
  );
}
