import Reveal from "@/components/reveal";
import ApplicationForm from "@/components/careers/application-form";
import type { CareersPageSettings, Position, ApplicationField, TrustItem } from "@/lib/db/careers";
import type { Locale } from "@/lib/locale";

export default function ApplicationSection({
  settings,
  positions,
  fields,
  trust,
  locale,
  phone,
  email,
}: {
  settings: CareersPageSettings["application"];
  positions: Position[];
  fields: ApplicationField[];
  trust: TrustItem[];
  locale: Locale;
  phone: string;
  email: string;
}) {
  const t = settings;
  return (
    <section className="border-b border-steel bg-ink py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            {t.eyebrow}
          </Reveal>
          <Reveal
            tag="h2"
            delay={80}
            className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
          >
            {t.title}
          </Reveal>
          <Reveal tag="p" delay={160} className="max-w-md text-[1.0625rem] leading-relaxed text-dust">
            {t.note}
          </Reveal>
        </div>

        <Reveal tag="div" delay={240}>
          <ApplicationForm
            locale={locale}
            positions={positions}
            fields={fields}
            form={t.form}
            trust={trust}
            phone={phone}
            email={email}
          />
        </Reveal>
      </div>
    </section>
  );
}
