import type { CSSProperties } from "react";

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

export default function ContactMarquee({ items }: { items: string[] }) {
  return (
    <section className="overflow-hidden py-10">
      <div
        className="marquee-track flex w-max items-center gap-10 text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone/25"
        style={{ "--marquee-duration": "48s" } as CSSProperties}
      >
        <MarqueeGroup items={items} />
        <MarqueeGroup items={items} />
      </div>
    </section>
  );
}
