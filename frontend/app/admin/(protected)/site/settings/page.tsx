import { createClient } from "@/lib/supabase/server";
import { saveSiteSettings } from "./actions";

const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";
const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

type Row = Record<string, string | undefined>;

function ImageField({ name, label, row }: { name: string; label: string; row: Row }) {
  const value = row[name];
  return (
    <label className={labelClasses}>
      {label}
      {value ? <img src={value} alt="" className="h-16 w-auto border border-steel bg-ink object-contain p-2" /> : null}
      <input type="file" name={`${name}_file`} accept="image/*" className={fieldClasses} />
      <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
      <input name={name} defaultValue={value ?? ""} className={fieldClasses} />
    </label>
  );
}

function FieldPair({
  name,
  label,
  labelAr,
  row,
  multiline,
}: {
  name: string;
  label: string;
  labelAr: string;
  row: Row;
  multiline?: boolean;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <label className={labelClasses}>
        {label}
        {multiline ? (
          <textarea name={name} rows={4} defaultValue={row[name] ?? ""} className={fieldClasses} />
        ) : (
          <input name={name} defaultValue={row[name] ?? ""} className={fieldClasses} />
        )}
      </label>
      <label className={labelClasses}>
        {labelAr}
        {multiline ? (
          <textarea name={`${name}_ar`} dir="rtl" rows={4} defaultValue={row[`${name}_ar`] ?? ""} className={fieldClasses} />
        ) : (
          <input name={`${name}_ar`} dir="rtl" defaultValue={row[`${name}_ar`] ?? ""} className={fieldClasses} />
        )}
      </label>
    </div>
  );
}

export default async function SiteSettingsPage() {
  const supabase = await createClient();
  const { data: row } = await supabase.from("site_settings").select("*").eq("id", 1).maybeSingle();
  const s: Row = row ?? {};

  return (
    <div className="flex max-w-4xl flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">Header & footer</h1>
        <p className="text-sm text-dust">
          Logos and footer-only copy. Navigation links are managed on the{" "}
          <a href="/admin/site/nav-links" className="text-azure-glow hover:underline">
            Navigation
          </a>{" "}
          page. The phone, email, socials, location and brand name text shown in the header/footer come from Home
          settings and Contact page settings — edit them there.
        </p>
      </div>

      <form action={saveSiteSettings} className="flex flex-col gap-10">
        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Logos</legend>
          <ImageField name="header_logo" label="Header logo" row={s} />
          <ImageField name="footer_logo" label="Footer logo" row={s} />
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className={legendClasses}>Footer copy</legend>
          <FieldPair name="footer_quote" label="Quote (English)" labelAr="الاقتباس (عربي)" row={s} />
          <FieldPair name="footer_est_line" label="Established line (English)" labelAr="سطر التأسيس (عربي)" row={s} />
          <FieldPair
            name="footer_marquee"
            label="Marquee items (one per line, English)"
            labelAr="عناصر الشريط (سطر لكل عنصر، عربي)"
            row={s}
            multiline
          />
        </fieldset>

        <button
          type="submit"
          className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
        >
          Save
        </button>
      </form>
    </div>
  );
}
