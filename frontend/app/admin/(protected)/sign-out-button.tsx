"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      className="border border-steel px-3 py-2 text-start font-mono text-[10px] uppercase tracking-[0.18em] text-dust transition-colors hover:border-rebar hover:text-bone"
    >
      Sign out
    </button>
  );
}
