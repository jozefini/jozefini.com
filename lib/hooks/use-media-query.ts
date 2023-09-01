import { off, on } from '$/lib/utils'
import { useEffect, useState } from 'react'

const breakpoint = 768

type Props = {
	mobile?: any
	desktop?: any
}

type MediaQuery = {
	isMobile: boolean
	isDesktop: boolean
	value: any
}

export function useMediaQuery(props: Props = {}): MediaQuery {
	const { mobile, desktop } = props || {}
	const [mediaQuery, setMediaQuery] = useState<MediaQuery>({
		isMobile: false,
		isDesktop: false,
		value: null,
	})

	useEffect(() => {
		const matchDesktop = window.matchMedia(`(min-width: ${breakpoint}px)`)

		const watchForChanges = () => {
			const isMobile = !matchDesktop.matches
			const isDesktop = matchDesktop.matches
			const value = isMobile ? mobile : desktop

			setMediaQuery({
				isMobile,
				isDesktop,
				value,
			})
		}
		watchForChanges()

		on(matchDesktop, 'change', watchForChanges)
		return () => {
			off(matchDesktop, 'change', watchForChanges)
		}
	}, [])

	return mediaQuery
}
