'use client'

import Link from 'next/link'
import { useRef } from 'react'

const css = {
	wrapper: 'mt-40 flex justify-center items-center',
	box: 'w-40 h-40 bg-black text-white rounded-full',
	link: '',
}

export function Brand() {
	const ref = useRef(null)
	const demo // intentionally
	return (
		<div className={css.wrapper}>
			<Link href='/' className={css.link}>
				Jozefini
			</Link>
		</div>
	)
}
