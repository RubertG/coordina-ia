"use client"

import Link from "next/link"
import { LoginButton, NavItem, NavLink } from "@/modules/core"
import { useState } from "react"
import { MenuIcon } from "lucide-react"
import clsx from "clsx"

const links: NavLink[] = [
  {
    href: "/",
    label: "Proyectos"
  },
  {
    href: "/crear-proyecto",
    label: "Crear proyecto"
  },
  {
    href: "/trabajadores",
    label: "Trabajadores"
  }
]

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <nav className="bg-background shadow-lg shadow-zinc-200/30">
      <nav className="mx-auto max-w-7xl px-4 py-3 flex flex-col md:flex-row md:items-center justify-between relative">
        <div className="flex items-center justify-between md:block">
          <Link
            href="/"
            className="lg:transition-colors lg:hover:text-primary/90 font-black text-xl lg:text-3xl text-primary"
          >
            Coordina IA
          </Link>

          <button
            className="md:hidden top-3 right-3"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>

        <ul className={clsx(
          "absolute md:static top-10 left-0 w-full md:w-auto bg-background shadow-zinc-200/30 md:bg-transparent md:shadow-none flex items-center flex-col md:flex-row py-5 md:py-0 transition-all",
          {
            "opacity-0 -translate-x-full md:translate-x-0 md:opacity-100": !isOpen,
            "opacity-100 translate-x-0": isOpen
          }
        )}>
          {
            links.map(({ href, label }) => (
              <li
                key={href}
                onClick={toggleMenu}
              >
                <NavItem href={href} label={label} />
              </li>
            ))
          }
          <li className="mt-3 md:mt-0 md:ml-3">
            <LoginButton />
          </li>
        </ul>
      </nav>
    </nav>
  )
}
