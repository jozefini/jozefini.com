'use client'

import { parse } from 'valibot'
import { FormProvider, useForm } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { SignInData, signInSchema } from '@/lib/validators'

import { DateInput } from '@/app/auth/sign-in/components/controls'
import { FieldWrapper, FormLayout } from '@/app/auth/sign-in/ui'

export function Form() {
	const formMethods = useForm<SignInData>({
		resolver: valibotResolver(signInSchema),
	})

	const onSubmit = (data: SignInData) => {
		try {
			const parsedData = parse(signInSchema, data)
			console.log(parsedData)
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<FormProvider {...formMethods}>
			<form onSubmit={formMethods.handleSubmit(onSubmit)}>
				<FormLayout>
					<FieldWrapper label='Start Date'>
						<DateInput name='startDate' relationships={['endDate']} />
					</FieldWrapper>

					<FieldWrapper label='End Date'>
						<DateInput name='endDate' relationships={['startDate']} />
					</FieldWrapper>

					<div>
						<input type='submit' />
					</div>
				</FormLayout>
			</form>
		</FormProvider>
	)
}
