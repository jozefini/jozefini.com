'use client'

import { createContext, useContext, memo } from 'react'
import { StoreSeat } from '@/features/canvas/lib/types'
import { SelectedSeat } from './selectedSeat'
import { AssignedSeat } from './assignedSeat'
import { DisabledSeat } from './disabledSeat'
import { HoveredSeat } from './hoveredSeat'
import { useAssignedStore } from '@/features/canvas/store'
import { useAssignedSeatColor } from '@/features/canvas/hooks'

export const SeatContext = createContext<StoreSeat & { index: number }>({
  areaId: '',
  id: '',
  index: 0,
  number: 1,
  rowId: '',
  sectionId: '',
})
export const useSeatContext = () => useContext(SeatContext)

export const Seat = memo(
  ({
    id,
    x,
    y,
    number,
  }: {
    id: string
    x: number
    y: number
    number: number
  }) => {
    const isSelected = false // ToDo: useSelectedStore(s => s.selectedId === id)
    const isHovered = useAssignedStore(s => s.hoveredId === id)
    const { seatColor, textColor, isAssigned } = useAssignedSeatColor(id)

    if (isSelected) {
      return <SelectedSeat id={id} x={x} y={y} seatColor={seatColor} />
    }
    if (isHovered) {
      return (
        <HoveredSeat
          id={id}
          x={x}
          y={y}
          number={number}
          textColor={textColor}
          seatColor={seatColor}
        />
      )
    }
    if (isAssigned) {
      return <AssignedSeat id={id} x={x} y={y} seatColor={seatColor} />
    }
    return <DisabledSeat x={x} y={y} />
  }
)
Seat.displayName = 'Seat'
