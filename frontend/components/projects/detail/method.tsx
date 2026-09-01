import Reveal from "@/components/reveal";

const articles = [
  {
    number: "01",
    title: "Structural method",
    body: "The structural (shell) phase runs on a documented 21-stage programme: site hoarding, excavation and foundation setting-out, then the reinforced concrete frame stage by stage, through to a building complete in its structural state. The sequence is the same on every project, which is what makes a construction programme estimable rather than optimistic.",
    href: "/process",
    label: "See the 21 stages",
  },
  {
    number: "02",
    title: "Design and build",
    body: "This project was delivered design-build: architectural, structural and MEP design plus execution under one contract and one accountable party. It removes the usual gap between designer and contractor, so clashes between systems are resolved on the drawings rather than in poured concrete.",
    href: "/services#architectural-works",
    label: "Architectural works",
  },
  {
    number: "03",
    title: "Interior and external finishing",
    body: "The finishing phase begins with preparatory works and ends with the project handed over ready for use. It covers full interior design implementation, interior and exterior finishing, façade works, joinery and façade lighting, with material quality control and adherence to the approved design under continuous supervision that harmonises every trade on site.",
    href: "/services#interior-finishing-works",
    label: "Finishing works",
  },
  {
    number: "04",
    title: "Quality control and safety",
    body: "Each of the 21 structural stages carries its own verification, and supervision re-inspects after every strike of formwork. BRU CO. is certified to ISO standards for quality, safety and environmental management, and site safety requirements apply for the full duration of the works.",
    href: "/services#quality-assurance",
    label: "Quality and safety",
  },
];

export default function ProjectDetailMethod() {
  return (
    <section className="border-b border-steel py-20 sm:py-28">
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <Reveal
          tag="p"
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
        >
          <span aria-hidden="true" className="h-px w-8 bg-azure" />
          Method &amp; Materials
        </Reveal>

        <Reveal
          tag="h2"
          delay={80}
          className="mt-6 max-w-2xl text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
        >
          How this project
          <br />
          was built.
        </Reveal>

        <Reveal tag="p" delay={140} className="mt-6 max-w-2xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          Structural work, materials and quality control on a BRU CO. project
          run on documented programmes rather than site improvisation.
        </Reveal>

        <div className="mt-14 grid gap-px bg-steel md:grid-cols-2">
          {articles.map((article, index) => (
            <Reveal
              key={article.title}
              tag="article"
              delay={index * 80}
              className="flex flex-col gap-4 bg-void p-8 lg:p-10"
            >
              <span className="font-mono text-[0.75rem] tabular-nums tracking-[0.2em] text-azure-glow">
                {article.number}
              </span>
              <h3 className="text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                {article.title}
              </h3>
              <p className="max-w-xl text-[0.9875rem] leading-[1.72] tracking-[-0.004em] text-dust">
                {article.body}
              </p>
              <a
                href={article.href}
                className="mt-auto pt-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-colors duration-400 hover:text-bone"
              >
                {article.label}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
