'use client'

import { RefObject, useEffect } from 'react'
import {
  createDebounce,
  createIntervalRetry,
  centerStage,
  hasStageShapes,
} from '@/features/canvas/lib/utils'
import { getCanvasStore } from '@/features/canvas/store'

export function useCanvasStage({
  containerRef,
  stageRef,
}: {
  containerRef: RefObject<HTMLDivElement>
  stageRef: RefObject<any>
}) {
  /**
   * Center stage on mount and resize
   */
  useEffect(() => {
    if (!containerRef.current || !stageRef.current) {
      return
    }

    const retryCenterStage = createIntervalRetry(
      () => centerStage(stageRef, containerRef),
      () => hasStageShapes(stageRef),
      50,
      10000
    )
    const debouncedAdjust = createDebounce(
      () => centerStage(stageRef, containerRef),
      100
    )

    retryCenterStage()
    window.addEventListener('resize', debouncedAdjust)
    window.addEventListener('orientationchange', debouncedAdjust)

    return () => {
      debouncedAdjust.destroy()
      retryCenterStage.destroy()
      window.removeEventListener('resize', debouncedAdjust)
      window.removeEventListener('orientationchange', debouncedAdjust)
    }
  }, [containerRef, stageRef])

  /**
   * Reset store on unmount
   */
  useEffect(() => {
    return () => {
      // Reset store when unmounting, but keep isLoading
      getCanvasStore().resetStore(['isLoading'])
    }
  }, [stageRef])
}
