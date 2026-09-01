import Reveal from "@/components/reveal";
import ContactForm from "@/components/contact/form";
import { disciplines } from "@/components/contact/data";

export default function ContactConsult() {
  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-14 px-6 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            Start a Project
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            Tell us what you&apos;re building.
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            Foundation to finish, under one roof. Send the location, the
            scope and the programme you have in mind, and our team in
            Jeddah will come back with next steps and comparable projects
            from the portfolio.
          </Reveal>

          <Reveal tag="div" delay={200} className="mt-2 flex flex-col gap-4 border-t border-steel pt-8">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              Disciplines
            </span>
            <ul className="flex flex-col gap-2">
              {disciplines.map((item) => (
                <li key={item} className="text-sm text-dust">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal tag="div" delay={260} className="flex flex-col gap-4 border-t border-steel pt-8">
            <span className="font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
              Response
            </span>
            <p className="text-sm leading-relaxed text-dust">
              One business day, from our office in Jeddah. Urgent
              programmes: call the number above.
            </p>
          </Reveal>
        </div>

        <div className="border border-steel bg-ink p-6 sm:p-10 lg:p-12 xl:p-14">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
