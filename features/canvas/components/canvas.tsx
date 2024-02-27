'use client'

import Konva from 'konva'
import { memo, useRef } from 'react'
import { Stage, Layer } from 'react-konva'
import { Areas } from '@/features/canvas/components/area'
import { useCanvasStage, useCountTouches } from '@/features/canvas/hooks'
import {
  onCanvasClick,
  zoomOnWheel,
  startZoomOnTouch,
  endZoomOnTouch,
  zoomOnTouch,
  handleDragEnd,
  handleDragStart,
  onMouseMoveShowHovered,
  dragBoundFunc,
} from '@/features/canvas/lib/utils'

const styles = {
  wrapper:
    'min-h-full min-w-full max-w-full max-h-full overflow-hidden relative bg-gray-50',
  stage:
    'max-w-full max-h-full min-h-full min-w-full !absolute !inset-0 [&_canvas]:h-full [&_canvas]:w-full bg-gray-50',
}

export const Canvas = memo(() => {
  const stageRef = useRef<Konva.Stage>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useCountTouches()
  useCanvasStage({
    stageRef: stageRef,
    containerRef,
  })

  return (
    <div ref={containerRef} className={styles.wrapper}>
      <Stage
        className={styles.stage}
        ref={stageRef}
        onClick={onCanvasClick}
        dragBoundFunc={dragBoundFunc}
        onWheel={zoomOnWheel}
        onTouchStart={startZoomOnTouch}
        onTouchMove={zoomOnTouch}
        onTouchEnd={endZoomOnTouch}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseMove={onMouseMoveShowHovered}
        draggable
      >
        <Layer>
          <Areas />
        </Layer>
      </Stage>
    </div>
  )
})
Canvas.displayName = 'Canvas'
