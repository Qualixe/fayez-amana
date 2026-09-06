import Link from "next/link";
import Reveal from "@/components/reveal";
import type { ArticleSummary } from "@/lib/db/news";
import type { Locale } from "@/lib/locale";

const UI = { en: { previous: "Previous", next: "Next" }, ar: { previous: "السابق", next: "التالي" } };

export default function PrevNext({
  prev,
  next,
  locale,
}: {
  prev?: ArticleSummary;
  next?: ArticleSummary;
  locale: Locale;
}) {
  if (!prev && !next) return null;
  const t = UI[locale];

  return (
    <section className="border-b border-steel">
      <div className="grid md:grid-cols-2">
        {prev ? (
          <Reveal tag="div" className="md:border-e md:border-steel">
            <Link
              href={`/news/${prev.slug}`}
              className="group flex min-h-[22vh] flex-col justify-end gap-3 p-8 transition-colors duration-500 hover:bg-ink lg:p-12"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">{t.previous}</span>
              <span className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-snug text-bone transition-colors duration-500 group-hover:text-azure-glow">
                {prev.title}
              </span>
            </Link>
          </Reveal>
        ) : (
          <div className="hidden md:block md:border-e md:border-steel" />
        )}
        {next ? (
          <Reveal tag="div" delay={80}>
            <Link
              href={`/news/${next.slug}`}
              className="group flex min-h-[22vh] flex-col justify-end gap-3 p-8 text-end transition-colors duration-500 hover:bg-ink lg:p-12"
            >
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">{t.next}</span>
              <span className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-semibold leading-snug text-bone transition-colors duration-500 group-hover:text-azure-glow">
                {next.title}
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
