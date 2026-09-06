import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TextField, FieldPair, ImageField } from "../../_components/settings-fields";
import { saveLocationPage } from "./actions";

const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

const CITY_LABELS: Record<string, string> = { jeddah: "Jeddah", makkah: "Makkah" };

export default async function LocationPageSettingsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cityLabel = CITY_LABELS[slug];
  if (!cityLabel) notFound();

  const supabase = await createClient();
  const { data: row } = await supabase.from("location_pages").select("*").eq("slug", slug).maybeSingle();
  const s = row ?? {};

  const action = saveLocationPage.bind(null, slug);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">{cityLabel} landing page</h1>
        <p className="text-sm text-dust">
          Local-SEO page at /construction-company-{slug}, linked from every project&apos;s summary and scope-delivered
          sections.
        </p>
      </div>

      <form action={action} className="flex max-w-4xl flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Hero</legend>
          <ImageField name="hero_image" label="Hero background image" row={s} />
          <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
          <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={s} />
          <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={s} />
          <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={s} multiline rows={3} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Hero stats (3 boxes)</legend>
          {[1, 2, 3].map((n) => (
            <div key={n} className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
              <FieldPair name={`meta${n}_label`} label={`Stat ${n} label (English)`} labelAr="التسمية (عربي)" row={s} />
              <FieldPair name={`meta${n}_value`} label={`Stat ${n} value (English)`} labelAr="القيمة (عربي)" row={s} />
            </div>
          ))}
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Body</legend>
          <FieldPair name="body_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
          <FieldPair name="body_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
          <FieldPair name="body_p1" label="Paragraph 1 (English)" labelAr="الفقرة 1 (عربي)" row={s} multiline rows={4} />
          <FieldPair name="body_p2" label="Paragraph 2 (English)" labelAr="الفقرة 2 (عربي)" row={s} multiline rows={4} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Featured projects section</legend>
          <FieldPair name="projects_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={s} />
          <FieldPair name="projects_title" label="Title (English)" labelAr="العنوان (عربي)" row={s} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>SEO</legend>
          <TextField name="seo_title" label="Page title (shown in browser tab & Google, English)" defaultValue={s.seo_title as string} />
          <TextField name="seo_title_ar" label="عنوان الصفحة (عربي)" defaultValue={s.seo_title_ar as string} />
          <TextField
            name="seo_description"
            label="Meta description (English)"
            defaultValue={s.seo_description as string}
            multiline
            rows={2}
          />
          <TextField
            name="seo_description_ar"
            label="الوصف التعريفي (عربي)"
            defaultValue={s.seo_description_ar as string}
            multiline
            rows={2}
          />
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save {cityLabel} page
        </button>
      </form>
    </div>
  );
}
