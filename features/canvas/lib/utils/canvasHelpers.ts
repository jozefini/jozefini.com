import { RefObject } from 'react'
import Konva from 'konva'
import { getCanvasStore, getAssignedStore } from '@/features/canvas/store'

// Size of the gutter container/ratio around the stage when centering
const GUTTER_RATIO = 0.1

export const hasStageShapes = (stageRef: RefObject<Konva.Stage>) => {
  return !!stageRef.current?.getStage().findOne('Circle')
}

export const centerStage = (
  stageRef: RefObject<Konva.Stage>,
  containerRef: RefObject<HTMLDivElement>
) => {
  if (!stageRef.current || !containerRef.current) {
    return
  }

  const { setState } = getCanvasStore()
  const newSize = {
    width: containerRef.current.offsetWidth,
    height: containerRef.current.offsetHeight,
  }

  const stage = stageRef.current.getStage()
  const clientRect = stage.getClientRect({ skipTransform: true })

  const scaleToFitWidth = newSize.width / clientRect.width
  const scaleToFitHeight = newSize.height / clientRect.height
  const scaleToFit =
    Math.min(scaleToFitWidth, scaleToFitHeight) * (1 - GUTTER_RATIO)
  const fitPosition = {
    x:
      (newSize.width - clientRect.width * scaleToFit) / 2 +
      (newSize.width * GUTTER_RATIO) / 4,
    y:
      (newSize.height - clientRect.height * scaleToFit) / 2 +
      (newSize.height * GUTTER_RATIO) / 2,
  }

  stage.scale({ x: scaleToFit, y: scaleToFit })
  stage.position(fitPosition)
  stage.width(newSize.width)
  stage.height(newSize.height)

  getAssignedStore().setState({ previewId: '', hoveredId: '' })
  setState({
    size: newSize,
    scale: scaleToFit,
    scaleToFit,
    position: fitPosition,
    stageSize: {
      width: clientRect.width,
      height: clientRect.height,
    },
  })
}

export const dragBoundFunc = (pos: {
  x: number
  y: number
}): { x: number; y: number } => {
  const { size, stageSize, scale } = getCanvasStore()

  pos.x = Math.min(
    size.width / 2,
    Math.max(pos.x, -stageSize.width * scale + size.width / 2)
  )
  pos.y = Math.min(
    size.height / 2,
    Math.max(pos.y, -stageSize.height * scale + size.height / 2)
  )
  return pos
}

export const onMouseMoveShowHovered = (
  e: Konva.KonvaEventObject<MouseEvent>
) => {
  const seat = e.target.attrs.seat
  const stage = e.target.getStage() as Konva.Stage
  const { hoveredId, setState } = getAssignedStore()
  if (seat) {
    const { x, y } = e.target.getAbsolutePosition()
    stage.container().style.cursor = 'pointer'
    setState({ hoveredId: seat, hoveredX: x, hoveredY: y })
  } else if (hoveredId) {
    stage.container().style.cursor = 'default'
    setState({ hoveredId: '' })
  }
}

export const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
  const { setState } = getAssignedStore()
  setState({ previewId: '', hoveredId: '' })

  if (getCanvasStore().touchCount > 1) {
    e.target?.getStage()?.draggable(false)
  }
}

export const handleDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
  e.target?.getStage()?.draggable(true)
}

export const onCanvasClick = (evt: any) => {
  const isSeat = evt.target.attrs.seat
  if (!isSeat) {
    getAssignedStore().setState({ previewId: '', hoveredId: '' })
  }
}
