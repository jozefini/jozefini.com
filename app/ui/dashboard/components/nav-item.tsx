import { NavLink } from '@/components/nav-link'
import { ReactNode } from 'react'

const css = {
  item: 'relative z-10',
  link: 'flex items-center group font-medium py-0.5 px-2 h-[2.75rem] gap-x-3 text-sm rounded-lg',
  linkActive:
    'bg-primary text-white shadow-sm [&_.badge]:border-white/50 [&_.badge]:text-white/90 [&_.dot]:ring-primary',
  linkDefault:
    'bg-white hover:bg-neutral-100 [&_.badge]:border-neutral-200 [&_.dot]:hover:ring-neutral-100',
  icon: 'relative w-7 h-7 p-1 [&_svg]:w-full [&_svg]:h-full inline-flex items-center justify-center',
  redDot:
    'dot absolute right-0.5 border border-white bottom-1 ring-2 ring-dash-side bg-danger w-2 h-2 rounded-full',
  badge:
    'badge ml-auto px-0.5 py-1.5 text-[0.625rem] text-center min-w-[1.8rem] leading-none font-semibold border text-black/70 border-neutral-900/5 rounded-md',
}

export function NavItem({
  children,
  href,
  label,
  hasNotice,
  badge,
}: {
  children?: ReactNode
  href: string
  label: string
  hasNotice?: boolean
  badge?: string
}) {
  return (
    <li className={css.item}>
      <NavLink
        href={href}
        activeClass={css.linkActive}
        defaultClass={css.linkDefault}
        className={css.link}
        exact={'/ui/dashboard' === href}
      >
        <span className={css.icon}>
          {children}
          {!!hasNotice && <span className={css.redDot} />}
        </span>
        <span>{label}</span>
        {!!badge && <span className={css.badge}>{badge}</span>}
      </NavLink>
    </li>
  )
}
