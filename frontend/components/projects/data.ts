import type { Locale } from "@/lib/locale";

export type ProjectCategory = "Residential" | "Commercial" | "Hospitality" | "Healthcare" | "F&B";

type ProjectAr = {
  title: string;
  displayTitle: string[];
  subtitle: string;
  teaser: string;
  description: string;
  client?: string;
  location: string;
  scope: string;
  size?: string;
};

export type Project = {
  slug: string;
  title: string;
  displayTitle: string[];
  category: ProjectCategory;
  subtitle: string;
  teaser: string;
  description: string;
  client?: string;
  location: string;
  scope: string;
  size?: string;
  image: string;
  featured?: boolean;
  ar: ProjectAr;
};

export const categoryLabels: Record<ProjectCategory | "All", { en: string; ar: string }> = {
  All: { en: "All", ar: "الكل" },
  Residential: { en: "Residential", ar: "سكني" },
  Commercial: { en: "Commercial", ar: "تجاري" },
  Hospitality: { en: "Hospitality", ar: "ضيافة" },
  Healthcare: { en: "Healthcare", ar: "رعاية صحية" },
  "F&B": { en: "F&B", ar: "مطاعم ومقاهٍ" },
};

export function categoryLabel(category: ProjectCategory | "All", locale: Locale) {
  return categoryLabels[category][locale];
}

export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Hospitality",
  "Healthcare",
  "F&B",
] as const;

export const projects: Project[] = [
  {
    slug: "chalets-durrat-al-arous",
    title: "Chalets Redevelopment, Durrat Al-Arous",
    displayTitle: ["Redevelopment and", "Implementation of Chalets", "in Durrat Al-Arous"],
    category: "Hospitality",
    subtitle: "Design & Build Project, Durrat Al-Arous",
    teaser: "24 chalets fully redesigned & executed, La Fontaine Hotels & Resorts.",
    description:
      "Redevelopment of 24 chalets, fully designed and executed by our team, transforming the property into a modern, cohesive, and luxurious destination through upgraded architecture, enhanced aesthetics, and integrated amenities. The project focuses on constructing modern chalets that blend contemporary architectural design with the natural beauty of the coastal surroundings. Each chalet is designed to maximize comfort and privacy, featuring spacious layouts, private terraces, and stunning views of the sea.",
    client: "La Fontaine Hotels & Resorts",
    location: "Durrat Al-Arous, Jeddah",
    scope: "Design & Build · Architecture · Finishing · Amenities",
    size: "24 chalets",
    image: "/images/spotlight-img1.avif",
    featured: true,
    ar: {
      title: "إعادة تطوير شاليهات، درة العروس",
      displayTitle: ["إعادة تطوير وتنفيذ", "شاليهات في", "درة العروس"],
      subtitle: "مشروع تصميم وتنفيذ، درة العروس",
      teaser: "24 شاليه أُعيد تصميمها وتنفيذها بالكامل، لافونتين للفنادق والمنتجعات.",
      description:
        "إعادة تطوير 24 شاليه، صُممت ونُفذت بالكامل بواسطة فريقنا، لتحويل الموقع إلى وجهة عصرية متناغمة وفاخرة عبر ترقية العمارة وتحسين الجماليات ودمج المرافق. يركّز المشروع على إنشاء شاليهات حديثة تمزج التصميم المعاصر بجمال الطبيعة الساحلية. صُمم كل شاليه لتحقيق أقصى قدر من الراحة والخصوصية، بمساحات رحبة وتراسات خاصة وإطلالات بحرية آسرة.",
      client: "لافونتين للفنادق والمنتجعات",
      location: "درة العروس، جدة",
      scope: "تصميم وتنفيذ · عمارة · تشطيبات · مرافق",
      size: "24 شاليه",
    },
  },
  {
    slug: "diyar-al-khayal-duplex-villas",
    title: "48 Duplex Villas Complex, Diyar Al Khayal",
    displayTitle: ["Construction Project of", "Residential Villa", "Complex"],
    category: "Residential",
    subtitle: "Residential Complex, 48 Duplex Villas",
    teaser: "Red brick construction, 2 floors + annex per unit.",
    description:
      "A residential development in collaboration with Diyar Al Khayal, featuring 48 duplex villas built with red brick construction. Each unit includes two floors and an annex, designed to offer durable, functional, and elegant living spaces for modern families.",
    client: "Diyar Al Khayal",
    location: "Jeddah, Saudi Arabia",
    scope: "Full Construction · Red Brick · Structural & Finishing",
    size: "48 duplex villas · 2 floors + annex each",
    image: "/images/work-img2.avif",
    featured: true,
    ar: {
      title: "مجمع 48 فيلا دوبلكس، ديار الخيال",
      displayTitle: ["مشروع إنشاء", "مجمع فلل", "سكنية"],
      subtitle: "مجمع سكني، 48 فيلا دوبلكس",
      teaser: "إنشاء بالطوب الأحمر، دوران وملحق لكل وحدة.",
      description:
        "تطوير سكني بالتعاون مع ديار الخيال، يضم 48 فيلا دوبلكس مبنية بالطوب الأحمر. تشمل كل وحدة دورين وملحقًا، بتصميم يوفّر مساحات معيشة متينة وعملية وأنيقة للعائلات العصرية.",
      client: "ديار الخيال",
      location: "جدة، السعودية",
      scope: "إنشاء كامل · طوب أحمر · أعمال إنشائية وتشطيبات",
      size: "48 فيلا دوبلكس · دوران وملحق لكل منها",
    },
  },
  {
    slug: "sixteen-contemporary-villas",
    title: "16 Contemporary Villas",
    displayTitle: ["Construction of", "Two Residential", "Villas"],
    category: "Residential",
    subtitle: "Modern Residential Villas, 16 Units",
    teaser: "Spacious, functional & elegantly finished living environments.",
    description:
      "Construction of 16 contemporary villas within a 16-villa development by a real estate developer, designed to deliver spacious, functional, and elegantly finished living environments.",
    client: "Private real estate developer",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architectural Works · Finishing",
    size: "16 villas",
    image: "/images/work-img3.avif",
    featured: true,
    ar: {
      title: "16 فيلا معاصرة",
      displayTitle: ["إنشاء", "فيلتين", "سكنيتين"],
      subtitle: "فلل سكنية حديثة، 16 وحدة",
      teaser: "بيئات معيشة رحبة وعملية وبتشطيب أنيق.",
      description:
        "إنشاء 16 فيلا معاصرة ضمن تطوير مكوّن من 16 فيلا لمطوّر عقاري، مصممة لتقديم بيئات معيشة رحبة وعملية وبتشطيبات أنيقة.",
      client: "مطوّر عقاري خاص",
      location: "جدة، السعودية",
      scope: "إنشاء · أعمال معمارية · تشطيبات",
      size: "16 فيلا",
    },
  },
  {
    slug: "sport-center-prince-sultan",
    title: "Sport Center, Prince Sultan Road",
    displayTitle: ["Sport", "Center"],
    category: "Commercial",
    subtitle: "Commercial Building, Prince Sultan Road",
    teaser: "Retail spaces + gym, structural phase design & build.",
    description:
      "Design & construction of the structural phase for a commercial building comprising retail spaces and a gym, delivering a robust structural system ready for full fit-out and operation.",
    location: "Prince Sultan Road, Jeddah",
    scope: "Design & Build · Structural Phase",
    size: "Retail + gym",
    image: "/images/work-img4.avif",
    featured: true,
    ar: {
      title: "المركز الرياضي، طريق الأمير سلطان",
      displayTitle: ["المركز", "الرياضي"],
      subtitle: "مبنى تجاري، طريق الأمير سلطان",
      teaser: "محلات تجارية وصالة رياضية، تصميم وتنفيذ المرحلة الإنشائية.",
      description:
        "تصميم وإنشاء المرحلة الإنشائية لمبنى تجاري يضم محلات تجارية وصالة رياضية، بتسليم نظام إنشائي متين جاهز للتشطيب الكامل والتشغيل.",
      location: "طريق الأمير سلطان، جدة",
      scope: "تصميم وتنفيذ · المرحلة الإنشائية",
      size: "محلات تجارية وصالة رياضية",
    },
  },
  {
    slug: "enaya-medical-building",
    title: "Enaya Medical Building",
    displayTitle: ["Enaya Medical", "Building"],
    category: "Healthcare",
    subtitle: "Healthcare Facility",
    teaser: "State-of-the-art healthcare facility, advanced infrastructure & modern design.",
    description:
      "The implementation of the Enaya Medical Building involves constructing a state-of-the-art healthcare facility designed to deliver top-tier medical services. The project emphasizes high-quality construction standards, advanced infrastructure, and modern design to ensure a safe, efficient, and patient-centered environment.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · MEP · Modern Design",
    image: "/images/work-img5.avif",
    featured: true,
    ar: {
      title: "مبنى عناية الطبي",
      displayTitle: ["مبنى عناية", "الطبي"],
      subtitle: "منشأة رعاية صحية",
      teaser: "منشأة صحية بأحدث المعايير، بنية تحتية متقدمة وتصميم عصري.",
      description:
        "يتضمن تنفيذ مبنى عناية الطبي إنشاء منشأة رعاية صحية بأحدث المعايير مصممة لتقديم خدمات طبية من الطراز الأول. يركّز المشروع على معايير إنشاء عالية الجودة وبنية تحتية متقدمة وتصميم عصري لضمان بيئة آمنة وفعّالة ومحورها المريض.",
      location: "جدة، السعودية",
      scope: "إنشاء · أعمال كهروميكانيكية · تصميم عصري",
    },
  },
  {
    slug: "asli-basha-restaurant",
    title: "Asli Basha Restaurant",
    displayTitle: ["Implementation of", "Asli Basha", "Restaurant"],
    category: "F&B",
    subtitle: "Façade & Interior",
    teaser: "Modern & traditional fusion, refined finishes reflecting authentic identity.",
    description:
      "The project involves the execution of both the façade and interior works for Asli Basha Restaurant. The design integrates modern elements with traditional touches to create a distinctive and inviting dining atmosphere. High-quality materials, refined finishes, and precise detailing were used to reflect the restaurant's authentic identity and enhance the overall customer experience.",
    location: "Jeddah, Saudi Arabia",
    scope: "Façade Works · Interior Works · Finishing",
    image: "/images/work-img6.avif",
    featured: true,
    ar: {
      title: "مطعم أصلي باشا",
      displayTitle: ["تنفيذ", "مطعم أصلي", "باشا"],
      subtitle: "الواجهة والتصميم الداخلي",
      teaser: "مزيج حديث وتقليدي، تشطيبات راقية تعكس هوية أصيلة.",
      description:
        "يتضمن المشروع تنفيذ أعمال الواجهة والديكور الداخلي لمطعم أصلي باشا. يدمج التصميم عناصر حديثة بلمسات تقليدية لخلق أجواء طعام مميزة وجاذبة. استُخدمت مواد عالية الجودة وتشطيبات راقية وتفاصيل دقيقة لتعكس الهوية الأصيلة للمطعم وترتقي بتجربة العملاء.",
      location: "جدة، السعودية",
      scope: "أعمال الواجهات · الأعمال الداخلية · التشطيبات",
    },
  },
  {
    slug: "naamah-bakery",
    title: "Naamah Bakery",
    displayTitle: ["Implementation of", "Naamah Bakery"],
    category: "F&B",
    subtitle: "Showroom, Façade & Interior",
    teaser: "Modern materials with warm wooden finishes, welcoming and elegant.",
    description:
      "The project involves the execution of the façade and interior works for Naamah Bakery Showroom. The design combines modern materials with warm wooden finishes to create a welcoming and elegant atmosphere. The interior layout and detailing were carefully implemented to reflect the brand's identity while ensuring functionality and high-quality craftsmanship.",
    location: "Jeddah, Saudi Arabia",
    scope: "Façade Works · Interior Works · Finishing",
    image: "/images/work-img7.avif",
    ar: {
      title: "مخبز نعمة",
      displayTitle: ["تنفيذ", "مخبز نعمة"],
      subtitle: "معرض، واجهة وتصميم داخلي",
      teaser: "مواد حديثة مع تشطيبات خشبية دافئة، أجواء جاذبة وأنيقة.",
      description:
        "يتضمن المشروع تنفيذ أعمال الواجهة والديكور الداخلي لمعرض مخبز نعمة. يجمع التصميم بين المواد الحديثة والتشطيبات الخشبية الدافئة لخلق أجواء جاذبة وأنيقة. نُفذت المخططات الداخلية والتفاصيل بعناية لتعكس هوية العلامة مع ضمان الوظيفية وجودة الحرفية.",
      location: "جدة، السعودية",
      scope: "أعمال الواجهات · الأعمال الداخلية · التشطيبات",
    },
  },
  {
    slug: "residential-building",
    title: "Residential Building",
    displayTitle: ["Implementation of", "a Residential", "Building"],
    category: "Residential",
    subtitle: "Residential Complex",
    teaser: "High-quality living space designed for comfort, functionality, and modern living.",
    description:
      "The implementation of a residential building focuses on constructing a high-quality living space designed for comfort, functionality, and modern living. This project aims to create a well-planned residential complex that meets contemporary housing needs while ensuring durability and aesthetic appeal.",
    location: "Jeddah, Saudi Arabia",
    scope: "Full Construction · Structural & Finishing",
    image: "/images/work-img8.avif",
    ar: {
      title: "مبنى سكني",
      displayTitle: ["تنفيذ", "مبنى", "سكني"],
      subtitle: "مجمع سكني",
      teaser: "مساحة معيشة عالية الجودة مصممة للراحة والوظيفية والحياة العصرية.",
      description:
        "يركّز تنفيذ المبنى السكني على إنشاء مساحة معيشة عالية الجودة مصممة للراحة والوظيفية والحياة العصرية. يهدف المشروع إلى إيجاد مجمع سكني جيد التخطيط يلبّي احتياجات السكن المعاصرة مع ضمان المتانة والجاذبية الجمالية.",
      location: "جدة، السعودية",
      scope: "إنشاء كامل · أعمال إنشائية وتشطيبات",
    },
  },
  {
    slug: "modern-residential-villa",
    title: "Modern Residential Villa",
    displayTitle: ["Construction", "Project of a", "Residential Villa"],
    category: "Residential",
    subtitle: "Modern & Contemporary Style",
    teaser: "Two floors, an annex, and an outdoor seating area, diverse high-quality materials.",
    description:
      "The project involves the construction of a residential villa designed in a modern and contemporary architectural style, showcasing the use of diverse high-quality materials. The villa consists of two floors, an annex, and an outdoor seating area, offering a balance of functionality, comfort, and elegant design.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architecture · Finishing",
    size: "2 floors + annex + outdoor seating",
    image: "/images/service1.avif",
    ar: {
      title: "فيلا سكنية حديثة",
      displayTitle: ["مشروع إنشاء", "فيلا", "سكنية"],
      subtitle: "طراز حديث ومعاصر",
      teaser: "دوران وملحق وجلسة خارجية، مواد متنوعة عالية الجودة.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية بطراز معماري حديث ومعاصر، تُبرز استخدام مواد متنوعة عالية الجودة. تتكوّن الفيلا من دورين وملحق وجلسة خارجية، بما يوازن بين الوظيفية والراحة والتصميم الأنيق.",
      location: "جدة، السعودية",
      scope: "إنشاء · عمارة · تشطيبات",
      size: "دوران + ملحق + جلسة خارجية",
    },
  },
  {
    slug: "residential-villa-elegant",
    title: "Residential Villa, Elegant Design",
    displayTitle: ["Construction", "Project of a", "Residential Villa"],
    category: "Residential",
    subtitle: "Elegant Design & Modern Aesthetics",
    teaser: "A residential villa characterized by an elegant design and modern aesthetics.",
    description: "The project involves the construction of a residential villa characterized by an elegant design and modern aesthetics.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Finishing",
    image: "/images/service2.avif",
    ar: {
      title: "فيلا سكنية، تصميم أنيق",
      displayTitle: ["مشروع إنشاء", "فيلا", "سكنية"],
      subtitle: "تصميم أنيق وجماليات عصرية",
      teaser: "فيلا سكنية تتميّز بتصميم أنيق وجماليات عصرية.",
      description: "يتضمن المشروع إنشاء فيلا سكنية تتميّز بتصميم أنيق وجماليات عصرية.",
      location: "جدة، السعودية",
      scope: "إنشاء · تشطيبات",
    },
  },
  {
    slug: "andalusian-islamic-villa",
    title: "Andalusian / Islamic Style Villa",
    displayTitle: ["Construction of an", "Andalusian / Islamic", "Style Villa"],
    category: "Residential",
    subtitle: "Andalusian / Islamic Architecture",
    teaser: "Arches, geometric patterns, and decorative motifs with modern functional layouts.",
    description:
      "The project involves the construction of a residential villa designed in an Andalusian/Islamic architectural style. The villa incorporates traditional Islamic design elements, including arches, geometric patterns, and decorative motifs, while providing modern functional layouts. The result is a harmonious living space that combines cultural heritage with comfort and elegance.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architectural Detailing · Finishing",
    image: "/images/service3.avif",
    featured: true,
    ar: {
      title: "فيلا بالطراز الأندلسي/الإسلامي",
      displayTitle: ["إنشاء فيلا", "بالطراز الأندلسي", "الإسلامي"],
      subtitle: "عمارة أندلسية/إسلامية",
      teaser: "عقود وزخارف هندسية ووحدات تشكيلية مع مخططات عملية حديثة.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية مصممة بطراز معماري أندلسي/إسلامي. تدمج الفيلا عناصر التصميم الإسلامي التقليدية، من عقود وزخارف هندسية ووحدات تشكيلية، مع توفير مخططات عملية حديثة. والنتيجة مساحة معيشة متناغمة تجمع بين التراث الثقافي والراحة والأناقة.",
      location: "جدة، السعودية",
      scope: "إنشاء · تفاصيل معمارية · تشطيبات",
    },
  },
  {
    slug: "semi-classic-villa",
    title: "Semi-Classic Style Villa",
    displayTitle: ["Construction", "of a Villa with", "Semi-Classic Style"],
    category: "Residential",
    subtitle: "Semi-Classical Architecture",
    teaser: "Traditional classical elements blended with modern design features.",
    description:
      "The project involves the construction of a residential villa designed with a semi-classical architectural style. The villa blends traditional classical elements with modern design features, providing spacious living areas, elegant finishes, and a comfortable, refined environment.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architectural Detailing · Finishing",
    image: "/images/service4.avif",
    ar: {
      title: "فيلا بالطراز شبه الكلاسيكي",
      displayTitle: ["إنشاء", "فيلا بالطراز", "شبه الكلاسيكي"],
      subtitle: "عمارة شبه كلاسيكية",
      teaser: "عناصر كلاسيكية تقليدية ممزوجة بملامح تصميم حديثة.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية مصممة بطراز معماري شبه كلاسيكي. تمزج الفيلا العناصر الكلاسيكية التقليدية بملامح التصميم الحديثة، مع مساحات معيشة رحبة وتشطيبات أنيقة وبيئة مريحة وراقية.",
      location: "جدة، السعودية",
      scope: "إنشاء · تفاصيل معمارية · تشطيبات",
    },
  },
  {
    slug: "neoclassical-villa",
    title: "Neoclassical Villa",
    displayTitle: ["Construction", "of a", "Neoclassical Villa"],
    category: "Residential",
    subtitle: "Neoclassical Architecture",
    teaser: "Elegant classical elements combined with modern functionality.",
    description:
      "The project involves the construction of a residential villa designed in a neoclassical architectural style. The villa combines elegant classical elements with modern functionality, offering spacious living areas, refined finishes, and a luxurious and comfortable environment.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architectural Detailing · Finishing",
    image: "/images/about-img1.avif",
    ar: {
      title: "فيلا كلاسيكية حديثة",
      displayTitle: ["إنشاء", "فيلا", "كلاسيكية حديثة"],
      subtitle: "عمارة كلاسيكية حديثة",
      teaser: "عناصر كلاسيكية أنيقة مع وظيفية عصرية.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية مصممة بطراز معماري كلاسيكي حديث. تجمع الفيلا بين العناصر الكلاسيكية الأنيقة والوظيفية العصرية، مع مساحات معيشة رحبة وتشطيبات راقية وبيئة فاخرة ومريحة.",
      location: "جدة، السعودية",
      scope: "إنشاء · تفاصيل معمارية · تشطيبات",
    },
  },
  {
    slug: "courtyard-villa",
    title: "Residential Villa with Courtyard",
    displayTitle: ["Construction", "of a Residential", "Villa with Courtyard"],
    category: "Residential",
    subtitle: "Private Courtyard Typology",
    teaser: "Modern architecture integrating outdoor space for relaxation and gatherings.",
    description:
      "The project involves the construction of a residential villa featuring a private courtyard. The design combines modern architectural elements with functional layouts, creating a comfortable and stylish living environment that integrates outdoor space for relaxation and social gatherings.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architecture · Landscape Integration",
    image: "/images/about-hero-banner.avif",
    ar: {
      title: "فيلا سكنية بفناء داخلي",
      displayTitle: ["إنشاء", "فيلا سكنية", "بفناء داخلي"],
      subtitle: "نمط الفناء الخاص",
      teaser: "عمارة حديثة تدمج المساحة الخارجية للاسترخاء والتجمّعات.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية بفناء خاص. يجمع التصميم بين العناصر المعمارية الحديثة والمخططات العملية، ليخلق بيئة معيشة مريحة وأنيقة تدمج المساحة الخارجية للاسترخاء والتجمّعات الاجتماعية.",
      location: "جدة، السعودية",
      scope: "إنشاء · عمارة · دمج التنسيق الخارجي",
    },
  },
  {
    slug: "two-residential-villas",
    title: "Two Residential Villas",
    displayTitle: ["Construction", "of Two", "Residential Villas"],
    category: "Residential",
    subtitle: "Contemporary Pair",
    teaser: "Two modern villas with contemporary elements and functional layouts.",
    description:
      "The project involves the construction of two modern residential villas, each designed with contemporary architectural elements and functional layouts. The villas provide spacious living areas, elegant finishes, and comfortable environments that combine style with practicality.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architecture · Finishing",
    size: "2 villas",
    image: "/images/why-choose-bg.avif",
    ar: {
      title: "فيلتان سكنيتان",
      displayTitle: ["إنشاء", "فيلتين", "سكنيتين"],
      subtitle: "ثنائية معاصرة",
      teaser: "فيلتان حديثتان بعناصر معاصرة ومخططات عملية.",
      description:
        "يتضمن المشروع إنشاء فيلتين سكنيتين حديثتين، كل منهما مصممة بعناصر معمارية معاصرة ومخططات عملية. توفّر الفيلتان مساحات معيشة رحبة وتشطيبات أنيقة وبيئات مريحة تجمع بين الأناقة والعملية.",
      location: "جدة، السعودية",
      scope: "إنشاء · عمارة · تشطيبات",
      size: "فيلتان",
    },
  },
  {
    slug: "modern-villa",
    title: "Modern Villa",
    displayTitle: ["Construction", "of a", "Modern Villa"],
    category: "Residential",
    subtitle: "Wooden Elements & Façade Lighting",
    teaser: "Integrated wooden elements and façade lighting per the architectural design.",
    description:
      "The project involves the construction of a modern residential villa, featuring integrated wooden elements and façade lighting as per the architectural design. The villa combines contemporary aesthetics with functional layouts, enhancing both the visual appeal and the overall living experience.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Joinery · Façade Lighting · Finishing",
    image: "/images/work-img1.avif",
    featured: true,
    ar: {
      title: "فيلا حديثة",
      displayTitle: ["إنشاء", "فيلا", "حديثة"],
      subtitle: "عناصر خشبية وإنارة واجهات",
      teaser: "عناصر خشبية مدمجة وإنارة واجهات وفق التصميم المعماري.",
      description:
        "يتضمن المشروع إنشاء فيلا سكنية حديثة، بعناصر خشبية مدمجة وإنارة للواجهات وفق التصميم المعماري. تجمع الفيلا بين الجماليات المعاصرة والمخططات العملية، بما يعزّز المظهر البصري وتجربة المعيشة عمومًا.",
      location: "جدة، السعودية",
      scope: "إنشاء · نجارة · إنارة واجهات · تشطيبات",
    },
  },
  {
    slug: "modern-duplex-villa",
    title: "Modern Duplex Villa",
    displayTitle: ["Construction", "of a Modern", "Duplex Villa"],
    category: "Residential",
    subtitle: "Contemporary Duplex",
    teaser: "Spacious living areas, stylish finishes, balanced aesthetics and practicality.",
    description:
      "The project involves the construction of a modern duplex villa, designed with contemporary architectural elements and functional layouts. The villa offers spacious living areas, stylish finishes, and a comfortable environment that balances aesthetics and practicality.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architecture · Finishing",
    image: "/images/work-img2.avif",
    ar: {
      title: "فيلا دوبلكس حديثة",
      displayTitle: ["إنشاء", "فيلا دوبلكس", "حديثة"],
      subtitle: "دوبلكس معاصر",
      teaser: "مساحات معيشة رحبة وتشطيبات أنيقة وتوازن بين الجمال والعملية.",
      description:
        "يتضمن المشروع إنشاء فيلا دوبلكس حديثة، مصممة بعناصر معمارية معاصرة ومخططات عملية. توفّر الفيلا مساحات معيشة رحبة وتشطيبات أنيقة وبيئة مريحة توازن بين الجماليات والعملية.",
      location: "جدة، السعودية",
      scope: "إنشاء · عمارة · تشطيبات",
    },
  },
  {
    slug: "modern-duplex-villa-ii",
    title: "Modern Duplex Villa II",
    displayTitle: ["Construction", "of a Modern", "Duplex Villa"],
    category: "Residential",
    subtitle: "Contemporary Duplex",
    teaser: "Spacious living areas, stylish finishes, balanced aesthetics and practicality.",
    description:
      "The project involves the construction of a modern duplex villa, designed with contemporary architectural elements and functional layouts. The villa offers spacious living areas, stylish finishes, and a comfortable environment that balances aesthetics and practicality.",
    location: "Jeddah, Saudi Arabia",
    scope: "Construction · Architecture · Finishing",
    image: "/images/work-img3.avif",
    ar: {
      title: "فيلا دوبلكس حديثة II",
      displayTitle: ["إنشاء", "فيلا دوبلكس", "حديثة"],
      subtitle: "دوبلكس معاصر",
      teaser: "مساحات معيشة رحبة وتشطيبات أنيقة وتوازن بين الجمال والعملية.",
      description:
        "يتضمن المشروع إنشاء فيلا دوبلكس حديثة، مصممة بعناصر معمارية معاصرة ومخططات عملية. توفّر الفيلا مساحات معيشة رحبة وتشطيبات أنيقة وبيئة مريحة توازن بين الجماليات والعملية.",
      location: "جدة، السعودية",
      scope: "إنشاء · عمارة · تشطيبات",
    },
  },
];

export type LocalizedProject = Omit<Project, "ar">;

export function localize(project: Project, locale: Locale): LocalizedProject {
  if (locale === "en") {
    const { ar: _ar, ...rest } = project;
    return rest;
  }
  const { ar, ...rest } = project;
  return {
    ...rest,
    title: ar.title,
    displayTitle: ar.displayTitle,
    subtitle: ar.subtitle,
    teaser: ar.teaser,
    description: ar.description,
    client: ar.client ?? rest.client,
    location: ar.location,
    scope: ar.scope,
    size: ar.size ?? rest.size,
  };
}

export function projectCity(project: LocalizedProject) {
  return project.location.split(/[,،]/)[0].trim();
}

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function adjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: undefined, next: undefined };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}

export function spotlightProjects(): Project[] {
  const featured = projects.filter((p) => p.featured);
  const seen = new Set<string>();
  const distinct = featured.filter((p) => {
    if (seen.has(p.category)) return false;
    seen.add(p.category);
    return true;
  });
  const rest = featured.filter((p) => !distinct.includes(p));
  return [...distinct, ...rest].slice(0, 3);
}

const DISCIPLINE_SLUGS = [
  {
    slug: "structural-construction-works",
    label: { en: "Structural & Construction Works", ar: "الأعمال الإنشائية والبناء" },
    number: "01",
    keywords: ["structural", "full construction", "red brick"],
  },
  {
    slug: "architectural-works",
    label: { en: "Architectural Works", ar: "الأعمال المعمارية" },
    number: "02",
    keywords: ["architect", "landscape"],
  },
  {
    slug: "electromechanical-works",
    label: { en: "Electromechanical Works", ar: "الأعمال الكهروميكانيكية" },
    number: "03",
    keywords: ["mep", "electromechanical"],
  },
  {
    slug: "interior-finishing-works",
    label: { en: "Interior & Finishing Works", ar: "التصميم الداخلي والتشطيبات" },
    number: "04",
    keywords: ["finishing", "interior", "façade", "joinery", "amenities"],
  },
] as const;

export function scopeDisciplines(project: Project) {
  const scopeLower = project.scope.toLowerCase();
  return DISCIPLINE_SLUGS.filter((d) => d.keywords.some((k) => scopeLower.includes(k)));
}

const GALLERY_POOL = [
  "/images/work-img1.avif",
  "/images/work-img2.avif",
  "/images/work-img3.avif",
  "/images/work-img4.avif",
  "/images/work-img5.avif",
  "/images/work-img6.avif",
  "/images/work-img7.avif",
  "/images/work-img8.avif",
  "/images/service1.avif",
  "/images/service2.avif",
  "/images/service3.avif",
  "/images/service4.avif",
  "/images/spotlight-img1.avif",
  "/images/about-img1.avif",
  "/images/about-hero-banner.avif",
  "/images/why-choose-bg.avif",
];

export function galleryImages(project: Project, count = 6) {
  let seed = 0;
  for (let i = 0; i < project.slug.length; i += 1) seed = (seed * 31 + project.slug.charCodeAt(i)) >>> 0;
  const images = [project.image];
  for (let i = 0; i < count - 1; i += 1) {
    images.push(GALLERY_POOL[(seed + i) % GALLERY_POOL.length]);
  }
  return images;
}
