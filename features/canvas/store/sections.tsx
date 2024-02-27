'use client'

import { StoreSection } from '@/features/canvas/lib/types'
import { MapStore } from './mapStore'

export const {
  getMapItem: getSection,
  getMapKeys: getSectionKeys,
  useMapItem: useSection,
  useMapKeys: useSectionKeys,
  setMapItem: setSection,
  updateMapItem: updateSection,
  deleteMapItem: deleteSection,
  clearMap: deleteAllSections,
} = new MapStore<StoreSection>()
