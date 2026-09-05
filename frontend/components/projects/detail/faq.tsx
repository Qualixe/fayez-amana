import Reveal from "@/components/reveal";
import { Project, categoryLabel, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Questions",
    title: "About this project.",
    lede: "What clients usually ask before building something similar with a general contractor in Jeddah.",
    faqs: (p: ReturnType<typeof localize>) => [
      {
        question: `Where is ${p.title} located?`,
        answer: `The project is in ${p.location}. It was built by Fayez Amana Construction Company, a general contractor headquartered in Jeddah and working across Jeddah, Makkah, the Western Region and the wider Kingdom of Saudi Arabia.`,
      },
      {
        question: `What was the scope of work on ${p.title}?`,
        answer: `The scope covered ${p.scope.toLowerCase()}. Fayez Amana delivers as a single general contractor, so structural, architectural, electromechanical (MEP) and interior finishing works sit with one accountable party rather than being split across separate trades contracts.`,
      },
      {
        question: `How large is ${p.title}?`,
        answer: `${p.size ?? "This project"}. The project sits in the ${p.category.toLowerCase()} sector, one of more than 300 projects Fayez Amana has completed in Saudi Arabia.`,
      },
      {
        question: `Which construction company built ${p.title}?`,
        answer: `Fayez Amana Construction Company, a construction company founded in Jeddah in 2000, a member of the Saudi Contractors Authority and certified to ISO standards for quality, safety and environmental management.${
          p.client ? ` Client: ${p.client}.` : ""
        }`,
      },
      {
        question: "How do I build a similar project with Fayez Amana?",
        answer:
          "Contact Fayez Amana on +966 55 535 2526 or through the enquiry form on the contact page with the site location, building type and the scope you need. The company offers design-build and turnkey delivery, from excavation and foundations through to finishing and handover.",
      },
    ],
  },
  ar: {
    eyebrow: "أسئلة شائعة",
    title: "عن هذا المشروع.",
    lede: "ما يسأل عنه العملاء عادة قبل بناء مشروع مشابه مع مقاول عام في جدة.",
    faqs: (p: ReturnType<typeof localize>) => [
      {
        question: `أين يقع مشروع ${p.title}؟`,
        answer: `يقع المشروع في ${p.location}. نفّذته Fayez Amana (فايز أمانة للمقاولات)، وهي شركة مقاولات عامة مقرها جدة، تعمل في جدة ومكة المكرمة والمنطقة الغربية وسائر أنحاء المملكة العربية السعودية.`,
      },
      {
        question: `ما نطاق العمل في ${p.title}؟`,
        answer: `شمل النطاق ${p.scope}. تنفّذ Fayez Amana الأعمال بصفتها مقاولًا عامًا واحدًا، بحيث تكون الأعمال الإنشائية والمعمارية والكهروميكانيكية (MEP) والتشطيبات الداخلية تحت مسؤولية جهة واحدة بدلًا من توزيعها على عقود حرف منفصلة.`,
      },
      {
        question: `ما مساحة مشروع ${p.title}؟`,
        answer: `${p.size ?? "هذا المشروع"}. يقع المشروع في قطاع ${categoryLabel(p.category, "ar")}، وهو أحد أكثر من 300 مشروع أنجزتها Fayez Amana في المملكة العربية السعودية.`,
      },
      {
        question: `ما شركة المقاولات التي نفّذت ${p.title}؟`,
        answer: `Fayez Amana (فايز أمانة للمقاولات)، شركة مقاولات تأسست في جدة عام 2000، وهي عضو في الهيئة السعودية للمقاولين ومعتمدة وفق مواصفات الآيزو للجودة والسلامة والبيئة.${
          p.client ? ` العميل: ${p.client}.` : ""
        }`,
      },
      {
        question: "كيف أنفّذ مشروعًا مشابهًا مع Fayez Amana؟",
        answer:
          "تواصل مع Fayez Amana عبر +966 55 535 2526 أو من خلال نموذج الاستفسار في صفحة التواصل، مع تحديد موقع الأرض ونوع المبنى والنطاق المطلوب. تقدّم الشركة التصميم والتنفيذ والتسليم بنظام تسليم مفتاح، من الحفر والأساسات حتى التشطيب والتسليم.",
      },
    ],
  },
} as const;

export default function ProjectDetailFaq({ project, locale }: { project: Project; locale: Locale }) {
  const t = content[locale];
  const p = localize(project, locale);
  const faqs = t.faqs(p);

  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-fit">
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

          <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            {t.lede}
          </Reveal>
        </div>

        <ul className="flex flex-col border-t border-steel">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} tag="li" delay={index * 60} className="border-b border-steel">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-lg font-semibold text-bone transition-colors duration-400 group-open:text-azure-glow">
                    {faq.question}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="relative grid h-9 w-9 shrink-0 place-items-center border border-steel text-azure-glow transition-colors duration-400 group-hover:border-azure"
                  >
                    <span className="absolute h-px w-3.5 bg-current" />
                    <span className="absolute h-3.5 w-px bg-current transition-transform duration-400 group-open:rotate-90 group-open:scale-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pe-14 text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
