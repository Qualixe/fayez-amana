const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";
const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

type Row = Record<string, string | number | null | undefined>;

function TextField({
  name,
  label,
  defaultValue,
  multiline,
  rows,
  type,
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  multiline?: boolean;
  rows?: number;
  type?: string;
}) {
  return (
    <label className={labelClasses}>
      {label}
      {multiline ? (
        <textarea name={name} rows={rows ?? 3} defaultValue={defaultValue ?? ""} className={fieldClasses} />
      ) : (
        <input type={type} name={name} defaultValue={defaultValue ?? ""} className={fieldClasses} />
      )}
    </label>
  );
}

function FieldPair({
  name,
  label,
  labelAr,
  row,
  multiline,
  rows,
}: {
  name: string;
  label: string;
  labelAr: string;
  row: Row;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TextField name={name} label={label} defaultValue={row[name]} multiline={multiline} rows={rows} />
      <TextField name={`${name}_ar`} label={labelAr} defaultValue={row[`${name}_ar`]} multiline={multiline} rows={rows} />
    </div>
  );
}

function ImageField({ name, label, row }: { name: string; label: string; row: Row }) {
  const value = row[name] as string | undefined;
  return (
    <label className={labelClasses}>
      {label}
      {value ? <img src={value} alt="" className="h-32 w-auto border border-steel object-cover" /> : null}
      <input type="file" name={`${name}_file`} accept="image/*" className={fieldClasses} />
      <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
      <input name={name} defaultValue={value ?? ""} className={fieldClasses} />
    </label>
  );
}

export default function AboutPageSettingsForm({ action, row }: { action: (formData: FormData) => void; row: Row }) {
  return (
    <form action={action} className="flex max-w-4xl flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Hero</legend>
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="hero_title3" label="Title line 3 (English)" labelAr="العنوان سطر 3 (عربي)" row={row} />
        <FieldPair name="hero_body" label="Body (English)" labelAr="النص (عربي)" row={row} multiline rows={4} />
        <ImageField name="hero_image" label="Hero background image" row={row} />
        {[1, 2, 3, 4].map((n) => (
          <FieldPair
            key={n}
            name={`hero_stat${n}_label`}
            label={`Stat ${n} label (English)`}
            labelAr={`تسمية الإحصائية ${n} (عربي)`}
            row={row}
          />
        ))}
        {[1, 2, 3, 4].map((n) => (
          <FieldPair
            key={n}
            name={`hero_stat${n}_value`}
            label={`Stat ${n} value (English)`}
            labelAr={`قيمة الإحصائية ${n} (عربي)`}
            row={row}
          />
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Expertise</legend>
        <FieldPair name="expertise_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="expertise_p1" label="Paragraph 1 (English)" labelAr="الفقرة 1 (عربي)" row={row} multiline rows={4} />
        <FieldPair name="expertise_p2" label="Paragraph 2 (English)" labelAr="الفقرة 2 (عربي)" row={row} multiline rows={4} />
        <FieldPair
          name="expertise_tags"
          label="Tags (one per line, English)"
          labelAr="الوسوم (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Journey</legend>
        <FieldPair name="journey_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="journey_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="journey_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="journey_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <TextField name="journey_counter_value" label="Counter value (number)" type="number" defaultValue={row.journey_counter_value} />
        <FieldPair name="journey_counter_label" label="Counter label (English)" labelAr="تسمية العداد (عربي)" row={row} multiline rows={2} />
        <FieldPair name="journey_cta" label="CTA button (English)" labelAr="زر الدعوة للعمل (عربي)" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Why Choose Us (heading only — reasons are managed under Home page → Highlights)</legend>
        <FieldPair name="why_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="why_tagline" label="Tagline (English)" labelAr="الشعار الفرعي (عربي)" row={row} />
        <FieldPair name="why_title" label="Title (English)" labelAr="العنوان (عربي)" row={row} />
        <ImageField name="why_image" label="Background image" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Vision & Mission (heading only — items are managed below on this page)</legend>
        <FieldPair name="vision_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="vision_title" label="Title (English)" labelAr="العنوان (عربي)" row={row} />
        <FieldPair name="vision_closing" label="Closing line (English)" labelAr="الخاتمة (عربي)" row={row} multiline rows={2} />
      </fieldset>

      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        Save about page settings
      </button>
    </form>
  );
}
