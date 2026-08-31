import type { CSSProperties } from "react";
import Reveal from "@/components/reveal";

const clients = [
  { name: "Starbucks", image: "/images/client-img1.avif" },
  { name: "Saudi National Bank", image: "/images/client-img2.avif" },
  { name: "Makarem Hotels", image: "/images/client-img3.avif" },
  { name: "La Fontaine Hotels & Resorts", image: "/images/client-img4.avif" },
  { name: "Diyar Al Khayyal", image: "/images/client-img5.avif" },
  { name: "Manazil", image: "/images/client-img6.avif" },
  { name: "Chef Adnan Yamani", image: "/images/client-img7.avif" },
  { name: "Neamah", image: "/images/client-img8.avif" },
  { name: "Al Mukmal", image: "/images/client-img9.avif" },
  { name: "Thiyab", image: "/images/client-img10.avif" },
  { name: "Saudi Enaya", image: "/images/client-img11.avif" },
];

const highlights = [
  {
    title: "25+ Years of Experience",
    description:
      "Over a quarter century shaping the construction landscape of Saudi Arabia with precision, quality, and continuous innovation.",
  },
  {
    title: "ISO-Certified Quality",
    description:
      "Certified in Quality, Safety, and Environmental Management, ensuring every project meets the highest international standards, without compromise.",
  },
  {
    title: "300+ Completed Projects",
    description:
      "A proven track record spanning residential, commercial, hospitality, and public developments, delivered on time and on budget.",
  },
  {
    title: "Trusted Across All Sectors",
    description:
      "A trusted partner to leading developers, government entities, and private clients, built on long-term relationships and consistent excellence.",
  },
];

const marqueeItems = [
  "Leading Developers",
  "Government Entities",
  "Private Clients",
  "Real Estate Developers",
  "Hospitality Operators",
  "Healthcare Providers",
];

function MarqueeGroup() {
  return (
    <span className="flex items-center gap-10 whitespace-nowrap">
      {marqueeItems.map((item) => (
        <span key={item} className="flex items-center gap-10 whitespace-nowrap">
          <span>{item}</span>
          <span className="text-azure">·</span>
        </span>
      ))}
    </span>
  );
}

export default function Clients() {
  return (
    <section
      id="clients"
      className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28"
    >
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            Valued Clients
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
          >
            Trusted across
            <br />
            every sector.
          </Reveal>

          <Reveal
            tag="p"
            delay={160}
            className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust"
          >
            A trusted partner to leading developers, government entities, and
            private clients, built on long-term relationships and consistent
            excellence.
          </Reveal>
        </div>

        <ul className="mt-14 flex flex-wrap justify-center gap-px bg-steel">
          {clients.map((client, index) => (
            <Reveal
              key={client.name}
              tag="li"
              delay={(index % 4) * 70}
              className="group relative flex basis-[calc(50%-0.5px)] items-center justify-center bg-void p-5 sm:basis-[calc(33.333%-0.667px)] sm:p-7 lg:basis-[calc(25%-0.75px)]"
            >
              <span className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-sm bg-paper p-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 sm:p-7">
                <img
                  src={client.image}
                  alt={client.name}
                  className="h-full w-full object-contain"
                />
              </span>
            </Reveal>
          ))}
        </ul>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-y border-steel py-10">
        <div
          className="relative overflow-hidden text-[clamp(1.5rem,3vw,2.75rem)] font-semibold text-azure/50"
          aria-hidden="true"
        >
          <div
            className="marquee-track flex w-max items-center gap-10"
            style={{ "--marquee-duration": "46s" } as CSSProperties}
          >
            <MarqueeGroup />
            <MarqueeGroup />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              tag="div"
              delay={index * 80}
              className="flex flex-col gap-3 bg-ink p-8"
            >
              <h3 className="text-lg font-semibold text-bone">{highlight.title}</h3>
              <p className="text-sm leading-[1.72] tracking-[-0.004em] text-dust">{highlight.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
