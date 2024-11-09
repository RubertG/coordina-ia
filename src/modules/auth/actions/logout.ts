"use server"

import { createClientServer } from "@/modules/core"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const logout = async () => {
  const supabase = await createClientServer()
  
  supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}