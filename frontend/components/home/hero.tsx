"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/lib/locale";

const content = {
    en: {
        eyebrow: "EST. 2000 · Jeddah, Saudi Arabia",
        quote: "“Your vision our craft, built with precision, delivered with integrity.”",
        services: [
            "Structural & Construction Works",
            "Architectural Works",
            "Electromechanical Works",
            "Interior Design & Finishing",
        ],
        startProject: "Start a Project",
        viewPortfolio: "View the portfolio",
        stats: [
            { value: "300+", label: "Completed Projects" },
            { value: "25+", label: "Years of Experience" },
            { value: "80+", label: "Team Members" },
        ],
        stages: [
            { code: "000", title: "Survey & Blueprint", detail: "Empty land · site outline · topographic grid", period: "Morning light" },
            { code: "001", title: "Excavation & Foundation", detail: "Site clearance · footings · foundation pour", period: "Midday" },
            { code: "002", title: "Structural Framework", detail: "Columns · beams · slab construction", period: "Midday" },
            { code: "003", title: "Envelope & Roofing", detail: "Walls · roofing · waterproofing", period: "Afternoon" },
            { code: "004", title: "MEP Rough-in", detail: "Electrical · plumbing · HVAC systems", period: "Golden hour" },
            { code: "005", title: "Handover", detail: "Roads · landscape · lighting on", period: "Golden hour" },
        ],
        handoverLabel: "Handover · 100%",
        handoverTitle1: "From empty land",
        handoverTitle2: "to handover.",
        handoverBody: "21 structural stages, 300+ completed projects, 25 years. This is how BRU CO. builds.",
        scrollHint: "Scroll to explore",
        srOnly: ", Building Reference United, a construction company and general contractor in Jeddah, Saudi Arabia",
    },
    ar: {
        eyebrow: "تأسست 2000 · جدة، السعودية",
        quote: "“رؤيتك، حرفتنا، نبني بدقة، ونسلّم بأمانة.”",
        services: [
            "الأعمال الإنشائية والبناء",
            "الأعمال المعمارية",
            "الأعمال الكهروميكانيكية",
            "التصميم الداخلي والتشطيبات",
        ],
        startProject: "ابدأ مشروعك",
        viewPortfolio: "تصفح أعمالنا",
        stats: [
            { value: "+300", label: "مشروع منجز" },
            { value: "+25", label: "عامًا من الخبرة" },
            { value: "+80", label: "عضو فريق" },
        ],
        stages: [
            { code: "000", title: "المسح والمخطط", detail: "أرض فارغة · تحديد الموقع · شبكة طبوغرافية", period: "ضوء الصباح" },
            { code: "001", title: "الحفر والأساسات", detail: "تجهيز الموقع · القواعد · صب الأساسات", period: "الظهيرة" },
            { code: "002", title: "الهيكل الإنشائي", detail: "الأعمدة · الكمرات · صب الأسقف", period: "الظهيرة" },
            { code: "003", title: "الغلاف والأسقف", detail: "الجدران · التسقيف · العزل المائي", period: "بعد الظهر" },
            { code: "004", title: "الأعمال الكهروميكانيكية", detail: "الكهرباء · السباكة · أنظمة التكييف", period: "الساعة الذهبية" },
            { code: "005", title: "التسليم", detail: "الطرق · تنسيق المواقع · الإضاءة", period: "الساعة الذهبية" },
        ],
        handoverLabel: "التسليم · 100%",
        handoverTitle1: "من أرض فارغة",
        handoverTitle2: "إلى التسليم.",
        handoverBody: "21 مرحلة إنشائية، أكثر من 300 مشروع منجز، 25 عامًا من الخبرة. هكذا تبني BRU CO.",
        scrollHint: "مرر للاستكشاف",
        srOnly: "، شركة مرجع المباني المتحدة، شركة مقاولات عامة في جدة، المملكة العربية السعودية",
    },
} as const;

const INTRO_FADE_END = 0.15;
const REWARD_FADE_START = 0.85;

const PLAYBACK_CONST = 500;

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

export default function Hero({ locale }: { locale: Locale }) {
    const t = content[locale];
    const { services, stats, stages } = t;
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const progressFillRef = useRef<HTMLDivElement>(null);
    const progressPercentRef = useRef<HTMLSpanElement>(null);
    const stageTitleRef = useRef<HTMLSpanElement>(null);
    const stageDetailRef = useRef<HTMLParagraphElement>(null);
    const periodRef = useRef<HTMLSpanElement>(null);
    const scrollHintRef = useRef<HTMLSpanElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const rewardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const section = sectionRef.current;
        if (!video || !section) return;

        let rafId: number;
        let lastStageIndex = -1;
        let hintHidden = false;

        const scrollPlay = () => {
            const scrollTop = window.scrollY || window.pageYOffset;
            const maxTime = video.duration || 0;
            const currentTime = Math.min(Math.max(scrollTop / PLAYBACK_CONST, 0), maxTime);

            if (Math.abs(video.currentTime - currentTime) > 0.01) {
                video.currentTime = currentTime;
            }

            const progress = maxTime > 0 ? currentTime / maxTime : 0;

            if (progressFillRef.current) {
                progressFillRef.current.style.width = `${progress * 100}%`;
            }

            if (progressPercentRef.current) {
                progressPercentRef.current.textContent = String(Math.round(progress * 100)).padStart(3, "0");
            }

            const stageIndex = Math.min(stages.length - 1, Math.floor(progress * stages.length));
            if (stageIndex !== lastStageIndex) {
                lastStageIndex = stageIndex;
                const stage = stages[stageIndex];
                if (stageTitleRef.current) stageTitleRef.current.textContent = stage.title;
                if (stageDetailRef.current) stageDetailRef.current.textContent = stage.detail;
                if (periodRef.current) periodRef.current.textContent = stage.period;
            }

            const shouldHideHint = scrollTop > 40;
            if (shouldHideHint !== hintHidden) {
                hintHidden = shouldHideHint;
                if (scrollHintRef.current) scrollHintRef.current.style.opacity = shouldHideHint ? "0" : "1";
            }

            if (introRef.current) {
                const introProgress = Math.min(1, progress / INTRO_FADE_END);
                introRef.current.style.opacity = String(1 - introProgress);
                introRef.current.style.transform = `translateY(${introProgress * -32}px)`;
            }

            if (rewardRef.current) {
                const rewardProgress =
                    progress <= REWARD_FADE_START ? 0 : Math.min(1, (progress - REWARD_FADE_START) / (1 - REWARD_FADE_START));
                rewardRef.current.style.opacity = String(rewardProgress);
                rewardRef.current.style.transform = `translateY(${(1 - rewardProgress) * 32}px)`;
            }

            rafId = requestAnimationFrame(scrollPlay);
        };

        const onLoadedMetadata = () => {
            section.style.height = `${video.duration * PLAYBACK_CONST + window.innerHeight}px`;
            video.currentTime = 0;
            // Lenis caches the scrollable content height and only recalculates it on a
            // window "resize" event — without this, Lenis keeps the pre-video scroll
            // limit and the user can never wheel-scroll far enough to play the video.
            window.dispatchEvent(new Event("resize"));
            rafId = requestAnimationFrame(scrollPlay);
        };

        if (video.readyState >= 1) {
            onLoadedMetadata();
        } else {
            video.addEventListener("loadedmetadata", onLoadedMetadata);
        }

        return () => {
            video.removeEventListener("loadedmetadata", onLoadedMetadata);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section ref={sectionRef} className="relative isolate bg-void">
            <div className="sticky top-0 flex h-svh w-full items-center overflow-hidden">
                <video
                    ref={videoRef}
                    preload="auto"
                    muted
                    playsInline
                    className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover"
                >
                    <source type="video/mp4" src="/videos/construction-build.mp4" />
                </video>
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(140% 100% at 50% 36%, transparent 55%, rgba(13,18,25,0.42) 100%), linear-gradient(to bottom, rgba(13,18,25,0.38) 0%, transparent 18%, transparent 68%, rgba(13,18,25,0.8) 100%)",
                    }}
                    aria-hidden="true"
                />

                <div
                    ref={introRef}
                    className="pointer-events-none absolute inset-0 flex items-center transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform]"
                >
                    <div className="mx-auto w-full max-w-full px-6 sm:px-8 lg:px-12">
                        <div className="max-w-4xl">
                            <p className="mb-5 flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-azure-glow sm:mb-7">
                                <span aria-hidden="true" className="h-px w-8 bg-azure sm:w-10" />
                                {t.eyebrow}
                            </p>

                            <h1 className="text-[clamp(2.75rem,15vw,8rem)] leading-[0.88] font-bold tracking-[-0.03em] text-bone sm:leading-[0.85]">
                                <span dir="ltr" className={`block ${locale === "ar" ? "text-right" : "text-left"}`}>BRU</span>
                                <span dir="ltr" className={`block text-azure-glow ${locale === "ar" ? "text-right" : "text-left"}`}>CO.</span>
                                <span className="sr-only">
                                    {t.srOnly}
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl font-serif text-[clamp(1.15rem,3.4vw,1.75rem)] leading-relaxed text-bone/90 italic sm:mt-8">
                                {t.quote}
                            </p>

                            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 sm:mt-8 sm:gap-x-7">
                                {services.map((service) => (
                                    <li
                                        key={service}
                                        className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dust sm:text-[11px] sm:tracking-[0.18em]"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>

                            <div className="pointer-events-auto mt-8 flex flex-col gap-4 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center">
                                <a
                                    href="/contact"
                                    className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-white/10 px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-[filter] duration-500 hover:brightness-110 sm:min-h-[56px] sm:px-9 sm:py-5"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
                                    }}
                                >
                                    {t.startProject}
                                    <ArrowIcon />
                                </a>
                                <a
                                    href="/projects"
                                    className="inline-flex min-h-[52px] items-center justify-center gap-3 border border-transparent bg-white/[0.03] px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-400 hover:bg-white/[0.06] sm:min-h-[56px] sm:px-9 sm:py-5"
                                >
                                    {t.viewPortfolio}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    ref={rewardRef}
                    className="pointer-events-none absolute inset-0 flex items-end opacity-0 transition-[opacity,transform] duration-300 ease-out will-change-[opacity,transform]"
                >
                    <div className="mx-auto w-full max-w-full px-6 pb-48 sm:px-8 sm:pb-44 md:pb-40 lg:px-12">
                        <div className="max-w-3xl">
                            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-amber-soft">{t.handoverLabel}</p>
                            <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.02em] text-bone">
                                {t.handoverTitle1}
                                <span className="block text-amber-soft">{t.handoverTitle2}</span>
                            </h2>
                            <p className="mt-6 max-w-xl font-serif text-[clamp(1.05rem,2vw,1.375rem)] leading-relaxed text-bone/90">
                                {t.handoverBody}
                            </p>
                            <div className="pointer-events-auto mt-8 flex flex-wrap gap-4">
                                <a
                                    href="/projects"
                                    className="inline-flex min-h-[52px] items-center justify-center gap-3 border border-transparent bg-white/[0.03] px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-bone transition-colors duration-400 hover:bg-white/[0.06] sm:min-h-[56px] sm:px-9 sm:py-5"
                                >
                                    {t.viewPortfolio}
                                </a>
                                <a
                                    href="/contact"
                                    className="group inline-flex min-h-[52px] items-center justify-center gap-3 border border-white/10 px-8 py-4 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-[filter] duration-500 hover:brightness-110 sm:min-h-[56px] sm:px-9 sm:py-5"
                                    style={{
                                        backgroundImage:
                                            "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
                                    }}
                                >
                                    {t.startProject}
                                    <ArrowIcon />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div className="mx-auto w-full max-w-full px-6 pb-7 sm:px-8 lg:px-12">
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end justify-between gap-6">
                                <div className="min-w-0">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-azure-glow">
                                        <span ref={progressPercentRef} className="tabular-nums">
                                            000
                                        </span>
                                        % · <span ref={stageTitleRef}>{stages[0].title}</span>
                                    </p>
                                    <p ref={stageDetailRef} className="mt-2 truncate font-mono text-[10px] uppercase tracking-[0.14em] text-dust">
                                        {stages[0].detail}
                                    </p>
                                </div>
                                <div className="hidden shrink-0 gap-8 md:flex">
                                    {stats.map((stat) => (
                                        <div key={stat.label} className="text-end">
                                            <div className="text-2xl font-bold leading-none text-bone">{stat.value}</div>
                                            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dust">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative h-px w-full bg-steel">
                                <div ref={progressFillRef} className="absolute inset-y-0 start-0 bg-azure" style={{ width: "0%" }} />
                                {stages.map((stage, index) => (
                                    <span
                                        key={stage.code}
                                        className="absolute top-1/2 h-1.5 w-px -translate-y-1/2 bg-rebar"
                                        style={{ left: `${(index / stages.length) * 100}%` }}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-dust">
                                <span ref={scrollHintRef} className="flex items-center gap-2.5 transition-opacity duration-500">
                                    <span aria-hidden="true" className="text-azure-glow">
                                        ↓
                                    </span>
                                    {t.scrollHint}
                                </span>
                                <span dir="ltr" className="hidden sm:inline">www.bru.com.sa</span>
                                <span ref={periodRef}>{stages[0].period}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
