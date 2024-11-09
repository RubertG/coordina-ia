'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClientServer as createClient } from '@/modules/core'
import { registerSchemaType } from '@/modules/auth'

export async function login(data: registerSchemaType) {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword(data)

  console.log(error)

  if (error) {
    return {
      error: "Error al iniciar sesión"
    }
  }

  revalidatePath('/')
  redirect('/')
}

export async function signup(data: registerSchemaType) {
  const supabase = await createClient()
  const { error, data: { user } } = await supabase.auth.signUp(data)

  console.log(error)

  if (error) {
    return {
      error: "Error al iniciar sesión"
    }
  }

  if (user) {
    const res = await supabase.from("Usuario").insert({ id: user.id, email: user.email || "" })
    console.log(res)
  }

  revalidatePath('/')
  redirect('/')
}