"use server"

import { createClientServer } from "@/modules/core"
import { redirect } from "next/navigation"

export const logout = async () => {
  const supabase = await createClientServer()
  await supabase.auth.signOut()
  redirect('/login')
}