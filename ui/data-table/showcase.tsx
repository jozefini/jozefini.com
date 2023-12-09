'use client'

import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { DataTable } from './data-table'

export function Showcase() {
  const now = useMemo(() => dayjs(), [])
  const [selected, setSelected] = useState<dayjs.Dayjs[]>()

  return (
    <div className="flex justify-center pt-64 w-screen h-screen">
      <div>
        <DataTable
          columns={[
            {
              id: 'order',
              label: 'ID',
            },
            {
              id: 'name',
              label: 'Name',
            },
            {
              id: 'age',
              label: 'Age',
              sortable: true,
            },
            {
              id: 'email',
              label: 'Email',
              sortable: true,
            },
          ]}
          data={[
            {
              order: 'TASK-8782',
              name: 'John Doe',
              age: 30,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8783',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8784',
              name: 'John Doe',
              age: 30,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8785',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8785',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8785',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8785',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
            {
              order: 'TASK-8785',
              name: 'Jane Doe',
              age: 25,
              email: 'info@gmail.com',
            },
          ]}
        />
      </div>
    </div>
  )
}
