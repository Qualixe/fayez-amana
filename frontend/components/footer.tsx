import type { CSSProperties } from "react";
import type { Locale } from "@/lib/locale";

type NavLink = { label: string; href: string };

const ui = {
  en: { navigate: "Navigate", disciplinesHeading: "Disciplines", sectorsHeading: "Sectors", contact: "Contact", instagramWord: "Instagram", twitterWord: "Twitter / X", designedBy: "designed & developed by", rights: "All rights reserved." },
  ar: { navigate: "تصفح", disciplinesHeading: "التخصصات", sectorsHeading: "القطاعات", contact: "تواصل معنا", instagramWord: "انستغرام", twitterWord: "إكس (تويتر)", designedBy: "تصميم وتطوير", rights: "جميع الحقوق محفوظة." },
} as const;

function MarqueeGroup({ items }: { items: readonly string[] }) {
  return (
    <span className="flex items-center gap-10 whitespace-nowrap">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-azure">·</span>
        </span>
      ))}
    </span>
  );
}

export default function Footer({
  locale,
  navLinks,
  disciplines,
  sectors,
  marqueeItems,
  quote,
  estLine,
  tagline,
  logo,
  brandLine1,
  brandLine2,
  phone,
  email,
  websiteUrl,
  websiteDisplay,
  instagramUrl,
  instagramDisplay,
  xUrl,
  xDisplay,
  location,
}: {
  locale: Locale;
  navLinks: NavLink[];
  disciplines: string[];
  sectors: string[];
  marqueeItems: string[];
  quote: string;
  estLine: string;
  tagline: string;
  logo: string;
  brandLine1: string;
  brandLine2: string;
  phone: string;
  email: string;
  websiteUrl: string;
  websiteDisplay: string;
  instagramUrl: string;
  instagramDisplay: string;
  xUrl: string;
  xDisplay: string;
  location: string;
}) {
  const t = ui[locale];

  return (
    <footer className="relative overflow-hidden border-t border-steel bg-ink">
      <div
        className="grid-lines pointer-events-none absolute inset-0 opacity-35"
        aria-hidden="true"
      />

      <div className="relative border-b border-steel py-4">
        <div
          className="relative overflow-hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dust"
          aria-hidden="true"
        >
          <div
            className="marquee-track flex w-max items-center gap-10"
            style={{ "--marquee-duration": "52s" } as CSSProperties}
          >
            <MarqueeGroup items={marqueeItems} />
            <MarqueeGroup items={marqueeItems} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-full gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:px-12">
        <div className="flex flex-col gap-4">
          <img
            src={logo}
            alt={`${brandLine1} ${brandLine2}`}
            className={`h-10 w-auto object-contain ${locale === "ar" ? "self-end" : "self-start"}`}
          />
          <p className="max-w-sm font-serif text-[clamp(1rem,1.5vw,1.25rem)] italic text-bone/90">
            {quote}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            {estLine}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.navigate}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-dust transition-colors hover:text-bone"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.disciplinesHeading}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {disciplines.map((item) => (
              <li key={item} className="text-sm text-dust">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.sectorsHeading}
          </h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
            {sectors.map((sector) => (
              <li
                key={sector}
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust"
              >
                {sector}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.contact}
          </h3>
          <div className="flex flex-col gap-1.5">
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              dir="ltr"
              className={`text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-tight text-bone transition-colors hover:text-azure-glow ${locale === "ar" ? "text-right" : "text-left"}`}
            >
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              dir="ltr"
              className="w-fit text-sm text-dust transition-colors hover:text-bone"
            >
              {email}
            </a>
          </div>
          <ul className="flex flex-col gap-2.5 text-sm text-dust">
            <li>
              <a
                href={websiteUrl}
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="transition-colors hover:text-bone"
              >
                {websiteDisplay}
              </a>
            </li>
            <li>
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-bone"
              >
                {t.instagramWord} {instagramDisplay}
              </a>
            </li>
            <li>
              <a
                href={xUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-bone"
              >
                {t.twitterWord} {xDisplay}
              </a>
            </li>
            <li>{location}</li>
          </ul>
        </div>
      </div>

      <div className="relative mx-auto flex max-w-full flex-col gap-3 border-t border-steel px-6 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dust sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span>
          © {new Date().getFullYear()} {t.designedBy}{" "}
          <a href="https://qualixe.com" target="_blank" rel="noreferrer" className="text-azure-glow hover:underline">
            Qualixe
          </a>
          . {t.rights}
        </span>
        <span>{tagline}</span>
      </div>
    </footer>
  );
}
