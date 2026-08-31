"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

export default function SpotlightCard({ children, className }: { children: ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };

    return (
        <div ref={ref} onMouseMove={handleMouseMove} className={className}>
            {children}
        </div>
    );
}
