import { useMemo } from 'react'
import { useDataTable } from './index'
import { DataTableColumn } from './lib/types'
import { TableBody, TableCell, TableRow } from '../table'

const DefaultCellRender = (props: { value: string }) => {
  if (typeof props.value === 'string' || typeof props.value === 'number') {
    return <span>{props.value}</span>
  }
  return null // Can't render non-string values
}

const BodyCell = (props: { value: string; column: DataTableColumn }) => {
  const { value, column } = props
  const CellRender = useMemo(
    () => column.render || DefaultCellRender,
    [column.render]
  )
  return <CellRender value={value} column={column} />
}

export function DataTableBody() {
  const { columns, data } = useDataTable()

  return (
    <TableBody>
      {data.map((row, index) => (
        <TableRow key={index}>
          {columns.map(column => (
            <TableCell key={column.id}>
              <BodyCell
                key={column.id}
                value={row[column.id]}
                column={column}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  )
}
