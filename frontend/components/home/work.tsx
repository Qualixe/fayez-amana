import Reveal from "@/components/reveal";

const projects = [
  {
    number: "01",
    category: "Hospitality",
    title: "Chalets Redevelopment, Durrat Al-Arous",
    description:
      "24 chalets fully redesigned & executed, La Fontaine Hotels & Resorts.",
    href: "/projects/chalets-durrat-al-arous",
    image: "/images/work-img1.avif",
  },
  {
    number: "02",
    category: "Residential",
    title: "48 Duplex Villas Complex, Diyar Al Khayal",
    description: "Red brick construction, 2 floors + annex per unit.",
    href: "/projects/diyar-al-khayal-duplex-villas",
    image: "/images/work-img2.avif",
  },
  {
    number: "03",
    category: "Residential",
    title: "16 Contemporary Villas",
    description:
      "Spacious, functional & elegantly finished living environments.",
    href: "/projects/sixteen-contemporary-villas",
    image: "/images/work-img3.avif",
  },
  {
    number: "04",
    category: "Commercial",
    title: "Sport Center, Prince Sultan Road",
    description: "Retail spaces + gym, structural phase design & build.",
    href: "/projects/sport-center-prince-sultan",
    image: "/images/work-img4.avif",
  },
  {
    number: "05",
    category: "Healthcare",
    title: "Enaya Medical Building",
    description:
      "State-of-the-art healthcare facility, advanced infrastructure & modern design.",
    href: "/projects/enaya-medical-building",
    image: "/images/work-img5.avif",
  },
  {
    number: "06",
    category: "F&B",
    title: "Asli Basha Restaurant",
    description:
      "Modern & traditional fusion, refined finishes reflecting authentic identity.",
    href: "/projects/asli-basha-restaurant",
    image: "/images/work-img6.avif",
  },
  {
    number: "07",
    category: "Residential",
    title: "Andalusian / Islamic Style Villa",
    description:
      "Arches, geometric patterns, and decorative motifs with modern functional layouts.",
    href: "/projects/andalusian-islamic-villa",
    image: "/images/work-img7.avif",
  },
  {
    number: "08",
    category: "Residential",
    title: "Modern Villa",
    description:
      "Integrated wooden elements and façade lighting per the architectural design.",
    href: "/projects/modern-villa",
    image: "/images/work-img8.avif",
  },
];

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

export default function Work() {
  return (
    <section
      id="work"
      className="relative border-t border-steel bg-void py-20 sm:py-28"
    >
      <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="flex flex-col gap-6">
            <Reveal
              tag="p"
              className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow"
            >
              <span aria-hidden="true" className="h-px w-8 bg-azure" />
              Our Work
            </Reveal>

            <Reveal
              tag="h2"
              delay={80}
              className="text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone"
            >
              What We&apos;ve
              <br />
              Built
            </Reveal>

            <Reveal
              tag="p"
              delay={160}
              className="max-w-2xl text-[1.0625rem] leading-relaxed text-dust"
            >
              A selection from our portfolio of 300+ completed projects across
              Saudi Arabia, each delivered with precision, quality, and
              dedication.
            </Reveal>
          </div>

          <Reveal tag="div" delay={220}>
            <a
              href="/projects"
              className="group inline-flex min-h-[56px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
            >
              All Projects
              <ArrowIcon />
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal
              key={project.href}
              delay={(index % 3) * 110}
              className="block"
            >
              <a href={project.href} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-slab xl:aspect-[3/4]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div
                      aria-hidden="true"
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-slab), var(--color-ink))",
                      }}
                    />
                  )}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 opacity-70 transition-opacity duration-700 group-hover:opacity-40"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(4,6,9,0.92) 0%, rgba(4,6,9,0.15) 55%, transparent 100%)",
                    }}
                  />
                  <span className="absolute start-5 top-5 bg-void/70 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-azure-glow backdrop-blur-md">
                    {project.category}
                  </span>
                  <span className="absolute end-5 top-5 font-mono text-[10px] tabular-nums tracking-[0.2em] text-dust">
                    {project.number}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone transition-colors duration-500 group-hover:text-azure-glow">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 max-w-md text-sm leading-relaxed text-dust">
                      {project.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 overflow-hidden">
                      <span className="translate-y-6 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow transition-transform duration-500 ease-out group-hover:translate-y-0">
                        View Project
                      </span>
                      <svg
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-3 w-3 translate-y-6 text-azure-glow transition-transform duration-500 ease-out group-hover:translate-y-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
