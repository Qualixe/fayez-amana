const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type TeamCategoryFormValues = { role?: string; role_ar?: string; count?: number; sort_order?: number };

export default function TeamCategoryForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: TeamCategoryFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className={labelClasses}>
        Role (English)
        <input name="role" required defaultValue={v.role} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الدور (عربي)
        <input name="role_ar" dir="rtl" required defaultValue={v.role_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Count
        <input name="count" type="number" required defaultValue={v.count ?? 0} className={fieldClasses} />
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
