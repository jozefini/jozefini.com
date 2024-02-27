import { ROW_GAP, ROW_GAP_OFFSET } from '@/features/canvas/lib/constants'
import {
  getAreaKeys,
  getRowKeys,
  getSeatKeys,
  getSectionKeys,
} from '@/features/canvas/store'

// Generate a unique ID.
export function generateEntityId(
  entity: 'seats' | 'rows' | 'sections' | 'areas',
  excludeIds?: string[]
): string {
  const startId = 1

  let usedIds: string[] = []
  switch (entity) {
    case 'seats':
      usedIds = getSeatKeys()
      break
    case 'rows':
      usedIds = getRowKeys()
      break
    case 'sections':
      usedIds = getSectionKeys()
      break
    case 'areas':
      usedIds = getAreaKeys()
      break
  }

  if (Array.isArray(excludeIds)) {
    excludeIds.forEach(id => {
      usedIds.push(id)
    })
  }
  const totalUsedIds = usedIds.length

  let id = startId
  while (usedIds.includes(id.toString())) {
    id++

    if (id - startId > totalUsedIds) {
      return new Date().getTime().toString()
    }
  }
  return id.toString()
}

// Get the height of the curve
export const getCurveHeight = ({
  maxRowSeats,
  curveDegree,
  index,
  shape = 'perfect',
}: {
  maxRowSeats: number
  curveDegree: number
  shape: 'perfect' | 'egg'
  index?: number
}) => {
  let y = 0
  if (maxRowSeats < 3) return y

  const midPoint = (maxRowSeats - 1) / 2
  const distanceFromCenter =
    typeof index === 'number' ? Math.abs(midPoint - index) : 0
  const maxOffset =
    (curveDegree / 100) * (ROW_GAP_OFFSET * maxRowSeats - ROW_GAP)

  if (shape === 'perfect') {
    y = Math.abs(maxOffset * (1 - Math.pow(distanceFromCenter / midPoint, 2)))
  } else if (shape === 'egg') {
    y = Math.abs(maxOffset * (1 - Math.pow(distanceFromCenter / midPoint, 3)))
  }

  return y
}

// Get the reversed index
export const getDynamicIndex = (i: number, total: number, reversed = false) => {
  return reversed ? total - i - 1 : i
}

// Convert string number to integer
export const stringToInteger = (
  value: string | number,
  defaultValue = 0
): number => {
  if (isNaN(Number(value))) {
    return defaultValue
  }
  return parseInt(value.toString(), 10)
}

// Create a debounce function
export const createDebounce = (
  func: (...args: any[]) => void,
  wait: number
) => {
  let timeout: NodeJS.Timeout

  const debounced = (...args: any[]) => {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
  debounced.destroy = () => {
    clearTimeout(timeout)
  }
  return debounced
}

// Create an interval retry function
export const createIntervalRetry = (
  callback: () => void,
  condition: (elapsedIntervals: number) => boolean | number,
  interval: number = 100,
  timeOut: number = 10000
) => {
  let intervalId: NodeJS.Timeout
  let elapsedTime = 0

  const cb = () => {
    if (elapsedTime >= timeOut) {
      clearInterval(intervalId)
    } else if (condition(elapsedTime)) {
      clearInterval(intervalId)
      callback()
    }
    elapsedTime += interval
  }

  cb.destroy = () => {
    clearInterval(intervalId)
  }
  intervalId = setInterval(cb, interval)
  return cb
}
