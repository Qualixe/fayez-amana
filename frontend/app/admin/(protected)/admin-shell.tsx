"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import SidebarNav from "./sidebar-nav";
import SignOutButton from "./sign-out-button";

type NavGroup = { label: string | null; links: { href: string; label: string }[] };

export default function AdminShell({
  navGroups,
  userEmail,
  children,
}: {
  navGroups: NavGroup[];
  userEmail: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-svh bg-void text-bone">
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-void/80 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 start-0 z-40 flex h-svh w-72 max-w-[85vw] shrink-0 flex-col border-e border-steel bg-ink transition-transform duration-300 ease-out lg:sticky lg:top-0 lg:z-auto lg:w-64 lg:max-w-none lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between gap-2 border-b border-steel p-6">
          <span className="text-xl font-bold tracking-[-0.02em]">
            Fayez<span className="text-azure-glow">Amana</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-ash transition-colors hover:text-bone lg:hidden"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="thin-scrollbar scrollbar-azure min-h-0 flex-1 overflow-y-auto p-6">
          <SidebarNav navGroups={navGroups} onNavigate={() => setOpen(false)} />
        </div>

        <div className="shrink-0 border-t border-steel p-6">
          <div className="flex flex-col gap-3">
            <span className="truncate text-xs text-dust" title={userEmail}>
              {userEmail}
            </span>
            <SignOutButton />
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="sticky top-0 z-20 flex shrink-0 items-center gap-3 border-b border-steel bg-ink p-4 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="text-bone"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-lg font-bold tracking-[-0.02em]">
            Fayez<span className="text-azure-glow">Amana</span>
          </span>
        </div>

        <main className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
