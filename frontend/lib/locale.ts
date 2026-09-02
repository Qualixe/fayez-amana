import { cookies } from "next/headers";

export type Locale = "en" | "ar";

export const LOCALE_COOKIE = "locale";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  return store.get(LOCALE_COOKIE)?.value === "ar" ? "ar" : "en";
}

export function pick<T>(locale: Locale, en: T, ar: T): T {
  return locale === "ar" ? ar : en;
}
