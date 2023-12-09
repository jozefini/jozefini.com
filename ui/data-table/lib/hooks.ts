import { useContext } from 'react'
import { DataTableContext } from './context'

export function useDataTable() {
  const ctx = useContext(DataTableContext)
  if (!ctx) {
    throw new Error(
      'useDataTable must be used within DataTableContext.Provider'
    )
  }

  return ctx
}
