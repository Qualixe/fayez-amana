const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

const FIELD_TYPES = ["text", "email", "tel", "textarea", "select"] as const;

export type ApplicationFieldFormValues = {
  field_key?: string;
  field_type?: string;
  label?: string;
  label_ar?: string;
  placeholder?: string;
  placeholder_ar?: string;
  options?: string;
  options_ar?: string;
  required?: boolean;
  sort_order?: number;
};

export default function ApplicationFieldForm({
  action,
  defaultValues,
  submitLabel,
  lockKey,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ApplicationFieldFormValues;
  submitLabel: string;
  lockKey?: boolean;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Field key (used internally, e.g. linkedin_url — lowercase letters, numbers, underscores only)
        <input
          name="field_key"
          required
          pattern="[a-z0-9_]+"
          readOnly={lockKey}
          defaultValue={v.field_key}
          className={`${fieldClasses} ${lockKey ? "opacity-60" : ""}`}
        />
      </label>
      <label className={labelClasses}>
        Field type
        <select name="field_type" required defaultValue={v.field_type ?? "text"} className={fieldClasses}>
          {FIELD_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Label (English)
          <input name="label" required defaultValue={v.label} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          التسمية (عربي)
          <input name="label_ar" dir="rtl" required defaultValue={v.label_ar} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Placeholder (English, optional — used by text/tel/textarea)
          <input name="placeholder" defaultValue={v.placeholder} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          النص الإرشادي (عربي)
          <input name="placeholder_ar" dir="rtl" defaultValue={v.placeholder_ar} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Options, one per line (English — only used when type is &quot;select&quot;)
          <textarea name="options" rows={3} defaultValue={v.options} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الخيارات، سطر لكل خيار (عربي)
          <textarea name="options_ar" dir="rtl" rows={3} defaultValue={v.options_ar} className={fieldClasses} />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-dust">
        <input type="checkbox" name="required" defaultChecked={v.required} className="h-4 w-4" />
        Required
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
