"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function updateApplicationStatus(
  id: string,
  status: "new" | "reviewed" | "contacted" | "rejected",
) {
  const supabase = await createClient();
  const { error } = await supabase.from("career_applications").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/careers/applications");
  revalidatePath(`/admin/careers/applications/${id}`);
}
