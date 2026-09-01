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

const fieldShellClasses =
  "group relative rounded-[14px] border border-edge bg-void/68 transition-colors duration-200 hover:border-steel/85 focus-within:border-azure-lift focus-within:bg-void/90 focus-within:shadow-[0_0_0_1px_rgba(61,143,216,0.6),0_0_0_4px_rgba(30,104,172,0.18),0_8px_26px_-14px_rgba(61,143,216,0.55)]";
const fieldShellInvalidClasses = "border-amber-soft";

const controlClasses =
  "peer relative z-10 min-h-16 w-full rounded-[inherit] border-0 bg-transparent pb-3 pl-12 pr-4 pt-7 text-base text-bone outline-none placeholder:text-rebar placeholder:opacity-0 placeholder:transition-opacity placeholder:duration-200 focus:placeholder:opacity-100";

const iconClasses =
  "pointer-events-none absolute left-[18px] top-6 text-rebar transition-[color,transform] duration-200 group-focus-within:scale-110 group-focus-within:text-azure-glow peer-[&:not(:placeholder-shown)]:text-dust";
const iconInvalidClasses = "text-amber-soft";

const labelClasses =
  "pointer-events-none absolute left-12 top-6 origin-left text-base font-normal leading-none text-ash transition-transform duration-200 [transform-origin:0_0] peer-focus:-translate-y-[13px] peer-focus:scale-[0.7] peer-focus:text-azure-glow peer-[&:not(:placeholder-shown)]:-translate-y-[13px] peer-[&:not(:placeholder-shown)]:scale-[0.7] peer-[&:not(:placeholder-shown)]:text-dust";
const labelInvalidClasses = "peer-focus:text-amber-soft";

function RequiredDot() {
  return <span aria-hidden="true" className="ms-2 inline-block h-1 w-1 rounded-full bg-azure-lift align-[2px]" />;
}

function Field({
  id,
  name,
  label,
  icon,
  type = "text",
  required,
  autoComplete,
  placeholder,
  invalid,
}: {
  id: string;
  name: string;
  label: string;
  icon: ReactNode;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
  invalid?: boolean;
}) {
  return (
    <div className={`${fieldShellClasses} ${invalid ? fieldShellInvalidClasses : ""}`}>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={invalid || undefined}
        placeholder={placeholder ?? " "}
        className={controlClasses}
      />
      <span className={`${iconClasses} ${invalid ? iconInvalidClasses : ""}`}>{icon}</span>
      <label htmlFor={id} className={`${labelClasses} ${invalid ? labelInvalidClasses : ""}`}>
        {label}
        {required ? <RequiredDot /> : null}
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
    <div ref={rootRef} className={`${fieldShellClasses} ${open ? "border-azure-lift" : ""}`}>
      <input type="hidden" name={name} value={value} />
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
        className={`${controlClasses} cursor-pointer text-left`}
      >
        <span id={`${id}-value`} className="block truncate">
          {value || " "}
        </span>
      </button>
      <span
        className={`pointer-events-none absolute left-[18px] top-6 transition-[color,transform] duration-200 ${
          open ? "scale-110 text-azure-glow" : "text-rebar group-hover:text-dust"
        }`}
      >
        {icon}
      </span>
      <span
        id={labelId}
        className={`pointer-events-none absolute left-12 top-6 origin-left text-base leading-none text-ash transition-transform duration-200 ${
          floated ? "-translate-y-[13px] scale-[0.7] text-dust" : ""
        } ${open ? "text-azure-glow" : ""}`}
      >
        {label}
      </span>
      <ChevronDownIcon
        className={`pointer-events-none absolute right-[18px] top-6 h-3.5 w-3.5 transition-[color,transform] duration-200 ${
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
          {options.map((option, index) => (
            <li
              key={option}
              id={`${id}-opt-${index}`}
              role="option"
              aria-selected={option === value}
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => select(option)}
              className={`cursor-pointer rounded-[10px] px-4 py-3 text-sm leading-[1.45] transition-colors duration-150 ${
                index === activeIndex ? "bg-azure/22 text-bone" : option === value ? "text-azure-glow" : "text-dust"
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
        <span
          className="grid h-16 w-16 place-items-center rounded-full border border-azure-lift/55"
          style={{ background: "radial-gradient(80% 80% at 50% 20%, rgba(30,104,172,0.3), transparent 70%)" }}
        >
          <CheckIcon className="h-7 w-7 text-azure-glow" />
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
      className={`flex flex-col gap-10 ${status === "error" ? "animate-[shake_0.42s_cubic-bezier(0.36,0.07,0.19,0.97)]" : ""}`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="name"
          name="name"
          label="Full name"
          icon={<UserIcon className="h-4 w-4" />}
          required
          autoComplete="name"
          placeholder="Your name"
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
          placeholder="you@company.com"
          invalid={isInvalid("email")}
        />
        <Field
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          icon={<PhoneIcon className="h-4 w-4" />}
          autoComplete="tel"
          placeholder="+966 …"
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
          placeholder="Jeddah, Makkah, district…"
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
                className="group relative flex min-h-24 cursor-pointer flex-col justify-between gap-4 overflow-hidden rounded-[14px] border border-edge bg-void/66 p-4 transition-[transform,border-color,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:border-steel hover:shadow-[0_14px_28px_-22px_rgba(3,10,20,0.95)] active:translate-y-0 active:scale-[0.99] has-[:checked]:border-azure-lift has-[:checked]:shadow-[0_0_0_1px_rgba(61,143,216,0.5),0_10px_30px_-18px_rgba(61,143,216,0.55)] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-azure-glow"
              >
                <input type="radio" name="sector" value={option} className="sr-only" />
                <SectorIcon className="h-[22px] w-[22px] text-dust transition-colors duration-200 group-has-[:checked]:text-azure-glow" />
                <span className="text-[13px] font-medium leading-snug text-bone">
                  {option}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <div className={`${fieldShellClasses} ${isInvalid("body") ? fieldShellInvalidClasses : ""}`}>
          <textarea
            ref={textareaRef}
            id="body"
            name="body"
            rows={4}
            required
            maxLength={1200}
            aria-invalid={isInvalid("body") || undefined}
            placeholder="Plot location and size, what you want built, the standard you have in mind, and when you need to start on site…"
            onInput={(e) => {
              setBodyLength(e.currentTarget.value.length);
              autoResizeTextarea();
            }}
            className={`${controlClasses} min-h-[176px] resize-none pt-8 leading-[1.65]`}
            style={{ scrollbarWidth: "thin" }}
          />
          <span className={`${iconClasses} ${isInvalid("body") ? iconInvalidClasses : ""}`}>
            <DocumentIcon className="h-4 w-4" />
          </span>
          <label htmlFor="body" className={`${labelClasses} ${isInvalid("body") ? labelInvalidClasses : ""}`}>
            Project details
            <RequiredDot />
          </label>
          <div className="mx-4 flex items-center justify-between gap-4 border-t border-edge/85 py-3">
            <p className="text-[12px] leading-relaxed text-ash">
              The more specific the brief, the more useful our first reply.
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
      </div>

      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="sr-only" aria-hidden="true" />

      <ul className="grid gap-3 sm:grid-cols-3">
        {trustItems.map((item, index) => {
          const TrustIcon = [ShieldIcon, BoltIcon, RulerIcon][index];
          return (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-[14px] border border-edge p-5 transition-colors duration-200 hover:border-steel/90"
              style={{
                background:
                  "linear-gradient(160deg, rgba(47,59,73,0.26), transparent 65%), rgba(28,36,46,0.5)",
              }}
            >
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
