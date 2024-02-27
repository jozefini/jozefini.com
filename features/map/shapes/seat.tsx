import Konva from 'konva'
import { Canvas } from '../stores/canvas'

export class Seat {
  private circle: Konva.Circle

  constructor(id: string, x: number, y: number, number: number) {
    this.circle = new Konva.Circle({
      x,
      y,
      radius: 10,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
    })
    Canvas.add(id, this)
  }

  destroy() {
    this.circle.destroy()
  }
}
