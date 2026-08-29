import type { CSSProperties } from "react";

const marqueeItems = [
    "Your vision, our craft, since 2000",
    "EST. 2000 · ISO CERTIFIED · JEDDAH, KSA",
    "300+ Completed Projects",
    "25+ Years of Experience",
    "ISO Certified",
];

const navigateLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Process", href: "/process" },
    { label: "News", href: "/news" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
];

const disciplines = [
    "Structural & Construction Works",
    "Architectural Works",
    "Electromechanical Works",
    "Interior Design & Finishing",
];

const sectors = ["Residential", "Commercial", "Hospitality", "Healthcare", "F&B", "Sports Facilities"];

function MarqueeGroup() {
    return (
        <span className="flex items-center gap-10 whitespace-nowrap">
            {marqueeItems.map((item) => (
                <span key={item} className="flex items-center gap-10 whitespace-nowrap">
                    <span>{item}</span>
                    <span className="text-azure">·</span>
                </span>
            ))}
        </span>
    );
}

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-steel bg-ink">
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-35" aria-hidden="true" />

            <div className="relative border-b border-steel py-4">
                <div className="relative overflow-hidden font-mono text-[10px] uppercase tracking-[0.18em] text-dust" aria-hidden="true">
                    <div className="marquee-track flex w-max items-center gap-10" style={{ "--marquee-duration": "52s" } as CSSProperties}>
                        <MarqueeGroup />
                        <MarqueeGroup />
                    </div>
                </div>
            </div>

            <div className="relative mx-auto grid max-w-full gap-10 px-6 py-10 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:px-12">
                <div className="flex flex-col gap-4">
                    <span className="text-2xl font-bold tracking-[-0.02em] text-bone">
                        BRU<span className="text-azure-glow">CO.</span>
                    </span>
                    <p className="max-w-sm font-serif text-[clamp(1rem,1.5vw,1.25rem)] italic text-bone/90">
                        Your vision our craft, built with precision, delivered with integrity.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">EST. 2000 · ISO CERTIFIED · JEDDAH, KSA</p>
                </div>

                <nav aria-label="Footer navigation" className="flex flex-col gap-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">Navigate</h3>
                    <ul className="flex flex-col gap-2.5">
                        {navigateLinks.map((link) => (
                            <li key={link.href}>
                                <a href={link.href} className="text-sm text-dust transition-colors hover:text-bone">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">Disciplines</h3>
                    <ul className="flex flex-col gap-2.5">
                        {disciplines.map((item) => (
                            <li key={item} className="text-sm text-dust">
                                {item}
                            </li>
                        ))}
                    </ul>

                    <h3 className="mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">Sectors</h3>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                        {sectors.map((sector) => (
                            <li key={sector} className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                                {sector}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">Contact</h3>
                    <div className="flex flex-col gap-1.5">
                        <a
                            href="tel:+966555352526"
                            className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-tight text-bone transition-colors hover:text-azure-glow"
                        >
                            +966 55 535 2526
                        </a>
                        <a href="mailto:info@bru.com.sa" className="w-fit text-sm text-dust transition-colors hover:text-bone">
                            info@bru.com.sa
                        </a>
                    </div>
                    <ul className="flex flex-col gap-2.5 text-sm text-dust">
                        <li>
                            <a href="https://www.bru.com.sa" target="_blank" rel="noreferrer" className="transition-colors hover:text-bone">
                                www.bru.com.sa
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://instagram.com/bru.co.sa"
                                target="_blank"
                                rel="noreferrer"
                                className="transition-colors hover:text-bone"
                            >
                                Instagram @bru.co.sa
                            </a>
                        </li>
                        <li>
                            <a href="https://x.com/BruCompany" target="_blank" rel="noreferrer" className="transition-colors hover:text-bone">
                                Twitter / X @BruCompany
                            </a>
                        </li>
                        <li>Jeddah, Saudi Arabia</li>
                    </ul>
                </div>
            </div>

            <div className="relative mx-auto flex max-w-full flex-col gap-3 border-t border-steel px-6 py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-dust sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
                <span>© {new Date().getFullYear()} Building Reference United Company. All rights reserved.</span>
                <span>Building Reference, your first reference in construction, since 2000</span>
            </div>
        </footer>
    );
}
