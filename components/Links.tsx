'use client'

import { ComponentProps, HTMLProps, PropsWithChildren } from 'react'

import Link from 'next/link'
import { cn } from '@/services/utils/helpers'
import { usePathname } from 'next/navigation'

export function NavLink({
	activeClass,
	defaultClass,
	exact,
	...props
}: PropsWithChildren<ComponentProps<typeof Link>> & {
	activeClass?: string
	defaultClass?: string
	exact?: boolean
}) {
	const pathname = usePathname()
	const isExact = exact ?? props.href === '/'
	const isActive = isExact ? pathname === props.href : pathname.startsWith(props.href as string)

	return <Link className={cn(props.className, isActive ? activeClass : defaultClass)} {...props} />
}

export function ExternalLink(props: PropsWithChildren<HTMLProps<HTMLAnchorElement>>) {
	return <a {...props} target='_blank' rel='noopener noreferrer' />
}
