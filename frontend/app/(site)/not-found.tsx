import Link from "next/link";
import { getLocale } from "@/lib/locale";
import { getNotFoundPageSettings } from "@/lib/db/site";
import { getContactSettings } from "@/lib/db/contact";

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 rtl:rotate-180"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default async function NotFound() {
  const locale = await getLocale();
  const [t, contact] = await Promise.all([getNotFoundPageSettings(locale), getContactSettings(locale)]);

  return (
    <section
      data-not-found-page=""
      className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden bg-void px-6 py-24 text-center sm:px-8"
    >
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

      <div className="relative flex max-w-2xl flex-col items-center gap-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">{t.eyebrow}</p>

        <p className="text-[clamp(5rem,18vw,11rem)] font-bold leading-none tracking-[-0.03em] text-bone">404</p>

        <p className="max-w-md text-[1.0625rem] leading-relaxed text-dust">{t.message}</p>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <Link
            href="/"
            className="btn-premium btn-premium-fill group inline-flex min-h-[56px] items-center justify-center gap-3 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white hover:brightness-110"
            style={{
              backgroundImage: "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
            }}
          >
            {t.primaryLabel}
            <ArrowIcon />
          </Link>
          <Link
            href="/projects"
            className="btn-premium btn-premium-outline group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08]"
          >
            {t.secondaryLabel}
            <ArrowIcon />
          </Link>
        </div>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
          <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} dir="ltr" className="transition-colors hover:text-azure-glow">
            {t.callPrefix} {contact.phone}
          </a>
          <a href={`mailto:${contact.email}`} dir="ltr" className="transition-colors hover:text-azure-glow">
            {t.emailPrefix} {contact.email}
          </a>
        </p>
      </div>
    </section>
  );
}
