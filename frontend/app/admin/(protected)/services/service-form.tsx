export type ServiceFormValues = {
  slug?: string;
  number?: string;
  title?: string;
  title_ar?: string;
  description?: string;
  description_ar?: string;
  capabilities?: string[];
  capabilities_ar?: string[];
  image?: string;
  sort_order?: number;
  gallery?: string[];
};

const fieldClasses =
  "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export default function ServiceForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ServiceFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};

  return (
    <form action={action} className="flex max-w-4xl flex-col gap-8">
      <fieldset className="grid gap-4 sm:grid-cols-2">
        <label className={labelClasses}>
          Slug (used as the #anchor on the services page — don&apos;t change without updating links elsewhere)
          <input name="slug" required defaultValue={v.slug} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Number (display order label, e.g. 01)
          <input name="number" required defaultValue={v.number} className={fieldClasses} />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-steel pt-6">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">English</legend>
        <label className={labelClasses}>
          Title
          <input name="title" required defaultValue={v.title} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Description
          <textarea name="description" required rows={4} defaultValue={v.description} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          Capabilities (one per line)
          <textarea
            name="capabilities"
            required
            rows={6}
            defaultValue={v.capabilities?.join("\n")}
            className={fieldClasses}
          />
        </label>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-steel pt-6" dir="rtl">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">العربية</legend>
        <label className={labelClasses}>
          العنوان
          <input name="title_ar" required defaultValue={v.title_ar} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          الوصف
          <textarea name="description_ar" required rows={4} defaultValue={v.description_ar} className={fieldClasses} />
        </label>
        <label className={labelClasses}>
          القدرات (سطر لكل عنصر)
          <textarea
            name="capabilities_ar"
            required
            rows={6}
            defaultValue={v.capabilities_ar?.join("\n")}
            className={fieldClasses}
          />
        </label>
      </fieldset>

      <fieldset className="grid gap-4 border-t border-steel pt-6 sm:grid-cols-2">
        <legend className="mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow">Details</legend>
        <label className={`${labelClasses} sm:col-span-2`}>
          Image
          {v.image ? (
            <img src={v.image} alt="" className="h-32 w-auto border border-steel object-cover" />
          ) : null}
          <input type="file" name="image_file" accept="image/*" className={fieldClasses} />
          <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
          <input name="image" defaultValue={v.image} className={fieldClasses} placeholder="/images/service-details-img1.avif" />
        </label>
        <label className={labelClasses}>
          Sort order
          <input name="sort_order" type="number" defaultValue={v.sort_order ?? 0} className={fieldClasses} />
        </label>
        <label className={`${labelClasses} sm:col-span-2`}>
          Related project gallery — project slugs, one per line, in display order
          <textarea
            name="gallery"
            rows={3}
            defaultValue={v.gallery?.join("\n")}
            className={fieldClasses}
            placeholder="chalets-durrat-al-arous"
          />
        </label>
      </fieldset>

      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        {submitLabel}
      </button>
    </form>
  );
}
