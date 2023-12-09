export type DataTable = {
  columns: DataTableColumn[]
  data: any[]
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
  order?: string[]
  isRtl?: boolean
}
export type DataTableRenderProps = {
  value: any
  column: DataTableColumn
}
export type DataTableRender = React.ComponentType<DataTableRenderProps>
export type DataTableColumn = {
  id: string
  label?: string
  sortable?: boolean
  render?: DataTableRender
  colspan?: number
}
export type DataTableSort = {
  sortBy: string
  sortDirection: 'asc' | 'desc'
}
export type DataTablePagination = {
  page: number
  pageSize: number
  total: number
}
