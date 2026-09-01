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

const cards = [
  { label: "Phone", value: "+966 55 535 2526", href: "tel:+966555352526" },
  { label: "Email", value: "info@bru.com.sa", href: "mailto:info@bru.com.sa" },
  {
    label: "Location",
    value: "Jeddah, Saudi Arabia",
    href: "https://maps.google.com/?q=Jeddah,Saudi+Arabia",
    external: true,
  },
];

const socials = [
  { label: "Website", value: "www.bru.com.sa", href: "https://www.bru.com.sa" },
  { label: "Instagram", value: "@bru.co.sa", href: "https://instagram.com/bru.co.sa" },
  { label: "X", value: "@BruCompany", href: "https://x.com/BruCompany" },
];

export default function ContactDetails() {
  return (
    <section className="border-b border-steel" aria-labelledby="contact-details-heading">
      <h2 id="contact-details-heading" className="sr-only">
        Contact information
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
            <span className="text-base font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow">
              {card.value}
            </span>
          </a>
        ))}
        <div className="flex flex-col gap-3 bg-void p-8">
          <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
            Established
          </span>
          <span className="text-base font-semibold text-bone">2000</span>
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
              <span className="text-sm text-dust transition-colors duration-500 group-hover:text-bone">
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
