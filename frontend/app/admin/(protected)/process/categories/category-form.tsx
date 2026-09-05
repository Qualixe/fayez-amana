const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type CategoryFormValues = {
  key?: string;
  label?: string;
  label_ar?: string;
  from_stage?: number;
  to_stage?: number;
  sort_order?: number;
};

export default function CategoryForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: CategoryFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-lg flex-col gap-4">
      <label className={labelClasses}>
        Key (unique, url-safe, e.g. earthworks)
        <input name="key" required defaultValue={v.key} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Label (English)
        <input name="label" required defaultValue={v.label} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        التسمية (عربي)
        <input name="label_ar" dir="rtl" required defaultValue={v.label_ar} className={fieldClasses} />
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className={labelClasses}>
          From stage no.
          <input name="from_stage" type="number" required defaultValue={v.from_stage} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          To stage no.
          <input name="to_stage" type="number" required defaultValue={v.to_stage} className={fieldClasses} />
        </label>
      </div>
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
