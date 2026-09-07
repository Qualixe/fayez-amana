"use client";

import { useEffect, useState } from "react";

const DURATION = 2200;

export default function Preloader({
    logo,
    arabicName,
    englishName,
    estLine,
    stageLabels,
}: {
    logo: string;
    arabicName: string;
    englishName: string;
    estLine: string;
    stageLabels: string[];
}) {
    const labels = stageLabels.length > 0 ? stageLabels : [""];
    const stages = labels.map((label, i) => ({ threshold: Math.round((i / labels.length) * 100), label }));
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        if (window.location.hash || document.querySelector("[data-not-found-page]")) {
            setProgress(100);
            setVisible(false);
            setHidden(true);
            return;
        }

        setProgress(0);
        setVisible(true);
        setHidden(false);

        let rafId: number;
        const start = performance.now();

        const tick = (now: number) => {
            const elapsed = now - start;
            const pct = Math.min(100, Math.round((elapsed / DURATION) * 100));
            setProgress(pct);

            if (pct < 100) {
                rafId = requestAnimationFrame(tick);
            } else {
                setVisible(false);
                setTimeout(() => setHidden(true), 700);
            }
        };

        rafId = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafId);
        // Runs once on true initial load only — this component lives in the
        // persistent site layout and is never remounted by client-side
        // navigation, so it must not depend on pathname or it would replay
        // on every internal Link click.
    }, []);

    useEffect(() => {
        document.body.style.overflow = visible ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [visible]);

    if (hidden) return null;

    const currentStage = [...stages].reverse().find((stage) => progress >= stage.threshold) ?? stages[0];

    return (
        <div
            className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void transition-opacity duration-700 ease-out ${
                visible ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

            <div className="relative flex flex-col items-center gap-3 text-center">
                <img src={logo} alt="Fayez Amana" className="h-12 w-auto object-contain" />
                <span dir="rtl" className="text-sm text-dust">
                    {arabicName}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ash">
                    {englishName}
                </span>
            </div>

            <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.22em] text-dust">
                {estLine}
            </p>

            <div className="relative mt-10 w-full max-w-md px-6">
                <div className="relative h-px w-full bg-steel">
                    <span
                        aria-hidden="true"
                        className="absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-azure-glow transition-[left] duration-100 ease-linear"
                        style={{ left: `${progress}%` }}
                    />
                </div>
                <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
                    <span className="text-azure-glow">{currentStage.label}</span>
                    <span className="tabular-nums text-bone">{String(progress).padStart(3, "0")}</span>
                </div>
            </div>
        </div>
    );
}
