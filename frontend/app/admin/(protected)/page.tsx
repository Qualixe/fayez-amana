import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getCounts() {
  const supabase = await createClient();
  const [projects, services, enquiries, newEnquiries] = await Promise.all([
    supabase.from("projects").select("id", { count: "exact", head: true }),
    supabase.from("services").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }),
    supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
  ]);

  return {
    projects: projects.count ?? 0,
    services: services.count ?? 0,
    enquiries: enquiries.count ?? 0,
    newEnquiries: newEnquiries.count ?? 0,
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  const cards = [
    { label: "New enquiries", value: counts.newEnquiries, href: "/admin/enquiries?status=new" },
    { label: "Total enquiries", value: counts.enquiries, href: "/admin/enquiries" },
    { label: "Projects", value: counts.projects, href: "/admin/projects" },
    { label: "Services", value: counts.services, href: "/admin/services" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Dashboard</h1>

      <div className="grid gap-px bg-steel sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="flex flex-col gap-2 bg-ink p-6 transition-colors hover:bg-slab"
          >
            <span className="text-3xl font-semibold text-bone">{card.value}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dust">{card.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
