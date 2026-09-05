import type { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "./sign-out-button";

const navGroups = [
  { label: null, links: [{ href: "/admin", label: "Dashboard" }] },
  {
    label: "Home page",
    links: [
      { href: "/admin/home/settings", label: "Home settings" },
      { href: "/admin/home/hero-stages", label: "Hero stages" },
      { href: "/admin/home/stats", label: "Stats" },
      { href: "/admin/home/highlights", label: "Highlights" },
      { href: "/admin/home/values", label: "Core values" },
      { href: "/admin/home/values-settings", label: "Core values settings" },
    ],
  },
  {
    label: "About page",
    links: [
      { href: "/admin/about/page-settings", label: "Page settings" },
      { href: "/admin/about/milestones", label: "Journey milestones" },
      { href: "/admin/about/vision-items", label: "Vision & mission" },
      { href: "/admin/about/team", label: "Team breakdown" },
      { href: "/admin/about/certifications", label: "Certifications" },
      { href: "/admin/about/clients", label: "Clients" },
      { href: "/admin/about/settings", label: "Founder & settings" },
    ],
  },
  {
    label: "Services page",
    links: [
      { href: "/admin/services/page-settings", label: "Page settings" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/services/inspection-steps", label: "Inspection steps" },
    ],
  },
  {
    label: "Projects page",
    links: [
      { href: "/admin/projects/page-settings", label: "Page settings" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/projects/detail-settings", label: "Project detail settings" },
      { href: "/admin/projects/method-articles", label: "Method articles" },
    ],
  },
  {
    label: "Process page",
    links: [
      { href: "/admin/process/page-settings", label: "Page settings" },
      { href: "/admin/process/stages", label: "Structural stages" },
      { href: "/admin/process/categories", label: "Stage categories" },
      { href: "/admin/process/phases", label: "Workflow phases" },
    ],
  },
  {
    label: "Contact page",
    links: [
      { href: "/admin/contact/faqs", label: "FAQs" },
      { href: "/admin/contact/options", label: "Form options" },
      { href: "/admin/contact/settings", label: "Settings" },
      { href: "/admin/enquiries", label: "Enquiries" },
    ],
  },
  {
    label: "Site-wide",
    links: [{ href: "/admin/site/cta", label: "Bottom CTA" }],
  },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Middleware already gates this, but redirect defensively too (e.g. direct
  // server-side data fetches, or if middleware's matcher is ever narrowed).
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-svh bg-void text-bone">
      <aside className="flex w-64 shrink-0 flex-col justify-between overflow-y-auto border-e border-steel bg-ink p-6">
        <div className="flex flex-col gap-6">
          <span className="text-xl font-bold tracking-[-0.02em]">
            BRU<span className="text-azure-glow">CO.</span>
          </span>
          <nav className="flex flex-col gap-5">
            {navGroups.map((group, i) => (
              <div key={group.label ?? `group-${i}`} className="flex flex-col gap-1">
                {group.label ? (
                  <span className="px-3 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ash">
                    {group.label}
                  </span>
                ) : null}
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-none px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-dust transition-colors hover:bg-slab hover:text-bone"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-3 pt-6">
          <span className="truncate text-xs text-dust" title={user.email}>
            {user.email}
          </span>
          <SignOutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-x-auto p-8">{children}</main>
    </div>
  );
}
