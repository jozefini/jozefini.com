'use client'

import { Layer, Stage } from 'react-konva'
import { Row } from '@/seatmap/components/row'
import { useSeatMapZoom } from '@/seatmap/hooks/use-seatmap-zoom'

export function CreateSeatMap() {
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
        <Row
          x={0}
          y={0}
          seatIds={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          curveDegree={10}
        />
      </Layer>
    </Stage>
  )
}
