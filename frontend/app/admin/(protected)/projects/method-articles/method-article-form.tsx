const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type MethodArticleFormValues = {
  number?: string;
  title?: string;
  title_ar?: string;
  body?: string;
  body_ar?: string;
  href?: string;
  label?: string;
  label_ar?: string;
  sort_order?: number;
};

export default function MethodArticleForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: MethodArticleFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Number (e.g. 01)
        <input name="number" required defaultValue={v.number} className={fieldClasses} />
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
        Body (English)
        <textarea name="body" required rows={4} defaultValue={v.body} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        النص (عربي)
        <textarea name="body_ar" dir="rtl" required rows={4} defaultValue={v.body_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Link URL (e.g. /process or /services#quality-assurance)
        <input name="href" required defaultValue={v.href} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Link label (English)
        <input name="label" required defaultValue={v.label} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        تسمية الرابط (عربي)
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
