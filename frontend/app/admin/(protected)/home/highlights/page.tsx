import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteHighlight } from "./actions";

export default async function AdminHighlightsPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("home_highlights")
    .select("id, title")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home highlights</h1>
        <Link
          href="/admin/home/highlights/new"
          className="bg-azure px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          New highlight
        </Link>
      </div>

      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-steel font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            <th className="py-2 pe-4 text-start font-medium">Title</th>
            <th className="py-2 text-start font-medium" />
          </tr>
        </thead>
        <tbody>
          {(rows ?? []).map((row) => (
            <tr key={row.id} className="border-b border-steel/60">
              <td className="py-3 pe-4 text-bone">{row.title}</td>
              <td className="py-3 text-end">
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/home/highlights/${row.id}`} className="text-azure-glow hover:underline">
                    Edit
                  </Link>
                  <form action={async () => { "use server"; await deleteHighlight(row.id); }}>
                    <button type="submit" className="text-amber-soft hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
