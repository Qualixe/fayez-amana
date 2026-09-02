import type { CSSProperties } from "react";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    marqueeItems: [
      "Your vision, our craft, since 2000",
      "EST. 2000 · ISO CERTIFIED · JEDDAH, KSA",
      "300+ Completed Projects",
      "25+ Years of Experience",
      "ISO Certified",
    ],
    navigateLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Process", href: "/process" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    disciplines: [
      "Structural & Construction Works",
      "Architectural Works",
      "Electromechanical Works",
      "Interior Design & Finishing",
    ],
    sectors: ["Residential", "Commercial", "Hospitality", "Healthcare", "F&B", "Sports Facilities"],
    quote: "Your vision our craft, built with precision, delivered with integrity.",
    estLine: "EST. 2000 · ISO CERTIFIED · JEDDAH, KSA",
    navigate: "Navigate",
    disciplinesHeading: "Disciplines",
    sectorsHeading: "Sectors",
    contact: "Contact",
    instagram: "Instagram @bru.co.sa",
    twitter: "Twitter / X @BruCompany",
    location: "Jeddah, Saudi Arabia",
    designedBy: "designed & developed by",
    rights: "All rights reserved.",
    tagline: "Building Reference, your first reference in construction, since 2000",
  },
  ar: {
    marqueeItems: [
      "رؤيتك، حرفتنا، منذ عام 2000",
      "تأسست 2000 · معتمدة ISO · جدة، السعودية",
      "+300 مشروع منجز",
      "+25 عامًا من الخبرة",
      "معتمدة ISO",
    ],
    navigateLinks: [
      { label: "الرئيسية", href: "/" },
      { label: "من نحن", href: "/about" },
      { label: "خدماتنا", href: "/services" },
      { label: "مشاريعنا", href: "/projects" },
      { label: "آلية العمل", href: "/process" },
      { label: "الأخبار", href: "/news" },
      { label: "الوظائف", href: "/careers" },
      { label: "تواصل معنا", href: "/contact" },
    ],
    disciplines: [
      "الأعمال الإنشائية والبناء",
      "الأعمال المعمارية",
      "الأعمال الكهروميكانيكية",
      "التصميم الداخلي والتشطيبات",
    ],
    sectors: ["سكني", "تجاري", "ضيافة", "رعاية صحية", "مطاعم ومقاهٍ", "منشآت رياضية"],
    quote: "رؤيتك، حرفتنا، نبني بدقة، ونسلّم بأمانة.",
    estLine: "تأسست 2000 · معتمدة ISO · جدة، السعودية",
    navigate: "تصفح",
    disciplinesHeading: "التخصصات",
    sectorsHeading: "القطاعات",
    contact: "تواصل معنا",
    instagram: "انستغرام bru.co.sa@",
    twitter: "إكس (تويتر) BruCompany@",
    location: "جدة، السعودية",
    designedBy: "تصميم وتطوير",
    rights: "جميع الحقوق محفوظة.",
    tagline: "مرجع المباني، مرجعك الأول في البناء، منذ عام 2000",
  },
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

export default function Footer({ locale }: { locale: Locale }) {
  const t = content[locale];

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
            <MarqueeGroup items={t.marqueeItems} />
            <MarqueeGroup items={t.marqueeItems} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto grid max-w-full gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:px-12">
        <div className="flex flex-col gap-4">
          <span dir="ltr" className="text-2xl font-bold tracking-[-0.02em] text-bone">
            BRU<span className="text-azure-glow">CO.</span>
          </span>
          <p className="max-w-sm font-serif text-[clamp(1rem,1.5vw,1.25rem)] italic text-bone/90">
            {t.quote}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            {t.estLine}
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-4">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.navigate}
          </h3>
          <ul className="flex flex-col gap-2.5">
            {t.navigateLinks.map((link) => (
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
            {t.disciplines.map((item) => (
              <li key={item} className="text-sm text-dust">
                {item}
              </li>
            ))}
          </ul>

          <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            {t.sectorsHeading}
          </h3>
          <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
            {t.sectors.map((sector) => (
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
              href="tel:+966555352526"
              dir="ltr"
              className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-tight text-bone transition-colors hover:text-azure-glow"
            >
              +966 55 535 2526
            </a>
            <a
              href="mailto:info@bru.com.sa"
              dir="ltr"
              className="w-fit text-sm text-dust transition-colors hover:text-bone"
            >
              info@bru.com.sa
            </a>
          </div>
          <ul className="flex flex-col gap-2.5 text-sm text-dust">
            <li>
              <a
                href="https://www.bru.com.sa"
                target="_blank"
                rel="noreferrer"
                dir="ltr"
                className="transition-colors hover:text-bone"
              >
                www.bru.com.sa
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/bru.co.sa"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-bone"
              >
                {t.instagram}
              </a>
            </li>
            <li>
              <a
                href="https://x.com/BruCompany"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-bone"
              >
                {t.twitter}
              </a>
            </li>
            <li>{t.location}</li>
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
        <span>{t.tagline}</span>
      </div>
    </footer>
  );
}
