import React, { memo } from 'react'
import { Group } from 'react-konva'
import { Seat } from '@/seatmap/components/seat'
import {
  ROW_GAP,
  ROW_OFFSET,
  SEAT_INNER_SIZE,
  SEAT_SIZE,
} from '../lib/constants'

type RowProps = {
  x: number
  y: number
  seatIds: number[]
  curveDegree: number
}
type RowSeatProps = {
  id: number
  index: number
  x: number
  y: number
  totalSeats: number
  curveDegree: number
}

const RowSeat = memo(
  ({ index, id, x, y, totalSeats, curveDegree }: RowSeatProps) => {
    const initY = y + ROW_OFFSET
    const initX = x + ROW_OFFSET

    const seatX = initX + index * ROW_GAP

    return <Seat key={id} x={seatX} y={initY} number={id} />
  }
)
RowSeat.displayName = 'RowSeat'

export const Row = memo(({ x, y, seatIds, curveDegree }: RowProps) => {
  const totalSeats = seatIds.length
  return (
    <Group>
      {seatIds.map((id, index) => (
        <RowSeat
          key={id || index}
          index={index}
          id={id}
          x={x}
          y={y}
          totalSeats={totalSeats}
          curveDegree={curveDegree}
        />
      ))}
    </Group>
  )
})

Row.displayName = 'Row'
