import { Group } from 'react-konva'
import { Seat } from '@/seatmap/components/seat'
import { ROW_GAP, ROW_OFFSET } from '../lib/constants'
import { memo } from 'react'

// Loop throught 10k
for (let i = 0; i < 10000; i++) {
  console.log(i)
}

const RowSeat = memo(
  ({
    index,
    number,
    x,
    y,
  }: {
    index: number
    number: number
    x: number
    y: number
  }) => {
    const initY = y + ROW_OFFSET
    const initX = x + ROW_OFFSET
    const seatX = initX + index * ROW_GAP

    return <Seat x={seatX} y={initY} number={number} />
  }
)
RowSeat.displayName = 'RowSeat'

export const Row = memo(
  ({
    x,
    y,
    index,
    seatIds,
  }: {
    x: number
    y: number
    index: number
    seatIds: number[]
  }) => {
    return (
      <Group>
        {seatIds.map((id, i) => (
          <RowSeat key={i} index={i} number={index + 1} x={x} y={y} />
        ))}
      </Group>
    )
  }
)
Row.displayName = 'Seat'
