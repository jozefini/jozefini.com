import dayjs from 'dayjs'
import { useCalendar, useCalendarMonth } from './lib/hooks'
import { cn, firstTruthy } from '@/lib/utils'
import { useMemo } from 'react'
import { css } from './lib/styles'

export function CalendarFadedDay({
  dayNumber,
  hideNumber,
}: {
  dayNumber: number
  hideNumber?: boolean
}) {
  return <div className={css.item.faded}>{hideNumber ? null : dayNumber}</div>
}

export function CalendarFadedDays({
  dayNumbers,
  hideNumbers,
}: {
  dayNumbers: number[]
  hideNumbers?: boolean
}) {
  return dayNumbers.map(dayNumber => (
    <CalendarFadedDay
      key={dayNumber}
      dayNumber={dayNumber}
      hideNumber={hideNumbers}
    />
  ))
}

export function CalendarDay({
  dayNumber,
  isToday,
  isInRange,
  isSelected,
}: {
  dayNumber: number
  isToday?: boolean
  isInRange?: boolean
  isSelected?: boolean
}) {
  const { selected, setSelected, isDateRange } = useCalendar()
  const { thisMonth, thisYear } = useCalendarMonth()

  const handleClick = () => {
    if (!setSelected || (!isDateRange && isSelected)) {
      return
    }

    let newSelected = Array.isArray(selected) ? [...selected] : []
    const dayDate = dayjs(`${thisYear}-${thisMonth + 1}-${dayNumber}`)

    if (isDateRange) {
      if (newSelected.length === 2) {
        newSelected = [dayDate]
      } else {
        newSelected.push(dayDate)
        newSelected.sort((a, b) => (a.isBefore(b) ? -1 : 1))
      }
    } else {
      newSelected = [dayDate]
    }

    setSelected(newSelected)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        css.day.base,
        firstTruthy(
          isSelected && css.day.selected,
          isInRange && css.day.inRange,
          isToday && css.day.today,
          css.day.default
        )
      )}
    >
      {dayNumber}
    </button>
  )
}

function CalendarAllowedDays({ dayNumber }: { dayNumber: number }) {
  const { selected, isDateRange } = useCalendar()
  const {
    thisMonth,
    thisYear,
    monthIndex,
    isNowThisMonth,
    todayDayNumber,
    startDayNumbers,
    endDayNumbers,
    dayNumbers,
  } = useCalendarMonth()

  const { leftNumbers, rightNumbers } = useMemo(() => {
    let leftNumbers: number[] = []
    let rightNumbers: number[] = []
    const startLength = startDayNumbers.length
    const firstRightNumber = startLength ? 7 - startLength : 7
    const firstLeftNumber = startLength ? firstRightNumber + 1 : 1
    const totalNumbers = dayNumbers.length

    for (let i = firstLeftNumber; i <= totalNumbers; i += 7) {
      leftNumbers.push(i)
    }
    for (let i = firstRightNumber; i <= totalNumbers; i += 7) {
      rightNumbers.push(i)
    }

    if (!rightNumbers.includes(totalNumbers)) {
      rightNumbers.push(totalNumbers)
    }
    if (!leftNumbers.includes(1)) {
      leftNumbers.push(1)
    }

    return { leftNumbers, rightNumbers }
  }, [dayNumbers, startDayNumbers, endDayNumbers])

  const { inRange, firstSelectedNumber, lastSelectedNumber } = useMemo(() => {
    const inRange: number[] = []
    let firstSelectedNumber = null
    let lastSelectedNumber = null

    if (!Array.isArray(selected) || selected.length !== 2) {
      return { inRange, firstSelectedNumber, lastSelectedNumber }
    }

    for (let i = 1; i <= dayNumbers.length; i++) {
      let day = dayjs(`${thisYear}-${thisMonth + 1}-${i}`)
      if (day.isAfter(selected[0], 'day') && day.isBefore(selected[1], 'day')) {
        inRange.push(i)
      } else {
        if (day.isSame(selected[0], 'day')) {
          inRange.push(i)
          firstSelectedNumber = i
        }
        if (day.isSame(selected[1], 'day')) {
          inRange.push(i)
          lastSelectedNumber = i
        }
      }
    }
    return { inRange, firstSelectedNumber, lastSelectedNumber }
  }, [selected, isDateRange, thisMonth])

  const isInRange = isDateRange && inRange.includes(dayNumber)
  const { isSelected, isOnlySelected } = useMemo(() => {
    if (!Array.isArray(selected)) {
      return { isSelected: false, isOnlySelected: false }
    }
    const dayDate = dayjs(`${thisYear}-${thisMonth + 1}-${dayNumber}`)
    const isSelected = selected.some(date => date.isSame(dayDate, 'day'))
    return { isSelected, isOnlySelected: isSelected && selected.length === 1 }
  }, [dayNumber, selected, thisMonth, thisYear, monthIndex])

  const isStart =
    firstSelectedNumber === dayNumber || leftNumbers.includes(dayNumber)
  const isEnd =
    lastSelectedNumber === dayNumber || rightNumbers.includes(dayNumber)

  return (
    <div
      className={cn(
        firstTruthy(
          isOnlySelected && css.item.onlySelected,
          isStart && isEnd && css.item.onlySelected,
          isStart && css.item.startRange,
          isEnd && css.item.endRange
        ),
        firstTruthy(
          isSelected && css.item.inRange,
          isDateRange && inRange.includes(dayNumber) && css.item.inRange,
          css.item.default
        )
      )}
      key={dayNumber}
    >
      <CalendarDay
        dayNumber={dayNumber}
        isToday={isNowThisMonth && dayNumber === todayDayNumber}
        isInRange={isInRange}
        isSelected={isSelected}
      />
    </div>
  )
}

export function CalendarDays() {
  const { minDate, maxDate } = useCalendar()
  const { dayNumbers, thisMonth, thisYear } = useCalendarMonth()

  const { blockedStartDayNumbers, allowedDayNumbers, blockedEndDayNumbers } =
    useMemo(() => {
      let allowedDayNumbers: number[] = []
      let blockedStartDayNumbers: number[] = []
      let blockedEndDayNumbers: number[] = []

      for (let i = 1; i <= dayNumbers.length; i++) {
        let day = dayjs(`${thisYear}-${thisMonth + 1}-${i}`)
        if (minDate && day.isBefore(minDate, 'day')) {
          blockedStartDayNumbers.push(i)
          continue
        }
        if (maxDate && day.isAfter(maxDate, 'day')) {
          blockedEndDayNumbers.push(i)
          continue
        }

        allowedDayNumbers.push(i)
      }

      return {
        blockedStartDayNumbers,
        allowedDayNumbers,
        blockedEndDayNumbers,
      }
    }, [minDate, maxDate, thisMonth, thisYear])

  return (
    <>
      <CalendarFadedDays dayNumbers={blockedStartDayNumbers} />

      {allowedDayNumbers.map(dayNumber => (
        <CalendarAllowedDays key={dayNumber} dayNumber={dayNumber} />
      ))}

      <CalendarFadedDays dayNumbers={blockedEndDayNumbers} />
    </>
  )
}
