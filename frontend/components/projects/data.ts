export type Project = {
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Hospitality" | "Healthcare" | "F&B";
  teaser: string;
  location: string;
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
    category: "Hospitality",
    teaser: "24 chalets fully redesigned & executed, La Fontaine Hotels & Resorts.",
    location: "Durrat Al-Arous, Jeddah",
    size: "24 chalets",
    image: "/images/spotlight-img1.avif",
    featured: true,
  },
  {
    slug: "diyar-al-khayal-duplex-villas",
    title: "48 Duplex Villas Complex, Diyar Al Khayal",
    category: "Residential",
    teaser: "Red brick construction, 2 floors + annex per unit.",
    location: "Jeddah, Saudi Arabia",
    size: "48 duplex villas",
    image: "/images/work-img2.avif",
    featured: true,
  },
  {
    slug: "sixteen-contemporary-villas",
    title: "16 Contemporary Villas",
    category: "Residential",
    teaser: "Spacious, functional & elegantly finished living environments.",
    location: "Jeddah, Saudi Arabia",
    size: "16 villas",
    image: "/images/work-img3.avif",
    featured: true,
  },
  {
    slug: "sport-center-prince-sultan",
    title: "Sport Center, Prince Sultan Road",
    category: "Commercial",
    teaser: "Retail spaces + gym, structural phase design & build.",
    location: "Prince Sultan Road, Jeddah",
    size: "Retail + gym",
    image: "/images/work-img4.avif",
    featured: true,
  },
  {
    slug: "enaya-medical-building",
    title: "Enaya Medical Building",
    category: "Healthcare",
    teaser: "State-of-the-art healthcare facility, advanced infrastructure & modern design.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img5.avif",
    featured: true,
  },
  {
    slug: "asli-basha-restaurant",
    title: "Asli Basha Restaurant",
    category: "F&B",
    teaser: "Modern & traditional fusion, refined finishes reflecting authentic identity.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img6.avif",
    featured: true,
  },
  {
    slug: "naamah-bakery",
    title: "Naamah Bakery",
    category: "F&B",
    teaser: "Modern materials with warm wooden finishes, welcoming and elegant.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img7.avif",
  },
  {
    slug: "residential-building",
    title: "Residential Building",
    category: "Residential",
    teaser: "High-quality living space designed for comfort, functionality, and modern living.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img8.avif",
  },
  {
    slug: "modern-residential-villa",
    title: "Modern Residential Villa",
    category: "Residential",
    teaser: "Two floors, an annex, and an outdoor seating area, diverse high-quality materials.",
    location: "Jeddah, Saudi Arabia",
    size: "2 floors + annex",
    image: "/images/service1.avif",
  },
  {
    slug: "residential-villa-elegant",
    title: "Residential Villa, Elegant Design",
    category: "Residential",
    teaser: "A residential villa characterized by an elegant design and modern aesthetics.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/service2.avif",
  },
  {
    slug: "andalusian-islamic-villa",
    title: "Andalusian / Islamic Style Villa",
    category: "Residential",
    teaser: "Arches, geometric patterns, and decorative motifs with modern functional layouts.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/service3.avif",
    featured: true,
  },
  {
    slug: "semi-classic-villa",
    title: "Semi-Classic Style Villa",
    category: "Residential",
    teaser: "Traditional classical elements blended with modern design features.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/service4.avif",
  },
  {
    slug: "neoclassical-villa",
    title: "Neoclassical Villa",
    category: "Residential",
    teaser: "Elegant classical elements combined with modern functionality.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/about-img1.avif",
  },
  {
    slug: "courtyard-villa",
    title: "Residential Villa with Courtyard",
    category: "Residential",
    teaser: "Modern architecture integrating outdoor space for relaxation and gatherings.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/about-hero-banner.avif",
  },
  {
    slug: "two-residential-villas",
    title: "Two Residential Villas",
    category: "Residential",
    teaser: "Two modern villas with contemporary elements and functional layouts.",
    location: "Jeddah, Saudi Arabia",
    size: "2 villas",
    image: "/images/why-choose-bg.avif",
  },
  {
    slug: "modern-villa",
    title: "Modern Villa",
    category: "Residential",
    teaser: "Integrated wooden elements and façade lighting per the architectural design.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img1.avif",
    featured: true,
  },
  {
    slug: "modern-duplex-villa",
    title: "Modern Duplex Villa",
    category: "Residential",
    teaser: "Spacious living areas, stylish finishes, balanced aesthetics and practicality.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img2.avif",
  },
  {
    slug: "modern-duplex-villa-ii",
    title: "Modern Duplex Villa II",
    category: "Residential",
    teaser: "Spacious living areas, stylish finishes, balanced aesthetics and practicality.",
    location: "Jeddah, Saudi Arabia",
    image: "/images/work-img3.avif",
  },
];

export function projectCity(project: Project) {
  return project.location.split(",")[0].trim();
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
