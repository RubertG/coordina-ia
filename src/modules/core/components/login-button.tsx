import { logout } from "@/modules/auth"
import { Button, createClientServer } from "@/modules/core"
import Link from "next/link"

export const LoginButton = async () => {
  const supabase = await createClientServer()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      {
        user ? (
          <form action={logout}>
            <Button variant="outline" type="submit">
              Cerrar sesión
            </Button>
          </form>
        ) : (
          <Button asChild>
            <Link href="/login">Ingresar</Link>
          </Button >
        )
      }
    </>
  )
}
