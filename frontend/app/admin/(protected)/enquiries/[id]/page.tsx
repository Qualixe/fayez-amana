import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateEnquiryStatus } from "../actions";

const STATUSES = ["new", "contacted", "closed"] as const;

export default async function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: enquiry } = await supabase.from("enquiries").select("*").eq("id", id).maybeSingle();
  if (!enquiry) notFound();

  const fields: [string, string | null][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Phone", enquiry.phone],
    ["Scope", enquiry.scope],
    ["Location", enquiry.location],
    ["Budget", enquiry.budget],
    ["Sector", enquiry.sector],
    ["Locale", enquiry.locale],
    ["Received", new Date(enquiry.created_at).toLocaleString()],
  ];

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">{enquiry.name}</h1>

      <dl className="grid grid-cols-2 gap-4 border border-steel p-6">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">{label}</dt>
            <dd className="text-bone">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">Message</span>
        <p className="whitespace-pre-wrap border border-steel bg-ink p-6 text-bone">{enquiry.message}</p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">Status</span>
        <div className="flex gap-2">
          {STATUSES.map((status) => (
            <form key={status} action={updateEnquiryStatus.bind(null, id, status)}>
              <button
                type="submit"
                disabled={enquiry.status === status}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] capitalize disabled:cursor-default ${
                  enquiry.status === status
                    ? "border-azure-lift text-azure-glow"
                    : "border-steel text-dust hover:text-bone"
                }`}
              >
                {status}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
