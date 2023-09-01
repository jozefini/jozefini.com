import { Brand } from './brand'
import { Copyright } from './copyright'
import { SocialLinks } from './social-links'

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
