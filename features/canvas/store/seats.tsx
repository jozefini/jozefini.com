'use client'

import { StoreSeat } from '@/features/canvas/lib/types'
import { MapStore } from './mapStore'

export const {
  getMapItem: getSeat,
  getMapKeys: getSeatKeys,
  useMapItem: useSeat,
  useMapKeys: useSeatKeys,
  setMapItem: setSeat,
  updateMapItem: updateSeat,
  deleteMapItem: deleteSeat,
  clearMap: deleteAllSeats,
} = new MapStore<StoreSeat>()
