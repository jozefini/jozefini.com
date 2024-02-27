import { RefObject } from 'react'
import Konva from 'konva'
import { getCanvasStore } from '@/features/canvas/store/useCanvasStore'
import { dragBoundFunc } from '@/features/canvas/lib/utils'
import { getAssignedStore } from '@/features/canvas/store'

// Min and max zoom
const MIN_ZOOM = 0.1
const MAX_ZOOM = 2

// Zoom power
const WHEEL_ZOOM_POWER = 1.2
const BUTTON_ZOOM_POWER = 1.4

// States
let lastCenter: Position | null = null
let lastDist = 0
let dragStopped = false

type Event = {
  evt: {
    deltaY: number
  }
}
type Position = {
  x: number
  y: number
}
type Size = {
  width: number
  height: number
}

// Helper function to calculate center point
const calculateCenterPoint = (size: Size): Position => {
  return {
    x: size.width / 2,
    y: size.height / 2,
  }
}

// Zoom handler
const zoomCanvas = (stageRef: RefObject<Konva.Stage>, isZoomIn: boolean) => {
  if (!stageRef.current) return
  const stage = stageRef.current.getStage()
  const oldScale = stage.scaleX()

  const centerPoint = calculateCenterPoint(getCanvasStore().size)
  const mousePointTo = {
    x: (centerPoint.x - stage.x()) / oldScale,
    y: (centerPoint.y - stage.y()) / oldScale,
  }

  const newScale = calculateNewScale(
    { evt: { deltaY: isZoomIn ? 1 : -1 } },
    oldScale,
    BUTTON_ZOOM_POWER,
    MIN_ZOOM,
    MAX_ZOOM
  )
  stage.scale({ x: newScale, y: newScale })

  const { size, stageSize, scale } = getCanvasStore()
  const newPos = calculateNewPosition(
    centerPoint,
    mousePointTo,
    newScale,
    size,
    stageSize,
    scale
  )

  stage.position(newPos)
  stage.batchDraw()

  getAssignedStore().setState({ previewId: '', hoveredId: '' })
  getCanvasStore().setState({
    scale: newScale,
    position: newPos,
  })
}

// Helper function to calculate new scale
const calculateNewScale = (
  e: Event,
  oldScale: number,
  zoomFactor: number,
  minScale: number,
  maxScale: number
): number => {
  let newScale =
    e.evt.deltaY > 0 ? oldScale * zoomFactor : oldScale / zoomFactor
  if (newScale > maxScale) {
    newScale = maxScale
  } else if (newScale < minScale) {
    newScale = minScale
  }
  return newScale
}

// Helper function to calculate new position
const calculateNewPosition = (
  pointerPosition: Position,
  mousePointTo: Position,
  newScale: number,
  size: Size,
  stageSize: Size,
  scale: number
): Position => {
  let newPos: Position = {
    x: pointerPosition.x - mousePointTo.x * newScale,
    y: pointerPosition.y - mousePointTo.y * newScale,
  }

  newPos.x = Math.min(
    size.width / 2,
    Math.max(newPos.x, -stageSize.width * scale + size.width / 2)
  )
  newPos.y = Math.min(
    size.height / 2,
    Math.max(newPos.y, -stageSize.height * scale + size.height / 2)
  )
  return newPos
}

// Zoom on mouse wheel
export const zoomOnWheel = (e: any) => {
  e.evt.preventDefault()
  const stage = e.target.getStage()
  const oldScale = stage.scaleX()

  const pointerPosition = stage.getPointerPosition()
  const mousePointTo = {
    x: (pointerPosition.x - stage.x()) / oldScale,
    y: (pointerPosition.y - stage.y()) / oldScale,
  }

  // Invert the deltaY value
  const newScale = calculateNewScale(
    { evt: { deltaY: -e.evt.deltaY } },
    oldScale,
    WHEEL_ZOOM_POWER,
    MIN_ZOOM,
    MAX_ZOOM
  )
  stage.scale({ x: newScale, y: newScale })

  const { size, stageSize, scale } = getCanvasStore()
  const newPos = calculateNewPosition(
    pointerPosition,
    mousePointTo,
    newScale,
    size,
    stageSize,
    scale
  )

  stage.position(newPos)
  stage.batchDraw()

  getAssignedStore().setState({ previewId: '', hoveredId: '' })
  getCanvasStore().setState({
    scale: newScale,
    position: newPos,
  })
}

// Zoom in handler
export const zoomIn = (stageRef: RefObject<Konva.Stage>) => {
  zoomCanvas(stageRef, true)
}

// Zoom out handler
export const zoomOut = (stageRef: RefObject<Konva.Stage>) => {
  zoomCanvas(stageRef, false)
}

const getTouchDistance = (p1: Position, p2: Position) => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2))
}

const getTouchCenter = (p1: Position, p2: Position) => {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  }
}

// Zoom on touch
export const zoomOnTouch = (e: any) => {
  e.evt.preventDefault()
  const touchCount = getCanvasStore().touchCount
  const touch1 = e.evt.touches[0]
  const touch2 = e.evt.touches[1]
  const stage = e.target.getStage()

  // Total touches,

  // we need to restore dragging, if it was cancelled by multi-touch
  if (touch1 && !touch2 && !stage.isDragging() && dragStopped) {
    stage.startDrag()
    dragStopped = false
  }

  if (touchCount > 1 && touch1 && touch2) {
    // if the stage was under Konva's drag&drop
    // we need to stop it, and implement our own pan logic with two pointers
    if (stage.isDragging()) {
      dragStopped = true
      stage.stopDrag()
      stage.dragging(false)
    }

    const p1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    }
    const p2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    }

    if (!lastCenter) {
      lastCenter = getTouchCenter(p1, p2)
      return
    }
    const newCenter = getTouchCenter(p1, p2)
    const dist = getTouchDistance(p1, p2)
    if (!lastDist) {
      lastDist = dist
    }

    // local coordinates of center point
    const pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    }

    let scale = stage.scaleX() * (dist / lastDist)
    // Apply the min and max zoom limits
    if (scale > MAX_ZOOM) {
      scale = MAX_ZOOM
    } else if (scale < MIN_ZOOM) {
      scale = MIN_ZOOM
    }

    stage.scaleX(scale)
    stage.scaleY(scale)

    // calculate new position of the stage
    const dx = newCenter.x - lastCenter.x
    const dy = newCenter.y - lastCenter.y

    let newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    }

    // Apply the dragBoundFunc to limit the new position within the bounds
    newPos = dragBoundFunc(newPos)

    stage.position(newPos)

    lastDist = dist
    lastCenter = newCenter

    getAssignedStore().setState({ previewId: '', hoveredId: '' })
    getCanvasStore().setState({
      scale: scale,
      position: newPos,
    })
  }
}

// Start zoom on touch
export const startZoomOnTouch = () => {
  lastDist = 0
  lastCenter = null
}

// End zoom on touch
export const endZoomOnTouch = (e: any) => {
  e.evt.preventDefault()
  lastDist = 0
  lastCenter = null
}
