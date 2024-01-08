'use client'

import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { Calendar } from './calendar'

export function Showcase() {
  const now = useMemo(() => dayjs(), [])
  const [selected, setSelected] = useState<dayjs.Dayjs[]>()

  return (
    <div className="flex justify-center pt-64 w-screen h-screen">
      <Calendar month={now} selected={selected} setSelected={setSelected} />
    </div>
  )
}
