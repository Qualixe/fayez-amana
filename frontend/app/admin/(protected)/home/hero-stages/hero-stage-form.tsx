const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type HeroStageFormValues = {
  code?: string;
  title?: string;
  title_ar?: string;
  detail?: string;
  detail_ar?: string;
  period?: string;
  period_ar?: string;
  sort_order?: number;
};

export default function HeroStageForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: HeroStageFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Code (e.g. 000)
        <input name="code" required defaultValue={v.code} className={fieldClasses} />
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
        Detail (English)
        <input name="detail" required defaultValue={v.detail} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        التفاصيل (عربي)
        <input name="detail_ar" dir="rtl" required defaultValue={v.detail_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Period (English)
        <input name="period" required defaultValue={v.period} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الفترة (عربي)
        <input name="period_ar" dir="rtl" required defaultValue={v.period_ar} className={fieldClasses} />
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
