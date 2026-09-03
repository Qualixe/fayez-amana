import type { Locale } from "@/lib/locale";

export type LocalizedOption = { value: string; en: string; ar: string };

export function optionLabel(option: LocalizedOption, locale: Locale) {
  return locale === "ar" ? option.ar : option.en;
}

export const scopeOptions: LocalizedOption[] = [
  { value: "Structural & Construction Works", en: "Structural & Construction Works", ar: "الأعمال الإنشائية والبناء" },
  { value: "Architectural Works", en: "Architectural Works", ar: "الأعمال المعمارية" },
  { value: "Electromechanical Works", en: "Electromechanical Works", ar: "الأعمال الكهروميكانيكية" },
  { value: "Interior & Finishing Works", en: "Interior & Finishing Works", ar: "التصميم الداخلي والتشطيبات" },
  { value: "Full design & build", en: "Full design & build", ar: "التصميم والتنفيذ الكامل" },
  { value: "Other", en: "Other", ar: "أخرى" },
];

export const budgetOptions: LocalizedOption[] = [
  { value: "Under SAR 1M", en: "Under SAR 1M", ar: "أقل من مليون ريال" },
  { value: "SAR 1M – 5M", en: "SAR 1M – 5M", ar: "1 – 5 مليون ريال" },
  { value: "SAR 5M – 20M", en: "SAR 5M – 20M", ar: "5 – 20 مليون ريال" },
  { value: "SAR 20M+", en: "SAR 20M+", ar: "أكثر من 20 مليون ريال" },
  { value: "Not sure yet", en: "Not sure yet", ar: "غير محدد بعد" },
];

export const sectorOptions: LocalizedOption[] = [
  { value: "Residential", en: "Residential", ar: "سكني" },
  { value: "Commercial", en: "Commercial", ar: "تجاري" },
  { value: "Hospitality", en: "Hospitality", ar: "ضيافة" },
  { value: "Healthcare", en: "Healthcare", ar: "رعاية صحية" },
  { value: "F&B", en: "F&B", ar: "مطاعم ومقاهٍ" },
  { value: "Sports Facilities", en: "Sports Facilities", ar: "منشآت رياضية" },
];

export const trustItems: { title: { en: string; ar: string }; body: { en: string; ar: string } }[] = [
  {
    title: { en: "Confidential", ar: "سرية تامة" },
    body: { en: "Your project information is kept private.", ar: "تُحفظ معلومات مشروعك بسرية تامة." },
  },
  {
    title: { en: "Response time", ar: "زمن الاستجابة" },
    body: { en: "We typically respond within one business day.", ar: "نستجيب عادة خلال يوم عمل واحد." },
  },
  {
    title: { en: "Experienced engineers", ar: "مهندسون ذوو خبرة" },
    body: { en: "25+ years delivering complex projects.", ar: "أكثر من 25 عامًا في تنفيذ المشاريع المعقدة." },
  },
];

export const disciplines: { en: string; ar: string }[] = [
  { en: "Structural & Construction Works", ar: "الأعمال الإنشائية والبناء" },
  { en: "Architectural Works", ar: "الأعمال المعمارية" },
  { en: "Electromechanical Works", ar: "الأعمال الكهروميكانيكية" },
  { en: "Interior Design & Finishing", ar: "التصميم الداخلي والتشطيبات" },
];

export const faqIntro = {
  kicker: { en: "FAQ", ar: "الأسئلة الشائعة" },
  headline: {
    en: ["Common", "questions."],
    ar: ["أسئلة", "شائعة."],
  },
  lede: {
    en: "What clients ask before they build with BRU CO., from where we work to how a project is delivered.",
    ar: "ما يسأله العملاء قبل البناء مع BRU CO.، من أماكن عملنا إلى طريقة تسليم المشروع.",
  },
} as const;

export const faqs: { q: { en: string; ar: string }; a: { en: string; ar: string } }[] = [
  {
    q: { en: "Where does BRU CO. work?", ar: "أين تعمل BRU CO.؟" },
    a: {
      en: "BRU CO. is based in Jeddah and delivers construction and contracting projects across Jeddah, Makkah and the wider Kingdom of Saudi Arabia.",
      ar: "يقع مقر BRU CO. في جدة، وتنفّذ مشاريع البناء والمقاولات في جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية.",
    },
  },
  {
    q: { en: "What does BRU CO. do as a general contractor?", ar: "ماذا تقدّم BRU CO. بصفتها مقاولًا عامًا؟" },
    a: {
      en: "We deliver integrated construction under one roof, from foundation to finish: structural and construction works, architectural works, electromechanical (MEP) systems, and interior and finishing.",
      ar: "نقدّم إنشاءً متكاملًا تحت مظلة واحدة، من الأساسات حتى التشطيب: الأعمال الإنشائية والبناء، الأعمال المعمارية، الأنظمة الكهروميكانيكية (MEP)، والتصميم الداخلي والتشطيبات.",
    },
  },
  {
    q: { en: "What types of projects do you build?", ar: "ما أنواع المشاريع التي تنفّذونها؟" },
    a: {
      en: "Residential and villa construction, commercial buildings, hospitality, healthcare and F&B fit-out, and industrial and public works. More than 300 completed projects to date.",
      ar: "بناء الفلل والمشاريع السكنية، والمباني التجارية، والضيافة، والرعاية الصحية، وتجهيزات المطاعم والمقاهي، والأعمال الصناعية والعامة. أكثر من 300 مشروع منجز حتى الآن.",
    },
  },
  {
    q: { en: "Do you offer design-build and turnkey delivery?", ar: "هل تقدّمون خدمة التصميم والتنفيذ وتسليم المفتاح؟" },
    a: {
      en: "Yes. We take projects from concept and design through to a completed, handed-over building, coordinating architecture, structure and MEP as a single turnkey package.",
      ar: "نعم. نأخذ المشاريع من الفكرة والتصميم وحتى تسليم مبنى مكتمل، وننسّق بين التصميم المعماري والإنشائي والكهروميكانيكي ضمن حزمة واحدة بنظام تسليم مفتاح.",
    },
  },
  {
    q: { en: "Is BRU CO. licensed and certified?", ar: "هل BRU CO. مرخّصة ومعتمدة؟" },
    a: {
      en: "Yes. BRU CO. is certified to ISO (International Organization for Standardization) standards in quality, safety and environmental management, a member of the Saudi Contractors Authority, and formally classified for structural, architectural and MEP works.",
      ar: "نعم. BRU CO. معتمدة وفق مواصفات الآيزو (المنظمة الدولية للمعايير) للجودة والسلامة والبيئة، وهي عضو في الهيئة السعودية للمقاولين، ومصنّفة رسميًا في الأعمال الإنشائية والمعمارية والكهروميكانيكية.",
    },
  },
  {
    q: { en: "How is a construction project delivered?", ar: "كيف يُسلَّم المشروع الإنشائي؟" },
    a: {
      en: "Our structural (shell) phase follows a documented 21-stage programme from excavation to a completed structure, followed by the finishing programme through to handover, with continuous quality inspection at every stage.",
      ar: "تسير مرحلة العظم وفق برنامج موثق من 21 مرحلة، من الحفر حتى اكتمال الهيكل، تليها مرحلة التشطيب حتى التسليم، مع فحص جودة مستمر في كل مرحلة.",
    },
  },
  {
    q: { en: "How do I request a quote or start a project?", ar: "كيف أطلب عرض سعر أو أبدأ مشروعًا؟" },
    a: {
      en: "Call us on +966 55 535 2526 or send your project details through the enquiry form on this page. Project enquiries submitted through this form are delivered directly to BRU's project team.",
      ar: "تواصل معنا عبر +966 55 535 2526 أو أرسل تفاصيل مشروعك عبر نموذج الاستفسار في هذه الصفحة. تصل الاستفسارات المُرسَلة عبر هذا النموذج مباشرة إلى فريق مشاريع BRU.",
    },
  },
];
