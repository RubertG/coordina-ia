/**
 * @file logout.ts
 * @description Este archivo contiene la acción de cierre de sesión para la aplicación.
 * Utiliza Supabase para manejar la autenticación y redirige al usuario a la página de inicio de sesión.
 */

'use server'

import { createClientServer } from '@/modules/core'
import { redirect } from 'next/navigation'

/**
 * Cierra la sesión del usuario actual y lo redirige a la página de inicio de sesión.
 * @async
 * @function logout
 * @returns {Promise<void>}
 */
export const logout = async (): Promise<void> => {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
  redirect('/login')
}
