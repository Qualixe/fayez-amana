import type { ProcessPageSettings } from "@/lib/db/process";

export default function ProcessBilingualIntro({ settings }: { settings: ProcessPageSettings["intro"] }) {
  return (
    <section className="border-b border-steel py-16">
      <div className="mx-auto grid max-w-full gap-10 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-4">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {settings.kicker}
          </p>

          <p
            dir="rtl"
            className="font-serif text-[clamp(1.25rem,2.4vw,2rem)] leading-[1.18] tracking-[-0.02em] text-bone/90"
          >
            {settings.arabicLede}
          </p>
        </div>

        <p className="text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          {settings.englishLede}
        </p>
      </div>
    </section>
  );
}
