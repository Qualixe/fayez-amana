import Reveal from "@/components/reveal";

const faqs = [
  {
    question: "What types of construction projects does BRU CO. build?",
    answer:
      "BRU CO. builds residential and villa construction, commercial buildings, hospitality projects, healthcare facilities, F&B fit-out and sports facilities. The work covers structural construction, architectural works, electromechanical (MEP) systems and interior and exterior finishing.",
  },
  {
    question: "Where in Saudi Arabia does BRU CO. build?",
    answer:
      "BRU CO. is headquartered in Jeddah and builds across Jeddah, Makkah, the Western Region and the wider Kingdom of Saudi Arabia. Completed work includes buildings on Prince Sultan Road in Jeddah and chalets at Durrat Al-Arous.",
  },
  {
    question: "Does BRU CO. build and finish villas?",
    answer:
      "Yes. Villa construction is one of the company's largest activities: reinforced concrete structure, masonry, and interior and exterior finishing, in contemporary, neoclassical, semi-classic and Andalusian/Islamic idioms. The projects documented here range from single villas to residential complexes of up to 48 duplex villas.",
  },
  {
    question: "Does BRU CO. offer turnkey and design-build contracts?",
    answer:
      "Yes. BRU CO. works design-build and turnkey: architectural, structural and MEP design plus execution under a single contract, from excavation and foundations to a building handed over ready for use.",
  },
  {
    question: "How many projects has BRU CO. completed?",
    answer:
      "More than 300 completed projects since the company was founded in 2000, of which 18 are documented in detail with photography on this page.",
  },
  {
    question: "How do I request a construction quote?",
    answer:
      "Contact BRU CO. on +966 55 535 2526 or through the form on the contact page with the site location, building type, approximate area and the scope you need: structural shell only, finishing, or full turnkey delivery.",
  },
];

export default function ProjectsFaq() {
  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto grid max-w-full gap-12 px-6 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-12">
        <div className="flex flex-col gap-6 lg:sticky lg:top-32 lg:h-fit">
          <Reveal
            tag="p"
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
          >
            <span aria-hidden="true" className="h-px w-8 bg-azure" />
            Questions
          </Reveal>

          <Reveal
            tag="h2"
            delay={80}
            className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
          >
            About BRU CO. projects.
          </Reveal>

          <Reveal tag="p" delay={140} className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
            What clients ask before choosing a construction company to build
            in Jeddah or Makkah.
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
