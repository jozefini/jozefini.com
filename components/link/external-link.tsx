import { HTMLProps, PropsWithChildren } from 'react'

export function ExternalLink(props: PropsWithChildren<HTMLProps<HTMLAnchorElement>>) {
	return <a {...props} target='_blank' rel='noopener noreferrer' />
}
