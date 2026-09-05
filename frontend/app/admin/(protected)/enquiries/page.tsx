import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const STATUSES = ["all", "new", "contacted", "closed"] as const;

export default async function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const activeStatus = STATUSES.includes(status as (typeof STATUSES)[number]) ? status! : "all";

  const supabase = await createClient();
  let query = supabase
    .from("enquiries")
    .select("id, name, email, sector, status, created_at")
    .order("created_at", { ascending: false });

  if (activeStatus !== "all") {
    query = query.eq("status", activeStatus);
  }

  const { data: enquiries, error } = await query;
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Enquiries</h1>

      <div className="flex gap-2">
        {STATUSES.map((s) => (
          <Link
            key={s}
            href={s === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${s}`}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] ${
              activeStatus === s ? "border-azure-lift text-azure-glow" : "border-steel text-dust hover:text-bone"
            }`}
          >
            {s}
          </Link>
        ))}
      </div>

      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-steel font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            <th className="py-2 pe-4 text-start font-medium">Name</th>
            <th className="py-2 pe-4 text-start font-medium">Email</th>
            <th className="py-2 pe-4 text-start font-medium">Sector</th>
            <th className="py-2 pe-4 text-start font-medium">Status</th>
            <th className="py-2 text-start font-medium">Received</th>
          </tr>
        </thead>
        <tbody>
          {(enquiries ?? []).map((enquiry) => (
            <tr key={enquiry.id} className="border-b border-steel/60">
              <td className="py-3 pe-4">
                <Link href={`/admin/enquiries/${enquiry.id}`} className="text-azure-glow hover:underline">
                  {enquiry.name}
                </Link>
              </td>
              <td className="py-3 pe-4 text-dust">{enquiry.email}</td>
              <td className="py-3 pe-4 text-dust">{enquiry.sector ?? "—"}</td>
              <td className="py-3 pe-4 text-dust capitalize">{enquiry.status}</td>
              <td className="py-3 text-dust">{new Date(enquiry.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!enquiries?.length ? <p className="text-sm text-dust">No enquiries here.</p> : null}
    </div>
  );
}
