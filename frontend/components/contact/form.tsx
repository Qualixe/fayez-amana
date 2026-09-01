"use client";

import { useEffect, useRef, useState, type ComponentType, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  LayersIcon,
  PinIcon,
  BudgetIcon,
  DocumentIcon,
  ShieldIcon,
  BoltIcon,
  RulerIcon,
  CheckIcon,
  SpinnerIcon,
  ChevronDownIcon,
  HouseIcon,
  BuildingIcon,
  BedIcon,
  CrossIcon,
  CupIcon,
  GoalIcon,
} from "@/components/contact/icons";
import { scopeOptions, budgetOptions, sectorOptions, trustItems } from "@/components/contact/data";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const sectorIcons: Record<string, ComponentType<{ className?: string }>> = {
  Residential: HouseIcon,
  Commercial: BuildingIcon,
  Hospitality: BedIcon,
  Healthcare: CrossIcon,
  "F&B": CupIcon,
  "Sports Facilities": GoalIcon,
};

type Status = "idle" | "sending" | "sent" | "error";

const labelClasses =
  "pointer-events-none absolute left-11 top-1/2 -translate-y-1/2 font-mono uppercase tracking-[0.15em] text-[13px] text-ash transition-all duration-200";
const labelFloatedClasses =
  "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:text-[9px] peer-focus:text-azure-glow peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:translate-y-0 peer-[&:not(:placeholder-shown)]:text-[9px] peer-[&:not(:placeholder-shown)]:text-dust";

function Field({
  id,
  name,
  label,
  icon,
  type = "text",
  required,
  autoComplete,
  invalid,
}: {
  id: string;
  name: string;
  label: string;
  icon: ReactNode;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  invalid?: boolean;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ash">
        {icon}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        placeholder=" "
        className={`peer w-full border bg-white/[0.03] pb-2.5 pl-11 pr-4 pt-6 text-sm text-bone outline-none transition-colors focus:border-azure ${
          invalid ? "border-amber-soft" : "border-steel"
        }`}
      />
      <label htmlFor={id} className={`${labelClasses} ${labelFloatedClasses}`}>
        {label}
        {required ? <span className="ml-1 text-azure-glow">*</span> : null}
      </label>
    </div>
  );
}

function Dropdown({
  id,
  name,
  label,
  icon,
  options,
}: {
  id: string;
  name: string;
  label: string;
  icon: ReactNode;
  options: string[];
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

  function select(option: string) {
    setValue(option);
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
        setActiveIndex(Math.max(0, options.findIndex((o) => o === value)));
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const option = options[activeIndex];
      if (option) select(option);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  const listboxId = `${id}-listbox`;
  const labelId = `${id}-label`;

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={value} />
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ash">
        {icon}
      </span>
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
          setActiveIndex(Math.max(0, options.findIndex((o) => o === value)));
          setOpen((o) => !o);
        }}
        onKeyDown={onKeyDown}
        className="w-full border border-steel bg-white/[0.03] pb-2.5 pl-11 pr-9 pt-6 text-left text-sm text-bone outline-none transition-colors focus:border-azure"
      >
        <span id={`${id}-value`} className="block truncate">
          {value || " "}
        </span>
      </button>
      <span
        id={labelId}
        className={`${labelClasses} ${
          floated ? "top-2 translate-y-0 text-[9px] text-azure-glow" : ""
        }`}
      >
        {label}
      </span>
      <ChevronDownIcon
        className={`pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ash transition-transform duration-300 ${
          open ? "rotate-180" : ""
        }`}
      />

      {open ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId}
          className="absolute inset-x-0 top-full z-20 mt-1 max-h-60 overflow-auto border border-steel bg-ink shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
        >
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option === value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => select(option)}
              className={`cursor-pointer px-4 py-3 text-sm transition-colors ${
                index === activeIndex ? "bg-azure/15 text-bone" : "text-dust"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [bodyLength, setBodyLength] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isInvalid = (field: string) => invalidFields.includes(field);
  const isSending = status === "sending";

  function autoResizeTextarea() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 420)}px`;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => String(data.get(key) ?? "").trim();

    if (get("company_website")) {
      setStatus("sent");
      return;
    }

    const name = get("name");
    const email = get("email");
    const body = get("body");
    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (body.length < 2) errors.push("body");

    if (errors.length) {
      setInvalidFields(errors);
      setStatus("error");
      setMessage("Please add your name, a valid email, and a note about the work.");
      form.querySelector<HTMLElement>(`[name="${errors[0]}"]`)?.focus();
      return;
    }

    setInvalidFields([]);
    setStatus("sending");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: get("phone"),
          scope: get("scope"),
          location: get("location"),
          budget: get("budget"),
          sector: get("sector"),
          body,
        }),
      });
      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.ok) {
        setStatus("error");
        setMessage(result?.message || "We couldn't send that just now. Please try again, or email us at info@bru.com.sa.");
        return;
      }

      setStatus("sent");
      setMessage("Your enquiry is with our team in Jeddah. We respond within one business day.");
      formRef.current?.reset();
      setBodyLength(0);
      if (textareaRef.current) textareaRef.current.style.height = "auto";
    } catch {
      setStatus("error");
      setMessage("We couldn't reach our server. Please check your connection and try again, or email us at info@bru.com.sa.");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex h-full flex-col items-start justify-center gap-6 py-2">
        <span className="grid h-14 w-14 place-items-center rounded-full border border-azure-glow/50 bg-azure/10 text-azure-glow">
          <CheckIcon className="h-7 w-7" />
        </span>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.22em] text-azure-glow">
            Consultation request received
          </p>
          <h3 className="text-[clamp(1.5rem,3vw,2.75rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-bone">
            Thank you for contacting BRU.
          </h3>
        </div>
        <p className="max-w-md text-[1.0625rem] leading-[1.55] tracking-[-0.011em] text-dust">
          Our engineering team will review your enquiry and come back to you
          with next steps and comparable projects from the portfolio.
        </p>
        {message ? <p className="max-w-md text-[12px] leading-relaxed text-ash">{message}</p> : null}
        <a
          href="tel:+966555352526"
          className="border-b border-steel pb-1 font-mono text-[0.75rem] tracking-[0.1em] text-dust transition-colors duration-200 hover:border-azure-lift hover:text-azure-glow"
        >
          Urgent? Call +966 55 535 2526
        </a>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-10 ${status === "error" ? "animate-[shake_0.4s]" : ""}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label="Full name"
          icon={<UserIcon className="h-4 w-4" />}
          required
          autoComplete="name"
          invalid={isInvalid("name")}
        />
        <Field
          id="email"
          name="email"
          type="email"
          label="Email"
          icon={<MailIcon className="h-4 w-4" />}
          required
          autoComplete="email"
          invalid={isInvalid("email")}
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          icon={<PhoneIcon className="h-4 w-4" />}
          autoComplete="tel"
        />
        <Dropdown
          id="scope"
          name="scope"
          label="Scope of work"
          icon={<LayersIcon className="h-4 w-4" />}
          options={scopeOptions}
        />
        <Field
          id="location"
          name="location"
          label="Project location"
          icon={<PinIcon className="h-4 w-4" />}
          autoComplete="off"
        />
        <Dropdown
          id="budget"
          name="budget"
          label="Estimated budget"
          icon={<BudgetIcon className="h-4 w-4" />}
          options={budgetOptions}
        />
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="mb-2 font-mono text-[0.6875rem] uppercase tracking-[0.2em] text-ash">
          Sector
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {sectorOptions.map((option) => {
            const SectorIcon = sectorIcons[option];
            return (
              <label
                key={option}
                className="group flex cursor-pointer flex-col items-center gap-2.5 border border-steel bg-white/[0.03] px-3 py-5 text-center transition-colors duration-300 hover:border-rebar has-[:checked]:border-azure has-[:checked]:bg-azure/10"
              >
                <input type="radio" name="sector" value={option} className="sr-only" />
                <SectorIcon className="h-[22px] w-[22px] text-dust transition-colors duration-300 group-has-[:checked]:text-azure-glow" />
                <span className="text-[13px] font-medium leading-snug text-dust transition-colors duration-300 group-has-[:checked]:text-bone">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-4 text-ash">
            <DocumentIcon className="h-4 w-4" />
          </span>
          <textarea
            ref={textareaRef}
            id="body"
            name="body"
            rows={4}
            required
            maxLength={1200}
            aria-invalid={isInvalid("body") || undefined}
            placeholder=" "
            onInput={(e) => {
              setBodyLength(e.currentTarget.value.length);
              autoResizeTextarea();
            }}
            className={`peer w-full resize-none border bg-white/[0.03] py-6 pl-11 pr-4 text-sm text-bone outline-none transition-colors focus:border-azure ${
              isInvalid("body") ? "border-amber-soft" : "border-steel"
            }`}
          />
          <label htmlFor="body" className={`${labelClasses} top-6 ${labelFloatedClasses}`}>
            Project details<span className="ml-1 text-azure-glow">*</span>
          </label>
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-[12px] leading-relaxed text-ash">
            Plot location and size, what you want built, the standard you
            have in mind, and when you need to start on site.
          </p>
          <p
            className={`shrink-0 font-mono text-[11px] tabular-nums transition-colors ${
              bodyLength > 0.9 * 1200 ? "text-amber-soft" : "text-rebar"
            }`}
          >
            {bodyLength}/1200
          </p>
        </div>
      </div>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <ul className="grid gap-3 sm:grid-cols-3">
        {trustItems.map((item, index) => {
          const TrustIcon = [ShieldIcon, BoltIcon, RulerIcon][index];
          return (
            <li key={item.title} className="flex flex-col gap-3 border border-steel/70 p-5">
              <span className="text-azure-glow">
                <TrustIcon className="h-[18px] w-[18px]" />
              </span>
              <span className="text-[13px] font-semibold leading-snug tracking-[0.01em] text-bone">
                {item.title}
              </span>
              <span className="text-[12px] leading-relaxed text-ash">{item.body}</span>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        <button
          type="submit"
          disabled={isSending}
          className="group flex min-h-[56px] w-full grow basis-60 items-center justify-center gap-3 px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-white transition-[filter] duration-500 hover:brightness-110 disabled:opacity-60 sm:w-auto"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--color-azure-deep), var(--color-azure) 45%, var(--color-azure-lift))",
          }}
        >
          {isSending ? <SpinnerIcon className="h-4 w-4 animate-spin" /> : <MailIcon className="h-4 w-4" />}
          {isSending ? "Sending…" : "Send enquiry"}
        </button>
        <a
          href="tel:+966555352526"
          className="flex min-h-[56px] w-full grow basis-60 items-center justify-center gap-3 border border-rebar/80 bg-white/[0.04] px-9 py-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-bone transition-colors duration-400 hover:bg-white/[0.08] sm:w-auto"
        >
          <PhoneIcon className="h-4 w-4" />
          Call +966 55 535 2526
        </a>
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm text-amber-soft">
          {message}
        </p>
      ) : (
        <p className="text-[12px] leading-relaxed text-ash">
          Sent straight to info@bru.com.sa. We respond within 1 business day.
        </p>
      )}
    </form>
  );
}
