const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type PositionFormValues = {
  title?: string;
  title_ar?: string;
  discipline?: string;
  discipline_ar?: string;
  employment_type?: string;
  employment_type_ar?: string;
  location?: string;
  location_ar?: string;
  team_size?: number;
  sort_order?: number;
};

export default function PositionForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PositionFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Position title (English)
          <input name="title" required defaultValue={v.title} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          المسمى الوظيفي (عربي)
          <input name="title_ar" dir="rtl" required defaultValue={v.title_ar} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Discipline (English, e.g. Architectural Works)
          <input name="discipline" defaultValue={v.discipline} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          التخصص (عربي)
          <input name="discipline_ar" dir="rtl" defaultValue={v.discipline_ar} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Employment type (English)
          <input name="employment_type" defaultValue={v.employment_type ?? "Full-time"} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          نوع الدوام (عربي)
          <input name="employment_type_ar" dir="rtl" defaultValue={v.employment_type_ar ?? "دوام كامل"} className={fieldClasses} />
        </label>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className={labelClasses}>
          Location (English)
          <input name="location" defaultValue={v.location ?? "Jeddah, KSA"} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الموقع (عربي)
          <input name="location_ar" dir="rtl" defaultValue={v.location_ar ?? "جدة، السعودية"} className={fieldClasses} />
        </label>
      </div>
      <label className={labelClasses}>
        Team size (number)
        <input name="team_size" type="number" min={1} defaultValue={v.team_size ?? 1} className={fieldClasses} />
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
