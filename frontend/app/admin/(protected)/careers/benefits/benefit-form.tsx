const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type BenefitFormValues = {
  body?: string;
  body_ar?: string;
  sort_order?: number;
};

export default function BenefitForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: BenefitFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Benefit (English)
        <textarea name="body" required rows={3} defaultValue={v.body} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الميزة (عربي)
        <textarea name="body_ar" dir="rtl" required rows={3} defaultValue={v.body_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Sort order (also sets the displayed number, 01/02/...)
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
