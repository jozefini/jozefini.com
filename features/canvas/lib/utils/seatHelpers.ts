// Getters

import { ROW_GAP_OFFSET, SEAT_RADIUS } from '@/features/canvas/lib/constants'
import { getCurveHeight } from '@/features/canvas/lib/utils'

export const getRowSeatCoords = ({
  maxRowSeats,
  seatIndex,
  reverseX,
  curveDegree,
  shape = 'perfect',
  addRadius = false,
}: {
  maxRowSeats: number
  seatIndex: number
  curveDegree: number
  reverseX: boolean
  shape: 'perfect' | 'egg'
  addRadius?: boolean
}) => {
  const index = reverseX ? maxRowSeats - seatIndex - 1 : seatIndex
  let curveHeight = getCurveHeight({
    maxRowSeats,
    curveDegree,
    index,
    shape,
  })
  let y = curveDegree < 0 ? -curveHeight : curveHeight
  let x = index * ROW_GAP_OFFSET

  if (addRadius) {
    x += SEAT_RADIUS
    y += SEAT_RADIUS
  }

  if (seatIndex < 0 || seatIndex >= maxRowSeats) {
    y *= -1
  }

  return { y, x }
}

// Setters
