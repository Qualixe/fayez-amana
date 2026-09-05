const fieldClasses = "w-full border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift";
const labelClasses = "flex flex-col gap-1.5 text-sm text-dust";
const legendClasses = "mb-1 font-mono text-[11px] uppercase tracking-[0.18em] text-azure-glow";

type Row = Record<string, string | null | undefined>;

function TextField({
  name,
  label,
  defaultValue,
  multiline,
  rows,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <label className={labelClasses}>
      {label}
      {multiline ? (
        <textarea name={name} rows={rows ?? 3} defaultValue={defaultValue ?? ""} className={fieldClasses} />
      ) : (
        <input name={name} defaultValue={defaultValue ?? ""} className={fieldClasses} />
      )}
    </label>
  );
}

function FieldPair({
  name,
  label,
  labelAr,
  row,
  multiline,
  rows,
}: {
  name: string;
  label: string;
  labelAr: string;
  row: Row;
  multiline?: boolean;
  rows?: number;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <TextField name={name} label={label} defaultValue={row[name]} multiline={multiline} rows={rows} />
      <label className={labelClasses}>
        {labelAr}
        {multiline ? (
          <textarea
            name={`${name}_ar`}
            dir="rtl"
            rows={rows ?? 3}
            defaultValue={row[`${name}_ar`] ?? ""}
            className={fieldClasses}
          />
        ) : (
          <input name={`${name}_ar`} dir="rtl" defaultValue={row[`${name}_ar`] ?? ""} className={fieldClasses} />
        )}
      </label>
    </div>
  );
}

function ImageField({ name, label, row }: { name: string; label: string; row: Row }) {
  const value = row[name] as string | undefined;
  return (
    <label className={labelClasses}>
      {label}
      {value ? <img src={value} alt="" className="h-32 w-auto border border-steel object-cover" /> : null}
      <input type="file" name={`${name}_file`} accept="image/*" className={fieldClasses} />
      <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
      <input name={name} defaultValue={value ?? ""} className={fieldClasses} />
    </label>
  );
}

function VideoField({ name, label, row }: { name: string; label: string; row: Row }) {
  const value = row[name] as string | undefined;
  return (
    <label className={labelClasses}>
      {label}
      {value ? <video src={value} controls muted className="h-40 w-auto border border-steel" /> : null}
      <input type="file" name={`${name}_file`} accept="video/*" className={fieldClasses} />
      <span className="text-xs text-ash">Or paste a path/URL directly (used only if no file is chosen above):</span>
      <input name={name} defaultValue={value ?? ""} className={fieldClasses} />
    </label>
  );
}

export default function HomeSettingsForm({ action, row }: { action: (formData: FormData) => void; row: Row }) {
  return (
    <form action={action} className="flex max-w-4xl flex-col gap-10">
      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Hero</legend>
        <VideoField name="hero_video" label="Background video" row={row} />
        <FieldPair name="hero_brand_line1" label="Brand wordmark line 1 (English)" labelAr="الاسم التجاري سطر 1 (عربي)" row={row} />
        <FieldPair name="hero_brand_line2" label="Brand wordmark line 2 (English)" labelAr="الاسم التجاري سطر 2 (عربي)" row={row} />
        <FieldPair name="hero_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="hero_quote" label="Quote (English)" labelAr="الاقتباس (عربي)" row={row} multiline rows={2} />
        <FieldPair
          name="hero_services"
          label="Services list (one per line, English)"
          labelAr="قائمة الخدمات (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
        <FieldPair name="hero_start_project" label="'Start a project' button (English)" labelAr="زر 'ابدأ مشروعك' (عربي)" row={row} />
        <FieldPair name="hero_view_portfolio" label="'View portfolio' link (English)" labelAr="رابط 'تصفح الأعمال' (عربي)" row={row} />
        <FieldPair name="hero_handover_label" label="Handover label (English)" labelAr="تسمية التسليم (عربي)" row={row} />
        <FieldPair name="hero_handover_title1" label="Handover title line 1 (English)" labelAr="عنوان التسليم سطر 1 (عربي)" row={row} />
        <FieldPair name="hero_handover_title2" label="Handover title line 2 (English)" labelAr="عنوان التسليم سطر 2 (عربي)" row={row} />
        <FieldPair name="hero_handover_body" label="Handover body (English)" labelAr="نص التسليم (عربي)" row={row} multiline rows={2} />
        <FieldPair name="hero_scroll_hint" label="Scroll hint (English)" labelAr="تلميح التمرير (عربي)" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>About section</legend>
        <FieldPair name="about_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair
          name="about_title"
          label="Title (one line per fragment, English)"
          labelAr="العنوان (سطر لكل جزء، عربي)"
          row={row}
          multiline
          rows={3}
        />
        <FieldPair name="about_body" label="Body (English)" labelAr="النص (عربي)" row={row} multiline rows={5} />
        <ImageField name="about_image" label="Image (also shown on the About page)" row={row} />
        <div className="grid gap-3 sm:grid-cols-2">
          <TextField name="about_stat1_value" label="Stat 1 value (e.g. 300+)" defaultValue={row.about_stat1_value} />
          <TextField name="about_stat2_value" label="Stat 2 value (e.g. 25+)" defaultValue={row.about_stat2_value} />
        </div>
        <FieldPair name="about_stat1_label" label="Stat 1 label (English)" labelAr="تسمية الإحصائية 1 (عربي)" row={row} />
        <FieldPair name="about_stat2_label" label="Stat 2 label (English)" labelAr="تسمية الإحصائية 2 (عربي)" row={row} />
        <FieldPair name="about_our_story" label="'Our story' button (English)" labelAr="زر 'قصتنا' (عربي)" row={row} />
        <FieldPair name="about_expertise_eyebrow" label="Expertise eyebrow (English)" labelAr="شعار الخبرات (عربي)" row={row} />
        <FieldPair name="about_expertise_p1" label="Expertise paragraph 1 (English)" labelAr="فقرة الخبرات 1 (عربي)" row={row} multiline rows={4} />
        <FieldPair name="about_expertise_p2" label="Expertise paragraph 2 (English)" labelAr="فقرة الخبرات 2 (عربي)" row={row} multiline rows={4} />
        <FieldPair
          name="about_expertise_tags"
          label="Expertise tags (one per line, English)"
          labelAr="وسوم الخبرات (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Services section</legend>
        <FieldPair name="services_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="services_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="services_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="services_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <FieldPair name="services_note" label="Note (English)" labelAr="ملاحظة (عربي)" row={row} multiline rows={2} />
        <FieldPair name="services_explore" label="'Explore services' link (English)" labelAr="رابط 'استكشف الخدمات' (عربي)" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Work section</legend>
        <FieldPair name="work_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="work_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="work_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="work_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <FieldPair name="work_all_projects" label="'All projects' link (English)" labelAr="رابط 'كل المشاريع' (عربي)" row={row} />
        <FieldPair name="work_view_project" label="'View project' label (English)" labelAr="تسمية 'عرض المشروع' (عربي)" row={row} />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Clients section</legend>
        <FieldPair name="clients_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="clients_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="clients_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="clients_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={2} />
        <FieldPair
          name="clients_marquee"
          label="Marquee items (one per line, English)"
          labelAr="عناصر الشريط (سطر لكل عنصر، عربي)"
          row={row}
          multiline
          rows={4}
        />
      </fieldset>

      <fieldset className="flex flex-col gap-4">
        <legend className={legendClasses}>Process section</legend>
        <FieldPair name="process_eyebrow" label="Eyebrow (English)" labelAr="الشعار (عربي)" row={row} />
        <FieldPair name="process_title1" label="Title line 1 (English)" labelAr="العنوان سطر 1 (عربي)" row={row} />
        <FieldPair name="process_title2" label="Title line 2 (English)" labelAr="العنوان سطر 2 (عربي)" row={row} />
        <FieldPair name="process_lede" label="Lede (English)" labelAr="المقدمة (عربي)" row={row} multiline rows={4} />
        <FieldPair name="process_cta" label="CTA button (English)" labelAr="زر الدعوة للعمل (عربي)" row={row} />
      </fieldset>

      <button
        type="submit"
        className="w-fit bg-azure px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-[filter] hover:brightness-110"
      >
        Save home settings
      </button>
    </form>
  );
}
