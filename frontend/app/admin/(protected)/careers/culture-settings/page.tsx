import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { FieldPair, ImageField } from "../../_components/settings-fields";
import { saveCultureSettings } from "./actions";

export default async function CareersCultureSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("careers_page_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Careers page — Company Culture</h1>
        <p className="text-sm text-dust">
          The 4 culture cards and team breakdown numbers are managed under{" "}
          <Link href="/admin/careers/culture" className="text-azure-glow hover:underline">
            Company culture
          </Link>
          .
        </p>
      </div>

      <form action={saveCultureSettings} className="flex max-w-4xl flex-col gap-4">
        <ImageField name="culture_image" label="Section image (right column)" row={s} />
        <FieldPair name="culture_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="culture_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save culture settings
        </button>
      </form>
    </div>
  );
}
