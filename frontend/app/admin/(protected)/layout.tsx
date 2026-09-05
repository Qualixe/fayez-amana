import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminShell from "./admin-shell";

const navGroups = [
  { label: null, links: [{ href: "/admin", label: "Dashboard" }] },
  {
    label: "Home page",
    links: [
      { href: "/admin/home/hero-settings", label: "Hero settings" },
      { href: "/admin/home/about-settings", label: "About settings" },
      { href: "/admin/home/services-settings", label: "Services settings" },
      { href: "/admin/home/work-settings", label: "Work settings" },
      { href: "/admin/home/clients-settings", label: "Clients settings" },
      { href: "/admin/home/process-settings", label: "Process settings" },
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
    links: [
      { href: "/admin/site/nav-links", label: "Navigation" },
      { href: "/admin/site/settings", label: "Header & footer" },
      { href: "/admin/site/cta", label: "Bottom CTA" },
    ],
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
    <AdminShell navGroups={navGroups} userEmail={user.email ?? ""}>
      {children}
    </AdminShell>
  );
}
