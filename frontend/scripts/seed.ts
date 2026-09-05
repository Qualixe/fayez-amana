/**
 * One-time import of all site content into Supabase.
 * Run after applying every file under supabase/migrations/:
 *
 *   npx tsx scripts/seed.ts
 *
 * Safe to re-run: upserts by slug/id, so it won't create duplicates.
 */
import { config } from "dotenv";
config({ path: ".env.local" });

import { createAdminClient } from "../lib/supabase/admin";

type SeedProject = {
  slug: string;
  title: string;
  displayTitle: string[];
  category: "Residential" | "Commercial" | "Hospitality" | "Healthcare" | "F&B";
  subtitle: string;
  teaser: string;
  description: string;
  client?: string;
  location: string;
  scope: string;
  size?: string;
  image: string;
  featured?: boolean;
  ar: {
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
};

const projects: SeedProject[] = [
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

type SeedService = {
  slug: string;
  number: string;
  title: string;
  description: string;
  capabilities: string[];
  image: string;
  gallery: string[];
  ar: { title: string; description: string; capabilities: string[] };
};

const services: SeedService[] = [
  {
    slug: "structural-construction-works",
    number: "01",
    title: "Structural & Construction Works",
    description:
      "Establishing and building projects to the highest specifications and structural standards. Full concrete and steel execution, from excavation and foundation setting through the reinforced-concrete frame to a completed structural shell.",
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
    ar: {
      title: "الأعمال الإنشائية والبناء",
      description:
        "تأسيس وبناء المشاريع بأعلى المواصفات والمعايير الإنشائية. تنفيذ كامل للخرسانة والحديد، من الحفر وتأسيس الأساسات مرورًا بالهيكل الخرساني حتى اكتمال الهيكل الإنشائي.",
      capabilities: [
        "الحفر والأعمال الترابية حتى منسوب التأسيس المحدد بتقرير التربة",
        "اختبار التحميل والتحقق من تحمل التربة",
        "أساسات لبشة مسلحة وقواعد منفصلة",
        "رقاب الأعمدة والأعمدة والميدات والأسقف المعلقة",
        "الردم بطبقات مدكوكة بسمك 30 سم وفق الكود",
        "تنفيذ الحديد والخرسانة الإنشائية",
      ],
    },
  },
  {
    slug: "architectural-works",
    number: "02",
    title: "Architectural Works",
    description:
      "Designing and executing architectural structures with precision, from concept to built reality, merging form with function. Our architects work alongside the site teams so the drawing and the building never drift apart.",
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
    ar: {
      title: "الأعمال المعمارية",
      description:
        "تصميم وتنفيذ الهياكل المعمارية بدقة، من الفكرة حتى الواقع المبني، بالجمع بين الشكل والوظيفة. يعمل معماريونا جنبًا إلى جنب مع فرق الموقع حتى لا يتباعد المخطط عن المبنى.",
      capabilities: [
        "التصميم المعماري المفاهيمي والتخطيطي",
        "تسليم التصميم والتنفيذ",
        "تصميم وتنفيذ الواجهات",
        "طرز معاصرة وكلاسيكية حديثة وشبه كلاسيكية وأندلسية/إسلامية",
        "الالتزام بالمخطط المعماري المعتمد في الموقع",
        "تحديد أبعاد الغرف والحمامات والمطابخ وفق المخطط",
      ],
    },
  },
  {
    slug: "electromechanical-works",
    number: "03",
    title: "Electromechanical Works",
    description:
      "Implementing advanced mechanical, electrical and plumbing (MEP) systems: heating, ventilation and air conditioning (HVAC), water supply, drainage and power distribution, with top-tier quality and compliance. Sanitary extensions are executed strictly per the sanitary drawings, covering water supply systems and their maintenance, sewage, and air-conditioning and heating drainage.",
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
    ar: {
      title: "الأعمال الكهروميكانيكية",
      description:
        "تنفيذ أنظمة ميكانيكية وكهربائية وسباكة متطورة (MEP): التكييف والتهوية، إمدادات المياه، الصرف، وتوزيع الطاقة، بأعلى مستويات الجودة والالتزام. تُنفَّذ التمديدات الصحية بدقة وفق المخططات الصحية المعتمدة، وتشمل أنظمة المياه وصيانتها والصرف الصحي وصرف التكييف والتدفئة.",
      capabilities: [
        "التمديدات الصحية وفق المخططات الصحية المعتمدة",
        "أنظمة إمداد المياه وصيانتها",
        "أنظمة الصرف الصحي والتصريف",
        "صرف أنظمة التكييف والتدفئة",
        "توزيع الطاقة والتمديدات الكهربائية",
        "أنظمة التكييف (HVAC)",
      ],
    },
  },
  {
    slug: "interior-finishing-works",
    number: "04",
    title: "Interior & Finishing Works",
    description:
      "High-quality interior and exterior finishes with meticulous detail, plus full interior design implementation. The finishing stage consists of several precise steps that begin with preparatory works and end with handing over the project ready for use.",
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
    ar: {
      title: "التصميم الداخلي والتشطيبات",
      description:
        "تشطيبات داخلية وخارجية عالية الجودة بدقة متناهية، إضافة إلى تنفيذ كامل للتصميم الداخلي. تتكوّن مرحلة التشطيب من خطوات دقيقة تبدأ بالأعمال التحضيرية وتنتهي بتسليم المشروع جاهزًا للاستخدام.",
      capabilities: [
        "تنفيذ كامل للتصميم الداخلي",
        "التشطيبات الداخلية والخارجية",
        "أعمال الواجهات",
        "النجارة والعناصر الخشبية وإضاءة الواجهات",
        "ضبط جودة المواد والالتزام بالتصميم المعتمد",
        "إشراف مستمر لتنسيق جميع الحرف",
      ],
    },
  },
];

const teamCategories = [
  { role: "Architects", role_ar: "مهندس معماري", count: 8 },
  { role: "Civil Engineers", role_ar: "مهندس مدني", count: 5 },
  { role: "Electrical Engineers", role_ar: "مهندس كهربائي", count: 2 },
  { role: "Mechanical Engineer", role_ar: "مهندس ميكانيكي", count: 1 },
  { role: "Interior Designers", role_ar: "مصمم داخلي", count: 3 },
  { role: "Survey Engineer", role_ar: "مهندس مساحة", count: 1 },
  { role: "Site Supervisors", role_ar: "مشرف موقع", count: 7 },
  { role: "Site Workers", role_ar: "عامل موقع", count: 57 },
];

const aboutSettings = {
  eyebrow: "Technical Team Breakdown",
  eyebrow_ar: "توزيع الفريق الفني",
  title: "Management & Technical Team",
  title_ar: "الإدارة والفريق الفني",
  lede: "A multidisciplinary team of engineers, architects, project managers, and skilled professionals dedicated to delivering excellence on every project.",
  lede_ar: "فريق متعدد التخصصات من المهندسين والمعماريين ومديري المشاريع والكوادر الفنية الماهرة، ملتزم بتقديم التميّز في كل مشروع.",
  total_count: 80,
  total_label: "Total Team Members",
  total_label_ar: "إجمالي أعضاء الفريق",
  management_title: "Management",
  management_title_ar: "الإدارة",
  management_body: "Executive leadership guiding strategy, client relationships, and project oversight",
  management_body_ar: "قيادة تنفيذية توجّه الاستراتيجية وعلاقات العملاء والإشراف على المشاريع",
  admin_title: "Admin Staff: 31",
  admin_title_ar: "الكادر الإداري: 31",
  admin_body: "Supporting operations, contracts, procurement, and project coordination",
  admin_body_ar: "دعم العمليات والعقود والمشتريات وتنسيق المشاريع",
};

const founder = {
  eyebrow: "CEO Speech",
  eyebrow_ar: "كلمة الرئيس التنفيذي",
  title: "A Word From Our Founder",
  title_ar: "كلمة من مؤسسنا",
  name: "Eng. Khalid Badr Al-Deen",
  name_ar: "المهندس خالد بدر الدين",
  role: "CEO & Co-Founder",
  role_ar: "الرئيس التنفيذي والمؤسس المشارك",
  quote: "“Since the establishment of BRU in the year 2000, I have been determined to work with dedication and integrity, attracting top qualified talents, while training and empowering ambitious young Saudi professionals and refining their practical capabilities.”",
  quote_ar: "«منذ تأسيس BRU عام 2000، وأنا مصمم على العمل بتفانٍ ونزاهة، واستقطاب أفضل الكفاءات، مع تدريب وتمكين الشباب السعودي الطموح وصقل قدراتهم العملية.»",
  p1: "This foundation marked the beginning of realizing our aspirations. With the grace of Allah Almighty, the company has continued to thrive and has become one of the entities making a real difference in development.",
  p1_ar: "شكّل هذا التأسيس بداية تحقيق طموحاتنا. وبفضل الله عز وجل، واصلت الشركة ازدهارها وأصبحت من الجهات التي تُحدث فرقًا حقيقيًا في التنمية.",
  p2: "Aligned with Saudi Vision 2030, we remain committed to delivering innovative solutions, strengthening the private sector's role in urban development, and building a sustainable future for our nation.",
  p2_ar: "انسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بتقديم حلول مبتكرة، وتعزيز دور القطاع الخاص في التنمية العمرانية، وبناء مستقبل مستدام لوطننا.",
  photo: "/images/work-img1.avif",
};

const certifications = [
  { number: "01", title: "Commercial Registration", title_ar: "السجل التجاري", description: "Officially registered with Saudi authorities, legal and regulatory compliance confirmed", description_ar: "مسجّلة رسميًا لدى الجهات السعودية، مع تأكيد الامتثال القانوني والتنظيمي" },
  { number: "02", title: "Certified Contractor Membership Certificate", title_ar: "شهادة عضوية مقاول معتمد", description: "Member of the Saudi Contractors Authority, recognized professional contractor status", description_ar: "عضو في الهيئة السعودية للمقاولين، بصفة مقاول محترف معترف بها" },
  { number: "03", title: "Contractor Classification Certificate", title_ar: "شهادة تصنيف المقاولين", description: "Formally classified by regulatory bodies for structural, architectural, and MEP works", description_ar: "مصنّفة رسميًا من الجهات التنظيمية للأعمال الإنشائية والمعمارية والكهروميكانيكية" },
  { number: "04", title: "ISO Certification", title_ar: "شهادة ISO", description: "International standards certification for quality management, safety, and environmental responsibility", description_ar: "شهادة معايير دولية لإدارة الجودة والسلامة والمسؤولية البيئية" },
  { number: "05", title: "Engineers Qualifications & Memberships", title_ar: "مؤهلات وعضويات المهندسين", description: "All engineers have verified professional qualifications and active memberships with relevant bodies", description_ar: "جميع المهندسين لديهم مؤهلات مهنية موثقة وعضويات فعّالة في الجهات ذات الصلة" },
  { number: "06", title: "Saudization Certificate", title_ar: "شهادة السعودة", description: "Compliant with Saudi nationalization requirements, investing in Saudi talent and workforce", description_ar: "ملتزمة بمتطلبات التوطين السعودية، والاستثمار في الكفاءات والكوادر الوطنية" },
];

const clients = [
  { name: "Starbucks", image: "/images/client-img1.avif" },
  { name: "Saudi National Bank", image: "/images/client-img2.avif" },
  { name: "Makarem Hotels", image: "/images/client-img3.avif" },
  { name: "La Fontaine Hotels & Resorts", image: "/images/client-img4.avif" },
  { name: "Diyar Al Khayyal", image: "/images/client-img5.avif" },
  { name: "Manazil", image: "/images/client-img6.avif" },
  { name: "Chef Adnan Yamani", image: "/images/client-img7.avif" },
  { name: "Neamah", image: "/images/client-img8.avif" },
  { name: "Al Mukmal", image: "/images/client-img9.avif" },
  { name: "Thiyab", image: "/images/client-img10.avif" },
  { name: "Saudi Enaya", image: "/images/client-img11.avif" },
];

const processStages = [
  { no: 1, title: "Site Setup & Permits", title_ar: "تجهيز الموقع", body: "A hoarding is erected around the full site boundary, with water and electricity sources provided, the site licence and project identification board prepared, and any municipality procedures, such as pavement rental, cleared to prevent violations.", body_ar: "وضع ساتر على كامل حدود الموقع مع توفير مصدر مياه وكهرباء وتجهيز رخصة الموقع واللوحة التعريفية بالمشروع وتخليص أي إجراءات خاصة بالبلدية ك (استئجار الرصيف) منعًا للمخالفات." },
  { no: 2, title: "Reaching Founding Level", title_ar: "الوصول لمنسوب التأسيس", body: "Excavation down to the founding level listed in the soil report.", body_ar: "هو الوصول إلى منسوب التأسيس المدرج بتقرير التربة." },
  { no: 3, title: "Plate Load Test", title_ar: "اختبار التحميل", body: "Load testing: the purpose is to verify the bearing capacity of the soil and the permissible settlement, and whether these are within the safe limits assumed by the design.", body_ar: "اختبار التحميل: الغرض من الاختبار هو التأكد من قدرة تحمل التربة والهبوط المسموح به وهل هو في الحدود الآمنة وفقًا للتصميم أم لا." },
  { no: 4, title: "Anti-Termite Treatment", title_ar: "رش المبيد", body: "Pesticide is sprayed in three stages, before the site blinding concrete, before casting the tie beams, and before the ground-floor blinding, to protect against termites and insects emerging from the soil.", body_ar: "يتم رش المبيد على ثلاث مراحل: قبل صبة النظافة للموقع، وقبل صب الميدات، وقبل صبة النظافة للدور الأرضي، وذلك للحماية من النمل الأبيض والحشرات الخروج من التربة." },
  { no: 5, title: "Polythene Membrane", title_ar: "فرش النايلون", body: "The polythene sheet forms an insulating layer between the blinding concrete and the soil, retaining the mix water so the soil cannot absorb it.", body_ar: "الغرض من فرش النايلون هو عمل طبقة عازلة بين صبة النظافة والتربة حتى يتم الحفاظ على مياه الخلطة حتى لا تمتصها التربة." },
  { no: 6, title: "Blinding Concrete", title_ar: "صبة النظافة", body: "Blinding concrete protects the main foundations from the soil beneath them, since moisture and chemicals present, such as sulphates, can attack and weaken the concrete.", body_ar: "صبة النظافة: الغرض منها حماية الأساسات الرئيسية من التربة أدناها، حيث أن الرطوبة والمواد الكيميائية الموجودة مثل الكبريتات قد تهاجم الخرسانة ويمكن أن تضعفها." },
  { no: 7, title: "Reinforced Raft Foundation", title_ar: "اللبشة المسلحة", body: "The reinforced raft: the footings distribute the structure's large, concentrated loads over a greater area so the loading intensity does not exceed the safe bearing capacity of the founding soil.", body_ar: "اللبشة المسلحة: تقوم القواعد بتوزيع أحمال الهيكل الكبيرة والمركزة على مساحة أكبر بحيث لا تتجاوز شدة التحميل قدرة التحمل الآمنة لتربة التأسيس." },
  { no: 8, title: "Column Necks", title_ar: "رقاب الأعمدة", body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.", body_ar: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس." },
  { no: 9, title: "Column Necks, Execution", title_ar: "رقاب الأعمدة", body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.", body_ar: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس." },
  { no: 10, title: "Backfilling Works", title_ar: "أعمال الردم (الدفان)", body: "Backfilling: 1, coarse, well-graded granular soil comprising gravel and sand is preferred and considered among the best fill types; a classification test is run on the fill sample, ideally of type (a-1-a). 2, the fill is placed in 30 cm layers in accordance with the code.", body_ar: "أعمال الردم (الدفان): 1- يفضل استخدام التربة الحبيبة الخشنة المتدرجة التي تشمل كلًا من الحصى والتربة الرملية وتعد من أفضل أنواع الدفان، كما يتم عمل اختبار لتصنيف عينة الدفان المستخدم ويفضل أن تكون من نوع (a-1-a). 2- يتم الدفان على طبقات بسمك 30 سم طبقًا للكود." },
  { no: 11, title: "Column Necks, Continuation", title_ar: "رقاب الأعمدة", body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.", body_ar: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس." },
  { no: 12, title: "Column Necks, Completion", title_ar: "رقاب الأعمدة", body: "Column necks: the first part of the column cast above the reinforced footing, the element carrying the greatest structural weight and transferring it to the footing and on to the founding soil.", body_ar: "رقاب الأعمدة: هي أول جزء يصب من العمود فوق القاعدة المسلحة وهي أكثر جزء يحمل أوزان المنشأ وينقلها إلى القاعدة ومنها إلى تربة الأساس." },
  { no: 13, title: "Tie Beams", title_ar: "الميدات", body: "Execution of the concrete tie beams linking the footings in accordance with the structural drawing.", body_ar: "تنفيذ الميدات الخرسانية الرابطة بين القواعد طبقًا للمخطط الإنشائي." },
  { no: 14, title: "Tie Beam Waterproofing", title_ar: "عزل الميدات", body: "Tie beam insulation prevents moisture transferring into the ground-floor walls, which would otherwise cause paint peeling problems.", body_ar: "عزل الميدات: الغرض منها هو منع انتقال الرطوبة إلى جدران الدور الأرضي وبالتالي ينتج مشاكل تقشير الدهانات." },
  { no: 15, title: "Tie Beam Backfill", title_ar: "دفان الميدات", body: "Tie beam backfilling: fill is placed in 30 cm layers in accordance with the code.", body_ar: "دفان الميدات: يتم الدفان على طبقات بسمك 30 سم طبقًا للكود." },
  { no: 16, title: "Compaction", title_ar: "دمك (دك) الميدات", body: "Compaction of the tie beam fill: to confirm 95% compaction is achieved for every layer, so that no settlement occurs, settlement would crack the ground-floor blinding and in turn cause the ground-floor tiling to drop.", body_ar: "دمك (دك) الميدات: الغرض منه التأكد من الوصول إلى درجة الانضغاطية 95% لكل طبقة وذلك لعدم حدوث هبوط مما يؤدي إلى انكسار بصبة نظافة الدور الأرضي ومنها إلى هبوط بلاط الدور الأرضي." },
  { no: 17, title: "Ground Floor Blinding", title_ar: "صبة نظافة الدور الأرضي", body: "Ground-floor blinding concrete provides a uniform surface for the ground-floor tiling works and prevents direct contact with the tie beam backfill soil.", body_ar: "صبة نظافة الدور الأرضي: الغرض منها توفير سطح موحد لأعمال البلاط للدور الأرضي ومنع الاتصال المباشر مع تربة دفان الميدات." },
  { no: 18, title: "Columns", title_ar: "الأعمدة", body: "Columns are among the most important structural elements, receiving loads from the slab and beams and transferring them to the footings and on to the soil. Column formwork: (a) the timber formwork must be new; (b) proper strengthening using tie rods, clamps and sound bracing to prevent the formwork from coming apart during casting; (c) plumbing the columns with a plumb bob to confirm they are true on all sides before casting, and re-checking after the formwork is struck; (d) adherence to the structural drawing during execution with respect to setting-out, column dimensions and column heights.", body_ar: "تعتبر الأعمدة من أهم العناصر الإنشائية والمسئولة عن استلام الأحمال من السقف والكمرات ونقلها إلى القواعد ومنها إلى التربة. الشدة الخشبية للأعمدة: أ- لابد من مراعاة أن تكون الشدة الخشبية جديدة. ب- التقوية الجيدة باستخدام (التايروت) والقمط والمرابع الجيدة لمنع حدوث فك للشدة أثناء الصب. ج- توزين الأعمدة بميزان البلبل للتأكد من استقامة الأعمدة من كافة الجوانب قبل أعمال الصب وإعادة الاستلام مرة أخرى عقب فك الشدة الخشبية. د- الالتزام بالمخطط الإنشائي أثناء التنفيذ وذلك بالنسبة لأعمال (الحطات – أبعاد الأعمدة – ارتفاع الأعمدة)." },
  { no: 19, title: "Slabs & Roofs", title_ar: "الأسقف", body: "Slab formwork is a timber structure designed to match the required concrete shape, into which the concrete is cast until it has fully set and which holds it until it gains cohesion; new timber must be used and the structural drawing and architectural limits of the slab must be followed. Slabs are principal elements in building design, the appearance and proper function of the building are affected by how they are designed and executed. Slab steel fixing: (a) adherence to the structural drawing for the reinforcement works; (b) observance of the structural details on the drawing. Slab casting: (a) adherence to the required strength for casting the concrete element; (b) thorough wetting of the timber moulds before casting; (c) use of a vibrator during casting.", body_ar: "الشدة الخشبية للسقف: عبارة عن هيكل خشبي يصمم بشكل معين يناسب شكل الخرسانة المطلوب تصب فيه الخرسانة حتى يكتمل تصلدها ويحافظ عليها حتى التماسك، ولابد من استخدام خشب جديد والالتزام بالمخطط الإنشائي والحدود المعمارية للسقف. تعد الأسقف من العناصر الرئيسية في تصميم المباني حيث تتأثر مظهر المبنى ووظيفته المناسبة بطريقة تصميمه وتنفيذه. أعمال حدادة السقف: أ- الالتزام بالمخطط الإنشائي بالنسبة لأعمال التسليح. ب- مراعاة التفاصيل الإنشائية بالمخطط. أعمال صب السقف: أ- الالتزام بالإجهاد المطلوب لصب العنصر الخرساني. ب- الرش الجيد للقوالب الخشبية قبل أعمال الصب. ج- استخدام الهزاز أثناء أعمال الصب." },
  { no: 20, title: "Blockwork", title_ar: "أعمال المباني", body: "Blockwork divides into external and internal walls. (a) External walls: the best block type is insulated volcanic block. (b) Internal walls: the best block type is vertical red block. (c) Adherence to the architectural drawing. (d) Squaring of rooms, bathrooms and kitchens per the drawing. (e) Levelling the walls both horizontally and vertically. (f) Pointing the blockwork front and back.", body_ar: "تنقسم أعمال المباني إلى مباني خارجية ومباني داخلية. أ- مباني خارجية: أفضل أنواع البلوك المستخدم البلوك البركاني المعزول. ب- مباني داخلية: أفضل أنواع البلوك المستخدم البلوك الأحمر العامودي. ج- الالتزام بالمخطط المعماري. د- الالتزام بتربيع الغرف والحمامات والمطابخ طبقًا للمخطط. هـ- توزين أفقية ورأسية الجدران. و- الالتزام بتكحيل المباني من الأمام والخلف." },
  { no: 21, title: "Electromechanical Works", title_ar: "الأعمال الكهروميكانيكية", body: "Electromechanical works divide as follows: 1, Sanitary extension works: carrying out the extensions in accordance with the sanitary drawings, including installation and maintenance of water systems, sewerage, and air-conditioning and heating drainage.", body_ar: "تنقسم الأعمال الكهروميكانيكية إلى الآتي: 1- أعمال التمديدات الصحية: عبارة عن عمل التمديدات طبقًا للمخططات الصحية وتشمل تركيب أنظمة المياه وصيانتها والصرف الصحي وصرف التكييف والتدفئة." },
];

const processCategories = [
  { key: "pre-construction", label: "Pre-Construction", label_ar: "ما قبل التنفيذ", from_stage: 1, to_stage: 1 },
  { key: "earthworks", label: "Earthworks & Testing", label_ar: "أعمال الحفر والاختبارات", from_stage: 2, to_stage: 3 },
  { key: "foundation-prep", label: "Foundation Preparation", label_ar: "تجهيز الأساسات", from_stage: 4, to_stage: 6 },
  { key: "substructure", label: "Substructure", label_ar: "البنية التحتية", from_stage: 7, to_stage: 17 },
  { key: "superstructure", label: "Superstructure", label_ar: "البنية الفوقية", from_stage: 18, to_stage: 19 },
  { key: "envelope-mep", label: "Blockwork & MEP", label_ar: "أعمال المباني والكهروميكانيك", from_stage: 20, to_stage: 21 },
];

const processPhases = [
  { title: "Planning", title_ar: "التخطيط", body: "Site setup, permits, municipality clearances and the project identification board, stage 1 of the structural programme.", body_ar: "تجهيز الموقع، التراخيص، إجراءات البلدية واللوحة التعريفية بالمشروع، وهي المرحلة الأولى من البرنامج الإنشائي." },
  { title: "Design", title_ar: "التصميم", body: "Architectural and structural design, merging form with function, before a single metre is excavated.", body_ar: "التصميم المعماري والإنشائي، يجمع بين الشكل والوظيفة، قبل حفر أي متر من الأرض." },
  { title: "Engineering", title_ar: "الهندسة", body: "Soil report, founding levels, plate load testing and the reinforcement design that follows from them.", body_ar: "تقرير التربة، منسوب التأسيس، اختبار التحميل، وتصميم التسليح المبني عليها." },
  { title: "Construction", title_ar: "التنفيذ", body: "The 21-stage structural programme: excavation, raft, columns, tie beams, slabs, blockwork and mechanical, electrical and plumbing (MEP) first fix.", body_ar: "البرنامج الإنشائي بمراحله الـ21: الحفر، اللبشة، الأعمدة، الميدات، الأسقف، أعمال المباني والتأسيسات الكهروميكانيكية." },
  { title: "Quality Control", title_ar: "ضبط الجودة", body: "Continuous follow-up between execution and supervision teams, 95% compaction checks, plumb-bob verification, re-inspection after striking formwork.", body_ar: "متابعة مستمرة بين فرق التنفيذ والإشراف، فحص نسبة الدمك 95%، التحقق بميزان البلبل، وإعادة الفحص بعد فك الشدة الخشبية." },
  { title: "Completion", title_ar: "التسليم", body: "The finishing programme, from preparatory works through to handing over the project ready for use.", body_ar: "برنامج التشطيب، من الأعمال التحضيرية حتى تسليم المشروع جاهزًا للاستخدام." },
];

const contactFaqs = [
  { question: "Where does BRU CO. work?", question_ar: "أين تعمل BRU CO.؟", answer: "BRU CO. is based in Jeddah and delivers construction and contracting projects across Jeddah, Makkah and the wider Kingdom of Saudi Arabia.", answer_ar: "يقع مقر BRU CO. في جدة، وتنفّذ مشاريع البناء والمقاولات في جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية." },
  { question: "What does BRU CO. do as a general contractor?", question_ar: "ماذا تقدّم BRU CO. بصفتها مقاولًا عامًا؟", answer: "We deliver integrated construction under one roof, from foundation to finish: structural and construction works, architectural works, electromechanical (MEP) systems, and interior and finishing.", answer_ar: "نقدّم إنشاءً متكاملًا تحت مظلة واحدة، من الأساسات حتى التشطيب: الأعمال الإنشائية والبناء، الأعمال المعمارية، الأنظمة الكهروميكانيكية (MEP)، والتصميم الداخلي والتشطيبات." },
  { question: "What types of projects do you build?", question_ar: "ما أنواع المشاريع التي تنفّذونها؟", answer: "Residential and villa construction, commercial buildings, hospitality, healthcare and F&B fit-out, and industrial and public works. More than 300 completed projects to date.", answer_ar: "بناء الفلل والمشاريع السكنية، والمباني التجارية، والضيافة، والرعاية الصحية، وتجهيزات المطاعم والمقاهي، والأعمال الصناعية والعامة. أكثر من 300 مشروع منجز حتى الآن." },
  { question: "Do you offer design-build and turnkey delivery?", question_ar: "هل تقدّمون خدمة التصميم والتنفيذ وتسليم المفتاح؟", answer: "Yes. We take projects from concept and design through to a completed, handed-over building, coordinating architecture, structure and MEP as a single turnkey package.", answer_ar: "نعم. نأخذ المشاريع من الفكرة والتصميم وحتى تسليم مبنى مكتمل، وننسّق بين التصميم المعماري والإنشائي والكهروميكانيكي ضمن حزمة واحدة بنظام تسليم مفتاح." },
  { question: "Is BRU CO. licensed and certified?", question_ar: "هل BRU CO. مرخّصة ومعتمدة؟", answer: "Yes. BRU CO. is certified to ISO (International Organization for Standardization) standards in quality, safety and environmental management, a member of the Saudi Contractors Authority, and formally classified for structural, architectural and MEP works.", answer_ar: "نعم. BRU CO. معتمدة وفق مواصفات الآيزو (المنظمة الدولية للمعايير) للجودة والسلامة والبيئة، وهي عضو في الهيئة السعودية للمقاولين، ومصنّفة رسميًا في الأعمال الإنشائية والمعمارية والكهروميكانيكية." },
  { question: "How is a construction project delivered?", question_ar: "كيف يُسلَّم المشروع الإنشائي؟", answer: "Our structural (shell) phase follows a documented 21-stage programme from excavation to a completed structure, followed by the finishing programme through to handover, with continuous quality inspection at every stage.", answer_ar: "تسير مرحلة العظم وفق برنامج موثق من 21 مرحلة، من الحفر حتى اكتمال الهيكل، تليها مرحلة التشطيب حتى التسليم، مع فحص جودة مستمر في كل مرحلة." },
  { question: "How do I request a quote or start a project?", question_ar: "كيف أطلب عرض سعر أو أبدأ مشروعًا؟", answer: "Call us on +966 55 535 2526 or send your project details through the enquiry form on this page. Project enquiries submitted through this form are delivered directly to BRU's project team.", answer_ar: "تواصل معنا عبر +966 55 535 2526 أو أرسل تفاصيل مشروعك عبر نموذج الاستفسار في هذه الصفحة. تصل الاستفسارات المُرسَلة عبر هذا النموذج مباشرة إلى فريق مشاريع BRU." },
];

const projectsFaqs = [
  { question: "What types of construction projects does BRU CO. build?", question_ar: "ما أنواع المشاريع الإنشائية التي تنفّذها BRU CO.؟", answer: "BRU CO. builds residential and villa construction, commercial buildings, hospitality projects, healthcare facilities, F&B fit-out and sports facilities. The work covers structural construction, architectural works, electromechanical (MEP) systems and interior and exterior finishing.", answer_ar: "تبني BRU CO. الفلل والمشاريع السكنية، والمباني التجارية، ومشاريع الضيافة، والمنشآت الصحية، وتجهيزات المطاعم والمقاهي، والمنشآت الرياضية. ويشمل العمل الأعمال الإنشائية والمعمارية والأنظمة الكهروميكانيكية (MEP) والتشطيبات الداخلية والخارجية." },
  { question: "Where in Saudi Arabia does BRU CO. build?", question_ar: "أين تبني BRU CO. في المملكة العربية السعودية؟", answer: "BRU CO. is headquartered in Jeddah and builds across Jeddah, Makkah, the Western Region and the wider Kingdom of Saudi Arabia. Completed work includes buildings on Prince Sultan Road in Jeddah and chalets at Durrat Al-Arous.", answer_ar: "يقع المقر الرئيسي لـ BRU CO. في جدة، وتنفّذ أعمالها في جدة ومكة المكرمة والمنطقة الغربية وسائر أنحاء المملكة. تشمل الأعمال المنجزة مبانٍ على طريق الأمير سلطان في جدة وشاليهات في درة العروس." },
  { question: "Does BRU CO. build and finish villas?", question_ar: "هل تنفّذ BRU CO. بناء وتشطيب الفلل؟", answer: "Yes. Villa construction is one of the company's largest activities: reinforced concrete structure, masonry, and interior and exterior finishing, in contemporary, neoclassical, semi-classic and Andalusian/Islamic idioms. The projects documented here range from single villas to residential complexes of up to 48 duplex villas.", answer_ar: "نعم. يُعد بناء الفلل من أكبر أنشطة الشركة: هيكل خرساني مسلح، أعمال بناء، وتشطيبات داخلية وخارجية، بطرز معاصرة وكلاسيكية حديثة وشبه كلاسيكية وأندلسية/إسلامية. تتراوح المشاريع الموثقة هنا بين فلل مفردة ومجمعات سكنية تصل إلى 48 فيلا دوبلكس." },
  { question: "Does BRU CO. offer turnkey and design-build contracts?", question_ar: "هل تقدّم BRU CO. عقود تسليم مفتاح وتصميم وتنفيذ؟", answer: "Yes. BRU CO. works design-build and turnkey: architectural, structural and MEP design plus execution under a single contract, from excavation and foundations to a building handed over ready for use.", answer_ar: "نعم. تعمل BRU CO. بنظامي التصميم والتنفيذ وتسليم المفتاح: تصميم معماري وإنشائي وكهروميكانيكي مع التنفيذ ضمن عقد واحد، من الحفر والأساسات حتى تسليم مبنى جاهز للاستخدام." },
  { question: "How many projects has BRU CO. completed?", question_ar: "كم عدد المشاريع التي أنجزتها BRU CO.؟", answer: "More than 300 completed projects since the company was founded in 2000, of which 18 are documented in detail with photography on this page.", answer_ar: "أكثر من 300 مشروع منجز منذ تأسيس الشركة عام 2000، منها 18 مشروعًا موثقًا بالتفصيل مع صور في هذه الصفحة." },
  { question: "How do I request a construction quote?", question_ar: "كيف أطلب عرض سعر لمشروع إنشائي؟", answer: "Contact BRU CO. on +966 55 535 2526 or through the form on the contact page with the site location, building type, approximate area and the scope you need: structural shell only, finishing, or full turnkey delivery.", answer_ar: "تواصل مع BRU CO. عبر +966 55 535 2526 أو من خلال نموذج صفحة التواصل، مع تحديد موقع الأرض ونوع المبنى والمساحة التقريبية والنطاق المطلوب: الهيكل الإنشائي فقط، أو التشطيب، أو التسليم الكامل بنظام تسليم مفتاح." },
];

const contactOptions = [
  { group_name: "scope", value: "Structural & Construction Works", label: "Structural & Construction Works", label_ar: "الأعمال الإنشائية والبناء" },
  { group_name: "scope", value: "Architectural Works", label: "Architectural Works", label_ar: "الأعمال المعمارية" },
  { group_name: "scope", value: "Electromechanical Works", label: "Electromechanical Works", label_ar: "الأعمال الكهروميكانيكية" },
  { group_name: "scope", value: "Interior & Finishing Works", label: "Interior & Finishing Works", label_ar: "التصميم الداخلي والتشطيبات" },
  { group_name: "scope", value: "Full design & build", label: "Full design & build", label_ar: "التصميم والتنفيذ الكامل" },
  { group_name: "scope", value: "Other", label: "Other", label_ar: "أخرى" },
  { group_name: "budget", value: "Under SAR 1M", label: "Under SAR 1M", label_ar: "أقل من مليون ريال" },
  { group_name: "budget", value: "SAR 1M – 5M", label: "SAR 1M – 5M", label_ar: "1 – 5 مليون ريال" },
  { group_name: "budget", value: "SAR 5M – 20M", label: "SAR 5M – 20M", label_ar: "5 – 20 مليون ريال" },
  { group_name: "budget", value: "SAR 20M+", label: "SAR 20M+", label_ar: "أكثر من 20 مليون ريال" },
  { group_name: "budget", value: "Not sure yet", label: "Not sure yet", label_ar: "غير محدد بعد" },
  { group_name: "sector", value: "Residential", label: "Residential", label_ar: "سكني" },
  { group_name: "sector", value: "Commercial", label: "Commercial", label_ar: "تجاري" },
  { group_name: "sector", value: "Hospitality", label: "Hospitality", label_ar: "ضيافة" },
  { group_name: "sector", value: "Healthcare", label: "Healthcare", label_ar: "رعاية صحية" },
  { group_name: "sector", value: "F&B", label: "F&B", label_ar: "مطاعم ومقاهٍ" },
  { group_name: "sector", value: "Sports Facilities", label: "Sports Facilities", label_ar: "منشآت رياضية" },
];

const contactSettings = {
  trust_items: [
    { title: { en: "Confidential", ar: "سرية تامة" }, body: { en: "Your project information is kept private.", ar: "تُحفظ معلومات مشروعك بسرية تامة." } },
    { title: { en: "Response time", ar: "زمن الاستجابة" }, body: { en: "We typically respond within one business day.", ar: "نستجيب عادة خلال يوم عمل واحد." } },
    { title: { en: "Experienced engineers", ar: "مهندسون ذوو خبرة" }, body: { en: "25+ years delivering complex projects.", ar: "أكثر من 25 عامًا في تنفيذ المشاريع المعقدة." } },
  ],
  disciplines: [
    { en: "Structural & Construction Works", ar: "الأعمال الإنشائية والبناء" },
    { en: "Architectural Works", ar: "الأعمال المعمارية" },
    { en: "Electromechanical Works", ar: "الأعمال الكهروميكانيكية" },
    { en: "Interior Design & Finishing", ar: "التصميم الداخلي والتشطيبات" },
  ],
  faq_kicker: "FAQ",
  faq_kicker_ar: "الأسئلة الشائعة",
  faq_headline: "Common\nquestions.",
  faq_headline_ar: "أسئلة\nشائعة.",
  faq_lede: "What clients ask before they build with BRU CO., from where we work to how a project is delivered.",
  faq_lede_ar: "ما يسأله العملاء قبل البناء مع BRU CO.، من أماكن عملنا إلى طريقة تسليم المشروع.",
};

/**
 * These tables have no natural unique key besides their generated uuid `id`,
 * so re-running the seed is made idempotent by clearing them first rather
 * than upserting. Safe here because this is reference/seed content, not
 * user-entered data — do not reuse this helper for tables admins write to.
 */
async function replaceAll(
  supabase: ReturnType<typeof createAdminClient>,
  table: string,
  rows: Record<string, unknown>[],
) {
  const { error: deleteError } = await supabase.from(table).delete().not("id", "is", null);
  if (deleteError) throw new Error(`Failed to clear "${table}": ${deleteError.message}`);
  if (!rows.length) return;
  const { error: insertError } = await supabase.from(table).insert(rows);
  if (insertError) throw new Error(`Failed to seed "${table}": ${insertError.message}`);
}

async function seedRemainingContent() {
  const supabase = createAdminClient();

  console.log("Seeding team categories...");
  await replaceAll(
    supabase,
    "team_categories",
    teamCategories.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding about settings & founder...");
  await supabase.from("about_settings").upsert({ id: 1, ...aboutSettings });
  await supabase.from("founder").upsert({ id: 1, ...founder });

  console.log("Seeding certifications...");
  await replaceAll(
    supabase,
    "certifications",
    certifications.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding clients...");
  await replaceAll(
    supabase,
    "clients",
    clients.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding process stages...");
  for (const row of processStages) {
    const { error } = await supabase.from("process_stages").upsert(row, { onConflict: "no" });
    if (error) console.warn(`  ! stage ${row.no}: ${error.message}`);
  }

  console.log("Seeding process categories...");
  for (const [i, row] of processCategories.entries()) {
    const { error } = await supabase
      .from("process_categories")
      .upsert({ ...row, sort_order: i }, { onConflict: "key" });
    if (error) console.warn(`  ! category ${row.key}: ${error.message}`);
  }

  console.log("Seeding workflow phases...");
  await replaceAll(
    supabase,
    "process_phases",
    processPhases.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding FAQs...");
  await replaceAll(supabase, "faqs", [
    ...contactFaqs.map((row, i) => ({ ...row, page: "contact", sort_order: i })),
    ...projectsFaqs.map((row, i) => ({ ...row, page: "projects", sort_order: i })),
  ]);

  console.log("Seeding contact options...");
  await replaceAll(
    supabase,
    "contact_options",
    contactOptions.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding contact settings...");
  await supabase.from("contact_settings").upsert({ id: 1, ...contactSettings });

  console.log("Remaining content seeded.");
}

const homeSettings = {
  hero_brand_line1: "BRU",
  hero_brand_line1_ar: "BRU",
  hero_brand_line2: "CO.",
  hero_brand_line2_ar: "CO.",
  hero_eyebrow: "EST. 2000 · Jeddah, Saudi Arabia",
  hero_eyebrow_ar: "تأسست 2000 · جدة، السعودية",
  hero_quote: "“Your vision our craft, built with precision, delivered with integrity.”",
  hero_quote_ar: "“رؤيتك، حرفتنا، نبني بدقة، ونسلّم بأمانة.”",
  hero_services: "Structural & Construction Works\nArchitectural Works\nElectromechanical Works\nInterior Design & Finishing",
  hero_services_ar: "الأعمال الإنشائية والبناء\nالأعمال المعمارية\nالأعمال الكهروميكانيكية\nالتصميم الداخلي والتشطيبات",
  hero_start_project: "Start a Project",
  hero_start_project_ar: "ابدأ مشروعك",
  hero_view_portfolio: "View the portfolio",
  hero_view_portfolio_ar: "تصفح أعمالنا",
  hero_handover_label: "Handover · 100%",
  hero_handover_label_ar: "التسليم · 100%",
  hero_handover_title1: "From empty land",
  hero_handover_title1_ar: "من أرض فارغة",
  hero_handover_title2: "to handover.",
  hero_handover_title2_ar: "إلى التسليم.",
  hero_handover_body: "21 structural stages, 300+ completed projects, 25 years. This is how BRU CO. builds.",
  hero_handover_body_ar: "21 مرحلة إنشائية، أكثر من 300 مشروع منجز، 25 عامًا من الخبرة. هكذا تبني BRU CO.",
  hero_scroll_hint: "Scroll to explore",
  hero_scroll_hint_ar: "مرر للاستكشاف",

  about_eyebrow: "Building Reference United · Est. 2000",
  about_eyebrow_ar: "شركة مرجع المباني المتحدة · تأسست 2000",
  about_title: "Building\nReference\nUnited",
  about_title_ar: "مرجع\nالمباني\nالمتحدة",
  about_body: "BRU CO. (Building Reference United) is a Jeddah-based construction company and general contractor delivering integrated construction under one roof: structural, architectural, electromechanical and interior works. 25+ years, 300+ completed projects, ISO-certified and classified by the Saudi Contractors Authority, serving Jeddah, Makkah and the wider Kingdom of Saudi Arabia.",
  about_body_ar: "شركة مرجع المباني المتحدة (BRU) هي شركة مقاولات عامة مقرها جدة، تقدّم أعمال إنشاء متكاملة تحت مظلة واحدة: الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية. أكثر من 25 عامًا من الخبرة، وأكثر من 300 مشروع منجز، معتمدة ISO ومصنّفة من الهيئة السعودية للمقاولين، تخدم جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية.",
  about_stat1_value: "300+",
  about_stat1_label: "Projects Delivered",
  about_stat1_label_ar: "مشروع منجز",
  about_stat2_value: "25+",
  about_stat2_label: "Years Active",
  about_stat2_label_ar: "عامًا من النشاط",
  about_our_story: "Our Story",
  about_our_story_ar: "قصتنا",
  about_expertise_eyebrow: "Our Expertise",
  about_expertise_eyebrow_ar: "خبراتنا",
  about_expertise_p1: "Founded in the year 2000, BRU (Building Reference United Company) was established with a bold vision: to integrate architecture, construction, and engineering expertise into one unified entity. From a modest beginning driven by great ambition, BRU has grown into an integrated construction and engineering company, and one of the most trusted contracting firms in Saudi Arabia.",
  about_expertise_p1_ar: "تأسست BRU (شركة مرجع المباني المتحدة) عام 2000 برؤية جريئة: دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل. من بداية متواضعة مدفوعة بطموح كبير، نمت BRU لتصبح شركة إنشاء وهندسة متكاملة، وواحدة من أوثق شركات المقاولات في المملكة العربية السعودية.",
  about_expertise_p2: "Our team of engineers, architects, project managers, and skilled site personnel work in seamless collaboration, turning ideas into reality, whether executing complex structural projects, delivering precise finishes, or implementing advanced MEP systems. Aligned with Saudi Vision 2030, we remain committed to innovation and the advancement of the nation's built environment, proud partners to developers, government entities, and private clients across the Kingdom.",
  about_expertise_p2_ar: "يعمل فريقنا من المهندسين والمعماريين ومديري المشاريع والكوادر الفنية الماهرة في تناغم تام، لتحويل الأفكار إلى واقع، سواء في تنفيذ المشاريع الإنشائية المعقدة، أو تسليم تشطيبات دقيقة، أو تنفيذ أنظمة كهروميكانيكية متطورة. وانسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بالابتكار وتطوير البيئة العمرانية للوطن، شركاء فخورون للمطورين والجهات الحكومية والعملاء من القطاع الخاص في أنحاء المملكة.",
  about_expertise_tags: "Residential\nCommercial\nHospitality\nPublic Works\nGovernment",
  about_expertise_tags_ar: "سكني\nتجاري\nضيافة\nأشغال عامة\nحكومي",

  services_eyebrow: "Our Services",
  services_eyebrow_ar: "خدماتنا",
  services_title1: "Four disciplines,",
  services_title1_ar: "أربعة تخصصات،",
  services_title2: "one roof.",
  services_title2_ar: "تحت سقف واحد.",
  services_lede: "Comprehensive construction solutions under one roof, from foundation to finish, BRU delivers with precision and excellence.",
  services_lede_ar: "حلول إنشائية متكاملة تحت مظلة واحدة، من الأساسات حتى التشطيب النهائي، تقدّمها BRU بدقة وتميّز.",
  services_note: "Every service is backed by our ISO certifications in Quality, Safety, and Environmental Management, ensuring every project meets the highest international standards.",
  services_note_ar: "كل خدمة مدعومة بشهاداتنا المعتمدة من ISO في الجودة والسلامة والبيئة، لضمان مطابقة كل مشروع لأعلى المعايير الدولية.",
  services_explore: "Explore Services",
  services_explore_ar: "استكشف خدماتنا",

  work_eyebrow: "Our Work",
  work_eyebrow_ar: "أعمالنا",
  work_title1: "What We've",
  work_title1_ar: "ما الذي",
  work_title2: "Built",
  work_title2_ar: "بنيناه",
  work_lede: "A selection from our portfolio of 300+ completed projects across Saudi Arabia, each delivered with precision, quality, and dedication.",
  work_lede_ar: "مجموعة مختارة من محفظتنا التي تضم أكثر من 300 مشروع منجز في أنحاء السعودية، كلٌّ منها مُسلَّم بدقة وجودة وتفانٍ.",
  work_all_projects: "All Projects",
  work_all_projects_ar: "كل المشاريع",
  work_view_project: "View Project",
  work_view_project_ar: "عرض المشروع",

  clients_eyebrow: "Valued Clients",
  clients_eyebrow_ar: "عملاء نعتز بهم",
  clients_title1: "Trusted across",
  clients_title1_ar: "ثقة راسخة",
  clients_title2: "every sector.",
  clients_title2_ar: "في كل قطاع.",
  clients_lede: "A trusted partner to leading developers, government entities, and private clients, built on long-term relationships and consistent excellence.",
  clients_lede_ar: "شريك موثوق للمطورين الرائدين والجهات الحكومية والعملاء من القطاع الخاص، مبني على علاقات طويلة الأمد وتميز مستمر.",
  clients_marquee: "Leading Developers\nGovernment Entities\nPrivate Clients\nReal Estate Developers\nHospitality Operators\nHealthcare Providers",
  clients_marquee_ar: "مطورون رائدون\nجهات حكومية\nعملاء من القطاع الخاص\nمطورون عقاريون\nمشغلو قطاع الضيافة\nمقدمو الرعاية الصحية",

  process_eyebrow: "Construction Process",
  process_eyebrow_ar: "منهجية العمل",
  process_title1: "The 21-stage",
  process_title1_ar: "المراحل الـ 21",
  process_title2: "structural programme.",
  process_title2_ar: "للبرنامج الإنشائي.",
  process_lede: "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.",
  process_lede_ar: "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.",
  process_cta: "Walk the 21 stages",
  process_cta_ar: "تعرّف على المراحل الـ 21",
};

const homeHeroStages = [
  { code: "000", title: "Survey & Blueprint", title_ar: "المسح والمخطط", detail: "Empty land · site outline · topographic grid", detail_ar: "أرض فارغة · تحديد الموقع · شبكة طبوغرافية", period: "Morning light", period_ar: "ضوء الصباح" },
  { code: "001", title: "Excavation & Foundation", title_ar: "الحفر والأساسات", detail: "Site clearance · footings · foundation pour", detail_ar: "تجهيز الموقع · القواعد · صب الأساسات", period: "Midday", period_ar: "الظهيرة" },
  { code: "002", title: "Structural Framework", title_ar: "الهيكل الإنشائي", detail: "Columns · beams · slab construction", detail_ar: "الأعمدة · الكمرات · صب الأسقف", period: "Midday", period_ar: "الظهيرة" },
  { code: "003", title: "Envelope & Roofing", title_ar: "الغلاف والأسقف", detail: "Walls · roofing · waterproofing", detail_ar: "الجدران · التسقيف · العزل المائي", period: "Afternoon", period_ar: "بعد الظهر" },
  { code: "004", title: "MEP Rough-in", title_ar: "الأعمال الكهروميكانيكية", detail: "Electrical · plumbing · HVAC systems", detail_ar: "الكهرباء · السباكة · أنظمة التكييف", period: "Golden hour", period_ar: "الساعة الذهبية" },
  { code: "005", title: "Handover", title_ar: "التسليم", detail: "Roads · landscape · lighting on", detail_ar: "الطرق · تنسيق المواقع · الإضاءة", period: "Golden hour", period_ar: "الساعة الذهبية" },
];

const homeStats = [
  { value: 300, suffix: "+", label: "Completed Projects", label_ar: "مشروع منجز", description: "Across residential, commercial, hospitality and public sectors", description_ar: "في القطاعات السكنية والتجارية والفندقية والحكومية" },
  { value: 25, suffix: "+", label: "Years of Experience", label_ar: "عامًا من الخبرة", description: "Shaping the construction landscape of Saudi Arabia since 2000", description_ar: "نشكّل ملامح قطاع الإنشاءات في المملكة العربية السعودية منذ عام 2000" },
  { value: 80, suffix: "+", label: "Team Members", label_ar: "عضو فريق", description: "Engineers, architects, project managers and skilled professionals", description_ar: "مهندسون ومعماريون ومديرو مشاريع وكوادر فنية ماهرة" },
  { value: 4, suffix: "", label: "Core Disciplines", label_ar: "تخصصات أساسية", description: "Structural · Architectural · Electromechanical · Interior", description_ar: "إنشائي · معماري · كهروميكانيكي · داخلي" },
];

const homeHighlights = [
  { title: "25+ Years of Experience", title_ar: "أكثر من 25 عامًا من الخبرة", description: "Over a quarter century shaping the construction landscape of Saudi Arabia with precision, quality, and continuous innovation.", description_ar: "أكثر من ربع قرن نشكّل ملامح قطاع الإنشاءات في المملكة العربية السعودية بدقة وجودة وابتكار مستمر." },
  { title: "ISO-Certified Quality", title_ar: "جودة معتمدة من ISO", description: "Certified in Quality, Safety, and Environmental Management, ensuring every project meets the highest international standards, without compromise.", description_ar: "معتمدون في إدارة الجودة والسلامة والبيئة، لضمان مطابقة كل مشروع لأعلى المعايير الدولية دون تهاون." },
  { title: "300+ Completed Projects", title_ar: "أكثر من 300 مشروع منجز", description: "A proven track record spanning residential, commercial, hospitality, and public developments, delivered on time and on budget.", description_ar: "سجل حافل يشمل المشاريع السكنية والتجارية والفندقية والحكومية، مُسلَّمة في الوقت المحدد وضمن الميزانية." },
  { title: "Trusted Across All Sectors", title_ar: "ثقة راسخة في جميع القطاعات", description: "A trusted partner to leading developers, government entities, and private clients, built on long-term relationships and consistent excellence.", description_ar: "شريك موثوق للمطورين الرائدين والجهات الحكومية والعملاء من القطاع الخاص، مبني على علاقات طويلة الأمد وتميز مستمر." },
];

const coreValues = [
  { letter: "B", title: "Building Excellence", title_ar: "التميّز في البناء", description: "We strive to achieve the highest levels of quality in all our projects, utilizing the latest technologies and premium materials to ensure outstanding results with precise, professional execution in full compliance with specifications and standards.", description_ar: "نسعى لتحقيق أعلى مستويات الجودة في جميع مشاريعنا، مستخدمين أحدث التقنيات وأجود المواد لضمان نتائج متميزة بتنفيذ دقيق ومحترف يلتزم تمامًا بالمواصفات والمعايير." },
  { letter: "R", title: "Reliability & Trust", title_ar: "الموثوقية والثقة", description: "We are committed to meeting the needs and requirements of our clients and delivering projects on time, strengthening their trust in us and fostering long-term partnerships built on transparency and accountability.", description_ar: "نلتزم بتلبية احتياجات ومتطلبات عملائنا وتسليم المشاريع في مواعيدها، مما يعزز ثقتهم بنا ويرسّخ شراكات طويلة الأمد مبنية على الشفافية والمساءلة." },
  { letter: "U", title: "Unmatched Innovation", title_ar: "ابتكار لا يُضاهى", description: "We continuously seek to improve our methods and create innovative construction solutions that keep pace with the latest standards, technologies, and practices in engineering and construction, aligned with Saudi Vision 2030.", description_ar: "نسعى باستمرار لتطوير أساليبنا وابتكار حلول إنشائية تواكب أحدث المعايير والتقنيات والممارسات في الهندسة والبناء، انسجامًا مع رؤية المملكة 2030." },
];

const coreValuesSettings = {
  eyebrow: "Core Values",
  eyebrow_ar: "قيمنا الأساسية",
  title: "B · R · U",
  title_ar: "B · R · U",
  lede: "Our principles are not statements on a wall, they are practiced on every site, in every decision, on every project we deliver.",
  lede_ar: "مبادئنا ليست شعارات على الجدار، بل تُمارَس في كل موقع، وفي كل قرار، وفي كل مشروع نسلّمه.",
  closing: "Building Reference United, our name is our identity, our values are our foundation.",
  closing_ar: "مرجع المباني المتحدة، اسمنا هويتنا، وقيمنا أساسنا.",
};

async function seedHomeContent() {
  const supabase = createAdminClient();

  console.log("Seeding home settings...");
  await supabase.from("home_settings").upsert({ id: 1, ...homeSettings });

  console.log("Seeding hero stages...");
  await replaceAll(
    supabase,
    "home_hero_stages",
    homeHeroStages.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding home stats...");
  await replaceAll(
    supabase,
    "home_stats",
    homeStats.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding home highlights...");
  await replaceAll(
    supabase,
    "home_highlights",
    homeHighlights.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding core values...");
  await replaceAll(
    supabase,
    "core_values",
    coreValues.map((row, i) => ({ ...row, sort_order: i })),
  );
  await supabase.from("core_values_settings").upsert({ id: 1, ...coreValuesSettings });

  console.log("Home content seeded.");
}

const aboutPageSettings = {
  hero_eyebrow: "Building Reference United · Est. 2000",
  hero_eyebrow_ar: "شركة مرجع المباني المتحدة · تأسست 2000",
  hero_title1: "Building", hero_title1_ar: "مرجع",
  hero_title2: "Reference", hero_title2_ar: "المباني",
  hero_title3: "United", hero_title3_ar: "المتحدة",
  hero_body: "BRU CO. (Building Reference United) is a Jeddah-based construction company and general contractor delivering integrated construction under one roof: structural, architectural, electromechanical and interior works. 25+ years, 300+ completed projects, ISO-certified and classified by the Saudi Contractors Authority, serving Jeddah, Makkah and the wider Kingdom of Saudi Arabia.",
  hero_body_ar: "شركة مرجع المباني المتحدة (BRU) هي شركة مقاولات عامة مقرها جدة، تقدّم أعمال إنشاء متكاملة تحت مظلة واحدة: الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية. أكثر من 25 عامًا من الخبرة، وأكثر من 300 مشروع منجز، معتمدة ISO ومصنّفة من الهيئة السعودية للمقاولين، تخدم جدة ومكة المكرمة وسائر أنحاء المملكة العربية السعودية.",
  hero_stat1_label: "Established", hero_stat1_label_ar: "تأسست", hero_stat1_value: "2000", hero_stat1_value_ar: "2000",
  hero_stat2_label: "Headquarters", hero_stat2_label_ar: "المقر الرئيسي", hero_stat2_value: "Jeddah, Saudi Arabia", hero_stat2_value_ar: "جدة، السعودية",
  hero_stat3_label: "Projects Delivered", hero_stat3_label_ar: "مشاريع منجزة", hero_stat3_value: "300+", hero_stat3_value_ar: "+300",
  hero_stat4_label: "Team", hero_stat4_label_ar: "الفريق", hero_stat4_value: "80+ members", hero_stat4_value_ar: "+80 عضو",

  expertise_eyebrow: "Our Expertise", expertise_eyebrow_ar: "خبراتنا",
  expertise_p1: "Founded in the year 2000, BRU (Building Reference United Company) was established with a bold vision: to integrate architecture, construction, and engineering expertise into one unified entity. From a modest beginning driven by great ambition, BRU has grown into an integrated construction and engineering company, and one of the most trusted contracting firms in Saudi Arabia.",
  expertise_p1_ar: "تأسست BRU (شركة مرجع المباني المتحدة) عام 2000 برؤية جريئة: دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل. من بداية متواضعة مدفوعة بطموح كبير، نمت BRU لتصبح شركة إنشاء وهندسة متكاملة، وواحدة من أوثق شركات المقاولات في المملكة العربية السعودية.",
  expertise_p2: "Our team of engineers, architects, project managers, and skilled site personnel work in seamless collaboration, turning ideas into reality, whether executing complex structural projects, delivering precise finishes, or implementing advanced MEP systems. Aligned with Saudi Vision 2030, we remain committed to innovation and the advancement of the nation's built environment, proud partners to developers, government entities, and private clients across the Kingdom.",
  expertise_p2_ar: "يعمل فريقنا من المهندسين والمعماريين ومديري المشاريع والكوادر الفنية الماهرة في تناغم تام، لتحويل الأفكار إلى واقع، سواء في تنفيذ المشاريع الإنشائية المعقدة، أو تسليم تشطيبات دقيقة، أو تنفيذ أنظمة كهروميكانيكية متطورة. وانسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بالابتكار وتطوير البيئة العمرانية للوطن، شركاء فخورون للمطورين والجهات الحكومية والعملاء من القطاع الخاص في أنحاء المملكة.",
  expertise_tags: "Residential\nCommercial\nHospitality\nPublic Works\nGovernment",
  expertise_tags_ar: "سكني\nتجاري\nضيافة\nأشغال عامة\nحكومي",

  journey_eyebrow: "Our Journey", journey_eyebrow_ar: "مسيرتنا",
  journey_title1: "25 Years", journey_title1_ar: "25 عامًا",
  journey_title2: "of Building", journey_title2_ar: "من البناء",
  journey_lede: "From a modest founding in 2000 to one of Jeddah's most trusted contractors, a story of dedication, growth, and excellence.",
  journey_lede_ar: "من تأسيس متواضع عام 2000 إلى واحدة من أوثق شركات المقاولات في جدة، قصة تفانٍ ونمو وتميّز.",
  journey_counter_value: 300,
  journey_counter_label: "Projects completed across residential, commercial, hospitality and public sectors",
  journey_counter_label_ar: "مشروع منجز في القطاعات السكنية والتجارية والفندقية والحكومية",
  journey_cta: "How we build: our process", journey_cta_ar: "كيف نبني: منهجيتنا",

  why_eyebrow: "Why BRU CO.", why_eyebrow_ar: "لماذا BRU CO.",
  why_tagline: "Building Reference, Your First Reference in Construction, Since 2000",
  why_tagline_ar: "مرجع المباني، مرجعك الأول في البناء، منذ عام 2000",
  why_title: "Why Choose BRU CO.?", why_title_ar: "لماذا تختار BRU CO.؟",

  vision_eyebrow: "Vision & Mission", vision_eyebrow_ar: "الرؤية والرسالة",
  vision_title: "Our Direction & Vision 2030 Commitment", vision_title_ar: "توجهنا والتزامنا برؤية 2030",
  vision_closing: "Aligned with Saudi Vision 2030, we remain committed to delivering innovative solutions, strengthening the private sector's role in urban development, and building a sustainable future for our nation.",
  vision_closing_ar: "انسجامًا مع رؤية المملكة 2030، نبقى ملتزمين بتقديم حلول مبتكرة، وتعزيز دور القطاع الخاص في التنمية العمرانية، وبناء مستقبل مستدام لوطننا.",
};

const aboutMilestones = [
  { year: "2000", year_ar: "2000", title: "The Launch, Building Foundations", title_ar: "الانطلاقة، إرساء الأسس", description: "BRU was founded with a bold vision to integrate architecture, construction, and engineering into one unified entity. The company entered the Saudi market with a focus on residential and commercial projects, quickly earning a reputation for blending modern methods with local identity.", description_ar: "تأسست BRU برؤية جريئة لدمج العمارة والإنشاء والهندسة في كيان واحد متكامل. دخلت الشركة السوق السعودي بتركيز على المشاريع السكنية والتجارية، واكتسبت بسرعة سمعة في الجمع بين الأساليب الحديثة والهوية المحلية." },
  { year: "2005 to 2017", year_ar: "2005 إلى 2017", title: "Expanding Horizons", title_ar: "توسيع الآفاق", description: "BRU successfully delivered over 250 projects, ranging from residential and commercial developments to administrative and entertainment facilities. This period marked BRU's transformation into a trusted partner in diverse sectors of the Saudi construction industry.", description_ar: "نفّذت BRU بنجاح أكثر من 250 مشروعًا، تراوحت بين التطويرات السكنية والتجارية والمنشآت الإدارية والترفيهية. مثّلت هذه المرحلة تحوّل BRU إلى شريك موثوق في قطاعات متنوعة من صناعة الإنشاءات السعودية." },
  { year: "2017 to 2019", year_ar: "2017 إلى 2019", title: "Recognition & Growth", title_ar: "الاعتراف والنمو", description: "BRU evolved into a multidisciplinary company, adding engineering construction, project management, and supervision services to its portfolio. ISO certification was achieved, cementing the company's commitment to international quality standards.", description_ar: "تطورت BRU لتصبح شركة متعددة التخصصات، مضيفةً خدمات الإنشاءات الهندسية وإدارة المشاريع والإشراف إلى محفظتها. تم الحصول على شهادة ISO، مما رسّخ التزام الشركة بالمعايير الدولية للجودة." },
  { year: "2019 to 2025", year_ar: "2019 إلى 2025", title: "Driving Innovation", title_ar: "دفع عجلة الابتكار", description: "Focus on enhancing internal systems, upgrading construction methods, and investing in professional development, building a more resilient, agile organization.", description_ar: "التركيز على تعزيز الأنظمة الداخلية، وتطوير أساليب البناء، والاستثمار في التطوير المهني، لبناء منظومة أكثر مرونة وصلابة." },
  { year: "2026", year_ar: "2026", title: "Future Outlook, Vision 2030", title_ar: "نظرة مستقبلية، رؤية 2030", description: "BRU continues to innovate, expand its portfolio, and contribute to Saudi Arabia's development in alignment with Vision 2030, ensuring sustainable growth and excellence in every project.", description_ar: "تواصل BRU الابتكار وتوسيع محفظتها والمساهمة في تنمية المملكة العربية السعودية انسجامًا مع رؤية 2030، لضمان نمو مستدام وتميز في كل مشروع." },
];

const aboutVisionItems = [
  { number: "01", title: "Vision", title_ar: "الرؤية", description: "To integrate architecture, construction, and engineering expertise into one unified entity, and to remain the first reference in construction in the Kingdom, contributing to Saudi Arabia's development in alignment with Vision 2030 through sustainable growth and excellence in every project.", description_ar: "دمج خبرات العمارة والإنشاء والهندسة في كيان واحد متكامل، والبقاء المرجع الأول في البناء بالمملكة، بالمساهمة في تنمية المملكة العربية السعودية انسجامًا مع رؤية 2030 عبر نمو مستدام وتميز في كل مشروع." },
  { number: "02", title: "Mission", title_ar: "الرسالة", description: "To deliver integrated construction solutions under one roof, from foundation to finish, with precision and excellence; to attract top qualified talents while training and empowering ambitious young Saudi professionals; and to strengthen the private sector's role in urban development.", description_ar: "تقديم حلول إنشائية متكاملة تحت مظلة واحدة، من الأساسات حتى التشطيب النهائي، بدقة وتميّز؛ واستقطاب أفضل الكفاءات مع تدريب وتمكين الشباب السعودي الطموح؛ وتعزيز دور القطاع الخاص في التنمية العمرانية." },
];

const processPageSettings = {
  hero_eyebrow: "Stages of Work in a Structural (Shell) Project",
  hero_eyebrow_ar: "مراحل العمل في مشروع عظم",
  hero_heading1: "The 21", hero_heading1_ar: "مراحل بناء",
  hero_heading2: "stages of a", hero_heading2_ar: "الهيكل الإنشائي",
  hero_heading3: "structural build.", hero_heading3_ar: "الـ21.",
  hero_lede: "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.",
  hero_lede_ar: "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.",
  hero_meta1_label: "Structural Stages", hero_meta1_label_ar: "المراحل الإنشائية", hero_meta1_value: "21 consecutive", hero_meta1_value_ar: "21 مرحلة متتابعة",
  hero_meta2_label: "Starts With", hero_meta2_label_ar: "تبدأ بـ", hero_meta2_value: "Excavation & foundations", hero_meta2_value_ar: "الحفر وتأسيس الأساسات",
  hero_meta3_label: "Ends With", hero_meta3_label_ar: "تنتهي بـ", hero_meta3_value: "Building in structural state", hero_meta3_value_ar: "اكتمال المبنى في حالته الإنشائية",
  hero_meta4_label: "Governed By", hero_meta4_label_ar: "وفق", hero_meta4_value: "Approved engineering specifications", hero_meta4_value_ar: "المواصفات الهندسية المعتمدة",

  intro_kicker: "مراحل العمل في مشروع عظم",
  intro_arabic_lede: "تتكوّن مرحلة العظم من 21 مرحلة متتابعة تبدأ من أعمال الحفر وتأسيس الأساسات، مرورًا بتنفيذ الهيكل الخرساني، وصولًا إلى اكتمال المبنى في حالته العظمية. كل مرحلة مصممة لضمان الجودة، الدقة، والالتزام بالجدول الزمني، مع متابعة مستمرة بين فرق التنفيذ والإشراف لضمان سلامة وسير العمل وفق المواصفات الهندسية المعتمدة.",
  intro_english_lede: "The structural (shell) phase consists of 21 consecutive stages, beginning with excavation works and the setting-out of foundations, proceeding through execution of the concrete frame, and reaching completion of the building in its structural state. Each stage is designed to guarantee quality, precision, and adherence to the schedule, with continuous follow-up between the execution and supervision teams to ensure safety and that work proceeds according to the approved engineering specifications.",

  finishing_eyebrow: "Stages of Work in a Finishing Project", finishing_eyebrow_ar: "مراحل العمل في مشروع التشطيب",
  finishing_heading: "Finishing.", finishing_heading_ar: "التشطيب.",
  finishing_body: "The finishing phase consists of several precise steps that begin with preparatory works and end with handing over the project ready for use. Each stage focuses on precision of execution, quality of materials, and adherence to the approved design, with continuous follow-up from the supervision teams to ensure all works are harmonised across the different departments.",
  finishing_body_ar: "تتكوّن مرحلة التشطيب من عدة خطوات دقيقة تبدأ من الأعمال التحضيرية وتنتهي بتسليم المشروع جاهزًا للاستخدام. تركّز كل مرحلة على الدقة في التنفيذ، جودة المواد، والالتزام بالتصميم المعتمد، مع متابعة مستمرة من فرق الإشراف لضمان تناغم جميع الأعمال بين الأقسام المختلفة.",
  finishing_cta: "Interior & Finishing Works", finishing_cta_ar: "أعمال التصميم الداخلي والتشطيبات",
  finishing_image_alt: "Interior finishing works on a BRU CO. construction project in Jeddah",
  finishing_image_alt_ar: "أعمال التشطيبات الداخلية في مشروع إنشائي لشركة مرجع المباني المتحدة في جدة",
};

const projectsPageSettings = {
  hero_eyebrow: "Portfolio", hero_eyebrow_ar: "أعمالنا",
  hero_title1: "What We've", hero_title1_ar: "ما الذي",
  hero_title2: "Built", hero_title2_ar: "بنيناه",
  hero_lede: "A selection from our portfolio of 300+ completed projects across Saudi Arabia, each delivered with precision, quality, and dedication.",
  hero_lede_ar: "مجموعة مختارة من محفظتنا التي تضم أكثر من 300 مشروع منجز في أنحاء السعودية، كلٌّ منها مُسلَّم بدقة وجودة وتفانٍ.",
  hero_meta1_label: "Completed Projects", hero_meta1_label_ar: "مشاريع منجزة", hero_meta1_value: "300+", hero_meta1_value_ar: "+300",
  hero_meta2_label: "Documented Here", hero_meta2_label_ar: "موثّقة هنا", hero_meta2_value: "18 case studies", hero_meta2_value_ar: "18 دراسة حالة",
  hero_meta3_label: "Sectors", hero_meta3_label_ar: "القطاعات", hero_meta3_value: "6", hero_meta3_value_ar: "6",
  hero_meta4_label: "Territory", hero_meta4_label_ar: "النطاق", hero_meta4_value: "Kingdom-wide, HQ Jeddah", hero_meta4_value_ar: "المملكة كاملة، المقر جدة",

  summary_eyebrow: "Summary", summary_eyebrow_ar: "نبذة",
  summary_body: "BRU CO. (Building Reference United) is a general contractor headquartered in Jeddah, founded in 2000, with more than 300 completed projects across Saudi Arabia: villa and residential construction, commercial buildings, hospitality, healthcare, F&B and sports facilities. Structural, architectural, electromechanical (MEP) and interior finishing works are delivered by one general contractor, from excavation and foundations through to handover.",
  summary_body_ar: "شركة مرجع المباني المتحدة (BRU) شركة مقاولات عامة مقرها جدة، تأسست عام 2000، وأنجزت أكثر من 300 مشروع في أنحاء المملكة العربية السعودية: بناء الفلل والمشاريع السكنية، المباني التجارية، الضيافة، الرعاية الصحية، المطاعم والمقاهي، والمنشآت الرياضية. تُنفَّذ الأعمال الإنشائية والمعمارية والكهروميكانيكية والتشطيبات الداخلية عبر مقاول عام واحد، من الحفر والأساسات وحتى التسليم.",
  summary_link1_label: "Construction services", summary_link1_label_ar: "خدماتنا الإنشائية", summary_link1_href: "/services",
  summary_link2_label: "The 21-stage process", summary_link2_label_ar: "منهجية العمل بمراحلها الـ 21", summary_link2_href: "/process",
  summary_link3_label: "Construction company in Jeddah", summary_link3_label_ar: "شركة مقاولات في جدة", summary_link3_href: "/construction-company-jeddah",
  summary_link4_label: "General contractor in Makkah", summary_link4_label_ar: "مقاول عام في مكة المكرمة", summary_link4_href: "/construction-company-makkah",
  summary_stat1_label: "Sectors built", summary_stat1_label_ar: "القطاعات التي نبني فيها", summary_stat1_value: "Residential, commercial, hospitality, healthcare, F&B, sports", summary_stat1_value_ar: "سكني، تجاري، ضيافة، رعاية صحية، مطاعم ومقاهٍ، منشآت رياضية",
  summary_stat2_label: "Primary cities", summary_stat2_label_ar: "المدن الرئيسية", summary_stat2_value: "Jeddah, Makkah and the Western Region", summary_stat2_value_ar: "جدة ومكة المكرمة والمنطقة الغربية",
  summary_stat3_label: "Delivery models", summary_stat3_label_ar: "نماذج التنفيذ", summary_stat3_value: "General contracting, design-build, turnkey", summary_stat3_value_ar: "مقاولات عامة، تصميم وتنفيذ، تسليم مفتاح",
  summary_stat4_label: "General contractor since", summary_stat4_label_ar: "مقاول عام منذ", summary_stat4_value: "2000", summary_stat4_value_ar: "2000",

  sectors_heading: "Sectors", sectors_heading_ar: "القطاعات",
  sectors_list: "Residential\nCommercial\nHospitality\nHealthcare\nF&B\nSports Facilities",
  sectors_list_ar: "سكني\nتجاري\nضيافة\nرعاية صحية\nمطاعم ومقاهٍ\nمنشآت رياضية",

  spotlight_eyebrow: "Selected Work", spotlight_eyebrow_ar: "أعمال مختارة",
  spotlight_title: "Three projects that define how we build.", spotlight_title_ar: "ثلاثة مشاريع تختصر ما نبنيه.",
  spotlight_lede: "Completed work, shown as delivered: the scope, the site, and the finished building.",
  spotlight_lede_ar: "مشاريع منجزة، معروضة كما سُلّمت: النطاق والموقع والمبنى بعد اكتماله.",
};

const projectDetailSettings = {
  method_eyebrow: "Method & Materials", method_eyebrow_ar: "الأسلوب والمواد",
  method_heading1: "How this project", method_heading1_ar: "كيف نُفِّذ",
  method_heading2: "was built.", method_heading2_ar: "هذا المشروع.",
  method_lede: "Structural work, materials and quality control on a BRU CO. project run on documented programmes rather than site improvisation.",
  method_lede_ar: "الأعمال الإنشائية والمواد وضبط الجودة في مشاريع BRU CO. تسير وفق برامج موثقة لا ارتجال في الموقع.",
};

const methodArticles = [
  { number: "01", title: "Structural method", title_ar: "الأسلوب الإنشائي", body: "The structural (shell) phase runs on a documented 21-stage programme: site hoarding, excavation and foundation setting-out, then the reinforced concrete frame stage by stage, through to a building complete in its structural state. The sequence is the same on every project, which is what makes a construction programme estimable rather than optimistic.", body_ar: "تسير المرحلة الإنشائية (الهيكل) وفق برنامج موثق من 21 مرحلة: تسوير الموقع، الحفر وتحديد الأساسات، ثم الهيكل الخرساني المسلح مرحلة تلو الأخرى، حتى اكتمال المبنى في حالته الإنشائية. التسلسل ذاته يُطبَّق في كل مشروع، وهو ما يجعل برنامج البناء قابلاً للتقدير الدقيق لا للتقدير التفاؤلي.", href: "/process", label: "See the 21 stages", label_ar: "اطّلع على المراحل الـ 21" },
  { number: "02", title: "Design and build", title_ar: "التصميم والتنفيذ", body: "This project was delivered design-build: architectural, structural and MEP design plus execution under one contract and one accountable party. It removes the usual gap between designer and contractor, so clashes between systems are resolved on the drawings rather than in poured concrete.", body_ar: "نُفِّذ هذا المشروع بنظام التصميم والتنفيذ: تصميم معماري وإنشائي وكهروميكانيكي مع التنفيذ ضمن عقد واحد وجهة واحدة مسؤولة. هذا يُلغي الفجوة المعتادة بين المصمم والمقاول، فتُحل تعارضات الأنظمة على المخططات لا في الخرسانة المصبوبة.", href: "/services#architectural-works", label: "Architectural works", label_ar: "الأعمال المعمارية" },
  { number: "03", title: "Interior and external finishing", title_ar: "التشطيبات الداخلية والخارجية", body: "The finishing phase begins with preparatory works and ends with the project handed over ready for use. It covers full interior design implementation, interior and exterior finishing, façade works, joinery and façade lighting, with material quality control and adherence to the approved design under continuous supervision that harmonises every trade on site.", body_ar: "تبدأ مرحلة التشطيب بالأعمال التحضيرية وتنتهي بتسليم المشروع جاهزًا للاستخدام. وتشمل التنفيذ الكامل للتصميم الداخلي، والتشطيبات الداخلية والخارجية، وأعمال الواجهات، والنجارة وإضاءة الواجهات، مع ضبط جودة المواد والالتزام بالتصميم المعتمد تحت إشراف مستمر ينسّق بين جميع الحرف في الموقع.", href: "/services#interior-finishing-works", label: "Finishing works", label_ar: "أعمال التشطيب" },
  { number: "04", title: "Quality control and safety", title_ar: "ضبط الجودة والسلامة", body: "Each of the 21 structural stages carries its own verification, and supervision re-inspects after every strike of formwork. BRU CO. is certified to ISO standards for quality, safety and environmental management, and site safety requirements apply for the full duration of the works.", body_ar: "تحمل كل مرحلة من المراحل الإنشائية الـ 21 تحققًا خاصًا بها، ويعيد الإشراف الفحص بعد كل فك للشدة الخشبية. BRU CO. معتمدة وفق مواصفات الآيزو للجودة والسلامة والبيئة، وتُطبَّق متطلبات السلامة في الموقع طوال مدة الأعمال.", href: "/services#quality-assurance", label: "Quality and safety", label_ar: "الجودة والسلامة" },
];

const servicesPageSettings = {
  hero_eyebrow: "Our Services", hero_eyebrow_ar: "خدماتنا",
  hero_title1: "Four disciplines,", hero_title1_ar: "أربعة تخصصات،",
  hero_title2: "one roof.", hero_title2_ar: "تحت سقف واحد.",
  hero_lede: "Comprehensive construction solutions under one roof, from foundation to finish, BRU delivers with precision and excellence.",
  hero_lede_ar: "حلول إنشائية متكاملة تحت مظلة واحدة، من الأساسات حتى التشطيب النهائي، تقدّمها BRU بدقة وتميّز.",

  inspection_eyebrow: "Inspection Process", inspection_eyebrow_ar: "عملية الفحص",
  inspection_title: "Checked, then checked again.", inspection_title_ar: "فُحص، ثم فُحص مرة أخرى.",
  inspection_lede: "Quality assurance at BRU is written into the method statement itself, each of the 21 structural stages carries its own verification, and supervision re-inspects after every formwork strike.",
  inspection_lede_ar: "ضمان الجودة في BRU مكتوب في بيان الطريقة ذاته، فكل مرحلة من المراحل الإنشائية الـ 21 تحمل تحققها الخاص، ويعيد الإشراف الفحص بعد كل عملية فك للشدة الخشبية.",
  inspection_phases: "SOIL & FOUNDING LEVEL\nSTRUCTURAL FRAME\nENVELOPE & MEP\nHANDOVER",
  inspection_phases_ar: "التربة ومنسوب التأسيس\nالهيكل الإنشائي\nالغلاف والكهروميكانيكا\nالتسليم",

  quality_metric1_value: 21, quality_metric1_suffix: "", quality_metric1_suffix_ar: "", quality_metric1_label: "Structural stages with sign-off", quality_metric1_label_ar: "مرحلة إنشائية معتمدة",
  quality_metric2_value: 95, quality_metric2_suffix: "%", quality_metric2_suffix_ar: "%", quality_metric2_label: "Minimum compaction per layer", quality_metric2_label_ar: "الحد الأدنى للدمك لكل طبقة",
  quality_metric3_value: 30, quality_metric3_suffix: "cm", quality_metric3_suffix_ar: "سم", quality_metric3_label: "Maximum backfill layer thickness", quality_metric3_label_ar: "الحد الأقصى لسمك طبقة الردم",
  quality_metric4_value: 3, quality_metric4_suffix: "×", quality_metric4_suffix_ar: "×", quality_metric4_label: "Anti-termite treatment passes", quality_metric4_label_ar: "مرات معالجة مضادة للنمل الأبيض",

  compliance_eyebrow: "Compliance", compliance_eyebrow_ar: "الالتزام",
  compliance_title: "Standards, in full.", compliance_title_ar: "معايير متكاملة.",
  compliance_standards: "Member of the Saudi Contractors Authority\nFormally classified by regulatory bodies for structural, architectural, and MEP works\nAll engineers hold verified professional qualifications and active memberships with relevant bodies\nCompliant with Saudi nationalization (Saudization) requirements",
  compliance_standards_ar: "عضو في الهيئة السعودية للمقاولين\nمصنّفة رسميًا من الجهات التنظيمية للأعمال الإنشائية والمعمارية والكهروميكانيكية\nجميع المهندسين لديهم مؤهلات مهنية موثقة وعضويات فعّالة في الجهات ذات الصلة\nملتزمة بمتطلبات التوطين السعودية (السعودة)",
  compliance_request_docs: "Request Our Documents", compliance_request_docs_ar: "اطلب مستنداتنا",
  compliance_certifications_label: "Certifications", compliance_certifications_label_ar: "الاعتمادات",
  compliance_cert_body: "ISO certification in quality, safety and environmental management, membership of the Saudi Contractors Authority, and formal classification for structural, architectural and MEP works.",
  compliance_cert_body_ar: "شهادة ISO في إدارة الجودة والسلامة والبيئة، وعضوية الهيئة السعودية للمقاولين، وتصنيف رسمي للأعمال الإنشائية والمعمارية والكهروميكانيكية.",
  compliance_cert_cta: "Certifications & Licenses", compliance_cert_cta_ar: "الشهادات والتراخيص",
};

const servicesInspectionSteps = [
  { title: "Soil & Founding Level", title_ar: "التربة ومنسوب التأسيس", body: "Founding level taken from the soil report; plate load test confirms bearing capacity and permissible settlement are within safe design limits.", body_ar: "يُؤخذ منسوب التأسيس من تقرير التربة؛ ويؤكد اختبار التحميل أن قدرة التحمل والهبوط المسموح به ضمن حدود التصميم الآمنة." },
  { title: "Fill Classification", title_ar: "تصنيف الردم", body: "Backfill sample classified by test, graded coarse granular fill, ideally type (a-1-a), and placed in 30 cm layers to code.", body_ar: "تُصنَّف عينة الردم بالاختبار، ويُفضَّل ردم حبيبي خشن متدرج من النوع (a-1-a)، ويوضع على طبقات بسمك 30 سم وفق الكود." },
  { title: "Compaction Verification", title_ar: "التحقق من الدمك", body: "95% compaction confirmed for every layer to prevent settlement cracking the ground-floor blinding and dropping the floor tiling.", body_ar: "يُتحقق من دمك بنسبة 95% لكل طبقة لمنع حدوث هبوط يكسر صبة نظافة الدور الأرضي ويؤدي إلى هبوط البلاط." },
  { title: "Formwork Inspection", title_ar: "فحص الشدة الخشبية", body: "Timber formwork must be new; strengthened with tie rods, clamps and sound bracing to prevent failure during casting.", body_ar: "يجب أن تكون الشدة الخشبية جديدة؛ ومقوّاة بالتايروت والقمط والمرابع الجيدة لمنع فشلها أثناء الصب." },
  { title: "Plumb & Alignment", title_ar: "التوزين والاستقامة", body: "Columns plumbed on all sides before casting, then re-inspected after the formwork is struck.", body_ar: "تُوزَّن الأعمدة من جميع الجوانب قبل الصب، ويُعاد فحصها بعد فك الشدة الخشبية." },
  { title: "Casting Control", title_ar: "ضبط الصب", body: "Required concrete strength enforced, moulds thoroughly wetted before pouring, vibrator used throughout the pour.", body_ar: "الالتزام بإجهاد الخرسانة المطلوب، ورش القوالب جيدًا قبل الصب، واستخدام الهزاز طوال عملية الصب." },
  { title: "Setting-Out Compliance", title_ar: "الالتزام بالتخطيط", body: "Structural drawing followed for setting-out, column dimensions and column heights; rooms, bathrooms and kitchens squared per the architectural plan.", body_ar: "اتباع المخطط الإنشائي في التخطيط وأبعاد وارتفاعات الأعمدة؛ وتربيع الغرف والحمامات والمطابخ وفق المخطط المعماري." },
  { title: "Waterproofing", title_ar: "العزل المائي", body: "Tie beams insulated to stop moisture migrating into ground-floor walls and causing paint to peel.", body_ar: "تُعزل الميدات لمنع انتقال الرطوبة إلى جدران الدور الأرضي وتسبب تقشير الدهانات." },
];

const contactSettingsExtra = {
  phone: "+966 55 535 2526",
  email: "info@bru.com.sa",
  location: "Jeddah, Saudi Arabia",
  location_ar: "جدة، المملكة العربية السعودية",
  established_year: "2000",
  website_url: "https://www.bru.com.sa",
  website_display: "www.bru.com.sa",
  instagram_url: "https://instagram.com/bru.co.sa",
  instagram_display: "@bru.co.sa",
  x_url: "https://x.com/BruCompany",
  x_display: "@BruCompany",
  marquee_items: "Let's Build Together.\nYour vision, our craft, since 2000\nBuilding Reference, your first reference in construction, since 2000",
  marquee_items_ar: "لنبنِ معًا.\nرؤيتكم، حرفتنا، منذ 2000\nمرجع المباني، مرجعك الأول في البناء، منذ 2000",
  hero_eyebrow: "Let's Build Together · Jeddah, KSA", hero_eyebrow_ar: "لنبنِ معًا · جدة، السعودية",
  hero_heading1: "Let's Build", hero_heading1_ar: "لنبنِ",
  hero_heading2: "Together.", hero_heading2_ar: "معًا.",
  hero_lede: "Building Reference United Company · EST. 2000 · ISO CERTIFIED · JEDDAH, KSA",
  hero_lede_ar: "شركة مرجع المباني المتحدة · تأسست عام 2000 · معتمدة آيزو · جدة، السعودية",
  map_eyebrow: "Office", map_eyebrow_ar: "المكتب",
  map_heading1: "Jeddah,", map_heading1_ar: "جدة،",
  map_heading2: "Saudi Arabia.", map_heading2_ar: "المملكة العربية السعودية.",
  map_caption: "BRU CO., Head Office", map_caption_ar: "BRU CO.، المقر الرئيسي",
};

const siteCtaSettings = {
  eyebrow: "Let's Build Together.", eyebrow_ar: "لنبنِ معًا.",
  title1: "Your vision,", title1_ar: "رؤيتك،",
  title2: "our craft.", title2_ar: "حرفتنا.",
  lede: "Building Reference United Company · EST. 2000 · ISO CERTIFIED · JEDDAH, KSA",
  lede_ar: "شركة مرجع المباني المتحدة · تأسست 2000 · معتمدة ISO · جدة، السعودية",
  start_project: "Start a Project", start_project_ar: "ابدأ مشروعك",
};

async function seedRemainingPagesContent() {
  const supabase = createAdminClient();

  console.log("Seeding about page settings...");
  await supabase.from("about_page_settings").upsert({ id: 1, ...aboutPageSettings });
  await replaceAll(supabase, "about_milestones", aboutMilestones.map((row, i) => ({ ...row, sort_order: i })));
  await replaceAll(supabase, "about_vision_items", aboutVisionItems.map((row, i) => ({ ...row, sort_order: i })));

  console.log("Seeding process page settings...");
  await supabase.from("process_page_settings").upsert({ id: 1, ...processPageSettings });

  console.log("Seeding projects page settings...");
  await supabase.from("projects_page_settings").upsert({ id: 1, ...projectsPageSettings });
  await supabase.from("project_detail_settings").upsert({ id: 1, ...projectDetailSettings });
  await replaceAll(
    supabase,
    "project_detail_method_articles",
    methodArticles.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding services page settings...");
  await supabase.from("services_page_settings").upsert({ id: 1, ...servicesPageSettings });
  await replaceAll(
    supabase,
    "services_inspection_steps",
    servicesInspectionSteps.map((row, i) => ({ ...row, sort_order: i })),
  );

  console.log("Seeding contact page extras & site CTA...");
  const { data: existingContactSettings } = await supabase.from("contact_settings").select("*").eq("id", 1).maybeSingle();
  await supabase.from("contact_settings").upsert({ id: 1, ...existingContactSettings, ...contactSettingsExtra });
  await supabase.from("site_cta_settings").upsert({ id: 1, ...siteCtaSettings });

  console.log("Remaining pages content seeded.");
}

async function main() {
  const supabase = createAdminClient();

  console.log(`Seeding ${projects.length} projects...`);
  const slugToId = new Map<string, string>();

  for (const [index, p] of projects.entries()) {
    const { data, error } = await supabase
      .from("projects")
      .upsert(
        {
          slug: p.slug,
          title: p.title,
          display_title: p.displayTitle,
          category: p.category,
          subtitle: p.subtitle,
          teaser: p.teaser,
          description: p.description,
          client: p.client ?? null,
          location: p.location,
          scope: p.scope,
          size: p.size ?? null,
          image: p.image,
          featured: p.featured ?? false,
          sort_order: index,
          title_ar: p.ar.title,
          display_title_ar: p.ar.displayTitle,
          subtitle_ar: p.ar.subtitle,
          teaser_ar: p.ar.teaser,
          description_ar: p.ar.description,
          client_ar: p.ar.client ?? null,
          location_ar: p.ar.location,
          scope_ar: p.ar.scope,
          size_ar: p.ar.size ?? null,
        },
        { onConflict: "slug" },
      )
      .select("id, slug")
      .single();

    if (error) throw new Error(`Failed to upsert project "${p.slug}": ${error.message}`);
    slugToId.set(data.slug, data.id);
  }
  console.log("Projects seeded.");

  console.log(`Seeding ${services.length} services...`);
  for (const [index, s] of services.entries()) {
    const { data: serviceRow, error } = await supabase
      .from("services")
      .upsert(
        {
          slug: s.slug,
          number: s.number,
          title: s.title,
          title_ar: s.ar.title,
          description: s.description,
          description_ar: s.ar.description,
          capabilities: s.capabilities,
          capabilities_ar: s.ar.capabilities,
          image: s.image,
          sort_order: index,
        },
        { onConflict: "slug" },
      )
      .select("id")
      .single();

    if (error) throw new Error(`Failed to upsert service "${s.slug}": ${error.message}`);

    // Replace this service's gallery links from scratch (idempotent re-run).
    await supabase.from("service_gallery").delete().eq("service_id", serviceRow.id);

    const galleryRows = s.gallery
      .map((projectSlug, sortOrder) => {
        const projectId = slugToId.get(projectSlug);
        if (!projectId) {
          console.warn(`  ! gallery reference "${projectSlug}" not found for service "${s.slug}", skipping`);
          return null;
        }
        return { service_id: serviceRow.id, project_id: projectId, sort_order: sortOrder };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    if (galleryRows.length) {
      const { error: galleryError } = await supabase.from("service_gallery").insert(galleryRows);
      if (galleryError) throw new Error(`Failed to seed gallery for "${s.slug}": ${galleryError.message}`);
    }
  }
  console.log("Services seeded.");

  await seedRemainingContent();
  await seedHomeContent();
  await seedRemainingPagesContent();

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
