'use client'

import { Layer, Stage } from 'react-konva'
import { Seat } from '@/seatmap/components/seat'
import { Row } from './components/row'

export function CreateSeatMap() {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
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
