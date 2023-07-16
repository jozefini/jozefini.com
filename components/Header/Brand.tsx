import Link from 'next/link'

const css = {
	wrapper: '',
	link: '',
}

export function Brand() {
	return (
		<div className={css.wrapper}>
			<Link href='/' className={css.link}>
				Jozi
			</Link>
		</div>
	)
}
