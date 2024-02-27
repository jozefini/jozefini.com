import { useMemo } from 'react'
import { isDarkerColor } from '@/features/canvas/lib/utils'
import { useAssignedStore } from '@/features/canvas/store'
import {
  DARKER_SEAT_TEXT_FILL,
  DISABLED_SEAT_TEXT_FILL,
  LIGHTER_SEAT_TEXT_FILL,
} from '@/features/canvas/lib/constants'

export const useAssignedSeatColor = (id: string) => {
  const [isAssigned, seatColor] = useAssignedStore(s => {
    const isAssigned = s.assigned.hasOwnProperty(id)
    if (!isAssigned) {
      return [isAssigned, '']
    }
    return [isAssigned, s.colors[s.assigned[id]] || '']
  })

  const textColor = useMemo(() => {
    if (!seatColor) {
      return DISABLED_SEAT_TEXT_FILL
    }
    return isDarkerColor(seatColor)
      ? DARKER_SEAT_TEXT_FILL
      : LIGHTER_SEAT_TEXT_FILL
  }, [seatColor])

  return {
    isAssigned,
    seatColor,
    textColor,
  }
}
