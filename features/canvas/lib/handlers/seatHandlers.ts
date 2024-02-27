import { getMediaQuery } from '@/hooks/useMediaQuery'
import { getArea, getRow, getSeat } from '@/features/canvas/store'
import { StoreArea, StoreRow, StoreSeat } from '@/features/canvas/lib/types'

// TODO.
const getAssignedStore = () => ({
  setState: (v: any) => {},
  assigned: {} as any,
})
const getOrderStore = () => ({
  addSeatToCart: (v: any, d: any) => {},
  removeSeatFromCart: (v: any, d: any) => {},
  cartSeats: [] as any,
})

export const onSeatClick = (evt: any) => {
  const { isDesktop } = getMediaQuery()

  const { addSeatToCart, removeSeatFromCart } = getOrderStore()
  const { setState } = getAssignedStore()
  const seatId = evt.target.attrs.seat
  const { x, y } = evt.target.getAbsolutePosition()

  if (!seatId) {
    return
  }

  setState({
    previewId: seatId,
    previewX: x,
    previewY: y,
  })

  if (isDesktop) {
    const cartSeats = getOrderStore().cartSeats
    const isSelected = cartSeats.includes(seatId)
    const ticketId = getAssignedStore().assigned[seatId]

    if (isSelected) {
      removeSeatFromCart(ticketId, seatId)
    } else {
      const { number: seatNumber, areaId, rowId } = getSeat(seatId) as StoreSeat
      const { name: areaName } = getArea(areaId) as StoreArea
      const { number: rowNumber } = getRow(rowId) as StoreRow

      addSeatToCart(ticketId, {
        seatId,
        priceType: '',
        areaId,
        areaName,
        rowNumber,
        seatNumber,
      })
    }
  }
}
