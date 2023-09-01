import { Actions } from './actions'
import { Brand } from './brand'
import { Nav } from './nav'

const css = {
	wrapper: '',
	inner: '',
}

export function Header() {
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
