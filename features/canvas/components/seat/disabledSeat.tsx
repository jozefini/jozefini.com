'use client'

import { memo } from 'react'
import { Circle } from 'react-konva'
import {
  DISABLED_SEAT_CIRCLE_FILL,
  SEAT_SIZE,
} from '@/features/canvas/lib/constants'

const SCALE = 0.25

export const DisabledSeat = memo(({ x, y }: { x: number; y: number }) => {
  return (
    <Circle
      x={x}
      y={y}
      radius={SEAT_SIZE}
      fill={DISABLED_SEAT_CIRCLE_FILL}
      scaleX={SCALE}
      listening={false}
      scaleY={SCALE}
    />
  )
})
DisabledSeat.displayName = 'DisabledSeat'
