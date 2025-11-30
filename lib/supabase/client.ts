import { createBrowserClient } from "@supabase/ssr"

const globalForSupabase = globalThis as unknown as {
  supabaseBrowserClient: ReturnType<typeof createBrowserClient> | undefined
}

export function getSupabaseBrowserClient() {
  if (globalForSupabase.supabaseBrowserClient) {
    return globalForSupabase.supabaseBrowserClient
  }

  const client = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  globalForSupabase.supabaseBrowserClient = client

  return client
}
