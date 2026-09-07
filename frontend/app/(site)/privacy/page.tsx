import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/reveal";
import { getLocale } from "@/lib/locale";
import { getPrivacyPageSettings, getPrivacySections } from "@/lib/db/privacy";
import { getContactSettings } from "@/lib/db/contact";
import { getHomeSettings } from "@/lib/db/home";

export const metadata: Metadata = {
  title: "Privacy Policy | Fayez Amana Construction Company",
  description: "How Fayez Amana Construction Company collects, uses and protects information submitted through this website.",
};

const ui = {
  en: { company: "Company", email: "Email", location: "Location", contactPage: "Contact page", home: "Home" },
  ar: { company: "الشركة", email: "البريد الإلكتروني", location: "الموقع", contactPage: "صفحة التواصل", home: "الرئيسية" },
} as const;

function SectionBody({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="flex flex-col gap-3">
      {lines.map((line, i) => {
        const dashIndex = line.indexOf(" — ");
        if (dashIndex === -1) {
          return (
            <p key={i} className="text-[1.0625rem] leading-[1.7] text-dust">
              {line}
            </p>
          );
        }
        return (
          <p key={i} className="text-[1.0625rem] leading-[1.7] text-dust">
            <span className="font-medium text-bone">{line.slice(0, dashIndex)}</span>
            {" — "}
            {line.slice(dashIndex + 3)}
          </p>
        );
      })}
    </div>
  );
}

export default async function PrivacyPage() {
  const locale = await getLocale();
  const [settings, sections, contact, home] = await Promise.all([
    getPrivacyPageSettings(locale),
    getPrivacySections(locale),
    getContactSettings(locale),
    getHomeSettings(locale),
  ]);
  const t = ui[locale];

  const anchor = (id: string) => `s-${id}`;
  const withEmail = (text: string) => text.replace("{email}", contact.email);

  return (
    <>
      <header className="relative flex min-h-[50svh] items-end overflow-hidden border-b border-steel">
        <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
          <img src={settings.heroImage} alt="" className="hero-settle h-full w-full object-cover" />
        </div>
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.88) 30%, rgba(11,15,20,0.55) 62%, rgba(11,15,20,0.38) 100%)",
          }}
        />

        <div className="relative w-full max-w-3xl px-6 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
          <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {settings.eyebrow}
          </Reveal>

          <Reveal
            tag="h1"
            delay={80}
            className="mt-6 whitespace-pre-line text-[clamp(3.25rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-bone [text-shadow:0_2px_30px_rgba(11,15,20,0.45)]"
          >
            {settings.heading}
          </Reveal>

          <Reveal tag="p" delay={180} className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-bone/80">
            {settings.intro}
          </Reveal>
        </div>
      </header>

      <section className="border-b border-steel bg-ink">
        <div className="mx-auto w-full max-w-full px-6 py-4 sm:px-8 lg:px-12">
          <p className="max-w-3xl font-mono text-[11px] uppercase tracking-[0.18em]">
            <span className="text-dust">{settings.lastUpdatedLabel}</span> <span className="text-bone">{settings.lastUpdated}</span>
          </p>
        </div>
      </section>

      <section className="border-b border-steel bg-void">
        <div className="mx-auto w-full max-w-full px-6 py-12 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">{settings.tocLabel}</p>
            <ol className="mt-6 flex flex-col gap-2.5">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a
                    href={`#${anchor(section.id)}`}
                    className="flex items-baseline gap-3 text-sm text-dust transition-colors hover:text-azure-glow"
                  >
                    <span className="font-mono text-xs tabular-nums text-azure-glow">{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-void">
        <div className="mx-auto w-full max-w-full px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <ol className="flex flex-col">
              {sections.map((section, index) => (
                <Reveal
                  key={section.id}
                  tag="li"
                  id={anchor(section.id)}
                  delay={Math.min(index * 40, 240)}
                  className="scroll-mt-24 border-t border-steel py-10 first:border-t-0"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="mt-3 text-[1.75rem] font-semibold text-bone">{section.title}</h2>
                  <div className="mt-4">
                    <SectionBody text={section.body} />
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-24">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <img src={settings.heroImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
        </div>

        <div className="relative mx-auto w-full max-w-full px-6 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold tracking-[-0.03em] text-bone">
              {settings.contactHeading}
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-dust">{withEmail(settings.footerNote)}</p>

            <div className="mt-8 grid gap-px border border-steel bg-steel sm:grid-cols-3">
              <div className="flex flex-col gap-1.5 bg-void/80 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash">{t.company}</span>
                <span className="text-sm text-bone">
                  {home.hero.brandLine1} {home.hero.brandLine2}
                </span>
              </div>
              <div className="flex flex-col gap-1.5 bg-void/80 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash">{t.email}</span>
                <a href={`mailto:${contact.email}`} dir="ltr" className="w-fit text-sm text-azure-glow hover:underline">
                  {contact.email}
                </a>
              </div>
              <div className="flex flex-col gap-1.5 bg-void/80 p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ash">{t.location}</span>
                <span className="text-sm text-bone">{contact.location}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
              <Link href="/contact" className="transition-colors hover:text-bone">
                {t.contactPage}
              </Link>
              <span aria-hidden="true">·</span>
              <Link href="/" className="transition-colors hover:text-bone">
                {t.home}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
