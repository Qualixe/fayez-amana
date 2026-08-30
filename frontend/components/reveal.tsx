"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    delay?: number;
    tag?: ElementType;
    className?: string;
    clip?: boolean;
};

export default function Reveal({ children, delay = 0, tag: Tag = "div", className, clip = false }: RevealProps) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        document.documentElement.classList.add("reveal-ready");

        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.setAttribute(clip ? "data-reveal-clip" : "data-reveal", "in");
                    observer.disconnect();
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [clip]);

    return (
        <Tag
            ref={ref}
            {...(clip ? { "data-reveal-clip": "" } : { "data-reveal": "" })}
            style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
            className={className}
        >
            {children}
        </Tag>
    );
}
