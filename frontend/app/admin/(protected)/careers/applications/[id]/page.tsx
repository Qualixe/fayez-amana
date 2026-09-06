import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCvSignedUrl } from "@/lib/supabase/storage";
import { updateApplicationStatus } from "../actions";

const STATUSES = ["new", "reviewed", "contacted", "rejected"] as const;

export default async function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: application } = await supabase.from("career_applications").select("*").eq("id", id).maybeSingle();
  if (!application) notFound();

  const cvUrl = application.cv_url ? await getCvSignedUrl(supabase, application.cv_url) : null;

  const { data: fieldDefs } = await supabase.from("career_application_fields").select("field_key, label");
  const labelByKey = new Map((fieldDefs ?? []).map((f) => [f.field_key, f.label]));
  const extraEntries = Object.entries((application.extra_fields as Record<string, string>) ?? {}).filter(
    ([key]) => key !== "phone" && key !== "experience",
  );
  const formatKey = (key: string) => key.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  const fields: [string, string | null][] = [
    ["Name", application.name],
    ["Email", application.email],
    ["Phone", application.phone],
    ["Position", application.position],
    ["Locale", application.locale],
    ["Received", new Date(application.created_at).toLocaleString()],
  ];

  return (
    <div className="flex max-w-2xl flex-col gap-8">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">{application.name}</h1>

      <dl className="grid gap-4 border border-steel p-6 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="flex flex-col gap-1">
            <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">{label}</dt>
            <dd className="text-bone">{value ?? "—"}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">Experience</span>
        <p className="whitespace-pre-wrap border border-steel bg-ink p-6 text-bone">{application.experience || "—"}</p>
      </div>

      {extraEntries.length ? (
        <div className="flex flex-col gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">Additional information</span>
          <dl className="grid gap-4 border border-steel p-6 sm:grid-cols-2">
            {extraEntries.map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
                  {labelByKey.get(key) ?? formatKey(key)}
                </dt>
                <dd className="whitespace-pre-wrap text-bone">{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">CV</span>
        {cvUrl ? (
          <a href={cvUrl} target="_blank" rel="noreferrer" className="w-fit text-azure-glow hover:underline">
            Open CV (PDF, link valid for 10 minutes)
          </a>
        ) : (
          <p className="text-dust">No CV attached.</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">Status</span>
        <div className="flex gap-2">
          {STATUSES.map((status) => (
            <form key={status} action={updateApplicationStatus.bind(null, id, status)}>
              <button
                type="submit"
                disabled={application.status === status}
                className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] capitalize disabled:cursor-default ${
                  application.status === status
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
