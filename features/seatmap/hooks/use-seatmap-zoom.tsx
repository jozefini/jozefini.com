'use client'

import { Vector2d } from 'konva/lib/types'
import { useCallback, useState } from 'react'

type ZoomProps = {
  minScale?: number
  maxScale?: number
}

export function useSeatMapZoom(props?: ZoomProps) {
  const { minScale = 0.2, maxScale = 5 } = props || {}

  const [scale, setScale] = useState<number>(1)
  const [position, setPosition] = useState<Vector2d>({ x: 0, y: 0 })

  const handleWheel = useCallback(
    (e: any) => {
      e.evt.preventDefault()

      const stage = e.target.getStage()
      const oldScale = stage.scaleX()

      const pointerPosition = stage.getPointerPosition()
      const mousePointTo = {
        x: (pointerPosition.x - stage.x()) / oldScale,
        y: (pointerPosition.y - stage.y()) / oldScale,
      }

      let newScale = e.evt.deltaY > 0 ? oldScale * 1.1 : oldScale / 1.1
      if (newScale > maxScale) {
        newScale = maxScale
      } else if (newScale < minScale) {
        newScale = minScale
      }

      stage.scale({ x: newScale, y: newScale })

      const newPos = {
        x: pointerPosition.x - mousePointTo.x * newScale,
        y: pointerPosition.y - mousePointTo.y * newScale,
      }

      stage.position(newPos)
      stage.batchDraw()

      setScale(newScale)
      setPosition(newPos)
    },
    [minScale, maxScale]
  )

  return { scale, position, handleWheel }
}
