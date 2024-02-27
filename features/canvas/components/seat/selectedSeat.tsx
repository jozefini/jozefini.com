'use client'

import { memo, useMemo } from 'react'
import { Circle, Group, Text } from 'react-konva'
import {
  SEAT_INNER_RADIUS,
  SEAT_SIZE,
  SEAT_STROKE_WIDTH,
} from '@/features/canvas/lib/constants'
import { onSeatClick } from '@/features/canvas/lib/handlers'
import { adjustColorLight } from '@/features/canvas/lib/utils'

const SCALE = 1.5
const STROKE_WIDTH = SEAT_STROKE_WIDTH
const FILL_COLOR = '#fff'
const CHECKMARK_UNICODE = '\u2713'

export const SelectedSeat = memo(
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
    const { borderFill, checkFill } = useMemo(
      () => ({
        borderFill: adjustColorLight(seatColor || '', 20),
        checkFill: adjustColorLight(seatColor || '', -20),
      }),
      [seatColor]
    )

    return (
      <Group x={x} y={y}>
        <Circle
          radius={SEAT_SIZE}
          fill={borderFill}
          listening={false}
          opacity={0.7}
        />
        <Circle
          radius={SEAT_INNER_RADIUS}
          fill={FILL_COLOR}
          stroke={seatColor}
          scaleX={SCALE}
          scaleY={SCALE}
          strokeWidth={STROKE_WIDTH}
          onClick={onSeatClick}
          onTap={onSeatClick}
          seat={id}
        />
        <Text
          text={CHECKMARK_UNICODE}
          fontSize={12}
          fill={checkFill}
          align="center"
          verticalAlign="middle"
          fontStyle="700"
          listening={false}
          x={-5}
          y={-5}
        />
      </Group>
    )
  }
)
SelectedSeat.displayName = 'SelectedSeat'
