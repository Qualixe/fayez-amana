import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteProject } from "./actions";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, slug, title, category, featured, sort_order")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Projects</h1>
        <Link
          href="/admin/projects/new"
          className="bg-azure px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          New project
        </Link>
      </div>

      <table className="w-full border-collapse text-start text-sm">
        <thead>
          <tr className="border-b border-steel text-start font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
            <th className="py-2 pe-4 text-start font-medium">Title</th>
            <th className="py-2 pe-4 text-start font-medium">Category</th>
            <th className="py-2 pe-4 text-start font-medium">Slug</th>
            <th className="py-2 pe-4 text-start font-medium">Featured</th>
            <th className="py-2 text-start font-medium" />
          </tr>
        </thead>
        <tbody>
          {(projects ?? []).map((project) => (
            <tr key={project.id} className="border-b border-steel/60">
              <td className="py-3 pe-4 text-bone">{project.title}</td>
              <td className="py-3 pe-4 text-dust">{project.category}</td>
              <td className="py-3 pe-4 font-mono text-xs text-dust">{project.slug}</td>
              <td className="py-3 pe-4 text-dust">{project.featured ? "Yes" : "—"}</td>
              <td className="py-3 text-end">
                <div className="flex justify-end gap-4">
                  <Link href={`/admin/projects/${project.id}`} className="text-azure-glow hover:underline">
                    Edit
                  </Link>
                  <form
                    action={async () => {
                      "use server";
                      await deleteProject(project.id);
                    }}
                  >
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

      {!projects?.length ? <p className="text-sm text-dust">No projects yet.</p> : null}
    </div>
  );
}
