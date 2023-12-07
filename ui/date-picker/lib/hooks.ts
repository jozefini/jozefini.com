import { useContext } from 'react'
import { CalendarContext, CalendarMonthContext } from './context'

export function useCalendar() {
	const ctx = useContext(CalendarContext)
	if (!ctx) {
		throw new Error('useCalendar must be used within CalendarProvider')
	}

	return ctx
}

export function useCalendarMonth() {
	const ctx = useContext(CalendarMonthContext)
	if (!ctx) {
		throw new Error('useCalendarMonth must be used within CalendarMonthProvider')
	}

	return ctx
}
