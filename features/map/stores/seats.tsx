import { Seat } from '../shapes/seat'

const SeatInstances = new Map<string, Seat>()

class SeatMap extends Map {
  set(id: string, data: any): this {
    if (this.has(id)) {
      return this
    }
    super.set(id, data)

    const instance = new Seat(id, data.x, data.y, data.number)
    SeatInstances.set(id, instance)
    return this
  }
  getInstance(id: string) {
    return SeatInstances.get(id)
  }
  update(id: string, data: any): boolean {
    if (!this.has(id)) {
      return false
    }
    const _data = this.get(id)
    this.set(id, { ..._data, ...data })
    return true
  }
  delete(id: string): boolean {
    const isDeleted = this.has(id) && super.delete(id)
    const instance = SeatInstances.get(id)
    instance?.destroy()
    SeatInstances.delete(id)

    return isDeleted
  }
}
export const Seats = new SeatMap()
