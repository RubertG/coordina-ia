'use client'

import { NavLink } from '@/modules/core'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const NavItem = ({ href, label }: NavLink) => {
  const pathname = usePathname()
  const isActive = href === pathname

  return (
    <Link
      href={href}
      className={clsx('block px-3 py-2 lg:transition-colors lg:hover:text-primary', {
        'text-primary': isActive,
        'text-zinc-900': !isActive,
      })}
    >
      {label}
    </Link>
  )
}
