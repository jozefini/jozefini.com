import { useCallback, useMemo } from 'react'
import { useCalendar, useCalendarMonth } from './lib/hooks'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { css } from './lib/styles'

export function CalendarHeader() {
	const { months, setViewMonth, isDateRange } = useCalendar()
	const { monthIndex } = useCalendarMonth()

	const title = useMemo(() => {
		const key = isDateRange && monthIndex === 1 ? 'to' : 'from'
		return months[key]?.format('MMMM YYYY')
	}, [isDateRange, months, monthIndex])

	const { showPrev, showNext } = useMemo(() => {
		let showPrev = true
		let showNext = true

		if (isDateRange) {
			if (monthIndex === 0) {
				showNext = false
			} else if (monthIndex === 1) {
				showPrev = false
			}
		}
		return { showPrev, showNext }
	}, [monthIndex, isDateRange])

	const handlePrev = useCallback(() => setViewMonth((prev) => prev.subtract(1, 'month')), [])
	const handleNext = useCallback(() => setViewMonth((prev) => prev.add(1, 'month')), [])

	return (
		<div className={css.header.wrapper}>
			<div className={css.header.action}>
				{showPrev && (
					<button type='button' className={css.header.btn} onClick={handlePrev}>
						<ChevronLeft className={css.header.arrow} />
					</button>
				)}
			</div>
			<div className={css.header.title}>{title}</div>
			<div className={css.header.action}>
				{showNext && (
					<button type='button' className={css.header.btn} onClick={handleNext}>
						<ChevronRight className={css.header.arrow} />
					</button>
				)}
			</div>
		</div>
	)
}
