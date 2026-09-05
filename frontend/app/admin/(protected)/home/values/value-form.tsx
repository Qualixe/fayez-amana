const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type ValueFormValues = {
  letter?: string;
  title?: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  sort_order?: number;
};

export default function ValueForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ValueFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Letter (e.g. B)
        <input name="letter" required maxLength={2} defaultValue={v.letter} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Title (English)
        <input name="title" required defaultValue={v.title} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        العنوان (عربي)
        <input name="title_ar" dir="rtl" required defaultValue={v.title_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Description (English)
        <textarea name="description" required rows={4} defaultValue={v.description} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الوصف (عربي)
        <textarea name="description_ar" dir="rtl" required rows={4} defaultValue={v.description_ar} className={fieldClasses} />
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
