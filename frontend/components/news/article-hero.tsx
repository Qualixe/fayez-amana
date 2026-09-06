import Link from "next/link";
import Reveal from "@/components/reveal";
import type { ArticleDetail } from "@/lib/db/news";
import { categoryLabel } from "@/lib/db/news";
import type { Locale } from "@/lib/locale";

const UI = {
  en: { home: "Home", news: "News & Insights", minRead: "min read" },
  ar: { home: "الرئيسية", news: "الأخبار والرؤى", minRead: "دقائق قراءة" },
};

export default function ArticleHero({ article, locale }: { article: ArticleDetail; locale: Locale }) {
  const t = UI[locale];
  const date = new Date(article.publishedAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="relative flex min-h-[56svh] items-end overflow-hidden border-b border-steel">
      <div className="absolute inset-[-8%] overflow-hidden" aria-hidden="true">
        <img src={article.image} alt="" className="hero-settle h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(11,15,20,0.97) 0%, rgba(11,15,20,0.88) 30%, rgba(11,15,20,0.55) 62%, rgba(11,15,20,0.38) 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-6 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:px-12">
        <Reveal
          tag="nav"
          className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-dust"
        >
          <Link href="/" className="hover:text-bone">
            {t.home}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/news" className="hover:text-bone">
            {t.news}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-azure-glow">{categoryLabel(article.category, locale)}</span>
        </Reveal>

        <Reveal
          tag="h1"
          delay={80}
          className="mt-6 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone [text-shadow:0_2px_30px_rgba(11,15,20,0.45)]"
        >
          {article.title}
        </Reveal>

        <Reveal tag="p" delay={220} className="mt-5 text-[1.125rem] leading-relaxed text-bone/80">
          {article.excerpt}
        </Reveal>

        <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-bone/70">
          <span className="text-bone">{article.author}</span>
          <span aria-hidden="true" className="h-3 w-px bg-steel" />
          <span>{date}</span>
          <span aria-hidden="true" className="h-3 w-px bg-steel" />
          <span>
            {article.readMinutes} {t.minRead}
          </span>
        </div>
      </div>
    </header>
  );
}
