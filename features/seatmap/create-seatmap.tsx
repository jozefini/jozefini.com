'use client'

import { Layer, Stage } from 'react-konva'
import { Row } from '@/seatmap/components/row'
import { useSeatMapZoom } from '@/seatmap/hooks/use-seatmap-zoom'
import { memo } from 'react'

// Create 50 seats in a row
const seats = Array.from({ length: 100 }, (_, i) => i + 1)
const rows = Array.from({ length: 100 }, (_, i) => i + 1)

export const CreateSeatMap = memo(() => {
  const { scale, position, handleWheel } = useSeatMapZoom()

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
      x={position.x}
      y={position.y}
      onWheel={handleWheel}
      draggable
    >
      <Layer>
        {rows.map((row, i) => (
          <Row key={row} x={0} y={i * 30} index={i} seatIds={seats} />
        ))}
      </Layer>
    </Stage>
  )
})
CreateSeatMap.displayName = 'CreateSeatMap'
