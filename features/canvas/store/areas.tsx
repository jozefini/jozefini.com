'use client'

import { StoreArea } from '@/features/canvas/lib/types'
import { MapStore } from './mapStore'

export const {
  getMapItem: getArea,
  getMapKeys: getAreaKeys,
  useMapItem: useArea,
  useMapKeys: useAreaKeys,
  setMapItem: setArea,
  updateMapItem: updateArea,
  deleteMapItem: deleteArea,
  clearMap: deleteAllAreas,
} = new MapStore<StoreArea>()
