import Link from "next/link";
import Reveal from "@/components/reveal";
import type { ArticleSummary } from "@/lib/db/news";
import { categoryLabel } from "@/lib/db/news";
import type { Locale } from "@/lib/locale";

const UI = { en: { eyebrow: "Keep reading" }, ar: { eyebrow: "تابع القراءة" } };

export default function KeepReading({ more, locale }: { more: ArticleSummary[]; locale: Locale }) {
  if (!more.length) return null;
  const t = UI[locale];

  return (
    <section className="border-b border-steel bg-ink py-16 sm:py-20">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal tag="p" className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          {t.eyebrow}
        </Reveal>

        <ul className="mt-10 grid gap-px bg-steel md:grid-cols-3">
          {more.map((article, index) => (
            <Reveal key={article.slug} tag="li" delay={index * 70}>
              <Link
                href={`/news/${article.slug}`}
                className="group flex h-full flex-col gap-3 bg-ink p-8 transition-colors duration-500 hover:bg-slab"
              >
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-azure-glow">
                  {categoryLabel(article.category, locale)}
                </span>
                <span className="text-lg font-semibold text-bone transition-colors duration-500 group-hover:text-azure-glow">
                  {article.title}
                </span>
                <span className="text-[0.9375rem] leading-relaxed text-dust">{article.excerpt}</span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
