import type { Locale } from "@/lib/locale";

export type LocalizedOption = { value: string; en: string; ar: string };

export function optionLabel(option: LocalizedOption, locale: Locale) {
  return locale === "ar" ? option.ar : option.en;
}
