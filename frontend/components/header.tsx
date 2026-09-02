"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    navLinks: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Process", href: "/process" },
      { label: "Contact", href: "/contact" },
    ],
    menuLinks: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Projects", href: "/projects" },
      { label: "Process", href: "/process" },
      { label: "News", href: "/news" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    startProject: "Start a Project",
    switchLabel: "Switch to العربية",
    switchGlyph: "ع",
    menuAria: "Full menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    instagram: "Instagram @bru.co.sa",
    location: "Jeddah, Saudi Arabia",
  },
  ar: {
    navLinks: [
      { label: "من نحن", href: "/about" },
      { label: "خدماتنا", href: "/services" },
      { label: "مشاريعنا", href: "/projects" },
      { label: "آلية العمل", href: "/process" },
      { label: "تواصل معنا", href: "/contact" },
    ],
    menuLinks: [
      { label: "الرئيسية", href: "/" },
      { label: "من نحن", href: "/about" },
      { label: "خدماتنا", href: "/services" },
      { label: "مشاريعنا", href: "/projects" },
      { label: "آلية العمل", href: "/process" },
      { label: "الأخبار", href: "/news" },
      { label: "الوظائف", href: "/careers" },
      { label: "تواصل معنا", href: "/contact" },
    ],
    startProject: "ابدأ مشروعك",
    switchLabel: "Switch to English",
    switchGlyph: "EN",
    menuAria: "القائمة الكاملة",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    instagram: "انستغرام bru.co.sa@",
    location: "جدة، السعودية",
  },
} as const;

export default function Header({ locale }: { locale: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const t = content[locale];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function toggleLocale() {
    const next: Locale = locale === "ar" ? "en" : "ar";
    document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;
    // A full reload (rather than router.refresh()) guarantees every client
    // component remounts with the new locale, instead of some keeping
    // state/effects initialized from the old one.
    window.location.reload();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-100 transition-[background-color,border-color] duration-500 ease-out ${
        scrolled || menuOpen
          ? "border-b border-edge bg-void/50"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      {!scrolled && !menuOpen && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,8,11,0.85), transparent)",
          }}
        />
      )}

      <div className="relative mx-auto flex h-20 max-w-full items-center justify-between gap-6 px-6 sm:px-8 lg:px-12 xl:grid xl:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          aria-label="BRU CO. home"
          className="shrink-0 justify-self-start"
        >
          <span className="text-2xl font-bold tracking-[-0.02em] text-bone">
            BRU<span className="text-azure-glow">CO.</span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-9 justify-self-center xl:flex"
        >
          {t.navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`group relative py-1 font-mono text-[12.5px] uppercase tracking-[0.13em] transition-colors duration-300 ${
                  isActive ? "text-azure-glow" : "text-dust hover:text-bone"
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-x-0 -bottom-1 h-px origin-left bg-azure-glow transition-transform duration-500 ease-out ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 justify-self-end">
          <a
            href="tel:+966555352526"
            dir="ltr"
            className="hidden font-mono text-[12px] tracking-[0.14em] text-dust transition-colors hover:text-azure-glow 2xl:block"
          >
            +966 55 535 2526
          </a>

          <a
            href="/contact"
            className="hidden min-h-[44px] items-center justify-center px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white transition-[filter] duration-500 hover:brightness-110 sm:inline-flex"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
            }}
          >
            {t.startProject}
          </a>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.switchLabel}
            title={t.switchLabel}
            className="grid h-11 w-11 shrink-0 place-items-center border border-steel text-bone transition-colors duration-300 hover:border-azure hover:text-azure-glow"
          >
            <span className="text-sm font-semibold leading-none">{t.switchGlyph}</span>
          </button>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((open) => !open)}
            className="group relative z-110 grid h-11 w-11 shrink-0 place-items-center border border-steel transition-colors duration-300 hover:border-azure"
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-bone transition-transform duration-300 ${
                  menuOpen ? "rotate-45" : "-translate-y-[5px] rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px -translate-y-1/2 bg-bone transition-all duration-300 ${
                  menuOpen
                    ? "w-full -rotate-45"
                    : "w-3/5 translate-y-[5px] rotate-0 group-hover:w-full"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        data-lenis-prevent
        className={`thin-scrollbar fixed inset-0 z-90 flex flex-col overflow-y-auto overscroll-contain bg-void transition-opacity duration-500 ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div
          className="blueprint-grid pointer-events-none absolute inset-0 opacity-40"
          aria-hidden="true"
        />

        <nav
          aria-label={t.menuAria}
          className="relative mx-auto flex w-full max-w-full flex-1 flex-col justify-center gap-0 px-6 sm:px-8 lg:px-12 bg-void "
        >
          {t.menuLinks.map((link, index) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(`${link.href}/`));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive ? "page" : undefined}
                className={`group flex items-baseline gap-4 border-b border-edge py-4 transition-colors duration-300 sm:py-5 ${
                  isActive
                    ? "text-azure-glow"
                    : "text-bone hover:text-azure-glow"
                }`}
              >
                <span dir="ltr" className="font-mono text-[11px] text-amber">
                  {String(index).padStart(2, "0")}
                </span>
                <span className="text-[clamp(2rem,7vw,3.5rem)] font-bold leading-none tracking-[-0.02em]">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="relative mx-auto flex w-full max-w-full flex-wrap items-center gap-x-8 gap-y-2 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.14em] text-dust sm:px-8 lg:px-12 bg-void">
          <a
            href="tel:+966555352526"
            dir="ltr"
            className="transition-colors hover:text-azure-glow"
          >
            +966 55 535 2526
          </a>
          <a
            href="mailto:info@bru.com.sa"
            dir="ltr"
            className="transition-colors hover:text-azure-glow"
          >
            info@bru.com.sa
          </a>
          <a
            href="https://instagram.com/bru.co.sa"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-azure-glow"
          >
            {t.instagram}
          </a>
          <span>{t.location}</span>
        </div>
      </div>
    </header>
  );
}
