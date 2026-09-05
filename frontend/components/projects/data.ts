import type { Locale } from "@/lib/locale";

export type ProjectCategory = "Residential" | "Commercial" | "Hospitality" | "Healthcare" | "F&B";

type ProjectAr = {
  title: string;
  displayTitle: string[];
  subtitle: string;
  teaser: string;
  description: string;
  client?: string;
  location: string;
  scope: string;
  size?: string;
};

export type Project = {
  slug: string;
  title: string;
  displayTitle: string[];
  category: ProjectCategory;
  subtitle: string;
  teaser: string;
  description: string;
  client?: string;
  location: string;
  scope: string;
  size?: string;
  image: string;
  featured?: boolean;
  /** Real per-project gallery images, when set by the admin. Falls back to a synthetic pool in `galleryImages()` when absent. */
  gallery?: string[];
  ar: ProjectAr;
};

export const categoryLabels: Record<ProjectCategory | "All", { en: string; ar: string }> = {
  All: { en: "All", ar: "الكل" },
  Residential: { en: "Residential", ar: "سكني" },
  Commercial: { en: "Commercial", ar: "تجاري" },
  Hospitality: { en: "Hospitality", ar: "ضيافة" },
  Healthcare: { en: "Healthcare", ar: "رعاية صحية" },
  "F&B": { en: "F&B", ar: "مطاعم ومقاهٍ" },
};

export function categoryLabel(category: ProjectCategory | "All", locale: Locale) {
  return categoryLabels[category][locale];
}

export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Healthcare",
  "F&B",
] as const;

// Project records live in the `projects` Supabase table now — see
// lib/db/projects.ts for getAllProjects/getProject/adjacentProjects/
// spotlightProjects, and scripts/seed.ts for the original data (kept there
// verbatim for the one-time import). This file keeps only the shared types
// and pure helpers below, which don't depend on the data source.

export type LocalizedProject = Omit<Project, "ar">;

export function localize(project: Project, locale: Locale): LocalizedProject {
  if (locale === "en") {
    return project;
  }
  const { ar, ...rest } = project;
  return {
    ...rest,
    title: ar.title,
    displayTitle: ar.displayTitle,
    subtitle: ar.subtitle,
    teaser: ar.teaser,
    description: ar.description,
    client: ar.client ?? rest.client,
    location: ar.location,
    scope: ar.scope,
    size: ar.size ?? rest.size,
  };
}

export function projectCity(project: LocalizedProject) {
  return project.location.split(/[,،]/)[0].trim();
}

const DISCIPLINE_SLUGS = [
  {
    slug: "structural-construction-works",
    label: { en: "Structural & Construction Works", ar: "الأعمال الإنشائية والبناء" },
    number: "01",
    keywords: ["structural", "full construction", "red brick"],
  },
  {
    slug: "architectural-works",
    label: { en: "Architectural Works", ar: "الأعمال المعمارية" },
    number: "02",
    keywords: ["architect", "landscape"],
  },
  {
    slug: "electromechanical-works",
    label: { en: "Electromechanical Works", ar: "الأعمال الكهروميكانيكية" },
    number: "03",
    keywords: ["mep", "electromechanical"],
  },
  {
    slug: "interior-finishing-works",
    label: { en: "Interior & Finishing Works", ar: "التصميم الداخلي والتشطيبات" },
    number: "04",
    keywords: ["finishing", "interior", "façade", "joinery", "amenities"],
  },
] as const;

export function scopeDisciplines(project: Project) {
  const scopeLower = project.scope.toLowerCase();
  return DISCIPLINE_SLUGS.filter((d) => d.keywords.some((k) => scopeLower.includes(k)));
}

const GALLERY_POOL = [
  "/images/work-img1.avif",
  "/images/work-img2.avif",
  "/images/work-img3.avif",
  "/images/work-img4.avif",
  "/images/work-img5.avif",
  "/images/work-img6.avif",
  "/images/work-img7.avif",
  "/images/work-img8.avif",
  "/images/service1.avif",
  "/images/service2.avif",
  "/images/service3.avif",
  "/images/service4.avif",
  "/images/spotlight-img1.avif",
  "/images/about-img1.avif",
  "/images/about-hero-banner.avif",
  "/images/why-choose-bg.avif",
];

export function galleryImages(project: Project, count = 6) {
  if (project.gallery && project.gallery.length > 0) {
    if (project.gallery.length >= count) return project.gallery.slice(0, count);
    const padded = [...project.gallery];
    for (let i = 0; padded.length < count; i += 1) {
      padded.push(GALLERY_POOL[i % GALLERY_POOL.length]);
    }
    return padded;
  }

  let seed = 0;
  for (let i = 0; i < project.slug.length; i += 1) seed = (seed * 31 + project.slug.charCodeAt(i)) >>> 0;
  const images = [project.image];
  for (let i = 0; i < count - 1; i += 1) {
    images.push(GALLERY_POOL[(seed + i) % GALLERY_POOL.length]);
  }
  return images;
}
