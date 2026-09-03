import type { Locale } from "@/lib/locale";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 text-ash transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:text-azure-glow"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

const content = {
  en: {
    heading: "Contact information",
    cards: [
      { label: "Phone", value: "+966 55 535 2526", href: "tel:+966555352526", dirLtr: true },
      { label: "Email", value: "info@bru.com.sa", href: "mailto:info@bru.com.sa", dirLtr: true },
      {
        label: "Location",
        value: "Jeddah, Saudi Arabia",
        href: "https://maps.google.com/?q=Jeddah,Saudi+Arabia",
        external: true,
        dirLtr: false,
      },
    ],
    established: "Established",
    socials: [
      { label: "Website", value: "www.bru.com.sa", href: "https://www.bru.com.sa" },
      { label: "Instagram", value: "@bru.co.sa", href: "https://instagram.com/bru.co.sa" },
      { label: "X", value: "@BruCompany", href: "https://x.com/BruCompany" },
    ],
  },
  ar: {
    heading: "معلومات التواصل",
    cards: [
      { label: "الهاتف", value: "+966 55 535 2526", href: "tel:+966555352526", dirLtr: true },
      { label: "البريد الإلكتروني", value: "info@bru.com.sa", href: "mailto:info@bru.com.sa", dirLtr: true },
      {
        label: "الموقع",
        value: "جدة، المملكة العربية السعودية",
        href: "https://maps.google.com/?q=Jeddah,Saudi+Arabia",
        external: true,
        dirLtr: false,
      },
    ],
    established: "تأسست",
    socials: [
      { label: "الموقع الإلكتروني", value: "www.bru.com.sa", href: "https://www.bru.com.sa" },
      { label: "إنستغرام", value: "@bru.co.sa", href: "https://instagram.com/bru.co.sa" },
      { label: "إكس", value: "@BruCompany", href: "https://x.com/BruCompany" },
    ],
  },
} as const;

export default function ContactDetails({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <section className="border-b border-steel" aria-labelledby="contact-details-heading">
      <h2 id="contact-details-heading" className="sr-only">
        {t.heading}
      </h2>

      <div className="mx-auto grid max-w-full gap-px bg-steel px-0 sm:grid-cols-2 lg:grid-cols-4">
        {t.cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={"external" in card && card.external ? "_blank" : undefined}
            rel={"external" in card && card.external ? "noreferrer" : undefined}
            className="group flex flex-col gap-3 bg-void p-8 transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azure-glow"
          >
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              {card.label}
            </span>
            <span
              dir={card.dirLtr ? "ltr" : undefined}
              className={`text-base font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow ${
                card.dirLtr ? (locale === "ar" ? "text-right" : "text-left") : ""
              }`}
            >
              {card.value}
            </span>
          </a>
        ))}
        <div className="flex flex-col gap-3 bg-void p-8">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
            {t.established}
          </span>
          <span className="text-base font-semibold text-bone">2000</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-full gap-px border-t border-steel bg-steel sm:grid-cols-3">
        {t.socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center justify-between gap-4 bg-void px-8 py-6 transition-colors duration-500 hover:bg-ink focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azure-glow"
          >
            <span className="flex flex-col gap-2">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
                {social.label}
              </span>
              <span
                dir="ltr"
                className={`text-sm text-dust transition-colors duration-500 group-hover:text-bone ${
                  locale === "ar" ? "text-right" : "text-left"
                }`}
              >
                {social.value}
              </span>
            </span>
            <ArrowIcon />
          </a>
        ))}
      </div>
    </section>
  );
}
