"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { THEME_COLOR_KEYS } from "@/lib/db/site";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

export async function saveThemeSettings(formData: FormData) {
  const supabase = await createClient();

  const payload: Record<string, string> = {};
  for (const key of THEME_COLOR_KEYS) {
    const value = String(formData.get(key) ?? "").trim();
    const column = `color_${key.replace(/-/g, "_")}`;
    if (HEX_RE.test(value)) payload[column] = value;
  }

  const { error } = await supabase.from("theme_settings").upsert({ id: 1, ...payload });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/site/theme-settings");
  revalidatePath("/", "layout");
}
