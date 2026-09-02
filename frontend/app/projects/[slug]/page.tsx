import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, adjacentProjects, categoryLabel, localize } from "@/components/projects/data";
import ProjectDetailHero from "@/components/projects/detail/hero";
import ProjectDetailSummary from "@/components/projects/detail/summary";
import ProjectDetailBrief from "@/components/projects/detail/brief";
import ProjectDetailScopeDelivered from "@/components/projects/detail/scope-delivered";
import ProjectDetailMethod from "@/components/projects/detail/method";
import ProjectDetailCompletedFigure from "@/components/projects/detail/completed-figure";
import ProjectDetailGallery from "@/components/projects/detail/gallery";
import ProjectDetailFaq from "@/components/projects/detail/faq";
import ProjectDetailPrevNext from "@/components/projects/detail/prev-next";
import ContactCta from "@/components/home/contact-cta";
import { getLocale } from "@/lib/locale";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  const locale = await getLocale();
  const p = localize(project, locale);

  return {
    title: `${p.title} | ${categoryLabel(p.category, locale)} · Fayez Amana Construction Company`,
    description: `${p.teaser} A ${p.category.toLowerCase()} project by BRU CO., general contractor in ${p.location}.`,
  };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const locale = await getLocale();
  const { prev, next } = adjacentProjects(slug);

  return (
    <>
      <ProjectDetailHero project={project} locale={locale} />
      <ProjectDetailSummary project={project} locale={locale} />
      <ProjectDetailBrief project={project} locale={locale} />
      <ProjectDetailScopeDelivered project={project} locale={locale} />
      <ProjectDetailMethod locale={locale} />
      <ProjectDetailCompletedFigure project={project} locale={locale} />
      <ProjectDetailGallery project={project} locale={locale} />
      <ProjectDetailFaq project={project} locale={locale} />
      {prev && next ? <ProjectDetailPrevNext prev={prev} next={next} locale={locale} /> : null}
      <ContactCta locale={locale} />
    </>
  );
}
