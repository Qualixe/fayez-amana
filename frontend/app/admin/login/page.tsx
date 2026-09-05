"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-void px-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 border border-steel bg-ink p-8"
      >
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold tracking-[-0.02em] text-bone">
            Fayez<span className="text-azure-glow">Amana</span>
          </span>
          <h1 className="font-mono text-[11px] uppercase tracking-[0.22em] text-dust">Admin sign in</h1>
        </div>

        <label className="flex flex-col gap-1.5 text-sm text-dust">
          Email
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-none border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm text-dust">
          Password
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-none border border-steel bg-void px-3 py-2.5 text-bone outline-none focus:border-azure-lift"
          />
        </label>

        {error ? <p className="text-sm text-amber-soft">{error}</p> : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 min-h-11 bg-azure font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-[filter] hover:brightness-110 disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
