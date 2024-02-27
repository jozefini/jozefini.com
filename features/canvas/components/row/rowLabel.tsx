'use client'

import { memo, useMemo } from 'react'
import { Text } from 'react-konva'
import { RowLabelAt } from '@/features/canvas/lib/enums'
import {
  ROW_GAP_OFFSET,
  SEAT_INNER_SIZE,
} from '@/features/canvas/lib/constants'
import {
  getDynamicIndex,
  getStartDepthIndex,
  getRowSeatCoords,
} from '@/features/canvas/lib/utils'
import { useSectionContext } from '@/features/canvas/components/section'

const fontSize = SEAT_INNER_SIZE * 0.8

const Label = memo(
  ({
    index,
    rowIndex,
    number,
    curveDegree,
    reverseX,
    maxRowSeats,
    isEnd,
  }: {
    index: number
    rowIndex: number
    number: number
    curveDegree: number
    reverseX: boolean
    maxRowSeats: number
    isEnd?: boolean
  }) => {
    const { x, y } = getRowSeatCoords({
      curveDegree,
      reverseX,
      seatIndex: index,
      maxRowSeats,
      shape: 'perfect',
      addRadius: true,
    })

    const reducedGapX = fontSize / 4
    const isNormal = index === -1 || index === maxRowSeats
    const reducedGapY = isNormal ? fontSize * 0.85 : fontSize * -0.4
    const posY = rowIndex === 0 ? y : rowIndex * ROW_GAP_OFFSET + y
    const posX = isEnd ? x - reducedGapX : x + reducedGapX
    const text = number.toString()
    const textLength = text.length
    const charWidth = fontSize / 2 // Adjust based on your font size

    return (
      <Text
        x={isEnd ? posX : posX - textLength * charWidth}
        y={posY + reducedGapY}
        text={text}
        fontSize={fontSize}
        fill="black"
        fontStyle="700"
        align={isEnd ? 'left' : 'right'}
        verticalAlign="middle"
        listening={false}
      />
    )
  }
)
Label.displayName = 'Label'

export const RowLabel = memo(
  ({
    index,
    number,
    seatIds,
  }: {
    index: number
    number: number
    seatIds: string[]
  }) => {
    const { rowLabels, curveDegree, maxRowSeats, maxRows, reverseY, reverseX } =
      useSectionContext()

    const rowIndex = useMemo(
      () => getDynamicIndex(index, maxRows, reverseY),
      [index, maxRows, reverseY]
    )
    const { firstIndex, lastIndex } = useMemo(() => {
      const { firstIndex, lastIndex } = getStartDepthIndex(seatIds, reverseX)
      return { firstIndex, lastIndex }
    }, [seatIds, reverseX])

    if (rowLabels === RowLabelAt.None) {
      return null
    }

    const isBoth = rowLabels === RowLabelAt.Both
    const hasStart = isBoth || rowLabels === RowLabelAt.Start
    const hasEnd = isBoth || rowLabels === RowLabelAt.End

    return (
      <>
        {hasStart && (
          <Label
            index={firstIndex}
            rowIndex={rowIndex}
            number={number}
            curveDegree={curveDegree}
            reverseX={reverseX}
            maxRowSeats={maxRowSeats}
          />
        )}
        {hasEnd && (
          <Label
            index={lastIndex}
            rowIndex={rowIndex}
            number={number}
            curveDegree={curveDegree}
            reverseX={reverseX}
            maxRowSeats={maxRowSeats}
            isEnd={true}
          />
        )}
      </>
    )
  }
)
RowLabel.displayName = 'RowLabel'
