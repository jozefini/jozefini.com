import { TableHead, TableHeader, TableRow } from '@/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useDataTable } from './index'
import { DataTableColumn } from './lib/types'
import {
  AscIcon,
  DescIcon,
  HideIcon,
  MoveBeforeIcon,
  MoveAfterIcon,
  SortIcon,
} from './icons'
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu'
import { useMemo } from 'react'

const styles = {
  separator: 'mx-1 my-1 h-px bg-black/5',
}

const Cell = (props: DataTableColumn) => {
  const { dir, columns, setColumns, setFilters } = useDataTable()
  const { sortable, orderable, hideable, label } = props
  if (!label) {
    return null
  }

  const swapWithOrderable = (currentIndex: number, direction: 1 | -1) => {
    let targetIndex = currentIndex + direction
    const boundary = direction === -1 ? 0 : columns.length - 1

    while (targetIndex !== boundary && !columns[targetIndex].orderable) {
      targetIndex += direction
    }

    if (columns[targetIndex].orderable) {
      const newColumns = [...columns]
      const temp = newColumns[currentIndex]
      newColumns[currentIndex] = newColumns[targetIndex]
      newColumns[targetIndex] = temp
      setColumns(newColumns)
    }
  }

  const handleMoveBefore = () => {
    const currentIndex = columns.findIndex(column => column.id === props.id)
    swapWithOrderable(currentIndex, -1) // Move before
  }

  const handleMoveAfter = () => {
    const currentIndex = columns.findIndex(column => column.id === props.id)
    swapWithOrderable(currentIndex, 1) // Move after
  }

  const hideColumn = () => {
    setFilters(filters => {
      let _filters = filters || {}
      let hiddenColumns = _filters.hiddenColumns || []
      if (!hiddenColumns.includes(props.id)) {
        hiddenColumns.push(props.id)
      }

      return {
        ..._filters,
        hiddenColumns,
      }
    })
  }

  const { hasDrop, prevOrderColumn, nextOrderColumn, hasOrdering } =
    useMemo(() => {
      // Has next column with orderable=true
      let prevOrderColumn = null
      let nextOrderColumn = null
      let currentIndex = columns.findIndex(column => column.id === props.id)
      for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        if (column.orderable && i < currentIndex) {
          prevOrderColumn = true
        }
        if (column.orderable && i > currentIndex) {
          nextOrderColumn = true
          break
        }
      }

      const hasOrdering = orderable && (nextOrderColumn || prevOrderColumn)
      const hasDrop = sortable || hasOrdering || hideable

      return { hasDrop, prevOrderColumn, nextOrderColumn, hasOrdering }
    }, [props])

  return (
    <div className="flex items-center space-x-2">
      {hasDrop ? (
        <DropdownMenu dir={dir ?? 'rtl'}>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 focus-visible:ring-neutral-200 disabled:pointer-events-none disabled:opacity-50 hover:bg-neutral-200/50 hover:text-gray-900 rounded-md px-3 text-xs -ml-3 h-8 data-[state=open]:bg-neutral-200/50"
            >
              <span>{label}</span>
              <SortIcon />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {sortable && (
              <>
                <DropdownMenuItem>
                  <AscIcon />
                  Asc
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <DescIcon />
                  Desc
                </DropdownMenuItem>
              </>
            )}
            {hasOrdering && (
              <>
                {sortable ? (
                  <DropdownMenuSeparator className={styles.separator} />
                ) : null}
                {prevOrderColumn && (
                  <DropdownMenuItem onClick={handleMoveBefore}>
                    <MoveBeforeIcon />
                    Before
                  </DropdownMenuItem>
                )}
                {nextOrderColumn && (
                  <DropdownMenuItem onClick={handleMoveAfter}>
                    <MoveAfterIcon />
                    After
                  </DropdownMenuItem>
                )}
              </>
            )}
            {hideable && (
              <>
                {hideable || sortable ? (
                  <DropdownMenuSeparator className={styles.separator} />
                ) : null}
                <DropdownMenuItem onClick={hideColumn}>
                  <HideIcon />
                  Hide
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span>{label}</span>
      )}
    </div>
  )
}

export function DataTableHead() {
  const { columns } = useDataTable()

  return (
    <TableHeader>
      <TableRow>
        {columns.map(column => (
          <TableHead key={column.id}>
            <Cell {...column} />
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}
