import dayjs from 'dayjs'
import { css } from './lib/styles'
import { useMemo } from 'react'

export function Weeks() {
  const weekDays = useMemo(
    () =>
      Array(7)
        .fill(0)
        .map((_, i) => dayjs().day(i).format('ddd')),
    []
  )

  return (
    <div className={css.week.wrapper}>
      {weekDays.map(dayName => (
        <div className={css.week.cell} key={dayName}>
          {dayName}
        </div>
      ))}
    </div>
  )
}
