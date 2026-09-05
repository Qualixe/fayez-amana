"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { uploadImage } from "@/lib/supabase/storage";

const bilingualFields = [
  "hero_eyebrow",
  "hero_title1",
  "hero_title2",
  "hero_lede",
  "inspection_eyebrow",
  "inspection_title",
  "inspection_lede",
  "inspection_phases",
  "compliance_eyebrow",
  "compliance_title",
  "compliance_standards",
  "compliance_request_docs",
  "compliance_certifications_label",
  "compliance_cert_body",
  "compliance_cert_cta",
] as const;

function str(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function saveServicesPageSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string | number> = {};
  for (const key of bilingualFields) {
    payload[key] = str(formData, key);
    payload[`${key}_ar`] = str(formData, `${key}_ar`);
  }
  for (const n of [1, 2, 3, 4]) {
    payload[`quality_metric${n}_value`] = Number(formData.get(`quality_metric${n}_value`) ?? 0) || 0;
    payload[`quality_metric${n}_suffix`] = str(formData, `quality_metric${n}_suffix`);
    payload[`quality_metric${n}_suffix_ar`] = str(formData, `quality_metric${n}_suffix_ar`);
    payload[`quality_metric${n}_label`] = str(formData, `quality_metric${n}_label`);
    payload[`quality_metric${n}_label_ar`] = str(formData, `quality_metric${n}_label_ar`);
  }

  const uploadedHeroImage = await uploadImage(supabase, formData.get("hero_image_file"), "services-page");
  payload.hero_image = uploadedHeroImage ?? str(formData, "hero_image");

  const { error } = await supabase.from("services_page_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/services/page-settings");
  revalidatePath("/services");
}
