import type { CSSProperties } from "react";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    items: [
      "Let's Build Together.",
      "Your vision, our craft, since 2000",
      "Building Reference, your first reference in construction, since 2000",
    ],
  },
  ar: {
    items: [
      "لنبنِ معًا.",
      "رؤيتكم، حرفتنا، منذ 2000",
      "مرجع المباني، مرجعك الأول في البناء، منذ 2000",
    ],
  },
} as const;

function MarqueeGroup({ items }: { items: readonly string[] }) {
  return (
    <span className="flex items-center gap-10 whitespace-nowrap">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-azure">&middot;</span>
        </span>
      ))}
    </span>
  );
}

export default function ContactMarquee({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <section className="overflow-hidden py-10">
      <div
        className="marquee-track flex w-max items-center gap-10 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone/25"
        style={{ "--marquee-duration": "48s" } as CSSProperties}
      >
        <MarqueeGroup items={t.items} />
        <MarqueeGroup items={t.items} />
      </div>
    </section>
  );
}
