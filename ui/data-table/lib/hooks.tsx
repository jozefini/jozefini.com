'use client'

import { useContext, useMemo } from 'react'
import { DataTableContext } from './context'
import { DataTableProps } from './types'

export function useDataTable() {
  const ctx = useContext(DataTableContext)
  if (!ctx) {
    throw new Error(
      'useDataTable must be used within DataTableContext.Provider'
    )
  }

  return ctx
}

export function useDataTableFilters(props: DataTableProps) {
  const { columns: baseColumns } = props
  const columns = useMemo(() => {
    return baseColumns
  }, [baseColumns])

  return {
    ...props,
    columns,
  }
}
