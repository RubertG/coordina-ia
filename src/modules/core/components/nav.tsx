/**
 * Nav Component
 *
 * Este componente representa la barra de navegación principal de la aplicación.
 *
 * Funcionalidades:
 * - Muestra enlaces de navegación.
 * - Incluye un botón para alternar el menú en dispositivos móviles.
 * - Muestra el botón de inicio de sesión.
 */

'use client'

import { LoginButton, NavItem, NavLink } from '@/modules/core'
import clsx from 'clsx'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const links: NavLink[] = [
  {
    href: '/',
    label: 'Proyectos',
  },
  {
    href: '/crear-proyecto',
    label: 'Crear proyecto',
  },
  {
    href: '/trabajadores',
    label: 'Trabajadores',
  },
]

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  return (
    <nav className="bg-background shadow-lg shadow-zinc-200/30">
      <nav className="relative mx-auto flex max-w-7xl flex-col justify-between px-4 py-3 md:flex-row md:items-center">
        <div className="flex items-center justify-between md:block">
          <Link
            href="/"
            className="text-xl font-black text-primary lg:text-3xl lg:transition-colors lg:hover:text-primary/90"
          >
            Coordina IA
          </Link>

          <button
            className="right-3 top-3 md:hidden"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="navigation-menu"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>

        <ul
          className={clsx(
            'absolute left-0 top-10 flex w-full flex-col items-center bg-background py-5 shadow-zinc-200/30 transition-all md:static md:w-auto md:flex-row md:bg-transparent md:py-0 md:shadow-none',
            {
              '-translate-x-full opacity-0 md:translate-x-0 md:opacity-100': !isOpen,
              'translate-x-0 opacity-100': isOpen,
            },
          )}
        >
          {links.map(({ href, label }) => (
            <li key={href} onClick={toggleMenu}>
              <NavItem href={href} label={label} />
            </li>
          ))}
          <li className="mt-3 md:ml-3 md:mt-0">
            <LoginButton />
          </li>
        </ul>
      </nav>
    </nav>
  )
}
