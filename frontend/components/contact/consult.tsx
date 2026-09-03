import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact/form";
import { disciplines } from "@/components/contact/data";
import type { Locale } from "@/lib/locale";

const content = {
  en: {
    eyebrow: "Start a Project",
    heading: "Tell us what you're building.",
    lede: "Foundation to finish, under one roof. Send the location, the scope and the programme you have in mind, and our team in Jeddah will come back with next steps and comparable projects from the portfolio.",
    disciplinesLabel: "Disciplines",
    responseLabel: "Response",
    responseBody: "One business day, from our office in Jeddah. Urgent programmes: call the number above.",
  },
  ar: {
    eyebrow: "ابدأ مشروعك",
    heading: "أخبرنا بما تنوي بناءه.",
    lede: "من الأساسات حتى التشطيب، تحت مظلة واحدة. أرسل الموقع والنطاق والبرنامج الزمني الذي تتصوره، وسيعود إليك فريقنا في جدة بالخطوات التالية ومشاريع مماثلة من أعمالنا.",
    disciplinesLabel: "التخصصات",
    responseLabel: "زمن الرد",
    responseBody: "خلال يوم عمل واحد، من مكتبنا في جدة. للبرامج العاجلة: اتصل بالرقم أعلاه.",
  },
} as const;

export default function ContactConsult({ locale }: { locale: Locale }) {
  const t = content[locale];

  return (
    <section className="relative isolate border-b border-steel py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(58% 42% at 78% 10%, rgba(30,104,172,0.07), transparent 70%), radial-gradient(50% 40% at 6% 90%, rgba(15,63,109,0.12), transparent 72%)",
        }}
      />

      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:h-fit">
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
            {t.heading}
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            {t.lede}
          </Reveal>

          <Reveal tag="div" delay={200} className="mt-2 flex flex-col gap-4 border-t border-steel pt-8">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              {t.disciplinesLabel}
            </span>
            <ul className="flex flex-col gap-2">
              {disciplines.map((item) => (
                <li key={item.en} className="text-sm text-dust">
                  {locale === "ar" ? item.ar : item.en}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal tag="div" delay={260} className="flex flex-col gap-4 border-t border-steel pt-8">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              {t.responseLabel}
            </span>
            <p className="text-sm leading-relaxed text-dust">
              {t.responseBody}
            </p>
          </Reveal>
        </div>

        <div
          className="relative isolate overflow-hidden rounded-3xl border border-edge p-6 backdrop-blur-[6px] backdrop-saturate-[1.08] sm:p-10 lg:p-12 xl:p-14"
          style={{
            background:
              "radial-gradient(105% 65% at 50% -8%, rgba(30,104,172,0.11), transparent 62%), radial-gradient(80% 60% at 0% 105%, rgba(61,143,216,0.06), transparent 60%), linear-gradient(168deg, rgba(47,59,73,0.58), rgba(28,36,46,0.92))",
            boxShadow:
              "inset 0 1px 0 rgba(245,243,239,0.11), inset 0 0 0 1px rgba(245,243,239,0.03), inset 0 -60px 90px -70px rgba(0,0,0,0.85), 0 32px 72px -48px rgba(3,10,20,0.9), 0 4px 16px -12px rgba(3,10,20,0.6)",
          }}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-px opacity-70"
            style={{
              background: "linear-gradient(to right, transparent, var(--color-azure-lift), transparent)",
            }}
          />
          <ContactForm locale={locale} />
        </div>
      </div>
    </section>
  );
}
