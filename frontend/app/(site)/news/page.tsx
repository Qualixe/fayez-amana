import type { Metadata } from "next";
import NewsHero from "@/components/news/hero";
import NewsListing from "@/components/news/listing";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";
import { getNewsPageSettings, getAllArticles, categoryLabel } from "@/lib/db/news";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const settings = await getNewsPageSettings(locale);
  return { title: settings.seo.title, description: settings.seo.description };
}

export default async function NewsPage() {
  const locale = await getLocale();
  const [settings, articles] = await Promise.all([getNewsPageSettings(locale), getAllArticles(locale)]);

  const categories = Array.from(new Set(articles.map((a) => a.category)));
  const categorySummary = categories.map((c) => categoryLabel(c, locale)).join(" · ");

  return (
    <>
      <NewsHero settings={settings} articleCount={articles.length} categorySummary={categorySummary} locale={locale} />
      <NewsListing articles={articles} locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
