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

export default function ServicesPageSettingsForm({ action, row }: { action: (formData: FormData) => void; row: Row }) {
  return (
    <form action={action} className="flex max-w-4xl flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>
          Hero (the "4 disciplines" list is shared with Home → Home settings → Hero services)
        </legend>
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="hero_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="hero_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="hero_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <ImageField name="hero_image" label="Hero background image" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Inspection process (steps below are managed on their own page)</legend>
        <FieldPair name="inspection_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="inspection_title" label="Title (English)" labelAr="العنوان (عربي)" row={row} />
        <FieldPair name="inspection_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <FieldPair
          name="inspection_phases"
          label="Diagram phase labels (one per line, 4 items, English)"
          labelAr="تسميات المراحل بالرسم (سطر لكل عنصر، 4 عناصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Quality metrics (4 counters)</legend>
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="grid gap-3 border border-steel p-4 sm:grid-cols-2">
            <TextField name={`quality_metric${n}_value`} label={`Metric ${n} value (number)`} type="number" defaultValue={row[`quality_metric${n}_value`]} />
            <div className="grid gap-3 sm:grid-cols-2">
              <TextField name={`quality_metric${n}_suffix`} label="Suffix (English)" defaultValue={row[`quality_metric${n}_suffix`]} />
              <TextField name={`quality_metric${n}_suffix_ar`} label="اللاحقة (عربي)" defaultValue={row[`quality_metric${n}_suffix_ar`]} />
            </div>
            <div className="grid gap-3 sm:col-span-2 sm:grid-cols-2">
              <TextField name={`quality_metric${n}_label`} label="Label (English)" defaultValue={row[`quality_metric${n}_label`]} />
              <TextField name={`quality_metric${n}_label_ar`} label="التسمية (عربي)" defaultValue={row[`quality_metric${n}_label_ar`]} />
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Compliance</legend>
        <FieldPair name="compliance_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="compliance_title" label="Title (English)" labelAr="العنوان (عربي)" row={row} />
        <FieldPair
          name="compliance_standards"
          label="Standards (one per line, English)"
          labelAr="المعايير (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
        <FieldPair name="compliance_request_docs" label="'Request documents' button (English)" labelAr="زر 'اطلب مستنداتنا' (عربي)" row={row} />
        <FieldPair name="compliance_certifications_label" label="Certifications label (English)" labelAr="تسمية الاعتمادات (عربي)" row={row} />
        <FieldPair name="compliance_cert_body" label="Certifications body (English)" labelAr="نص الاعتمادات (عربي)" row={row} multiline rows={3} />
        <FieldPair name="compliance_cert_cta" label="Certifications link (English)" labelAr="رابط الاعتمادات (عربي)" row={row} />
      </fieldset>

      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        Save services page settings
      </button>
    </form>
  );
}
