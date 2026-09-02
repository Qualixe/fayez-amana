import type { Metadata } from "next";
import { Manrope, JetBrains_Mono, Instrument_Serif, Tajawal } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smoothScroll";
import Preloader from "@/components/preloader";
import { getLocale } from "@/lib/locale";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Fayez Amana | Construction Company",
  description: "Best Construction Company",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${manrope.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} ${tajawal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Preloader/>
        <Header locale={locale}/>
        <SmoothScroll/>
        {children}
        <Footer locale={locale}/>
        </body>
    </html>
  );
}
