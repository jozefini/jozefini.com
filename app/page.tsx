import { Avatar } from './components/Avatar'
import Logo from '$assets/icons/logo.svg'
import { SocialLinks } from './components/SocialLinks'

const css = {
	wrapper: 'bg-body fixed inset-0 flex justify-center items-center text-[#fffedc]',
	inner: 'flex flex-col justify-center items-center gap-y-5 lg:gap-y-8',
	headline: 'flex justify-center items-center',
	title: 'text-2xl lg:text-4xl font-light',
	actions: 'flex justify-center items-center',
	logo: 'w-[90vw] h-[90vh] text-[rgb(150_56_108/10%)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
}

export default function RootPage() {
	return (
		<main className={css.wrapper}>
			<Logo className={css.logo} />
			<div className={css.inner}>
				<Avatar />
				<div className={css.headline}>
					<h1 className={css.title}>Coming soon...</h1>
				</div>
				<div className={css.actions}>
					<SocialLinks />
				</div>
			</div>
		</main>
	)
}
