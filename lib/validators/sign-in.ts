import { object, string, Output, isoDate } from 'valibot'

const messages = {
	requiredDate: 'Date is required',
	wrongEndDate: 'End date should be higher than start date',
	wrongStartDate: 'Start date should be lower than end date',
}

const isAfter = (date1: string, date2: string): boolean => {
	const d1 = new Date(date1)
	const d2 = new Date(date2)
	d1.setDate(d1.getDate() + 1)

	return d1.getTime() > d2.getTime()
}

export const signInSchema = object(
	{
		startDate: string([isoDate(messages.requiredDate)]),
		endDate: string([isoDate(messages.requiredDate)]),
	},
	[
		(input) => {
			if (isAfter(input.startDate, input.endDate)) {
				return {
					issues: [
						{
							validation: 'custom',
							message: messages.wrongEndDate,
							input,
							path: [{ schema: 'object', input: input, key: 'endDate', value: input.endDate }],
						},
						{
							validation: 'custom',
							message: messages.wrongStartDate,
							input,
							path: [{ schema: 'object', input: input, key: 'startDate', value: input.startDate }],
						},
					],
				}
			}
			return { output: input }
		},
	],
)

export type SignInData = Output<typeof signInSchema>
