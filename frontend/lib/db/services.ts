import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

export type ServiceGalleryItem = { slug: string; title: string; image: string };

export type Service = {
  id: string;
  slug: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string;
  gallery: ServiceGalleryItem[];
};

type ServiceRow = {
  id: string;
  slug: string;
  number: string;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  capabilities: string[];
  capabilities_ar: string[];
  image: string;
  service_gallery: {
    sort_order: number;
    projects: { slug: string; title: string; title_ar: string | null; image: string } | null;
  }[];
};

export const getAllServices = cache(async function getAllServices(locale: Locale): Promise<Service[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services")
    .select("*, service_gallery(sort_order, projects(slug, title, title_ar, image))")
    .order("sort_order", { ascending: true });
  if (error) throw error;

  return ((data ?? []) as unknown as ServiceRow[]).map((row) => ({
    id: row.id,
    slug: row.slug,
    number: row.number,
    title: locale === "ar" ? row.title_ar : row.title,
    description: locale === "ar" ? row.description_ar : row.description,
    capabilities: locale === "ar" ? row.capabilities_ar : row.capabilities,
    image: row.image,
    gallery: (row.service_gallery ?? [])
      .filter((sg) => sg.projects)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((sg) => ({
        slug: sg.projects!.slug,
        title: locale === "ar" ? (sg.projects!.title_ar ?? sg.projects!.title) : sg.projects!.title,
        image: sg.projects!.image,
      })),
  }));
});

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type ServicesPageSettings = {
  hero: { eyebrow: string; title1: string; title2: string; lede: string; image: string };
  inspection: { eyebrow: string; title: string; lede: string; phases: string[] };
  qualityMetrics: { value: number; suffix: string; label: string }[];
  compliance: {
    eyebrow: string;
    title: string;
    standards: string[];
    requestDocs: string;
    certificationsLabel: string;
    certBody: string;
    certCta: string;
  };
};

export const getServicesPageSettings = cache(async function getServicesPageSettings(
  locale: Locale,
): Promise<ServicesPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("services_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);
  const lines = (value: string) => value.split("\n").map((l) => l.trim()).filter(Boolean);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      title1: p("hero_title1"),
      title2: p("hero_title2"),
      lede: p("hero_lede"),
      image: (s.hero_image as string) ?? "",
    },
    inspection: {
      eyebrow: p("inspection_eyebrow"),
      title: p("inspection_title"),
      lede: p("inspection_lede"),
      phases: lines(p("inspection_phases")),
    },
    qualityMetrics: [1, 2, 3, 4].map((n) => ({
      value: (s[`quality_metric${n}_value`] as number) ?? 0,
      suffix: p(`quality_metric${n}_suffix`),
      label: p(`quality_metric${n}_label`),
    })),
    compliance: {
      eyebrow: p("compliance_eyebrow"),
      title: p("compliance_title"),
      standards: lines(p("compliance_standards")),
      requestDocs: p("compliance_request_docs"),
      certificationsLabel: p("compliance_certifications_label"),
      certBody: p("compliance_cert_body"),
      certCta: p("compliance_cert_cta"),
    },
  };
});

export type InspectionStep = { title: string; body: string };

export const getInspectionSteps = cache(async function getInspectionSteps(locale: Locale): Promise<InspectionStep[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("services_inspection_steps")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    title: ar ? row.title_ar : row.title,
    body: ar ? row.body_ar : row.body,
  }));
});
