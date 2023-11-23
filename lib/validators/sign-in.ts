import { object, string, Output, isoDate, Issue } from 'valibot'

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

const createIssue = (
	input: any,
	key: string,
	message: string,
): Pick<Issue, 'validation' | 'message' | 'input' | 'path'> => ({
	validation: 'custom',
	message,
	input,
	path: [{ schema: 'object', input: input, key: key, value: input[key] }],
})

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
						createIssue(input, 'startDate', messages.wrongStartDate),
						createIssue(input, 'endDate', messages.wrongEndDate),
					],
				}
			}
			return { output: input }
		},
	],
)

export type SignInData = Output<typeof signInSchema>
