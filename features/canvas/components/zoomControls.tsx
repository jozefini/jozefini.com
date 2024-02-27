import Konva from 'konva'
import { Button } from '@/ui/v2/button'
import { GripHorizontal, Minus, Plus } from 'lucide-react'
import { centerStage, zoomIn, zoomOut } from '@/features/canvas/lib/utils'
import { RefObject } from 'react'

const styles = {
  wrapper: 'flex flex-col gap-y-2 absolute left-1 bottom-2',
  btn: 'rounded-full bg-white shadow-md group',
  icon: 'w-5 h-5 group-hover:text-black text-gray-500',
}

export const ZoomControls = ({
  stageRef,
  containerRef,
}: {
  stageRef: RefObject<Konva.Stage>
  containerRef: RefObject<HTMLDivElement>
}) => {
  const handleZoomIn = () => {
    zoomIn(stageRef)
  }
  const handleZoomOut = () => {
    zoomOut(stageRef)
  }
  const handleZoomReset = () => {
    centerStage(stageRef, containerRef)
  }

  return (
    <div className={styles.wrapper}>
      <Button
        size="canvasIcon"
        variant="unstyled"
        className={styles.btn}
        onClick={handleZoomIn}
      >
        <Plus className={styles.icon} />
      </Button>

      <Button
        size="canvasIcon"
        variant="unstyled"
        className={styles.btn}
        onClick={handleZoomOut}
      >
        <Minus className={styles.icon} />
      </Button>

      <Button
        size="canvasIcon"
        variant="unstyled"
        className={styles.btn}
        onClick={handleZoomReset}
      >
        <GripHorizontal className={styles.icon} />
      </Button>
    </div>
  )
}
