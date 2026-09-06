import ArticleHero from "@/components/news/article-hero";
import TableOfContents from "@/components/news/toc";
import ArticleBlocks from "@/components/news/article-blocks";
import ArticleFaqSection from "@/components/news/article-faq";
import { RelatedServices, RelatedProjects } from "@/components/news/related";
import KeepReading from "@/components/news/keep-reading";
import PrevNext from "@/components/news/prev-next";
import type { ArticleDetail as ArticleDetailType, ArticleSummary } from "@/lib/db/news";
import type { Locale } from "@/lib/locale";

export default function ArticleDetail({
  article,
  prev,
  next,
  more,
  locale,
}: {
  article: ArticleDetailType;
  prev?: ArticleSummary;
  next?: ArticleSummary;
  more: ArticleSummary[];
  locale: Locale;
}) {
  return (
    <article>
      <ArticleHero article={article} locale={locale} />

      <div className="border-b border-steel bg-void">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[19rem_minmax(0,44rem)_1fr] lg:gap-14 lg:px-12 lg:py-24">
          <aside className="hidden lg:sticky lg:top-28 lg:block lg:h-fit">
            <TableOfContents blocks={article.blocks} locale={locale} />
          </aside>
          <div className="min-w-0">
            <ArticleBlocks blocks={article.blocks} locale={locale} />
          </div>
          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </div>

      <ArticleFaqSection faqs={article.faqs} locale={locale} />
      <RelatedServices services={article.relatedServices} locale={locale} />
      <RelatedProjects projects={article.relatedProjects} locale={locale} />
      <KeepReading more={more} locale={locale} />
      <PrevNext prev={prev} next={next} locale={locale} />
    </article>
  );
}
