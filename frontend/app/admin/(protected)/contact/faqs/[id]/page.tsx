import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import FaqForm from "../faq-form";
import { updateFaq } from "../actions";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: row } = await supabase.from("faqs").select("*").eq("id", id).maybeSingle();
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Edit FAQ</h1>
      <FaqForm action={updateFaq.bind(null, id)} defaultValues={row} submitLabel="Save changes" />
    </div>
  );
}
