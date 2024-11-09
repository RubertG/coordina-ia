import Link from "next/link"
import { Button, LoginButton, NavItem, NavLink } from "@/modules/core"
import { Suspense } from "react"

const links: NavLink[] = [
  {
    href: "/",
    label: "Proyectos"
  },
  {
    href: "/crear-proyecto",
    label: "Crear proyecto"
  }
]

export const Nav = () => {
  return (
    <nav className="bg-background shadow-lg shadow-zinc-200/30">
      <nav className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="lg:transition-colors lg:hover:text-primary/90 font-black text-xl lg:text-3xl text-primary"
        >
          Coordina IA
        </Link>

        <ul className="flex items-center">
          {
            links.map(({ href, label }) => (
              <NavItem key={href} href={href} label={label} />
            ))
          }
          <li className="ml-3">
            <Suspense fallback={<Button variant="outline">Cargando...</Button>}>
              <LoginButton />
            </Suspense>
          </li>
        </ul>
      </nav>
    </nav>
  )
}
