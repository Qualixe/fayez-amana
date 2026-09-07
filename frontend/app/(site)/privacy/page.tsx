import type { Metadata } from "next";
import Reveal from "@/components/reveal";
import { getLocale } from "@/lib/locale";
import { getPrivacyPageSettings, getPrivacySections } from "@/lib/db/privacy";
import { getContactSettings } from "@/lib/db/contact";
import { getHomeSettings } from "@/lib/db/home";

export const metadata: Metadata = {
  title: "Privacy Policy | Fayez Amana Construction Company",
  description: "How Fayez Amana Construction Company collects, uses and protects information submitted through this website.",
};

export default async function PrivacyPage() {
  const locale = await getLocale();
  const [settings, sections, contact, home] = await Promise.all([
    getPrivacyPageSettings(locale),
    getPrivacySections(locale),
    getContactSettings(locale),
    getHomeSettings(locale),
  ]);

  const anchor = (id: string) => `s-${id}`;

  return (
    <>
      <section className="border-b border-steel bg-void">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {settings.eyebrow}
          </Reveal>
          <Reveal
            tag="h1"
            delay={80}
            className="mt-6 text-[clamp(2.25rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-bone"
          >
            {settings.heading}
          </Reveal>
          <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-dust">
            {settings.intro}
          </Reveal>
          <Reveal tag="p" delay={180} className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            {settings.lastUpdatedLabel} {settings.lastUpdated}
          </Reveal>
        </div>
      </section>

      <section className="border-b border-steel bg-void">
        <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8 lg:px-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">{settings.tocLabel}</p>
          <ol className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${anchor(section.id)}`}
                  className="flex items-baseline gap-3 text-sm text-dust transition-colors hover:text-azure-glow"
                >
                  <span className="font-mono text-xs tabular-nums text-ash">{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-void">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 lg:px-12">
          <ol className="flex flex-col gap-16">
            {sections.map((section, index) => (
              <Reveal
                key={section.id}
                tag="li"
                id={anchor(section.id)}
                delay={Math.min(index * 60, 300)}
                className="grid scroll-mt-24 gap-3 sm:grid-cols-[88px_1fr] sm:gap-6"
              >
                <span className="font-mono text-[2.25rem] font-bold leading-none tabular-nums text-bone/15">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-3">
                  <h2 className="text-xl font-semibold text-bone">{section.title}</h2>
                  <p className="whitespace-pre-line text-[1.0625rem] leading-[1.7] text-dust">{section.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <div className="mt-16 border-t border-steel pt-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">{settings.contactHeading}</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-dust">{settings.footerNote}</p>
            <div className="mt-5 flex flex-col gap-1.5">
              <span className="text-lg font-semibold text-bone">
                {home.hero.brandLine1} {home.hero.brandLine2}
              </span>
              <a href={`mailto:${contact.email}`} dir="ltr" className="w-fit font-mono text-[13px] text-azure-glow hover:underline">
                {contact.email}
              </a>
              <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} dir="ltr" className="w-fit font-mono text-[13px] text-azure-glow hover:underline">
                {contact.phone}
              </a>
              <span className="text-sm text-dust">{contact.location}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
