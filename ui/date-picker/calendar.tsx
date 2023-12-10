'use client'

import dayjs, { Dayjs } from 'dayjs'
import { useMemo, useState } from 'react'
import { CalendarContext } from './lib/context'
import { Calendar as CalendarProps } from './lib/types'
import { CalendarMonth } from './month'
import { css } from './lib/styles'
import { CALENDAR_MAX_YEAR, CALENDAR_MIN_YEAR } from './lib/constants'

import 'dayjs/locale/en'
import 'dayjs/locale/he'

dayjs.locale('en')

export function Calendar(props: CalendarProps) {
  const { month, isDateRange } = props
  const [viewMonth, setViewMonth] = useState<Dayjs>(month || dayjs())

  const context = useMemo(() => {
    const { setSelected, selected, isDateRange, maxDate, minDate } = props
    const now = dayjs()

    return {
      today: now as Dayjs,
      viewMonth,
      setViewMonth,
      months: {
        from: viewMonth,
        to: isDateRange ? viewMonth.add(1, 'month') : undefined,
      },
      setSelected,
      selected,
      isDateRange,
      maxDate: maxDate || dayjs(`${CALENDAR_MAX_YEAR}-12-31`),
      minDate: minDate || dayjs(`${CALENDAR_MIN_YEAR}-01-01`),
    }
  }, [props, viewMonth])

  return (
    <CalendarContext.Provider value={context}>
      <div className={css.calendar.wrapper}>
        <div className={css.calendar.box}>
          <CalendarMonth monthIndex={0} thisDay={context.months.from} />

          {isDateRange && (
            <CalendarMonth monthIndex={1} thisDay={context.months.to} />
          )}
        </div>
      </div>
    </CalendarContext.Provider>
  )
}
