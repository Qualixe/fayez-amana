import Reveal from "@/components/reveal";
import type { ArticleFaq } from "@/lib/db/news";
import type { Locale } from "@/lib/locale";

const UI = { en: { eyebrow: "Questions", title: "Frequently asked." }, ar: { eyebrow: "أسئلة", title: "أسئلة شائعة." } };

export default function ArticleFaqSection({ faqs, locale }: { faqs: ArticleFaq[]; locale: Locale }) {
  if (!faqs.length) return null;
  const t = UI[locale];

  return (
    <section className="border-b border-steel py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.eyebrow}
        </Reveal>
        <Reveal tag="h2" delay={80} className="mt-6 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone">
          {t.title}
        </Reveal>

        <ul className="mt-10 flex flex-col border-t border-steel">
          {faqs.map((faq, index) => (
            <Reveal key={faq.id} tag="li" delay={index * 60} className="border-b border-steel">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-bone transition-colors duration-400 group-open:text-azure-glow">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative grid h-9 w-9 shrink-0 place-items-center border border-steel text-azure-glow transition-colors duration-400 group-hover:border-azure"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-400 group-open:rotate-90 group-open:scale-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pe-14 text-[0.9375rem] leading-[1.72] text-dust">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
