const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";

export type FaqFormValues = {
  page?: string;
  question?: string;
  question_ar?: string;
  answer?: string;
  answer_ar?: string;
  sort_order?: number;
};

export default function FaqForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (formData: FormData) => void;
  defaultValues?: FaqFormValues;
  submitLabel: string;
}) {
  const v = defaultValues ?? {};
  return (
    <form action={action} className="flex max-w-2xl flex-col gap-4">
      <label className={labelClasses}>
        Page
        <select name="page" required defaultValue={v.page ?? "contact"} className={fieldClasses}>
          <option value="contact">Contact page</option>
          <option value="projects">Projects page</option>
        </select>
      </label>
      <label className={labelClasses}>
        Question (English)
        <input name="question" required defaultValue={v.question} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        السؤال (عربي)
        <input name="question_ar" dir="rtl" required defaultValue={v.question_ar} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        Answer (English)
        <textarea name="answer" required rows={3} defaultValue={v.answer} className={fieldClasses} />
      </label>
      <label className={labelClasses}>
        الإجابة (عربي)
        <textarea name="answer_ar" dir="rtl" required rows={3} defaultValue={v.answer_ar} className={fieldClasses} />
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
