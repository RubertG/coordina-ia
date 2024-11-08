'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClientServer as createClient } from '@/modules/core'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  console.log(error)

  if (error) {
    redirect('/login?error=Error al iniciar sesi%C3%B3n')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string
  }

  const { error } = await supabase.auth.signUp(data)

  console.log(error)
  
  if (error) {
    redirect('/login?error=Error al crear el usuario')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}