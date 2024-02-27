'use client'

import { useEffect } from 'react'
import { getCanvasStore } from '@/features/canvas/store'

export const useCountTouches = () => {
  useEffect(() => {
    const handleTouchStart = (e: any) => {
      getCanvasStore().setState({ touchCount: e.touches.length })
    }
    window.addEventListener('touchstart', handleTouchStart, false)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
    }
  }, [])
}
