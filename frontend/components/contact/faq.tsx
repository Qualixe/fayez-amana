import Reveal from "@/components/reveal";
import { faqIntro, faqs } from "@/components/contact/data";
import type { Locale } from "@/lib/locale";

export default function ContactFaq({ locale }: { locale: Locale }) {
  return (
    <section className="border-t border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {faqIntro.kicker[locale]}
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            {faqIntro.headline[locale].map((line, index) => (
              <span key={index} className="block">
                {line}
              </span>
            ))}
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            {faqIntro.lede[locale]}
          </Reveal>
        </div>

        <ul className="flex flex-col border-t border-steel">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q.en} tag="li" delay={index * 60} className="border-b border-steel">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-bone transition-colors duration-400 group-open:text-azure-glow">
                    {faq.q[locale]}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative grid h-9 w-9 shrink-0 place-items-center border border-steel text-azure-glow transition-colors duration-400 group-hover:border-azure"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-400 group-open:rotate-90 group-open:scale-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pe-14 text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
                  {faq.a[locale]}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
