import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";

function pick(row: Record<string, unknown>, key: string, ar: boolean): string {
  const value = row[ar ? `${key}_ar` : key];
  return typeof value === "string" ? value : "";
}

export type ApplicationFormCopy = {
  nameLabel: string;
  emailLabel: string;
  positionLabel: string;
  cvLabel: string;
  cvHint: string;
  sendLabel: string;
  sendingLabel: string;
  callLabel: string;
  footerNote: string;
  validationError: string;
  sendError: string;
  networkError: string;
  successHeading: string;
  successBody: string;
};

export type CareersPageSettings = {
  hero: { eyebrow: string; title1: string; title2: string; lede: string; image: string; meta: { label: string; value: string }[] };
  culture: { eyebrow: string; title: string; image: string };
  benefits: { eyebrow: string; title: string };
  positions: { eyebrow: string; title: string; lede: string };
  application: { eyebrow: string; title: string; note: string; form: ApplicationFormCopy };
  seo: { title: string; description: string };
};

export const getCareersPageSettings = cache(async function getCareersPageSettings(
  locale: Locale,
): Promise<CareersPageSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const s = row ?? {};
  const ar = locale === "ar";
  const p = (key: string) => pick(s, key, ar);

  return {
    hero: {
      eyebrow: p("hero_eyebrow"),
      title1: p("hero_title1"),
      title2: p("hero_title2"),
      lede: p("hero_lede"),
      image: (s.hero_image as string) ?? "",
      meta: [1, 2, 3, 4].map((n) => ({ label: p(`meta${n}_label`), value: p(`meta${n}_value`) })),
    },
    culture: { eyebrow: p("culture_eyebrow"), title: p("culture_title"), image: (s.culture_image as string) ?? "" },
    benefits: { eyebrow: p("benefits_eyebrow"), title: p("benefits_title") },
    positions: { eyebrow: p("positions_eyebrow"), title: p("positions_title"), lede: p("positions_lede") },
    application: {
      eyebrow: p("application_eyebrow"),
      title: p("application_title"),
      note: p("application_note"),
      form: {
        nameLabel: p("form_name_label"),
        emailLabel: p("form_email_label"),
        positionLabel: p("form_position_label"),
        cvLabel: p("form_cv_label"),
        cvHint: p("form_cv_hint"),
        sendLabel: p("form_send_label"),
        sendingLabel: p("form_sending_label"),
        callLabel: p("form_call_label"),
        footerNote: p("form_footer_note"),
        validationError: p("form_validation_error"),
        sendError: p("form_send_error"),
        networkError: p("form_network_error"),
        successHeading: p("form_success_heading"),
        successBody: p("form_success_body"),
      },
    },
    seo: { title: p("seo_title"), description: p("seo_description") },
  };
});

export type CultureItem = { id: string; title: string; body: string };

export const getCultureItems = cache(async function getCultureItems(locale: Locale): Promise<CultureItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("career_culture_items").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id,
    title: ar ? row.title_ar : row.title,
    body: ar ? row.body_ar : row.body,
  }));
});

export type Benefit = { id: string; body: string };

export const getBenefits = cache(async function getBenefits(locale: Locale): Promise<Benefit[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("career_benefits").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({ id: row.id, body: ar ? row.body_ar : row.body }));
});

export type TrustItem = { id: string; title: string; body: string };

export const getTrustItems = cache(async function getTrustItems(locale: Locale): Promise<TrustItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("career_trust_items").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id,
    title: ar ? row.title_ar : row.title,
    body: ar ? row.body_ar : row.body,
  }));
});

export type ApplicationFieldType = "text" | "email" | "tel" | "textarea" | "select";

export type ApplicationField = {
  id: string;
  key: string;
  type: ApplicationFieldType;
  label: string;
  placeholder: string;
  options: string[];
  required: boolean;
};

export const getApplicationFields = cache(async function getApplicationFields(locale: Locale): Promise<ApplicationField[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("career_application_fields")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id,
    key: row.field_key,
    type: row.field_type as ApplicationFieldType,
    label: ar ? row.label_ar : row.label,
    placeholder: ar ? row.placeholder_ar : row.placeholder,
    options: ((ar ? row.options_ar : row.options) as string)
      .split("\n")
      .map((o) => o.trim())
      .filter(Boolean),
    required: row.required,
  }));
});

export type Position = {
  id: string;
  title: string;
  discipline: string;
  employmentType: string;
  location: string;
  teamSize: number;
};

export const getPositions = cache(async function getPositions(locale: Locale): Promise<Position[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from("career_positions").select("*").order("sort_order", { ascending: true });
  if (error) throw error;
  const ar = locale === "ar";
  return (data ?? []).map((row) => ({
    id: row.id,
    title: ar ? row.title_ar : row.title,
    discipline: ar ? row.discipline_ar : row.discipline,
    employmentType: ar ? row.employment_type_ar : row.employment_type,
    location: ar ? row.location_ar : row.location,
    teamSize: row.team_size,
  }));
});
