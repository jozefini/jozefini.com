import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { cn, hasAnyKey, hasLength } from '@/lib/utils'

import { FieldContext } from '@/app/auth/sign-in/ui'

const css = {
	input: 'border rounded-md',
	inputError: 'border-red-500',
	inputNormal: 'border-gray-500',
}

export function DateInput({ name, relationships }: { name: string; relationships?: string[] }) {
	const { id } = useContext(FieldContext)
	const {
		register,
		formState: { errors },
		trigger,
		watch,
	} = useFormContext()
	const error = errors[name] as { message: string }
	const value = hasLength(relationships) ? watch(name) : undefined

	useEffect(() => {
		if (hasAnyKey(errors, relationships as any)) {
			trigger(relationships)
		}
	}, [value]) // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			<input
				id={id}
				type='date'
				className={cn(css.input, error ? css.inputError : css.inputNormal)}
				{...register(name)}
			/>
			{error && <p>{error.message}</p>}
		</>
	)
}
