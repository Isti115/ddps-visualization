import PIXI from '../libraries/PIXI.js'

export default class Connector {
  constructor () {
    this.pixiGraphics = new PIXI.Graphics()
  }

  draw (offset) {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0x00FF00)

    this.pixiGraphics.moveTo(0, 0)
    this.pixiGraphics.bezierCurveTo(
      offset.x / 2, 0,
      offset.x / 2, offset.y,
      offset.x, offset.y
    )
  }
}
