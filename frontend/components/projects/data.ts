export type Project = {
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
};

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
  },
];

export function projectCity(project: Project) {
  return project.location.split(",")[0].trim();
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
  { slug: "structural-construction-works", label: "Structural & Construction Works", number: "01", keywords: ["structural", "full construction", "red brick"] },
  { slug: "architectural-works", label: "Architectural Works", number: "02", keywords: ["architect", "landscape"] },
  { slug: "electromechanical-works", label: "Electromechanical Works", number: "03", keywords: ["mep", "electromechanical"] },
  { slug: "interior-finishing-works", label: "Interior & Finishing Works", number: "04", keywords: ["finishing", "interior", "façade", "joinery", "amenities"] },
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
