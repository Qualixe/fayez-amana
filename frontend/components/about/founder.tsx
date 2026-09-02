import Reveal from "@/components/reveal";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "CEO Speech",
    title: "A Word From Our Founder",
    name: "Eng. Khalid Badr Al-Deen",
    role: "CEO & Co-Founder",
    quote: "“Since the establishment of BRU in the year 2000, I have been determined to work with dedication and integrity, attracting top qualified talents, while training and empowering ambitious young Saudi professionals and refining their practical capabilities.”",
    p1: "This foundation marked the beginning of realizing our aspirations. With the grace of Allah Almighty, the company has continued to thrive and has become one of the entities making a real difference in development.",
    p2: "Aligned with Saudi Vision 2030, we remain committed to delivering innovative solutions, strengthening the private sector's role in urban development, and building a sustainable future for our nation.",
  },
  ar: {
    eyebrow: "كلمة الرئيس التنفيذي",
    title: "كلمة من مؤسسنا",
    name: "المهندس خالد بدر الدين",
    role: "الرئيس التنفيذي والمؤسس المشارك",
    quote: "«منذ تأسيس BRU عام 2000، وأنا مصمم على العمل بتفانٍ ونزاهة، واستقطاب أفضل الكفاءات، مع تدريب وتمكين الشباب السعودي الطموح وصقل قدراتهم العملية.»",
    p1: "شكّل هذا التأسيس بداية تحقيق طموحاتنا. وبفضل الله عز وجل، واصلت الشركة ازدهارها وأصبحت من الجهات التي تُحدث فرقًا حقيقيًا في التنمية.",
    p2: "انسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بتقديم حلول مبتكرة، وتعزيز دور القطاع الخاص في التنمية العمرانية، وبناء مستقبل مستدام لوطننا.",
  },
} as const;

export default function Founder({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="relative overflow-hidden border-t border-steel bg-ink py-20 sm:py-28">
      <div
        className="blueprint-grid pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-full px-6 sm:px-8 lg:px-12">
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
          className="mt-4 text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
        >
          {t.title}
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
          <Reveal
            clip
            className="relative aspect-[4/5] w-full max-w-xs overflow-hidden bg-slab lg:max-w-none"
          >
            <img
              src="/images/work-img1.avif"
              alt="Eng. Khalid Badr Al-Deen, CEO & Co-Founder of BRU CO."
              className="absolute inset-0 h-full w-full object-cover opacity-70"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="text-2xl font-semibold text-bone sm:text-[1.75rem]">
                {t.name}
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.22em] text-azure-glow">
                {t.role}
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal
              tag="blockquote"
              className="max-w-[min(34ch,44rem)] font-serif text-[clamp(1.25rem,2.4vw,1.75rem)] italic leading-relaxed text-bone/95"
            >
              {t.quote}
            </Reveal>

            <Reveal
              tag="p"
              delay={120}
              className="max-w-2xl text-[0.9875rem] leading-[1.72] text-dust"
            >
              {t.p1}
            </Reveal>

            <Reveal
              tag="p"
              delay={240}
              className="max-w-2xl text-[0.9875rem] leading-[1.72] text-dust"
            >
              {t.p2}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
