'use client'

import { ComponentProps, PropsWithChildren } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export function NavLink({
  activeClass,
  defaultClass,
  className,
  exact,
  ...props
}: PropsWithChildren<ComponentProps<typeof Link>> & {
  activeClass?: string
  defaultClass?: string
  exact?: boolean
}) {
  const pathname = usePathname()
  const isExact = exact ?? props.href === '/'
  const isActive = isExact
    ? pathname === props.href
    : pathname.startsWith(props.href as string)

  return (
    <Link
      className={cn(className, isActive ? activeClass : defaultClass)}
      {...props}
    />
  )
}
