import { ReactNode, useId, createContext } from 'react'

const css = {
	wrapper: 'flex flex-col',
	label: 'inline-flex',
	control: '',
}

export const FieldContext = createContext<{ label?: string; id?: string }>({})

export function FieldWrapper({ label, children }: { label?: string; children: ReactNode }) {
	const id = useId()

	return (
		<div className={css.wrapper}>
			{!!label && (
				<label htmlFor={id} className={css.label}>
					{label}
				</label>
			)}

			<div className={css.control}>
				<FieldContext.Provider value={{ label, id }}>{children}</FieldContext.Provider>
			</div>
		</div>
	)
}
