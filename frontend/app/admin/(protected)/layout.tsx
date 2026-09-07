import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSiteSettings } from "@/lib/db/site";
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
      { href: "/admin/about/hero-settings", label: "Hero settings" },
      { href: "/admin/about/expertise-settings", label: "Expertise settings" },
      { href: "/admin/about/journey-settings", label: "Journey settings" },
      { href: "/admin/about/why-settings", label: "Why choose settings" },
      { href: "/admin/about/vision-settings", label: "Vision & mission settings" },
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
      { href: "/admin/services/hero-settings", label: "Hero settings" },
      { href: "/admin/services/inspection-settings", label: "Inspection process settings" },
      { href: "/admin/services/quality-metrics-settings", label: "Quality metrics settings" },
      { href: "/admin/services/compliance-settings", label: "Compliance settings" },
      { href: "/admin/services", label: "Services" },
      { href: "/admin/services/inspection-steps", label: "Inspection steps" },
    ],
  },
  {
    label: "Projects page",
    links: [
      { href: "/admin/projects/hero-settings", label: "Hero settings" },
      { href: "/admin/projects/summary-settings", label: "Summary settings" },
      { href: "/admin/projects/sectors-settings", label: "Sectors settings" },
      { href: "/admin/projects/spotlight-settings", label: "Spotlight settings" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/projects/detail-settings", label: "Project detail settings" },
      { href: "/admin/projects/method-articles", label: "Method articles" },
    ],
  },
  {
    label: "Process page",
    links: [
      { href: "/admin/process/hero-settings", label: "Hero settings" },
      { href: "/admin/process/intro-settings", label: "Bilingual intro settings" },
      { href: "/admin/process/finishing-settings", label: "Finishing settings" },
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
    label: "Careers page",
    links: [
      { href: "/admin/careers/hero-settings", label: "Hero settings" },
      { href: "/admin/careers/culture-settings", label: "Culture settings" },
      { href: "/admin/careers/benefits-settings", label: "Benefits settings" },
      { href: "/admin/careers/positions-settings", label: "Positions settings" },
      { href: "/admin/careers/application-settings", label: "Application settings" },
      { href: "/admin/careers/seo-settings", label: "SEO settings" },
      { href: "/admin/careers/culture", label: "Company culture" },
      { href: "/admin/careers/benefits", label: "Benefits" },
      { href: "/admin/careers/positions", label: "Open positions" },
      { href: "/admin/careers/application-fields", label: "Application form fields" },
      { href: "/admin/careers/trust-items", label: "Application trust badges" },
      { href: "/admin/careers/applications", label: "Job applications" },
    ],
  },
  {
    label: "News page",
    links: [
      { href: "/admin/news/hero-settings", label: "Hero settings" },
      { href: "/admin/news/hero-stats-settings", label: "Hero stats settings" },
      { href: "/admin/news/seo-settings", label: "SEO settings" },
      { href: "/admin/news/articles", label: "Articles" },
    ],
  },
  {
    label: "Location pages",
    links: [
      { href: "/admin/locations/jeddah", label: "Jeddah page" },
      { href: "/admin/locations/makkah", label: "Makkah page" },
    ],
  },
  {
    label: "Site-wide",
    links: [
      { href: "/admin/site/nav-links", label: "Navigation" },
      { href: "/admin/site/theme-settings", label: "Colors" },
      { href: "/admin/site/settings", label: "Header & footer" },
      { href: "/admin/site/preloader-settings", label: "Preloader" },
      { href: "/admin/site/preloader-stages", label: "Preloader stages" },
      { href: "/admin/site/cta", label: "Bottom CTA" },
      { href: "/admin/site/not-found-settings", label: "404 page" },
      { href: "/admin/site/privacy-settings", label: "Privacy page settings" },
      { href: "/admin/site/privacy-sections", label: "Privacy sections" },
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

  const siteSettings = await getSiteSettings("en");

  return (
    <AdminShell navGroups={navGroups} userEmail={user.email ?? ""} logo={siteSettings.headerLogo}>
      {children}
    </AdminShell>
  );
}
