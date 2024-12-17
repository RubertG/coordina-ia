import { Database } from '@/modules/core'
import { createBrowserClient } from '@supabase/ssr'

/**
 * Crea un cliente de Supabase en el navegador.
 *
 * @returns Cliente de Supabase configurado.
 */
export function createClientClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
