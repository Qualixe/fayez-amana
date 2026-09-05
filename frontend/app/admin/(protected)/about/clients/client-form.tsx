const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type ClientFormValues = { name?: string; image?: string; sort_order?: number };

export default function ClientForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ClientFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className={labelClasses}>
        Name
        <input name="name" required defaultValue={v.name} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Logo image
        {v.image ? (
          <img src={v.image} alt="" className="h-16 w-auto border border-steel object-contain bg-white p-1" />
        ) : null}
        <input type="file" name="image_file" accept="image/*" className={fieldClasses} />
        <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
        <input name="image" defaultValue={v.image} className={fieldClasses} placeholder="/images/client-img1.avif" />
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
