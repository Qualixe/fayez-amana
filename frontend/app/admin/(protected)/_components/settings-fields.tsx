export const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
export const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";
export const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

export type Row = Record<string, string | number | null | undefined>;

export function TextField({
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

export function FieldPair({
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
      <label className={labelClasses}>
        {labelAr}
        {multiline ? (
          <textarea
            name={`${name}_ar`}
            dir="rtl"
            rows={rows ?? 3}
            defaultValue={row[`${name}_ar`] ?? ""}
            className={fieldClasses}
          />
        ) : (
          <input name={`${name}_ar`} dir="rtl" defaultValue={row[`${name}_ar`] ?? ""} className={fieldClasses} />
        )}
      </label>
    </div>
  );
}

export function ImageField({ name, label, row }: { name: string; label: string; row: Row }) {
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

export function VideoField({ name, label, row }: { name: string; label: string; row: Row }) {
  const value = row[name] as string | undefined;
  return (
    <label className={labelClasses}>
      {label}
      {value ? <video src={value} controls muted className="h-40 w-auto border border-steel" /> : null}
      <input type="file" name={`${name}_file`} accept="video/*" className={fieldClasses} />
      <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
      <input name={name} defaultValue={value ?? ""} className={fieldClasses} />
    </label>
  );
}
