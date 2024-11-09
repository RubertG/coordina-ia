import Link from "next/link"
import { NavItem, NavLink } from "@/modules/core"

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
  // TODO: Implementar login y logout

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
        </ul>
      </nav>
    </nav>
  )
}
