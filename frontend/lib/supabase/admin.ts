import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Secret-key client. Bypasses Row Level Security entirely.
 * Server-only — never import this from a Client Component. Used by
 * scripts/seed.ts and admin server actions that intentionally need to
 * write outside the `authenticated`-role RLS policies (e.g. Storage setup).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
