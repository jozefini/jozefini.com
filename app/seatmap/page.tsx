'use client'
import dynamic from 'next/dynamic'

const CreateSeatMap = dynamic(
  () => import('@/seatmap/create-seatmap').then(s => s.CreateSeatMap),
  {
    ssr: false,
  }
)

export default function Page() {
  return <CreateSeatMap />
}
