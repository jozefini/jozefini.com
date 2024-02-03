'use client'

import { Circle, Text, Group } from 'react-konva'
import { SEAT_INNER_SIZE, SEAT_STROKE_WIDTH } from '@/seatmap/lib/constants'
import { memo } from 'react'

type SeatProps = {
  x: number
  y: number
  number: number
}

export const Seat = memo(({ x, y, number }: SeatProps) => {
  const seatText = number.toString()
  const halfStroke = SEAT_STROKE_WIDTH / 4
  const fontSize = SEAT_INNER_SIZE / 2
  const numOffsetX = (fontSize * seatText.length) / 4 + halfStroke
  const numOffsetY = fontSize / 2 - halfStroke
  const radius = SEAT_INNER_SIZE / 2

  return (
    <Group>
      <Circle
        x={x}
        y={y}
        radius={radius}
        fill="gray"
        stroke="black"
        strokeWidth={SEAT_STROKE_WIDTH}
      />
      <Text
        x={x}
        y={y}
        text={seatText}
        fontSize={fontSize}
        fill="white"
        align="center"
        verticalAlign="middle"
        offsetX={numOffsetX}
        offsetY={numOffsetY}
      />
    </Group>
  )
})
Seat.displayName = 'Seat'
