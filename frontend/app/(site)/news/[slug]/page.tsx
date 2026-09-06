import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleDetail from "@/components/news/article-detail";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getArticle, adjacentArticles } from "@/lib/db/news";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await getArticle(slug, locale);
  if (!article) return {};
  return { title: `${article.title} | Fayez Amana Construction Company`, description: article.excerpt };
}

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const locale = await getLocale();
  const article = await getArticle(slug, locale);
  if (!article) notFound();

  const { prev, next, more } = await adjacentArticles(slug, locale);

  return (
    <>
      <ArticleDetail article={article} prev={prev} next={next} more={more} locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
