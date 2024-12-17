/**
 * @file login.ts
 * @description Este archivo contiene las acciones de inicio de sesión y registro para la aplicación.
 * Utiliza Supabase para manejar la autenticación y redirige al usuario según corresponda.
 */

'use server'

import { registerSchemaType } from '@/modules/auth'
import { createClientServer as createClient } from '@/modules/core'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

/**
 * Inicia sesión con las credenciales proporcionadas.
 * @async
 * @function login
 * @param {registerSchemaType} data - Las credenciales del usuario.
 * @returns {Promise<{error?: string}>} - Un objeto que contiene un mensaje de error si ocurre alguno.
 */
export async function login(data: registerSchemaType) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)

  console.log(error)

  if (error) {
    return {
      error: 'Error al iniciar sesión',
    }
  }

  revalidatePath('/')
  redirect('/')
}

/**
 * Registra un nuevo usuario con las credenciales proporcionadas.
 * @async
 * @function signup
 * @param {registerSchemaType} data - Las credenciales del usuario.
 * @returns {Promise<{error?: string}>} - Un objeto que contiene un mensaje de error si ocurre alguno.
 */
export async function signup(data: registerSchemaType) {
  const supabase = await createClient()
  const {
    error,
    data: { user },
  } = await supabase.auth.signUp(data)

  console.log(error)

  if (error) {
    return {
      error: 'Error al iniciar sesión',
    }
  }

  if (user) {
    const res = await supabase.from('Usuario').insert({ id: user.id, email: user.email || '' })
    console.log(res)
  }

  revalidatePath('/')
  redirect('/')
}
