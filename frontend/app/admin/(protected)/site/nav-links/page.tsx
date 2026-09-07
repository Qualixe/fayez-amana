import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NavLinksTable from "./nav-links-table";

export default async function AdminNavLinksPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("site_nav_links")
    .select("id, label, href, show_in_primary_nav")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Navigation</h1>
          <p className="text-sm text-dust">
            Every link here shows in the full site menu. Check &quot;top bar&quot; ones also show in the desktop header.
            Drag a row by its handle to reorder.
          </p>
        </div>
        <Link
          href="/admin/site/nav-links/new"
          className="bg-azure px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          New link
        </Link>
      </div>

      <NavLinksTable initialRows={rows ?? []} />
    </div>
  );
}
