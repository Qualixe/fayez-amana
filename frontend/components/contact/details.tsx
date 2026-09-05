import type { Locale } from "@/lib/locale";
import type { ContactSettings } from "@/lib/db/contact";

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

const uiLabels = {
  en: { heading: "Contact information", phone: "Phone", email: "Email", location: "Location", established: "Established", website: "Website", instagram: "Instagram", x: "X" },
  ar: { heading: "معلومات التواصل", phone: "الهاتف", email: "البريد الإلكتروني", location: "الموقع", established: "تأسست", website: "الموقع الإلكتروني", instagram: "إنستغرام", x: "إكس" },
} as const;

export default function ContactDetails({ locale, settings }: { locale: Locale; settings: ContactSettings }) {
  const u = uiLabels[locale];

  const cards = [
    { label: u.phone, value: settings.phone, href: `tel:${settings.phone.replace(/\s+/g, "")}`, dirLtr: true },
    { label: u.email, value: settings.email, href: `mailto:${settings.email}`, dirLtr: true },
    {
      label: u.location,
      value: settings.location,
      href: "https://maps.google.com/?q=Jeddah,Saudi+Arabia",
      external: true,
      dirLtr: false,
    },
  ];

  const socials = [
    { label: u.website, value: settings.websiteDisplay, href: settings.websiteUrl },
    { label: u.instagram, value: settings.instagramDisplay, href: settings.instagramUrl },
    { label: u.x, value: settings.xDisplay, href: settings.xUrl },
  ];

  return (
    <section className="border-b border-steel" aria-labelledby="contact-details-heading">
      <h2 id="contact-details-heading" className="sr-only">
        {u.heading}
      </h2>

      <div className="mx-auto grid max-w-full gap-px bg-steel px-0 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <a
            key={card.label}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noreferrer" : undefined}
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
            {u.established}
          </span>
          <span className="text-base font-semibold text-bone">{settings.establishedYear}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-full gap-px border-t border-steel bg-steel sm:grid-cols-3">
        {socials.map((social) => (
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
