import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ServiceForm from "../service-form";
import { updateService } from "../actions";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!service) notFound();

  const { data: galleryRows } = await supabase
    .from("service_gallery")
    .select("sort_order, projects(slug)")
    .eq("service_id", id)
    .order("sort_order", { ascending: true });

  const gallery = (galleryRows ?? [])
    .map((row) => (row.projects as unknown as { slug: string } | null)?.slug)
    .filter((slug): slug is string => Boolean(slug));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit service</h1>
      <ServiceForm
        action={updateService.bind(null, id)}
        defaultValues={{ ...service, gallery }}
        submitLabel="Save changes"
      />
    </div>
  );
}
