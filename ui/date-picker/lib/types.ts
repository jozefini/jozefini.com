import { Dayjs } from 'dayjs'

export type CalendarDate = {
	from?: Dayjs
	to?: Dayjs
}

export type Calendar = {
	selected?: Dayjs[]
	setSelected?: (date: Dayjs[]) => void
	today?: Dayjs
	month?: Dayjs
	isDateRange?: boolean
	minDate?: Dayjs
	maxDate?: Dayjs
}

export type CalendarMonth = {
	thisDay: Dayjs
	thisYear: number
	thisMonth: number
	totalDays: number
	dayNumbers: number[]
	firstDay: Dayjs
	startDayNumbers: number[]
	lastDay: Dayjs
	endDayNumbers: number[]
	isNowThisMonth: boolean
	todayDayNumber: number
}
