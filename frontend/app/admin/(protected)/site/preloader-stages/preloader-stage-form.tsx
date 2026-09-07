import { TextField } from "../../_components/settings-fields";

export type PreloaderStageFormValues = {
  label?: string;
  sort_order?: number;
};

export default function PreloaderStageForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PreloaderStageFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-md flex-col gap-4">
      <TextField name="label" label="Label" defaultValue={v.label} />
      <TextField name="sort_order" label="Sort order" type="number" defaultValue={v.sort_order ?? 0} />
      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        {submitLabel}
      </button>
    </form>
  );
}
