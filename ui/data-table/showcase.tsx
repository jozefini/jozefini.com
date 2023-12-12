'use client'

import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { DataTableProvider, DataTable } from './index'
import { DataTableCellRenderProps } from './lib/types'

export function Showcase() {
  const now = useMemo(() => dayjs(), [])
  const [selected, setSelected] = useState<dayjs.Dayjs[]>()

  return (
    <DataTableProvider
      columns={[
        {
          id: 'id',
          label: 'ID',
        },
        {
          id: 'name',
          label: 'Name',
          hideable: true,
          sortable: true,
          orderable: true,
        },
        {
          id: 'age',
          label: 'Age',
          hideable: true,
          sortable: true,
          orderable: true,
        },
        {
          id: 'email',
          label: 'Email',
          hideable: true,
          sortable: true,
          orderable: true,
        },
        {
          id: 'actions',
          label: 'Actions',
        },
      ]}
      data={[
        {
          id: 'TASK-8782',
          name: 'John Doe',
          age: 30,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8783',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8784',
          name: 'John Doe',
          age: 30,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8785',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8785',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8785',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8785',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
        {
          id: 'TASK-8785',
          name: 'Jane Doe',
          age: 25,
          email: 'info@gmail.com',
        },
      ]}
      dir="ltr"
      filters={{
        hiddenColumns: [],
      }}
    >
      <div className="flex justify-center pt-64 w-screen h-screen">
        <div className="mx-auto px-4 max-w-7xl w-full">
          <DataTable />
        </div>
      </div>
    </DataTableProvider>
  )
}
