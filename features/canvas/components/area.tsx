'use client'

import { createContext, memo, useContext } from 'react'
import { useArea, useAreaKeys } from '@/features/canvas/store'
import { StoreArea } from '@/features/canvas/lib/types'
import { Section } from '@/features/canvas/components/section'

const AreaContext = createContext<StoreArea & { index: number }>({
  id: '',
  index: 0,
  name: '',
  sectionIds: [],
})
export const useAreaContext = () => useContext(AreaContext)

export const Area = memo(({ id, index }: { id: string; index: number }) => {
  const area = useArea(id) as StoreArea

  return (
    <AreaContext.Provider value={{ ...area, index }}>
      {area.sectionIds.map((sectionId: string, i: number) => (
        <Section key={sectionId} id={sectionId} index={i} />
      ))}
    </AreaContext.Provider>
  )
})
Area.displayName = 'Area'

export const Areas = memo(() => {
  const areaIds = useAreaKeys()

  return areaIds.map((areaId: string, i: number) => (
    <Area key={areaId} id={areaId} index={i} />
  ))
})
Areas.displayName = 'Areas'
