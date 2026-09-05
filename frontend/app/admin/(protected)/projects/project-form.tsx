const CATEGORIES = ["Residential", "Commercial", "Hospitality", "Healthcare", "F&B"] as const;

export type ProjectFormValues = {
  slug?: string;
  title?: string;
  display_title?: string[];
  category?: string;
  subtitle?: string;
  teaser?: string;
  description?: string;
  client?: string | null;
  location?: string;
  scope?: string;
  size?: string | null;
  image?: string;
  featured?: boolean;
  sort_order?: number;
  title_ar?: string | null;
  display_title_ar?: string[] | null;
  subtitle_ar?: string | null;
  teaser_ar?: string | null;
  description_ar?: string | null;
  client_ar?: string | null;
  location_ar?: string | null;
  scope_ar?: string | null;
  size_ar?: string | null;
};

const fieldClasses =
  "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ProjectFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};

  return (
    <form action={action} className="flex max-w-4xl flex-col gap-8">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses}>
          Slug (unique, url-safe)
          <input name="slug" required defaultValue={v.slug} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Category
          <select name="category" required defaultValue={v.category ?? CATEGORIES[0]} className={fieldClasses}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-steel pt-6">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">English</legend>
        <label className={labelClasses}>
          Title
          <input name="title" required defaultValue={v.title} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Display title (one line per fragment, shown stacked on the hero heading)
          <textarea
            name="display_title"
            rows={3}
            defaultValue={v.display_title?.join("\n")}
            className={fieldClasses}
          />
        </label>
        <label className={labelClasses}>
          Subtitle
          <input name="subtitle" required defaultValue={v.subtitle} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Teaser (short card blurb)
          <input name="teaser" required defaultValue={v.teaser} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Description
          <textarea name="description" required rows={5} defaultValue={v.description} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Scope (separate with · )
          <input name="scope" required defaultValue={v.scope} className={fieldClasses} />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-steel pt-6" dir="rtl">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">العربية</legend>
        <label className={labelClasses}>
          العنوان
          <input name="title_ar" defaultValue={v.title_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          العنوان المقسّم (سطر لكل جزء)
          <textarea
            name="display_title_ar"
            rows={3}
            defaultValue={v.display_title_ar?.join("\n") ?? ""}
            className={fieldClasses}
          />
        </label>
        <label className={labelClasses}>
          العنوان الفرعي
          <input name="subtitle_ar" defaultValue={v.subtitle_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الوصف المختصر
          <input name="teaser_ar" defaultValue={v.teaser_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الوصف
          <textarea name="description_ar" rows={5} defaultValue={v.description_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          النطاق
          <input name="scope_ar" defaultValue={v.scope_ar ?? ""} className={fieldClasses} />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 border-t border-steel pt-6 sm:grid-cols-2">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">Details</legend>
        <label className={labelClasses}>
          Client (English)
          <input name="client" defaultValue={v.client ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          العميل (عربي)
          <input name="client_ar" dir="rtl" defaultValue={v.client_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Location (English)
          <input name="location" required defaultValue={v.location} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الموقع (عربي)
          <input name="location_ar" dir="rtl" defaultValue={v.location_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Size (English)
          <input name="size" defaultValue={v.size ?? ""} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          المساحة (عربي)
          <input name="size_ar" dir="rtl" defaultValue={v.size_ar ?? ""} className={fieldClasses} />
        </label>
        <label className={`${labelClasses} sm:col-span-2`}>
          Image
          {v.image ? (
            <img src={v.image} alt="" className="h-32 w-auto border border-steel object-cover" />
          ) : null}
          <input type="file" name="image_file" accept="image/*" className={fieldClasses} />
          <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
          <input name="image" defaultValue={v.image} className={fieldClasses} placeholder="/images/work-img1.avif" />
        </label>
        <label className={labelClasses}>
          Sort order
          <input name="sort_order" type="number" defaultValue={v.sort_order ?? 0} className={fieldClasses} />
        </label>
      </fieldset>

      <label className="flex items-center gap-2 text-sm text-dust">
        <input type="checkbox" name="featured" defaultChecked={v.featured} className="h-4 w-4" />
        Featured (shown in the homepage/projects spotlight)
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
