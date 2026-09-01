import type { ReactNode } from "react";

function Icon({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

export function UserIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
}

export function MailIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </Icon>
  );
}

export function PhoneIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </Icon>
  );
}

export function LayersIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="m12 2 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 17 9 5 9-5" />
    </Icon>
  );
}

export function PinIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </Icon>
  );
}

export function BudgetIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <path d="M2 10h20" />
      <path d="M17 15h2" />
    </Icon>
  );
}

export function DocumentIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M4 4h16v13l-4 4H4Z" />
      <path d="M20 17h-4v4" />
      <path d="M8 9h8M8 13h5" />
    </Icon>
  );
}

export function ShieldIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Icon>
  );
}

export function BoltIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Icon>
  );
}

export function RulerIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M4 21h8" />
      <path d="M8 21V4" />
      <path d="M3 8h18" />
      <path d="M8 4 3 8" />
      <path d="M17 8v4" />
      <path d="M15 12h4" />
    </Icon>
  );
}

export function CheckIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="m4 12.5 5.2 5.2L20 7" />
    </Icon>
  );
}

export function SpinnerIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M12 3a9 9 0 1 0 9 9" />
    </Icon>
  );
}

export function HouseIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v10h12V10" />
      <path d="M10 20v-6h4v6" />
    </Icon>
  );
}

export function BuildingIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M4 21V6h9v15" />
      <path d="M13 11h7v10" />
      <path d="M7 9h3M7 13h3M7 17h3M16 14h1M16 18h1" />
    </Icon>
  );
}

export function BedIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M3 20V9a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v11" />
      <path d="M3 14h18" />
      <path d="M7 14v-3h4v3" />
    </Icon>
  );
}

export function CrossIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M12 9v6M9 12h6" />
    </Icon>
  );
}

export function CupIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="M4 8h13a3 3 0 0 1 0 6h-1" />
      <path d="M4 8v6a5 5 0 0 0 5 5h3a5 5 0 0 0 5-5" />
      <path d="M7 3v2M11 3v2" />
    </Icon>
  );
}

export function ChevronDownIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <path d="m6 9 6 6 6-6" />
    </Icon>
  );
}

export function GoalIcon(props: { className?: string }) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M12 5v14" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M3 9h3v6H3M21 9h-3v6h3" />
    </Icon>
  );
}
