import Reveal from "@/components/reveal";
import { projects, localize } from "@/components/projects/data";
import type { Locale } from "@/lib/locale";

const icons = [
  (
    <>
      <path key="a" d="M4 44V20l16-10 16 10v24" />
      <path key="b" d="M4 30h32M4 37h32M12 44V25M28 44V25" />
    </>
  ),
  (
    <>
      <path key="a" d="M6 44V14L24 4l18 10v30" />
      <path key="b" d="M18 44V28h12v16" />
      <path key="c" d="M6 22h36" />
    </>
  ),
  (
    <>
      <path key="a" d="M26 4 10 26h12l-4 18 18-24H24l2-16Z" />
      <path key="b" d="M4 40h6M38 8h6" />
    </>
  ),
  (
    <>
      <path key="a" d="M4 40V16l20-10 20 10v24" />
      <path key="b" d="M14 40V26h20v14" />
      <path key="c" d="M4 40h40" />
    </>
  ),
];

const content = {
  en: {
    intro: "All of our work runs within a certified system, ISO-certified in quality, safety and environmental management.",
    serviceLabel: "Service",
    discussScope: "Discuss This Scope",
    relatedWork: "Related Work",
    services: [
      {
        number: "01",
        id: "structural-construction-works",
        title: "Structural & Construction Works",
        description: "Establishing and building projects to the highest specifications and structural standards. Full concrete and steel execution, from excavation and foundation setting through the reinforced-concrete frame to a completed structural shell.",
        capabilities: [
          "Excavation & earthworks to the founding level in the soil report",
          "Plate load testing & soil bearing verification",
          "Reinforced raft foundations & isolated footings",
          "Column necks, columns, tie beams & suspended slabs",
          "Backfilling in 30 cm compacted layers to code",
          "Structural steel & concrete execution",
        ],
        image: "/images/service-details-img1.avif",
        gallery: ["sport-center-prince-sultan", "diyar-al-khayal-duplex-villas", "residential-building"],
      },
      {
        number: "02",
        id: "architectural-works",
        title: "Architectural Works",
        description: "Designing and executing architectural structures with precision, from concept to built reality, merging form with function. Our architects work alongside the site teams so the drawing and the building never drift apart.",
        capabilities: [
          "Concept & schematic architectural design",
          "Design & build delivery",
          "Façade design and execution",
          "Contemporary, neoclassical, semi-classic and Andalusian/Islamic idioms",
          "Compliance with the approved architectural plan on site",
          "Room, bathroom and kitchen setting-out per plan",
        ],
        image: "/images/service-details-img2.avif",
        gallery: ["andalusian-islamic-villa", "neoclassical-villa", "chalets-durrat-al-arous"],
      },
      {
        number: "03",
        id: "electromechanical-works",
        title: "Electromechanical Works",
        description: "Implementing advanced mechanical, electrical and plumbing (MEP) systems: heating, ventilation and air conditioning (HVAC), water supply, drainage and power distribution, with top-tier quality and compliance. Sanitary extensions are executed strictly per the sanitary drawings, covering water supply systems and their maintenance, sewage, and air-conditioning and heating drainage.",
        capabilities: [
          "Sanitary extensions per approved sanitary drawings",
          "Water supply systems & maintenance",
          "Sewage and drainage systems",
          "Air-conditioning and heating drainage",
          "Power distribution & electrical installations",
          "HVAC systems",
        ],
        image: "/images/service-details-img3.avif",
        gallery: ["enaya-medical-building", "sport-center-prince-sultan", "modern-villa"],
      },
      {
        number: "04",
        id: "interior-finishing-works",
        title: "Interior & Finishing Works",
        description: "High-quality interior and exterior finishes with meticulous detail, plus full interior design implementation. The finishing stage consists of several precise steps that begin with preparatory works and end with handing over the project ready for use.",
        capabilities: [
          "Full interior design implementation",
          "Interior and exterior finishing",
          "Façade works",
          "Joinery, wooden elements & façade lighting",
          "Material quality control & adherence to the approved design",
          "Continuous supervision to harmonise all trades",
        ],
        image: "/images/service-details-img4.avif",
        gallery: ["asli-basha-restaurant", "naamah-bakery", "chalets-durrat-al-arous"],
      },
    ],
  },
  ar: {
    intro: "تسير جميع أعمالنا ضمن منظومة معتمدة، بشهادات ISO في إدارة الجودة والسلامة والبيئة.",
    serviceLabel: "الخدمة",
    discussScope: "ناقش هذا النطاق",
    relatedWork: "أعمال ذات صلة",
    services: [
      {
        number: "01",
        id: "structural-construction-works",
        title: "الأعمال الإنشائية والبناء",
        description: "تأسيس وبناء المشاريع بأعلى المواصفات والمعايير الإنشائية. تنفيذ كامل للخرسانة والحديد، من الحفر وتأسيس الأساسات مرورًا بالهيكل الخرساني حتى اكتمال الهيكل الإنشائي.",
        capabilities: [
          "الحفر والأعمال الترابية حتى منسوب التأسيس المحدد بتقرير التربة",
          "اختبار التحميل والتحقق من تحمل التربة",
          "أساسات لبشة مسلحة وقواعد منفصلة",
          "رقاب الأعمدة والأعمدة والميدات والأسقف المعلقة",
          "الردم بطبقات مدكوكة بسمك 30 سم وفق الكود",
          "تنفيذ الحديد والخرسانة الإنشائية",
        ],
        image: "/images/service-details-img1.avif",
        gallery: ["sport-center-prince-sultan", "diyar-al-khayal-duplex-villas", "residential-building"],
      },
      {
        number: "02",
        id: "architectural-works",
        title: "الأعمال المعمارية",
        description: "تصميم وتنفيذ الهياكل المعمارية بدقة، من الفكرة حتى الواقع المبني، بالجمع بين الشكل والوظيفة. يعمل معماريونا جنبًا إلى جنب مع فرق الموقع حتى لا يتباعد المخطط عن المبنى.",
        capabilities: [
          "التصميم المعماري المفاهيمي والتخطيطي",
          "تسليم التصميم والتنفيذ",
          "تصميم وتنفيذ الواجهات",
          "طرز معاصرة وكلاسيكية حديثة وشبه كلاسيكية وأندلسية/إسلامية",
          "الالتزام بالمخطط المعماري المعتمد في الموقع",
          "تحديد أبعاد الغرف والحمامات والمطابخ وفق المخطط",
        ],
        image: "/images/service-details-img2.avif",
        gallery: ["andalusian-islamic-villa", "neoclassical-villa", "chalets-durrat-al-arous"],
      },
      {
        number: "03",
        id: "electromechanical-works",
        title: "الأعمال الكهروميكانيكية",
        description: "تنفيذ أنظمة ميكانيكية وكهربائية وسباكة متطورة (MEP): التكييف والتهوية، إمدادات المياه، الصرف، وتوزيع الطاقة، بأعلى مستويات الجودة والالتزام. تُنفَّذ التمديدات الصحية بدقة وفق المخططات الصحية المعتمدة، وتشمل أنظمة المياه وصيانتها والصرف الصحي وصرف التكييف والتدفئة.",
        capabilities: [
          "التمديدات الصحية وفق المخططات الصحية المعتمدة",
          "أنظمة إمداد المياه وصيانتها",
          "أنظمة الصرف الصحي والتصريف",
          "صرف أنظمة التكييف والتدفئة",
          "توزيع الطاقة والتمديدات الكهربائية",
          "أنظمة التكييف (HVAC)",
        ],
        image: "/images/service-details-img3.avif",
        gallery: ["enaya-medical-building", "sport-center-prince-sultan", "modern-villa"],
      },
      {
        number: "04",
        id: "interior-finishing-works",
        title: "التصميم الداخلي والتشطيبات",
        description: "تشطيبات داخلية وخارجية عالية الجودة بدقة متناهية، إضافة إلى تنفيذ كامل للتصميم الداخلي. تتكوّن مرحلة التشطيب من خطوات دقيقة تبدأ بالأعمال التحضيرية وتنتهي بتسليم المشروع جاهزًا للاستخدام.",
        capabilities: [
          "تنفيذ كامل للتصميم الداخلي",
          "التشطيبات الداخلية والخارجية",
          "أعمال الواجهات",
          "النجارة والعناصر الخشبية وإضاءة الواجهات",
          "ضبط جودة المواد والالتزام بالتصميم المعتمد",
          "إشراف مستمر لتنسيق جميع الحرف",
        ],
        image: "/images/service-details-img4.avif",
        gallery: ["asli-basha-restaurant", "naamah-bakery", "chalets-durrat-al-arous"],
      },
    ],
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

export default function ServicesDetail({ locale }: { locale: Locale }) {
  const t = content[locale];
  return (
    <section className="border-t border-steel bg-void">
      <div className="border-b border-steel py-10">
        <Reveal
          tag="p"
          className="max-w-5xl px-6 font-serif text-[clamp(1.5rem,3.4vw,3rem)] italic leading-[1.18] tracking-[-0.02em] text-bone/85 sm:px-8 lg:px-12"
        >
          {t.intro}
        </Reveal>
      </div>

      {t.services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <div
            key={service.number}
            id={service.id}
            className="scroll-mt-24 border-b border-steel py-20 sm:py-28"
          >
            <div className="mx-auto max-w-full px-6 sm:px-8 lg:px-12">
              <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
                <div className={`flex flex-col gap-7 ${reversed ? "lg:order-2" : ""}`}>
                  <Reveal tag="div" className="flex items-center gap-5">
                    <span
                      aria-hidden="true"
                      className="grid h-16 w-16 shrink-0 place-items-center border border-steel text-azure-glow"
                    >
                      <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.4}
                        className="h-8 w-8"
                      >
                        {icons[index]}
                      </svg>
                    </span>
                    <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
                      <span aria-hidden="true" className="h-px w-8 bg-azure" />
                      {t.serviceLabel} {service.number}
                    </span>
                  </Reveal>

                  <Reveal
                    tag="h2"
                    delay={80}
                    className="text-[clamp(2rem,5vw,4.5rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-bone"
                  >
                    {service.title}
                  </Reveal>

                  <Reveal
                    tag="p"
                    delay={140}
                    className="max-w-xl text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust"
                  >
                    {service.description}
                  </Reveal>

                  <Reveal
                    tag="ul"
                    delay={200}
                    className="mt-4 grid gap-px bg-steel sm:grid-cols-2"
                  >
                    {service.capabilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 bg-void p-5 text-sm leading-relaxed text-dust"
                      >
                        <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rotate-45 bg-azure" />
                        {item}
                      </li>
                    ))}
                  </Reveal>

                  <Reveal tag="div" delay={260} className="mt-6 flex flex-wrap gap-4">
                    <a
                      href="/contact"
                      className="group inline-flex min-h-[52px] items-center justify-center gap-3 px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white transition-[filter] duration-500 hover:brightness-110"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
                      }}
                    >
                      {t.discussScope}
                      <ArrowIcon />
                    </a>
                    <a
                      href="/projects"
                      className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-7 py-4 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08]"
                    >
                      {t.relatedWork}
                      <ArrowIcon />
                    </a>
                  </Reveal>
                </div>

                <div className="flex flex-col gap-6">
                  <Reveal clip className="relative aspect-[4/3] overflow-hidden bg-slab">
                    <img
                      src={service.image}
                      alt={`${service.title} carried out by BRU CO. on a construction site in Jeddah`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute left-5 top-5 bg-void/70 px-3 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow backdrop-blur-sm">
                      {service.number} / 04
                    </span>
                  </Reveal>

                  <Reveal tag="div" delay={120} className="grid grid-cols-3 gap-3">
                    {service.gallery.map((slug) => {
                      const found = projects.find((p) => p.slug === slug);
                      if (!found) return null;
                      const related = localize(found, locale);
                      return (
                        <a
                          key={slug}
                          href={`/projects/${related.slug}`}
                          className="group relative aspect-[4/3] overflow-hidden bg-slab"
                        >
                          <img
                            src={related.image}
                            alt={related.title}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                          />
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-gradient-to-t from-void/90 to-transparent"
                          />
                          <span className="absolute inset-x-0 bottom-0 p-3 text-[11px] font-medium leading-tight text-bone transition-colors duration-500 group-hover:text-azure-glow">
                            {related.title}
                          </span>
                        </a>
                      );
                    })}
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
