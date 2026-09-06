"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Reveal from "@/components/reveal";
import type { ArticleSummary } from "@/lib/news-shared";
import { NEWS_CATEGORIES, categoryLabel } from "@/lib/news-shared";
import type { Locale } from "@/lib/locale";

const UI = {
  en: {
    featured: "Featured",
    searchLabel: "Search articles",
    searchPlaceholder: "e.g. villa construction, turnkey, concrete",
    all: "All",
    ofArticles: (n: number, total: number) => `${n} of ${total} articles`,
    minRead: "min read",
    empty: "No articles match your search.",
  },
  ar: {
    featured: "مميز",
    searchLabel: "ابحث في المقالات",
    searchPlaceholder: "مثال: بناء الفلل، تسليم المفتاح، الخرسانة",
    all: "الكل",
    ofArticles: (n: number, total: number) => `${n} من ${total} مقالات`,
    minRead: "دقائق قراءة",
    empty: "لا توجد مقالات مطابقة.",
  },
};

export default function NewsListing({ articles, locale }: { articles: ArticleSummary[]; locale: Locale }) {
  const t = UI[locale];
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const featured = articles.find((a) => a.featured) ?? articles[0];

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    for (const article of articles) map.set(article.category, (map.get(article.category) ?? 0) + 1);
    return map;
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (q && !`${a.title} ${a.excerpt}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [articles, category, query]);

  return (
    <>
      {featured ? (
        <section className="border-b border-steel py-16 lg:py-20">
          <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
            <Reveal tag="span" className="block font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">
              {t.featured}
            </Reveal>
            <Reveal tag="div" delay={80} className="mt-8">
              <Link href={`/news/${featured.slug}`} className="group grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
                <div className="relative aspect-[16/10] overflow-hidden bg-slab lg:aspect-[4/3]">
                  <img
                    src={featured.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-45"
                    style={{
                      background: "linear-gradient(to top, rgba(11,15,20,0.7) 0%, rgba(11,15,20,0.1) 45%, rgba(11,15,20,0.25) 100%)",
                    }}
                  />
                </div>
                <div className="flex flex-col justify-center gap-5">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-azure-glow">
                    {categoryLabel(featured.category, locale)}
                  </span>
                  <h2 className="text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.02em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                    {featured.title}
                  </h2>
                  <p className="max-w-xl text-[1.0625rem] leading-relaxed text-dust">{featured.excerpt}</p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-dust">
                    <span className="text-bone">{featured.author}</span>
                    <span aria-hidden="true" className="h-3 w-px bg-steel" />
                    <span>
                      {featured.readMinutes} {t.minRead}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="border-b border-steel bg-ink py-16 sm:py-20">
        <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
          <Reveal tag="div" className="flex flex-col gap-8 border-b border-steel pb-9">
            <label className="flex flex-col gap-3">
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-dust">{t.searchLabel}</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="h-14 w-full border border-steel bg-void px-5 text-base text-bone outline-offset-4 transition-colors duration-400 placeholder:text-ash hover:border-rebar focus:border-azure"
              />
            </label>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div role="tablist" aria-label="Filter by category" className="-mx-1 flex flex-wrap gap-1.5 px-1">
                {["All", ...NEWS_CATEGORIES].map((c) => {
                  const isActive = category === c;
                  const count = c === "All" ? articles.length : (counts.get(c) ?? 0);
                  return (
                    <button
                      key={c}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setCategory(c)}
                      className={`relative flex min-h-11 items-center gap-2.5 rounded-full border px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.15em] transition-all duration-300 ease-out active:scale-[0.96] ${
                        isActive ? "scale-100 border-azure/0 bg-azure text-white" : "scale-100 border-steel/80 text-dust hover:border-rebar hover:bg-slab/40 hover:text-bone"
                      }`}
                    >
                      <span className="transition-colors duration-300">{c === "All" ? t.all : categoryLabel(c, locale)}</span>
                      <span
                        className={`font-mono text-[9px] tabular-nums transition-colors duration-300 ${isActive ? "text-white/75" : "text-dust/70"}`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-dust">
                {t.ofArticles(filtered.length, articles.length)}
              </p>
            </div>
          </Reveal>

          {filtered.length ? (
            <ul key={`${category}-${query}`} className="fade-up-in mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((article) => (
                <li key={article.slug}>
                  <Link href={`/news/${article.slug}`} className="group flex h-full flex-col">
                    <div className="relative aspect-[3/2] overflow-hidden bg-slab">
                      <img
                        src={article.image}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-90 transition-opacity duration-700 group-hover:opacity-60"
                        style={{
                          background: "linear-gradient(to top, rgba(11,15,20,0.62) 0%, rgba(11,15,20,0.12) 34%, rgba(11,15,20,0.28) 100%)",
                        }}
                      />
                      <span className="absolute start-4 top-4 border border-bone/15 bg-void/55 px-3 py-2 font-mono text-[0.625rem] uppercase tracking-[0.18em] text-azure-glow backdrop-blur-md">
                        {categoryLabel(article.category, locale)}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col pt-6">
                      <h3 className="text-lg font-semibold leading-snug text-bone transition-colors duration-500 group-hover:text-azure-glow">
                        {article.title}
                      </h3>
                      <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed text-dust">{article.excerpt}</p>
                      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-steel/70 pt-4 font-mono text-[0.6875rem] uppercase tracking-[0.15em] text-dust">
                        <time dateTime={article.publishedAt}>
                          {new Date(article.publishedAt).toLocaleDateString(locale === "ar" ? "ar-SA" : "en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        </time>
                        <span aria-hidden="true" className="h-3 w-px bg-steel" />
                        <span>
                          {article.readMinutes} {t.minRead}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p key={`${category}-${query}`} className="fade-up-in mt-10 text-sm text-dust">
              {t.empty}
            </p>
          )}
        </div>
      </section>
    </>
  );
}
