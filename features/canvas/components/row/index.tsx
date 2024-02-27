'use client'

import { createContext, useContext, memo } from 'react'
import { useRow, useSeat } from '@/features/canvas/store'
import { StoreRow } from '@/features/canvas/lib/types'
import { Seat, SeatContext } from '@/features/canvas/components/seat'
import { useSectionContext } from '@/features/canvas/components/section'
import { getRowSeatCoords, getRowCoords } from '@/features/canvas/lib/utils'
import { RowLabel } from './rowLabel'

const RowContext = createContext<StoreRow & { index: number }>({
  id: '',
  index: 0,
  number: 1,
  seatIds: [],
  areaId: '',
  sectionId: '',
})
export const useRowContext = () => useContext(RowContext)

const RowSeat = memo(
  ({
    index,
    id,
    rowX,
    rowY,
  }: {
    index: number
    id: string
    rowX: number
    rowY: number
  }) => {
    const { curveDegree, reverseX, maxRowSeats } = useSectionContext()
    const seat = useSeat(id)
    if (!seat) {
      return null
    }

    const { number } = seat

    const { x, y } = getRowSeatCoords({
      curveDegree,
      reverseX,
      seatIndex: index,
      maxRowSeats,
      shape: 'perfect',
      addRadius: true,
    })

    return (
      <SeatContext.Provider value={{ ...seat, index }}>
        <Seat id={id} x={rowX + x} y={rowY + y} number={number} />
      </SeatContext.Provider>
    )
  }
)
RowSeat.displayName = 'RowSeat'

export const Row = memo(({ index, id }: { id: string; index: number }) => {
  const { reverseY, maxRows } = useSectionContext()
  const row = useRow(id) as StoreRow
  const { seatIds, number } = row

  const { x, y } = getRowCoords({
    rowIndex: index,
    maxRows,
    reverseY,
  })

  return (
    <RowContext.Provider value={{ ...row, index }}>
      {seatIds.map((seatId, i) => (
        <RowSeat key={seatId || i} id={seatId} index={i} rowX={x} rowY={y} />
      ))}
      <RowLabel index={index} number={number} seatIds={seatIds} />
    </RowContext.Provider>
  )
})
Row.displayName = 'Seat'
