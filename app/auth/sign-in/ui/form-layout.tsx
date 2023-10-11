import { ReactNode } from 'react'

const css = {
	wrapper: 'flex flex-col gap-y-4',
}

export function FormLayout({ children }: { children: ReactNode }) {
	return <div className={css.wrapper}>{children}</div>
}
