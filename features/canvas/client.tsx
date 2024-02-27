'use client'

import { memo, useEffect } from 'react'
import { Canvas } from '@/features/canvas/components/canvas'
import { getOrderStore } from '@/features/order/store/useOrderStore'
import { getSeatMapStore } from '@/features/canvas/store/useSeatMapStore'
import { getAssignedSeatMap } from '@/api/services/getEvent'
import { importSeatMap } from '@/features/canvas/lib/importHelpers'
import { getCanvasStore } from './store/useCanvasStore'
import { getAreaKeys } from './store'

const SeatMapClient = memo(() => {
  useEffect(() => {
    const { isLoading } = getCanvasStore()
    if (isLoading) {
      return
    }

    const { eventId, mapId } = getOrderStore()
    if (!eventId || !mapId) {
      return
    }

    if (getAreaKeys().length > 0) {
      return
    }

    getCanvasStore().setState({ isLoading: true })

    getAssignedSeatMap(eventId, mapId)
      .then(({ seatMap, assignedSeats }) => {
        importSeatMap(seatMap, assignedSeats)
      })
      .finally(() => {
        getCanvasStore().setState({ isLoading: false })
      })
  }, [])

  return <Canvas />
})
SeatMapClient.displayName = 'SeatMapClient'

export default SeatMapClient
