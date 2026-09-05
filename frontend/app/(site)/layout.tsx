import type { ReactNode } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smoothScroll";
import Preloader from "@/components/preloader";
import { getLocale } from "@/lib/locale";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();

  return (
    <>
      <Preloader />
      <Header locale={locale} />
      <SmoothScroll />
      {children}
      <Footer locale={locale} />
    </>
  );
}
