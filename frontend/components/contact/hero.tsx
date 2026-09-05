import Reveal from "@/components/reveal";
import type { ContactSettings } from "@/lib/db/contact";

export default function ContactHero({ settings }: { settings: ContactSettings["hero"] }) {
  const t = settings;

  return (
    <header className="relative flex min-h-[68svh] items-end overflow-hidden border-b border-steel">
      <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
        <img
          src={t.image}
          alt=""
          className="hero-settle h-full w-full object-cover"
          style={{ animationDelay: "2.9s" }}
        />
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.86) 26%, rgba(11,15,20,0.5) 58%, rgba(11,15,20,0.34) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, rgba(11,15,20,0) 35%, rgba(11,15,20,0.55) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-full px-6 pb-16 pt-32 sm:px-8 sm:pb-20 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.eyebrow}
        </Reveal>

        <Reveal
          tag="h1"
          delay={80}
          className="mt-7 text-[clamp(2.5rem,7.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.04em] text-bone [text-shadow:0_2px_30px_rgba(11,15,20,0.45)]"
        >
          {t.heading[0]}
          <br />
          {t.heading[1]}
        </Reveal>

        <Reveal
          tag="p"
          delay={220}
          className="mt-8 max-w-2xl text-[clamp(1.0625rem,1.45vw,1.375rem)] leading-[1.55] tracking-[-0.011em] text-bone/80"
        >
          {t.lede}
        </Reveal>
      </div>
    </header>
  );
}
