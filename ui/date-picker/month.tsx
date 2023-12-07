import dayjs from 'dayjs'
import { useMemo } from 'react'
import { useCalendar } from './lib/hooks'
import { CalendarMonthContext } from './lib/context'
import { CalendarDays, CalendarFadedDays } from './days'
import { CalendarHeader } from './header'
import { Weeks } from './weeks'
import { css } from './lib/styles'

type CalendarMonthProps = {
	thisDay: any
	monthIndex: number
}

export function CalendarMonth(props: CalendarMonthProps) {
	const { today } = useCalendar()
	const { thisDay, monthIndex } = props

	// Current month, year.
	const { thisYear, thisMonth } = useMemo(() => {
		const thisYear = thisDay.year()
		const thisMonth = thisDay.month()
		return { thisYear, thisMonth }
	}, [thisDay])

	// Days in current month.
	const { totalDays, dayNumbers } = useMemo(() => {
		const totalDays = thisDay.daysInMonth()
		const dayNumbers = Array.from({ length: totalDays }).map((_, i) => i + 1)

		return { totalDays, dayNumbers }
	}, [thisDay, thisMonth])

	// Day of 1st day of current month.
	const firstDay = useMemo(
		() => dayjs(`${thisYear}-${thisMonth + 1}-1`),
		[thisDay, thisYear, thisMonth],
	)

	// Weekday of 1st day of current month.
	const startDayNumbers = useMemo(() => {
		const firstDayNumber = firstDay.day()
		return Array.from({ length: firstDayNumber }).map((_, i) =>
			firstDay.subtract(firstDayNumber - i, 'day').date(),
		)
	}, [firstDay])

	// Day of last day of current month.
	const lastDay = useMemo(
		() => dayjs(`${thisYear}-${thisMonth + 1}-${totalDays}`),
		[thisDay, thisYear, thisMonth, totalDays],
	)

	// Weekday of last day of current month.
	const endDayNumbers = useMemo(() => {
		const lastDayNumber = lastDay.day()
		return Array.from({ length: 6 - lastDayNumber }).map((_, i) => lastDay.add(i + 1, 'day').date())
	}, [lastDay])

	const { isNowThisMonth, todayDayNumber } = useMemo(() => {
		const isNowThisMonth = today.month() === thisMonth && today.year() === thisYear
		const todayDayNumber = today.date()
		return { isNowThisMonth, todayDayNumber }
	}, [today, thisMonth])

	return (
		<CalendarMonthContext.Provider
			value={{
				thisDay,
				thisYear,
				thisMonth,
				totalDays,
				dayNumbers,
				firstDay,
				startDayNumbers,
				lastDay,
				endDayNumbers,
				isNowThisMonth,
				todayDayNumber,
				monthIndex,
			}}
		>
			<div className={css.month.wrapper}>
				<CalendarHeader />

				<Weeks />
				<div className={css.month.grid}>
					<CalendarFadedDays dayNumbers={startDayNumbers} hideNumbers />
					<CalendarDays />
					<CalendarFadedDays dayNumbers={endDayNumbers} hideNumbers />
				</div>
			</div>
		</CalendarMonthContext.Provider>
	)
}
