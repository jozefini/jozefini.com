import { NavLink } from '@/components/nav-link'
import { ReactNode } from 'react'

const css = {
  item: 'relative z-10',
  link: 'flex items-center group font-medium py-0.5 px-2 h-12 gap-x-3 text-gray-700 text-sm rounded-lg transition-colors border',
  linkActive:
    'bg-white shadow-sm text-gray-900 border-gray-200 [&_.red-dot]:ring-white',
  linkDefault:
    'hover:bg-dash-hover border-transparent [&:hover_.red-dot]:ring-dash-hover',
  icon: 'relative w-7 h-7 p-1 [&_svg]:w-full [&_svg]:h-full inline-flex items-center justify-center',
  redDot:
    'red-dot absolute right-0.5 bottom-1 ring-[3px] ring-dash-side bg-danger w-2 h-2 rounded-full',
  badge:
    'badge ml-auto px-0.5 py-1.5 text-[0.625rem] text-center min-w-[1.8rem] leading-none font-semibold text-gray-500 bg-gray-900/5 rounded-md',
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
