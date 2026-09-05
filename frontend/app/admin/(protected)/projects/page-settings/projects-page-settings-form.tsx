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
}: {
  name: string;
  label: string;
  defaultValue?: string | number | null;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className={labelClasses}>
      {label}
      {multiline ? (
        <textarea name={name} rows={rows ?? 3} defaultValue={defaultValue ?? ""} className={fieldClasses} />
      ) : (
        <input name={name} defaultValue={defaultValue ?? ""} className={fieldClasses} />
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

export default function ProjectsPageSettingsForm({ action, row }: { action: (formData: FormData) => void; row: Row }) {
  return (
    <form action={action} className="flex max-w-4xl flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Hero</legend>
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={3} />
        <ImageField name="hero_image" label="Hero background image" row={row} />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-2">
            <FieldPair name={`hero_meta${n}_label`} label={`Meta ${n} label (English)`} labelAr={`تسمية ${n} (عربي)`} row={row} />
            <FieldPair name={`hero_meta${n}_value`} label={`Meta ${n} value (English)`} labelAr={`قيمة ${n} (عربي)`} row={row} />
          </div>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Summary</legend>
        <FieldPair name="summary_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="summary_body" label="Body (English)" labelAr="النص (عربي)" row={row} multiline rows={4} />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-3">
            <TextField name={`summary_link${n}_label`} label={`Quick link ${n} label (English)`} defaultValue={row[`summary_link${n}_label`]} />
            <TextField name={`summary_link${n}_label_ar`} label={`تسمية الرابط ${n} (عربي)`} defaultValue={row[`summary_link${n}_label_ar`]} />
            <TextField name={`summary_link${n}_href`} label={`Quick link ${n} URL`} defaultValue={row[`summary_link${n}_href`]} />
          </div>
        ))}
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 sm:grid-cols-2">
            <FieldPair name={`summary_stat${n}_label`} label={`Stat ${n} label (English)`} labelAr={`تسمية الإحصائية ${n} (عربي)`} row={row} />
            <FieldPair name={`summary_stat${n}_value`} label={`Stat ${n} value (English)`} labelAr={`قيمة الإحصائية ${n} (عربي)`} row={row} />
          </div>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Sectors</legend>
        <FieldPair name="sectors_heading" label="Heading (English)" labelAr="العنوان (عربي)" row={row} />
        <FieldPair
          name="sectors_list"
          label="Sectors (one per line, English)"
          labelAr="القطاعات (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={6}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Spotlight</legend>
        <FieldPair name="spotlight_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="spotlight_title" label="Title (English)" labelAr="العنوان (عربي)" row={row} />
        <FieldPair name="spotlight_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
      </fieldset>

      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        Save projects page settings
      </button>
    </form>
  );
}
