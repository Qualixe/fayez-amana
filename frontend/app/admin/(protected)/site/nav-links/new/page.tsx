import NavLinkForm from "../nav-link-form";
import { createNavLink } from "../actions";

export default function NewNavLinkPage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-bone">New navigation link</h1>
      <NavLinkForm action={createNavLink} submitLabel="Create" />
    </div>
  );
}
