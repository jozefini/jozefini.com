import Image from 'next/image'
import avatarUrl from '$/assets/images/avatar.jpg'

const css = {
	wrapper: 'relative',
	gradient: 'absolute -inset-2 rounded-full bg-body shadow-xl',
	image: 'relative rounded-full w-32 h-32 object-cover',
}

export function Avatar() {
	return (
		<div className={css.wrapper}>
			<div className={css.gradient} />
			<Image className={css.image} src={avatarUrl} quality={100} alt='Jozefin B.' />
		</div>
	)
}
