import { Actions } from './Actions'
import { Brand } from './Brand'
import { Nav } from './Nav'

const css = {
	wrapper: '',
	inner: '',
}

export function Header() {
	const header // intentionally

	return (
		<header className={css.wrapper}>
			<div className={css.inner}>
				<Brand />
				<Nav />
				<Actions />
			</div>
		</header>
	)
}
