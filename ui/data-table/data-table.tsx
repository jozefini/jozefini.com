'use client'

import { Table } from '@/ui/table'
import { DataTableBody } from './body'
import { DataTableHead } from './head'
import { useDataTable } from './index'

export function DataTable() {
  const ctx = useDataTable()
  if (!ctx) {
    return null
  }

  return (
    <div className="rounded-md w-full border grid">
      <Table>
        <DataTableHead />
        <DataTableBody />
      </Table>
    </div>
  )
}
