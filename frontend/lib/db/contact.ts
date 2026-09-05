import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import type { Locale } from "@/lib/locale";
import type { LocalizedOption } from "@/lib/contact-shared";

export { optionLabel, type LocalizedOption } from "@/lib/contact-shared";

export type Faq = { id: string; question: string; answer: string };

export type ContactSettings = {
  trustItems: { title: string; body: string }[];
  disciplines: string[];
  faqKicker: string;
  faqHeadline: string[];
  faqLede: string;
  phone: string;
  email: string;
  location: string;
  establishedYear: string;
  websiteUrl: string;
  websiteDisplay: string;
  instagramUrl: string;
  instagramDisplay: string;
  xUrl: string;
  xDisplay: string;
  marqueeItems: string[];
  hero: { eyebrow: string; heading: string[]; lede: string; image: string };
  map: { eyebrow: string; heading: string[]; caption: string };
};

export const getContactOptions = cache(async function getContactOptions(): Promise<{
  scopeOptions: LocalizedOption[];
  budgetOptions: LocalizedOption[];
  sectorOptions: LocalizedOption[];
}> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contact_options")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;

  const toOption = (row: { value: string; label: string; label_ar: string }): LocalizedOption => ({
    value: row.value,
    en: row.label,
    ar: row.label_ar,
  });

  return {
    scopeOptions: (data ?? []).filter((r) => r.group_name === "scope").map(toOption),
    budgetOptions: (data ?? []).filter((r) => r.group_name === "budget").map(toOption),
    sectorOptions: (data ?? []).filter((r) => r.group_name === "sector").map(toOption),
  };
});

export const getFaqs = cache(async function getFaqs(page: "contact" | "projects", locale: Locale): Promise<Faq[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("page", page)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    question: locale === "ar" ? row.question_ar : row.question,
    answer: locale === "ar" ? row.answer_ar : row.answer,
  }));
});

export const getContactSettings = cache(async function getContactSettings(locale: Locale): Promise<ContactSettings> {
  const supabase = await createClient();
  const { data: row, error } = await supabase.from("contact_settings").select("*").eq("id", 1).maybeSingle();
  if (error) throw error;
  const ar = locale === "ar";
  const s = row ?? {};

  type BilingualPair = { en: string; ar: string };
  const trustItemsRaw: { title: BilingualPair; body: BilingualPair }[] = s.trust_items ?? [];
  const disciplinesRaw: BilingualPair[] = s.disciplines ?? [];

  return {
    trustItems: trustItemsRaw.map((item) => ({
      title: ar ? item.title.ar : item.title.en,
      body: ar ? item.body.ar : item.body.en,
    })),
    disciplines: disciplinesRaw.map((item) => (ar ? item.ar : item.en)),
    faqKicker: (ar ? s.faq_kicker_ar : s.faq_kicker) ?? "",
    faqHeadline: ((ar ? s.faq_headline_ar : s.faq_headline) ?? "").split("\n").filter(Boolean),
    faqLede: (ar ? s.faq_lede_ar : s.faq_lede) ?? "",
    phone: s.phone ?? "",
    email: s.email ?? "",
    location: (ar ? s.location_ar : s.location) ?? "",
    establishedYear: s.established_year ?? "",
    websiteUrl: s.website_url ?? "",
    websiteDisplay: s.website_display ?? "",
    instagramUrl: s.instagram_url ?? "",
    instagramDisplay: s.instagram_display ?? "",
    xUrl: s.x_url ?? "",
    xDisplay: s.x_display ?? "",
    marqueeItems: ((ar ? s.marquee_items_ar : s.marquee_items) ?? "").split("\n").map((l: string) => l.trim()).filter(Boolean),
    hero: {
      eyebrow: (ar ? s.hero_eyebrow_ar : s.hero_eyebrow) ?? "",
      heading: [(ar ? s.hero_heading1_ar : s.hero_heading1) ?? "", (ar ? s.hero_heading2_ar : s.hero_heading2) ?? ""],
      lede: (ar ? s.hero_lede_ar : s.hero_lede) ?? "",
      image: s.hero_image ?? "",
    },
    map: {
      eyebrow: (ar ? s.map_eyebrow_ar : s.map_eyebrow) ?? "",
      heading: [(ar ? s.map_heading1_ar : s.map_heading1) ?? "", (ar ? s.map_heading2_ar : s.map_heading2) ?? ""],
      caption: (ar ? s.map_caption_ar : s.map_caption) ?? "",
    },
  };
});
