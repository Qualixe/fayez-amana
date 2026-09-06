import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FieldPair } from "../../_components/settings-fields";
import { saveBenefitsSettings } from "./actions";

export default async function CareersBenefitsSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Careers page — Benefits</h1>
        <p className="text-sm text-dust">
          The benefit items themselves are managed under{" "}
          <Link href="/admin/careers/benefits" className="text-azure-glow hover:underline">
            Benefits
          </Link>
          .
        </p>
      </div>

      <form action={saveBenefitsSettings} className="flex max-w-4xl flex-col gap-4">
        <FieldPair name="benefits_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="benefits_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save benefits settings
        </button>
      </form>
    </div>
  );
}
