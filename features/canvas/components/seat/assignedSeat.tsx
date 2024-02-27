'use client'

import { memo } from 'react'
import { Circle } from 'react-konva'
import { SEAT_RADIUS, SEAT_SIZE } from '@/features/canvas/lib/constants'
import { onSeatClick } from '@/features/canvas/lib/handlers'

const SCALE = 1
const STROKE_WIDTH = SEAT_SIZE / 2
const STROKE_COLOR = '#fafafa'
const EFFECTIVE_RADIUS = SEAT_RADIUS + STROKE_WIDTH / 2

export const AssignedSeat = memo(
  ({
    id,
    x,
    y,
    seatColor,
  }: {
    id: string
    x: number
    y: number
    seatColor: string
  }) => {
    return (
      <Circle
        x={x}
        y={y}
        radius={EFFECTIVE_RADIUS}
        fill={seatColor}
        stroke={STROKE_COLOR}
        scaleX={SCALE}
        scaleY={SCALE}
        strokeWidth={STROKE_WIDTH}
        onClick={onSeatClick}
        onTap={onSeatClick}
        seat={id}
      />
    )
  }
)
AssignedSeat.displayName = 'AssignedSeat'
