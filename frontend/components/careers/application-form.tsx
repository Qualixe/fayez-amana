"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { UserIcon, MailIcon, PhoneIcon, LayersIcon, DocumentIcon, ChevronDownIcon, CheckIcon, SpinnerIcon } from "@/components/contact/icons";
import type { Locale } from "@/lib/locale";
import type { Position, ApplicationFormCopy, ApplicationField, TrustItem } from "@/lib/db/careers";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Status = "idle" | "sending" | "sent" | "error";

const fieldShellClasses =
  "group relative rounded-[14px] border border-edge bg-void/68 transition-colors duration-200 hover:border-steel/85 focus-within:border-azure-lift focus-within:bg-void/90";
const fieldShellInvalidClasses = "border-amber-soft";
const controlClasses =
  "peer relative z-10 min-h-16 w-full rounded-[inherit] border-0 bg-transparent pb-3 ps-12 pe-4 pt-7 text-base text-bone outline-none placeholder:text-rebar placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-100";
const iconClasses =
  "pointer-events-none absolute start-[18px] top-6 text-rebar transition-[color,transform] duration-200 group-focus-within:scale-110 group-focus-within:text-azure-glow";
const labelClasses =
  "pointer-events-none absolute start-12 top-6 origin-left rtl:origin-right text-base font-normal leading-none text-ash transition-transform duration-200 peer-focus:-translate-y-[13px] peer-focus:scale-[0.7] peer-focus:text-azure-glow peer-[&:not(:placeholder-shown)]:-translate-y-[13px] peer-[&:not(:placeholder-shown)]:scale-[0.7] peer-[&:not(:placeholder-shown)]:text-dust";

function RequiredDot() {
  return <span aria-hidden="true" className="ms-2 inline-block h-1 w-1 rounded-full bg-azure-lift align-[2px]" />;
}

function PositionDropdown({
  id,
  label,
  positions,
  invalid,
}: {
  id: string;
  label: string;
  positions: Position[];
  invalid?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const floated = open || value.length > 0;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function select(title: string) {
    setValue(title);
    setOpen(false);
    triggerRef.current?.focus();
  }

  function onKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") {
      if (open) {
        e.stopPropagation();
        setOpen(false);
      }
      return;
    }
    if (!open) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setActiveIndex(Math.max(0, positions.findIndex((p) => p.title === value)));
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % positions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + positions.length) % positions.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const position = positions[activeIndex];
      if (position) select(position.title);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;

  return (
    <div
      ref={rootRef}
      className={`${fieldShellClasses} ${open ? "border-azure-lift" : ""} ${invalid ? fieldShellInvalidClasses : ""}`}
    >
      <input type="hidden" name="position" value={value} />
      <button
        ref={triggerRef}
        id={id}
        type="button"
        role="combobox"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-labelledby={`${labelId} ${id}-value`}
        onClick={() => {
          setActiveIndex(Math.max(0, positions.findIndex((p) => p.title === value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        className={`${controlClasses} cursor-pointer text-start`}
      >
        <span id={`${id}-value`} className="block truncate">
          {value || " "}
        </span>
      </button>
      <span className={iconClasses}>
        <LayersIcon className="h-4 w-4" />
      </span>
      <span
        id={labelId}
        className={`pointer-events-none absolute start-12 top-6 origin-left rtl:origin-right text-base leading-none text-ash transition-transform duration-200 ${
          floated ? "-translate-y-[13px] scale-[0.7] text-dust" : ""
        } ${open ? "text-azure-glow" : ""}`}
      >
        {label}
        <RequiredDot />
      </span>
      <ChevronDownIcon
        className={`pointer-events-none absolute end-[18px] top-6 h-3.5 w-3.5 transition-[color,transform] duration-200 ${
          open ? "rotate-180 text-azure-glow" : "text-rebar group-hover:text-dust"
        }`}
      />

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-72 overflow-y-auto rounded-2xl border border-edge bg-[#212b36] p-2 shadow-[inset_0_1px_0_rgba(245,243,239,0.09),0_24px_60px_-36px_rgba(3,10,20,0.95)]"
        >
          {positions.map((position, index) => (
            <li
              key={position.id}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={position.title === value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => select(position.title)}
              className={`cursor-pointer rounded-[10px] px-4 py-3 text-sm leading-[1.45] transition-colors duration-150 ${
                index === activeIndex ? "bg-azure/22 text-bone" : position.title === value ? "text-azure-glow" : "text-dust"
              }`}
            >
              {position.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function CvField({ label, hint, invalid }: { label: string; hint: string; invalid?: boolean }) {
  const [fileName, setFileName] = useState("");

  return (
    <label className={`${fieldShellClasses} ${invalid ? fieldShellInvalidClasses : ""}`}>
      <input
        type="file"
        name="cv"
        required
        accept="application/pdf,.pdf"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        className="sr-only"
      />
      <span className={`${controlClasses} flex cursor-pointer items-center`}>
        <span className="truncate">{fileName}</span>
      </span>
      <span className={iconClasses}>
        <DocumentIcon className="h-4 w-4" />
      </span>
      <span
        className={`pointer-events-none absolute start-12 top-6 origin-left rtl:origin-right text-base leading-none text-ash transition-transform duration-200 ${
          fileName ? "-translate-y-[13px] scale-[0.7] text-dust" : ""
        }`}
      >
        {label}
        <RequiredDot />
      </span>
      <div className="mx-4 border-t border-edge/85 py-3">
        <p className="text-[12px] leading-relaxed text-ash">{fileName || hint}</p>
      </div>
    </label>
  );
}

function DynamicField({ field, invalid }: { field: ApplicationField; invalid?: boolean }) {
  const id = `app-field-${field.key}`;
  const name = `field_${field.key}`;

  if (field.type === "textarea") {
    return (
      <div className={`${fieldShellClasses} ${invalid ? fieldShellInvalidClasses : ""}`}>
        <textarea
          id={id}
          name={name}
          rows={4}
          placeholder={field.placeholder || " "}
          className={`${controlClasses} min-h-[140px] resize-none pt-8 leading-[1.65]`}
        />
        <span className={iconClasses}>
          <DocumentIcon className="h-4 w-4" />
        </span>
        <label htmlFor={id} className={labelClasses}>
          {field.label}
          {field.required ? <RequiredDot /> : null}
        </label>
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div className={`${fieldShellClasses} ${invalid ? fieldShellInvalidClasses : ""}`}>
        <select id={id} name={name} defaultValue="" className={`${controlClasses} cursor-pointer appearance-none`}>
          <option value="" disabled>
            {field.placeholder || " "}
          </option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span className={iconClasses}>
          <LayersIcon className="h-4 w-4" />
        </span>
        <span className="pointer-events-none absolute start-12 top-6 -translate-y-[13px] scale-[0.7] text-base leading-none text-dust">
          {field.label}
          {field.required ? <RequiredDot /> : null}
        </span>
        <ChevronDownIcon className="pointer-events-none absolute end-[18px] top-6 h-3.5 w-3.5 text-rebar" />
      </div>
    );
  }

  return (
    <div className={`${fieldShellClasses} ${invalid ? fieldShellInvalidClasses : ""}`}>
      <input id={id} name={name} type={field.type} placeholder={field.placeholder || " "} className={controlClasses} />
      <span className={iconClasses}>
        <DocumentIcon className="h-4 w-4" />
      </span>
      <label htmlFor={id} className={labelClasses}>
        {field.label}
        {field.required ? <RequiredDot /> : null}
      </label>
    </div>
  );
}

export default function ApplicationForm({
  locale,
  positions,
  fields,
  form,
  trust,
  phone,
  email,
}: {
  locale: Locale;
  positions: Position[];
  fields: ApplicationField[];
  form: ApplicationFormCopy;
  trust: TrustItem[];
  phone: string;
  email: string;
}) {
  const t = form;
  const withEmail = (text: string) => text.replace("{email}", email);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const isInvalid = (field: string) => invalidFields.includes(field);
  const isSending = status === "sending";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isSending) return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    if (get("company_website")) {
      setStatus("sent");
      return;
    }

    const name = get("name");
    const email = get("email");
    const position = get("position");
    const cv = data.get("cv");
    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (!position) errors.push("position");
    if (!(cv instanceof File) || cv.size === 0) errors.push("cv");
    for (const field of fields) {
      if (field.required && !get(`field_${field.key}`)) errors.push(`field_${field.key}`);
    }

    if (errors.length) {
      setInvalidFields(errors);
      setStatus("error");
      setMessage(t.validationError);
      return;
    }

    setInvalidFields([]);
    setStatus("sending");

    try {
      data.set("locale", locale);
      const res = await fetch("/api/career-application", { method: "POST", body: data });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.ok) {
        setStatus("error");
        setMessage(result?.message || withEmail(t.sendError));
        return;
      }

      setStatus("sent");
      formRef.current?.reset();
    } catch {
      setStatus("error");
      setMessage(t.networkError);
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-5 py-2">
        <span
          className="grid h-16 w-16 place-items-center rounded-full border border-azure-lift/55"
          style={{ background: "radial-gradient(80% 80% at 50% 20%, rgba(30,104,172,0.3), transparent 70%)" }}
        >
          <CheckIcon className="h-7 w-7 text-azure-glow" />
        </span>
        <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
          {t.successHeading}
        </h3>
        <p className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">{t.successBody}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className={`${fieldShellClasses} ${isInvalid("name") ? fieldShellInvalidClasses : ""}`}>
          <input id="app-name" name="name" required placeholder=" " className={controlClasses} />
          <span className={iconClasses}>
            <UserIcon className="h-4 w-4" />
          </span>
          <label htmlFor="app-name" className={labelClasses}>
            {t.nameLabel}
            <RequiredDot />
          </label>
        </div>
        <div className={`${fieldShellClasses} ${isInvalid("email") ? fieldShellInvalidClasses : ""}`}>
          <input id="app-email" name="email" type="email" required placeholder=" " className={controlClasses} />
          <span className={iconClasses}>
            <MailIcon className="h-4 w-4" />
          </span>
          <label htmlFor="app-email" className={labelClasses}>
            {t.emailLabel}
            <RequiredDot />
          </label>
        </div>
        <PositionDropdown id="app-position" label={t.positionLabel} positions={positions} invalid={isInvalid("position")} />
        {fields
          .filter((f) => f.type !== "textarea")
          .map((field) => (
            <DynamicField key={field.id} field={field} invalid={isInvalid(`field_${field.key}`)} />
          ))}
      </div>

      {fields
        .filter((f) => f.type === "textarea")
        .map((field) => (
          <DynamicField key={field.id} field={field} invalid={isInvalid(`field_${field.key}`)} />
        ))}

      <CvField label={t.cvLabel} hint={t.cvHint} invalid={isInvalid("cv")} />

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <ul className="grid gap-3 sm:grid-cols-3">
        {trust.map(({ id, title, body }) => (
          <li
            key={id}
            className="flex flex-col gap-3 rounded-[14px] border border-edge p-5"
            style={{ background: "linear-gradient(160deg, rgba(47,59,73,0.26), transparent 65%), rgba(28,36,46,0.5)" }}
          >
            <span className="text-[13px] font-semibold leading-snug tracking-[0.01em] text-bone">{title}</span>
            <span className="text-[12px] leading-relaxed text-ash">{body}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={isSending}
          className="btn-premium btn-premium-fill group flex min-h-[56px] w-full grow basis-60 items-center justify-center gap-3 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white hover:brightness-110 disabled:opacity-60 sm:w-auto"
          style={{
            backgroundImage: "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
          }}
        >
          {isSending ? <SpinnerIcon className="h-4 w-4 animate-spin" /> : <MailIcon className="h-4 w-4" />}
          {isSending ? t.sendingLabel : t.sendLabel}
        </button>
        <a
          href={`tel:${phone.replace(/\s+/g, "")}`}
          dir="ltr"
          className="btn-premium btn-premium-outline flex min-h-[56px] w-full grow basis-60 items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone hover:bg-white/[0.08] sm:w-auto"
        >
          <PhoneIcon className="h-4 w-4" />
          {t.callLabel} {phone}
        </a>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-amber-soft">
          {message}
        </p>
      ) : (
        <p className="text-[12px] leading-relaxed text-ash">{withEmail(t.footerNote)}</p>
      )}
    </form>
  );
}
