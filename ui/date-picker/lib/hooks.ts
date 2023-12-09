import { useContext } from 'react'
import { CalendarContext, CalendarMonthContext } from './context'

export function useCalendar() {
  const ctx = useContext(CalendarContext)
  if (!ctx) {
    throw new Error('useCalendar must be used within CalendarContext.Provider')
  }

  return ctx
}

export function useCalendarMonth() {
  const ctx = useContext(CalendarMonthContext)
  if (!ctx) {
    throw new Error(
      'useCalendarMonth must be used within CalendarMonthContext.Provider'
    )
  }

  return ctx
}
