'use client'

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DataTableProps, DataTableColumn, DataTableFilters } from './types'

type DataTableActions = {
  setColumns: Dispatch<SetStateAction<DataTableColumn[]>>
  setFilters: Dispatch<SetStateAction<Partial<DataTableFilters>>>
}
type DataTableContextValue = DataTableProps & DataTableActions

export const DataTableContext = createContext<
  DataTableContextValue | undefined
>(undefined)

export const DataTableProvider = (
  props: DataTableProps & { children: React.ReactNode }
) => {
  const { columns, data, dir, filters, children } = props
  const [mutableColumns, setColumns] = useState<DataTableColumn[]>(
    props.columns
  )
  const [mutableFilters, setFilters] = useState<
    Partial<DataTableFilters> | undefined
  >(props.filters)

  const newValue = useMemo(() => {
    const { hiddenColumns } = mutableFilters || {}

    // Hide columns
    let filteredColumns = mutableColumns
    if (hiddenColumns) {
      filteredColumns = mutableColumns.filter(
        column => !hiddenColumns.includes(column.id)
      )
    }

    return {
      dir,
      filters,
      columns: filteredColumns,
      data,
      setColumns,
      setFilters,
    } as DataTableContextValue
  }, [mutableColumns, data, mutableFilters])

  // Update when props change
  useEffect(() => {
    setColumns(columns)
  }, [columns])

  return (
    <DataTableContext.Provider value={newValue}>
      {children}
    </DataTableContext.Provider>
  )
}
