import { Dispatch, SetStateAction, createContext } from 'react'
import { CalendarMonth, Calendar } from './types'
import { Dayjs } from 'dayjs'

export const CalendarContext = createContext<
	| (Calendar & {
			today: Dayjs
			viewMonth: Dayjs
			months: {
				from: Dayjs
				to?: Dayjs
			}
			setViewMonth: Dispatch<SetStateAction<Dayjs>>
	  })
	| undefined
>(undefined)
export const CalendarMonthContext = createContext<
	(CalendarMonth & { monthIndex: number }) | undefined
>(undefined)
