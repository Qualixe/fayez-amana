import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, adjacentProjects } from "@/components/projects/data";
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

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.title} | ${project.category} · Fayez Amana Construction Company`,
    description: `${project.teaser} A ${project.category.toLowerCase()} project by BRU CO., general contractor in ${project.location}.`,
  };
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = adjacentProjects(slug);

  return (
    <>
      <ProjectDetailHero project={project} />
      <ProjectDetailSummary project={project} />
      <ProjectDetailBrief project={project} />
      <ProjectDetailScopeDelivered project={project} />
      <ProjectDetailMethod />
      <ProjectDetailCompletedFigure project={project} />
      <ProjectDetailGallery project={project} />
      <ProjectDetailFaq project={project} />
      {prev && next ? <ProjectDetailPrevNext prev={prev} next={next} /> : null}
      <ContactCta />
    </>
  );
}
