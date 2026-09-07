"use client";

import { usePathname } from "next/navigation";

export default function PageTransition() {
    const pathname = usePathname();

    return <div key={pathname} aria-hidden="true" className="page-curtain pointer-events-none fixed inset-0 z-150 bg-azure-deep" />;
}
