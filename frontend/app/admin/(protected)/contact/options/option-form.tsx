const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type OptionFormValues = {
  group_name?: string;
  value?: string;
  label?: string;
  label_ar?: string;
  sort_order?: number;
};

export default function OptionForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: OptionFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-lg flex-col gap-4">
      <label className={labelClasses}>
        Group
        <select name="group_name" required defaultValue={v.group_name ?? "scope"} className={fieldClasses}>
          <option value="scope">Scope of work</option>
          <option value="budget">Budget</option>
          <option value="sector">Sector</option>
        </select>
      </label>
      <label className={labelClasses}>
        Value (stable identifier — for &quot;sector&quot;, must be one of: Residential, Commercial,
        Hospitality, Healthcare, F&amp;B, Sports Facilities, since the form icon lookup keys on this exact text)
        <input name="value" required defaultValue={v.value} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Label (English)
        <input name="label" required defaultValue={v.label} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        التسمية (عربي)
        <input name="label_ar" dir="rtl" required defaultValue={v.label_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Sort order
        <input name="sort_order" type="number" defaultValue={v.sort_order ?? 0} className={fieldClasses} />
      </label>
      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        {submitLabel}
      </button>
    </form>
  );
}
