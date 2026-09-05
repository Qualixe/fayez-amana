import { createClient } from "@/lib/supabase/server";
import { FieldPair, VideoField } from "../../_components/settings-fields";
import { saveHeroSettings } from "./actions";

export default async function HeroSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("home_settings").select("*").eq("id", 1).maybeSingle();
  const s = row ?? {};

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Home page — Hero</h1>
        <p className="text-sm text-dust">
          The brand wordmark and "Start a Project" text here are also shown in the header and footer.
        </p>
      </div>

      <form action={saveHeroSettings} className="flex max-w-4xl flex-col gap-4">
        <VideoField name="hero_video" label="Background video" row={s} />
        <FieldPair name="hero_brand_line1" label="Brand wordmark line 1 (English)" labelAr="الاسم التجاري سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_brand_line2" label="Brand wordmark line 2 (English)" labelAr="الاسم التجاري سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
        <FieldPair name="hero_quote" label="Quote (English)" labelAr="الاقتباس (عربي)" row={s} multiline rows={2} />
        <FieldPair
          name="hero_services"
          label="Services list (one per line, English)"
          labelAr="قائمة الخدمات (سطر لكل عنصر، عربي)"
          row={s}
          multiline
          rows={4}
        />
        <FieldPair name="hero_start_project" label="'Start a project' button (English)" labelAr="زر 'ابدأ مشروعك' (عربي)" row={s} />
        <FieldPair name="hero_view_portfolio" label="'View portfolio' link (English)" labelAr="رابط 'تصفح الأعمال' (عربي)" row={s} />
        <FieldPair name="hero_handover_label" label="Handover label (English)" labelAr="تسمية التسليم (عربي)" row={s} />
        <FieldPair name="hero_handover_title1" label="Handover title line 1 (English)" labelAr="عنوان التسليم سطر 1 (عربي)" row={s} />
        <FieldPair name="hero_handover_title2" label="Handover title line 2 (English)" labelAr="عنوان التسليم سطر 2 (عربي)" row={s} />
        <FieldPair name="hero_handover_body" label="Handover body (English)" labelAr="نص التسليم (عربي)" row={s} multiline rows={2} />
        <FieldPair name="hero_scroll_hint" label="Scroll hint (English)" labelAr="تلميح التمرير (عربي)" row={s} />

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save hero settings
        </button>
      </form>
    </div>
  );
}
