"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function lines(formData: FormData, key: string) {
  return str(formData, key).split("\n").map((l) => l.trim()).filter(Boolean);
}

export async function saveContactSettings(formData: FormData) {
  const supabase = await createClient();

  const trustItems = [1, 2, 3].map((n) => ({
    title: { en: str(formData, `trust${n}_title_en`), ar: str(formData, `trust${n}_title_ar`) },
    body: { en: str(formData, `trust${n}_body_en`), ar: str(formData, `trust${n}_body_ar`) },
  }));

  const disciplinesEn = lines(formData, "disciplines_en");
  const disciplinesAr = lines(formData, "disciplines_ar");
  const disciplines = disciplinesEn.map((en, i) => ({ en, ar: disciplinesAr[i] ?? "" }));

  const uploadedHeroImage = await uploadImage(supabase, formData.get("hero_image_file"), "contact");
  const heroImage = uploadedHeroImage ?? str(formData, "hero_image");

  const { error } = await supabase.from("contact_settings").upsert({
    id: 1,
    trust_items: trustItems,
    disciplines,
    faq_kicker: str(formData, "faq_kicker"),
    faq_kicker_ar: str(formData, "faq_kicker_ar"),
    faq_headline: str(formData, "faq_headline"),
    faq_headline_ar: str(formData, "faq_headline_ar"),
    faq_lede: str(formData, "faq_lede"),
    faq_lede_ar: str(formData, "faq_lede_ar"),
    hero_eyebrow: str(formData, "hero_eyebrow"),
    hero_eyebrow_ar: str(formData, "hero_eyebrow_ar"),
    hero_heading1: str(formData, "hero_heading1"),
    hero_heading1_ar: str(formData, "hero_heading1_ar"),
    hero_heading2: str(formData, "hero_heading2"),
    hero_heading2_ar: str(formData, "hero_heading2_ar"),
    hero_lede: str(formData, "hero_lede"),
    hero_lede_ar: str(formData, "hero_lede_ar"),
    hero_image: heroImage,
    phone: str(formData, "phone"),
    email: str(formData, "email"),
    location: str(formData, "location"),
    location_ar: str(formData, "location_ar"),
    established_year: str(formData, "established_year"),
    website_url: str(formData, "website_url"),
    website_display: str(formData, "website_display"),
    instagram_url: str(formData, "instagram_url"),
    instagram_display: str(formData, "instagram_display"),
    x_url: str(formData, "x_url"),
    x_display: str(formData, "x_display"),
    map_eyebrow: str(formData, "map_eyebrow"),
    map_eyebrow_ar: str(formData, "map_eyebrow_ar"),
    map_heading1: str(formData, "map_heading1"),
    map_heading1_ar: str(formData, "map_heading1_ar"),
    map_heading2: str(formData, "map_heading2"),
    map_heading2_ar: str(formData, "map_heading2_ar"),
    map_caption: str(formData, "map_caption"),
    map_caption_ar: str(formData, "map_caption_ar"),
    marquee_items: str(formData, "marquee_items"),
    marquee_items_ar: str(formData, "marquee_items_ar"),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/contact/settings");
  revalidatePath("/contact");
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/services");
  revalidatePath("/process");
  revalidatePath("/projects", "layout");
}
