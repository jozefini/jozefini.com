import { TableHead, TableHeader, TableRow } from '@/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useDataTable } from './lib/hooks'
import { DataTableColumn } from './lib/types'
import { AscIcon, DescIcon, SortIcon } from './icons'

const Cell = (props: DataTableColumn) => {
  const { isRtl } = useDataTable()
  const { sortable, label } = props
  if (!label) {
    return null
  }

  return (
    <div className="flex items-center space-x-2">
      {sortable ? (
        <DropdownMenu dir={isRtl ? 'rtl' : 'ltr'}>
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
            <DropdownMenuItem>
              <AscIcon />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem>
              <DescIcon />
              Desc
            </DropdownMenuItem>
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
