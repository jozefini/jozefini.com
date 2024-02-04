'use client'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const CreateSeatMap = dynamic(
  () => import('@/seatmap/create-seatmap').then(s => s.CreateSeatMap),
  {
    ssr: false,
  }
)

export default function Page() {
  const [thousands, setThousands] = useState<number>(5)
  const handleChange = (value: number) => {
    const max = 10
    const min = 1
    if (value > max || value < min || isNaN(value) || !value) {
      return
    }
    setThousands(value)
  }
  const add = () => {
    handleChange(thousands + 1)
  }
  const sub = () => {
    handleChange(thousands - 1)
  }

  return (
    <>
      <CreateSeatMap thousands={thousands} />
      <div className="absolute bottom-0 right-0 px-2 py-2 bg-white">
        <strong className="text-xs leading-none text-gray-500">
          Thousands:
        </strong>
        <div>
          <button
            className="size-6 inline-flex items-center justify-center bg-blue-500 text-white"
            onClick={sub}
          >
            -
          </button>
          <span className="inline-flex justify-center items-center mx-1 w-5 text-center">
            {thousands}
          </span>
          <button
            className="size-6 inline-flex items-center justify-center bg-blue-500 text-white"
            onClick={add}
          >
            +
          </button>
        </div>
      </div>
    </>
  )
}
