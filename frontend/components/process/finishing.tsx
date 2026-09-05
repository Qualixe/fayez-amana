import Reveal from "@/components/reveal";
import { stageImages } from "@/lib/process-shared";
import type { ProcessPageSettings } from "@/lib/db/process";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const finishingGallery = Array.from({ length: 12 }, (_, i) => stageImages[i % stageImages.length]);

export default function ProcessFinishing({ settings }: { settings: ProcessPageSettings["finishing"] }) {
  const t = settings;

  return (
    <section className="border-b border-steel bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-6">
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
              className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
            >
              {t.heading}
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal tag="p" className="text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
              {t.body}
            </Reveal>
            <Reveal tag="div" delay={140}>
              <a
                href="/services#interior-finishing-works"
                className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
              >
                {t.cta}
                <ArrowIcon />
              </a>
            </Reveal>
          </div>
        </div>

        <Reveal tag="ul" delay={100} className="mt-16 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {finishingGallery.map((image, index) => (
            <li key={index} className="group relative aspect-square overflow-hidden bg-slab">
              <img
                src={image}
                alt={t.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
