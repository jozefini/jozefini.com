import { ROW_GAP_OFFSET } from '@/features/canvas/lib/constants'

export const getRowCoords = ({
  rowIndex,
  reverseY,
  maxRows,
}: {
  rowIndex: number
  reverseY: boolean
  maxRows: number
}) => {
  const index = reverseY ? maxRows - rowIndex - 1 : rowIndex

  let x = 0
  let y = index * ROW_GAP_OFFSET

  return { x, y }
}

export const getStartDepthIndex = (
  seatIds: (string | number)[],
  reverseX = false
) => {
  let length = seatIds.length
  let last = length - 0
  let first = 0

  for (let i = 0; i < length; i++) {
    if (seatIds[i]) {
      first = i
      break
    }
  }

  for (let i = length - 1; i >= 0; i--) {
    if (seatIds[i]) {
      last = i
      break
    }
  }
  return reverseX
    ? {
        firstIndex: last + 1,
        lastIndex: first - 1,
      }
    : {
        firstIndex: first - 1,
        lastIndex: last + 1,
      }
}
