'use client'

import { Table } from '@/ui/table'
import { DataTableBody } from './body'
import { DataTableHead } from './head'
import { DataTableContext } from './lib/context'
import { DataTable } from './lib/types'

export function DataTable(props: DataTable) {
  return (
    <div className="rounded-md border grid">
      <DataTableContext.Provider value={props}>
        <Table>
          <DataTableHead />
          <DataTableBody />
        </Table>
      </DataTableContext.Provider>
    </div>
  )
}
