import Konva from 'konva'

// Create layer
class CanvasStore {
  private shapes = new Map<string, any>()
  private layer?: Konva.Layer
  private stage?: Konva.Stage

  get(id: string) {
    return this.shapes.get(id)
  }
  add(id: string, instance: any) {
    if (this.shapes.has(id)) {
      return
    }
    this.shapes.set(id, instance)
  }
  remove(id: string) {
    this.shapes.delete(id)
  }
  count() {
    return this.shapes.size
  }
  setLayer(layer: Konva.Layer) {
    this.layer = layer
  }
  getLayer() {
    return this.layer as Konva.Layer
  }
  setStage(stage: Konva.Stage) {
    this.stage = stage
  }
  getStage() {
    return this.stage as Konva.Stage
  }
  init(containerId: string) {
    const container = document.getElementById(containerId)
    if (!container) {
      return
    }

    this.stage = new Konva.Stage({
      container: containerId,
      width: window.innerWidth,
      height: window.innerHeight,
    })
    this.layer = new Konva.Layer()
    this.stage.add(this.layer)
  }
  destroy() {
    this.shapes.clear()
    this.layer?.destroy()
    this.stage?.destroy()
  }
}
export const Canvas = new CanvasStore()
