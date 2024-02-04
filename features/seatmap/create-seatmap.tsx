'use client'

import { Layer, Stage } from 'react-konva'
import { Row } from '@/seatmap/components/row'
import { useSeatMapZoom } from '@/seatmap/hooks/use-seatmap-zoom'
import { memo, useMemo } from 'react'
import { ROW_GAP } from './lib/constants'

// Create 50 seats in a row
const tenList = Array.from({ length: 10 }, (_, i) => i + 1)

const Block = memo(({ y, x }: { x: number; y: number }) => {
  return tenList.map((row, i) => (
    <Row key={row} x={x} y={y + i * ROW_GAP} index={i} seatIds={tenList} />
  ))
})
Block.displayName = 'Block'
const RowBlocks = memo(({ y }: { y: number }) => {
  return tenList.map((block, i) => <Block key={block} x={i * 240} y={y} />)
})
RowBlocks.displayName = 'RowBlocks'

export const CreateSeatMap = memo(({ thousands }: { thousands?: number }) => {
  const { scale, position, handleWheel } = useSeatMapZoom()
  const blockList = useMemo(() => {
    let _value = 5
    let _thoudsands = thousands ? Number(thousands) : _value
    if (_thoudsands > 10 || _thoudsands < 1 || !_thoudsands) {
      _thoudsands = _value
    }
    return Array.from({ length: _thoudsands }, (_, i) => i + 1)
  }, [thousands])

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={scale}
      scaleY={scale}
      x={position.x}
      y={position.y}
      onWheel={handleWheel}
      draggable
    >
      <Layer>
        {blockList.map((block, i) => (
          <RowBlocks key={block} y={i * 240} />
        ))}
      </Layer>
    </Stage>
  )
})
CreateSeatMap.displayName = 'CreateSeatMap'
