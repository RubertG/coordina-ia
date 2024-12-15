'use client'

import { logout } from '@/modules/auth'
import { Button, createClientClient } from '@/modules/core'
import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const LoginButton = () => {
  const supabase = createClientClient()
  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null)
    })

    return () => subscription?.unsubscribe()
  }, [supabase.auth])

  return (
    <>
      {user ? (
        <form action={logout}>
          <Button variant="outline" type="submit">
            Cerrar sesión
          </Button>
        </form>
      ) : (
        <Button asChild>
          <Link href="/login">Ingresar</Link>
        </Button>
      )}
    </>
  )
}
