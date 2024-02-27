'use client'

import { createContext, memo, useContext } from 'react'
import { Group } from 'react-konva'
import { useSection } from '@/features/canvas/store'
import { StoreSection } from '@/features/canvas/lib/types'
import { RowLabelAt } from '@/features/canvas/lib/enums'
import { getSectionSize } from '@/features/canvas/lib/utils'
import { Row } from '@/features/canvas/components/row'

const SectionContext = createContext<StoreSection & { index: number }>({
  id: '',
  index: 0,
  areaId: '',
  countSpaces: false,
  curveDegree: 0,
  maxRowSeats: 0,
  maxRows: 0,
  reverseX: false,
  reverseY: false,
  rotateDegree: 0,
  rowIds: [],
  rowLabels: RowLabelAt.Both,
  startingRow: 1,
  startingSeat: 1,
  x: 0,
  y: 0,
})
export const useSectionContext = () => useContext(SectionContext)

export const Section = memo(({ id, index }: { id: string; index: number }) => {
  const section = useSection(id) as StoreSection
  const { rowIds, rotateDegree, x, y } = section
  const { width, height, offsetX, offsetY } = getSectionSize(section)

  return (
    <SectionContext.Provider value={{ ...section, index }}>
      <Group
        x={x + offsetX}
        y={y + offsetY}
        offsetX={offsetX}
        offsetY={offsetY}
        width={width}
        height={height}
        rotation={rotateDegree}
        section={id}
      >
        {rowIds.map((rowId, i) => (
          <Row key={i} id={rowId} index={i} />
        ))}
      </Group>
    </SectionContext.Provider>
  )
})
Section.displayName = 'Section'
