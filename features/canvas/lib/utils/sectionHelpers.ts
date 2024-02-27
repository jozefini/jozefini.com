import { ROW_GAP, SEAT_SIZE } from '@/features/canvas/lib/constants'
import { getCurveHeight } from '@/features/canvas/lib/utils'

export const getSectionSize = ({
  maxRows,
  maxRowSeats,
  curveDegree,
}: {
  maxRows: number
  maxRowSeats: number
  curveDegree: number
}) => {
  let xSeats = maxRowSeats * SEAT_SIZE
  let xGaps = (maxRowSeats - 1) * ROW_GAP
  let width = xSeats + xGaps

  let yRows = maxRows * SEAT_SIZE
  let yGaps = (maxRows - 1) * ROW_GAP
  let height = yRows + yGaps
  let offsetY = height / 2
  let offsetX = width / 2

  let curveHeight = getCurveHeight({
    curveDegree,
    maxRowSeats,
    shape: 'perfect',
  })
  height += curveHeight
  // offsetY += curveHeight / 2

  let selectionY = curveDegree < 0 ? -curveHeight : 0

  return { height, width, offsetX, offsetY, curveHeight, selectionY }
}
