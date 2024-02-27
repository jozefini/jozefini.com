'use client'

import { StoreRow } from '@/features/canvas/lib/types'
import { MapStore } from './mapStore'

export const {
  getMapItem: getRow,
  getMapKeys: getRowKeys,
  useMapItem: useRow,
  useMapKeys: useRowKeys,
  setMapItem: setRow,
  updateMapItem: updateRow,
  deleteMapItem: deleteRow,
  clearMap: deleteAllRows,
} = new MapStore<StoreRow>()
