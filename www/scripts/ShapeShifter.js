import PIXI from '../libraries/PIXI.js'

import Component from './Component.js'

export default class ShapeShifter extends Component {
  constructor (shapeShifter, position) {
    super(shapeShifter, position)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(2, 0x0000FF)
    this.pixiGraphics.arc(0, 0, this.properties.radius, Math.PI, 2 * Math.PI)
    this.pixiGraphics.lineTo(
      this.properties.radius,
      this.properties.shapeKey * this.properties.height
    )
    this.pixiGraphics.arc(
      0,
      this.properties.shapeKey * this.properties.height,
      this.properties.radius,
      0, Math.PI)
    this.pixiGraphics.lineTo(
      -this.properties.radius,
      0
    )
    this.pixiGraphics.endFill()
  }

  updateHitArea () {
    this.pixiGraphics.hitArea = new PIXI.RoundedRectangle(
      -this.properties.radius,
      -this.properties.radius,
      2 * this.properties.radius,
      this.properties.shapeKey * this.properties.height + 2 * this.properties.radius,
      this.properties.radius
    )
  }
}
