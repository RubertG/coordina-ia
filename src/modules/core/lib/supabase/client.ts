import { Database } from '@/modules/core'
import { createBrowserClient } from '@supabase/ssr'

export function createClientClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
