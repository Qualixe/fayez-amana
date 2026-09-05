import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";
import type { ContactSettings } from "@/lib/db/contact";

const mapTitles = {
  en: "BRU CO. office location, Jeddah, Saudi Arabia",
  ar: "موقع مكتب BRU CO.، جدة، المملكة العربية السعودية",
} as const;

export default function ContactOfficeMap({ locale, settings }: { locale: Locale; settings: ContactSettings }) {
  const t = settings.map;

  return (
    <section className="border-b border-steel">
      <div className="mx-auto max-w-full px-6 py-14 sm:px-8 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.eyebrow}
        </Reveal>

        <Reveal
          tag="h2"
          delay={80}
          className="mt-6 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          {t.heading[0]}
          <br />
          {t.heading[1]}
        </Reveal>
      </div>

      <div className="relative h-[60svh] min-h-[380px] w-full border-t border-steel">
        <iframe
          title={mapTitles[locale]}
          src="https://www.google.com/maps?q=21.5996158,39.1377514&z=17&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full grayscale-[0.25] brightness-105"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
          <div className="inline-flex flex-col gap-2 border border-bone/15 bg-void/70 p-6 backdrop-blur-md">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
              {t.caption}
            </span>
            <span className="text-lg font-semibold text-bone">
              {settings.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
