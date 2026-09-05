const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type StatFormValues = {
  value?: number;
  suffix?: string;
  label?: string;
  label_ar?: string;
  description?: string;
  description_ar?: string;
  sort_order?: number;
};

export default function StatForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: StatFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Value (number)
          <input name="value" type="number" required defaultValue={v.value} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Suffix (e.g. +)
          <input name="suffix" defaultValue={v.suffix} className={fieldClasses} />
        </label>
      </div>
      <label className={labelClasses}>
        Label (English)
        <input name="label" required defaultValue={v.label} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        التسمية (عربي)
        <input name="label_ar" dir="rtl" required defaultValue={v.label_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Description (English)
        <textarea name="description" required rows={2} defaultValue={v.description} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الوصف (عربي)
        <textarea name="description_ar" dir="rtl" required rows={2} defaultValue={v.description_ar} className={fieldClasses} />
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
