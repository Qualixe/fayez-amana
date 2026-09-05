const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type NavLinkFormValues = {
  label?: string;
  label_ar?: string;
  href?: string;
  show_in_primary_nav?: boolean;
  sort_order?: number;
};

export default function NavLinkForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: NavLinkFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <label className={labelClasses}>
        Label (English)
        <input name="label" required defaultValue={v.label} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        العنوان (عربي)
        <input name="label_ar" dir="rtl" required defaultValue={v.label_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Link (a page path like /about, or a full https:// URL)
        <input name="href" required defaultValue={v.href} className={fieldClasses} placeholder="/about" />
      </label>
      <label className="flex items-center gap-2 text-sm text-dust">
        <input type="checkbox" name="show_in_primary_nav" defaultChecked={v.show_in_primary_nav} className="h-4 w-4" />
        Also show in the desktop top bar (space is limited there — the full menu always shows every link)
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
