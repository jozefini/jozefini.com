import { Dispatch, SetStateAction } from 'react'

export type DataTableProps = {
  columns: DataTableColumn[]
  data: any[]
  filters?: Partial<DataTableFilters>
  onFiltersChange?: Dispatch<SetStateAction<DataTableFilters>>
  dir?: 'ltr' | 'rtl'
}
export type DataTableFilters = {
  hiddenColumns: string[]
  page: number
  totalRows: number
  sortDirection: 'asc' | 'desc'
  sortBy: string
  order: string[]
}
export type DataTableCellRenderProps = {
  value: any
  column: DataTableColumn
}
export type DataTableCellRender = React.ComponentType<DataTableCellRenderProps>
export type DataTableColumn = {
  id: string
  label?: string
  sortable?: boolean
  orderable?: boolean
  hideable?: boolean
  render?: DataTableCellRender
  className?: string
}
