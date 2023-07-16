import { Brand } from './Brand'
import { Copyright } from './Copyright'
import { SocialLinks } from './SocialLinks'

const css = {
	wrapper: '',
	inner: '',
}

export function Footer() {
	return (
		<footer className={css.wrapper}>
			<div className={css.inner}>
				<Brand />
				<SocialLinks />
			</div>
			<Copyright />
		</footer>
	)
}
