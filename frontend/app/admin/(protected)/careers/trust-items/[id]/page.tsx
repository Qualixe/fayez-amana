import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TrustItemForm from "../trust-item-form";
import { updateTrustItem } from "../actions";

export default async function EditTrustItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("career_trust_items").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit trust badge</h1>
      <TrustItemForm action={updateTrustItem.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
