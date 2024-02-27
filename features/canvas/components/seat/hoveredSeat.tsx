'use client'

import { memo, useMemo } from 'react'
import { Circle, Text } from 'react-konva'
import {
  SEAT_INNER_RADIUS,
  SEAT_RADIUS,
  SEAT_SIZE,
  SEAT_STROKE_WIDTH,
} from '@/features/canvas/lib/constants'
import { onSeatClick } from '@/features/canvas/lib/handlers'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const SCALE = 1
const STROKE_WIDTH = SEAT_SIZE / 2
const STROKE_COLOR = '#fafafa'
const EFFECTIVE_RADIUS = SEAT_RADIUS + STROKE_WIDTH / 2

const TEXT_SCALE = 1
const halfStroke = SEAT_STROKE_WIDTH / 4
const numOffsetY = SEAT_INNER_RADIUS / 2 - halfStroke / 2

export const HoveredSeat = memo(
  ({
    id,
    x,
    y,
    number,
    seatColor,
    textColor,
  }: {
    id: string
    x: number
    y: number
    number: number
    seatColor: string
    textColor: string
  }) => {
    const { isDesktop } = useMediaQuery()
    const { seatText, numOffsetX } = useMemo(() => {
      const seatText = number.toString()
      const numOffsetX =
        (SEAT_INNER_RADIUS * seatText.length) / 4 + halfStroke / 4
      return { seatText, numOffsetX }
    }, [number])

    return (
      <>
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
          opacity={0.7}
          seat={id}
        />
        {isDesktop && (
          <Text
            x={x}
            y={y}
            text={seatText}
            fontSize={SEAT_INNER_RADIUS}
            fill={textColor}
            align="center"
            fontStyle="700"
            scaleX={TEXT_SCALE}
            scaleY={TEXT_SCALE}
            verticalAlign="middle"
            offsetX={numOffsetX}
            offsetY={numOffsetY}
            listening={false}
          />
        )}
      </>
    )
  }
)
HoveredSeat.displayName = 'HoveredSeat'
