"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type NavGroup = {
  label: string | null;
  links: { href: string; label: string }[];
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function SidebarNav({
  navGroups,
  onNavigate,
}: {
  navGroups: NavGroup[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const groupIsActive = (group: NavGroup) =>
    group.links.some((link) => pathname === link.href || pathname.startsWith(`${link.href}/`));

  const [openIndex, setOpenIndex] = useState<number | null>(() => {
    const activeIndex = navGroups.findIndex((group) => group.label !== null && groupIsActive(group));
    return activeIndex === -1 ? null : activeIndex;
  });

  function toggleGroup(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <nav className="flex flex-col gap-1">
      {navGroups.map((group, i) => {
        const isOpen = group.label === null || openIndex === i;
        const isActiveGroup = groupIsActive(group);
        return (
          <div key={group.label ?? `group-${i}`} className="flex flex-col gap-1">
            {group.label ? (
              <button
                type="button"
                onClick={() => toggleGroup(i)}
                aria-expanded={isOpen}
                className={`flex items-center justify-between gap-2 px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors hover:text-dust ${
                  isActiveGroup ? "text-azure-glow" : "text-ash"
                }`}
              >
                {group.label}
                <ChevronIcon open={isOpen} />
              </button>
            ) : null}
            {isOpen
              ? group.links.map((link) => {
                  const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onNavigate}
                      className={`relative rounded-none px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors ${
                        isActive
                          ? "bg-slab text-bone before:absolute before:inset-y-1 before:start-0 before:w-0.5 before:bg-azure-glow"
                          : "text-dust hover:bg-slab hover:text-bone"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })
              : null}
          </div>
        );
      })}
    </nav>
  );
}
