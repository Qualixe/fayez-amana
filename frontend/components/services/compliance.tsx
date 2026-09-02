import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Compliance",
    title: "Standards, in full.",
    standards: [
      "Member of the Saudi Contractors Authority",
      "Formally classified by regulatory bodies for structural, architectural, and MEP works",
      "All engineers hold verified professional qualifications and active memberships with relevant bodies",
      "Compliant with Saudi nationalization (Saudization) requirements",
    ],
    requestDocs: "Request Our Documents",
    certifications: "Certifications",
    certBody: "ISO certification in quality, safety and environmental management, membership of the Saudi Contractors Authority, and formal classification for structural, architectural and MEP works.",
    certCta: "Certifications & Licenses",
  },
  ar: {
    eyebrow: "الالتزام",
    title: "معايير متكاملة.",
    standards: [
      "عضو في الهيئة السعودية للمقاولين",
      "مصنّفة رسميًا من الجهات التنظيمية للأعمال الإنشائية والمعمارية والكهروميكانيكية",
      "جميع المهندسين لديهم مؤهلات مهنية موثقة وعضويات فعّالة في الجهات ذات الصلة",
      "ملتزمة بمتطلبات التوطين السعودية (السعودة)",
    ],
    requestDocs: "اطلب مستنداتنا",
    certifications: "الاعتمادات",
    certBody: "شهادة ISO في إدارة الجودة والسلامة والبيئة، وعضوية الهيئة السعودية للمقاولين، وتصنيف رسمي للأعمال الإنشائية والمعمارية والكهروميكانيكية.",
    certCta: "الشهادات والتراخيص",
  },
} as const;

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-500 group-hover:translate-x-1"
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

export default function Compliance({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="border-b border-steel py-20 sm:py-28 bg-void">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-7">
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
            className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            {t.title}
          </Reveal>

          <ul className="mt-2 flex flex-col gap-4">
            {t.standards.map((standard, index) => (
              <Reveal
                key={standard}
                tag="li"
                delay={140 + index * 80}
                className="flex items-start gap-4 border-t border-steel pt-4 text-sm leading-relaxed text-dust"
              >
                <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-azure" />
                {standard}
              </Reveal>
            ))}
          </ul>

          <Reveal tag="div" delay={220} className="mt-4">
            <a
              href="/contact"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white transition-[filter] duration-500 hover:brightness-110"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
              }}
            >
              {t.requestDocs}
              <ArrowIcon />
            </a>
          </Reveal>
        </div>

        <Reveal tag="div" delay={100} className="self-start border border-steel bg-ink p-8">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
            <span aria-hidden="true" className="h-px w-8 bg-rebar" />
            {t.certifications}
          </p>
          <p className="mt-6 max-w-md text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
            {t.certBody}
          </p>
          <div className="mt-8">
            <a
              href="/about#certifications"
              className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
            >
              {t.certCta}
              <ArrowIcon />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
