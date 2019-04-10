import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class ShapeShifter extends Component {
  constructor (position, shapeShifter) {
    super(position)

    this.shapeShifter = shapeShifter
  }

  setShapeKey (shapeKey) {
    return PopMotion.spring({
      from: this.shapeShifter.shapeKey,
      to: shapeKey,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.shapeShifter.shapeKey = v; this.draw() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(2, 0xFF00FF) // (thickness, color)
    this.pixiGraphics.arc(0, 0, this.shapeShifter.radius, Math.PI, 2 * Math.PI)
    this.pixiGraphics.lineTo(
      this.shapeShifter.radius,
      this.shapeShifter.shapeKey * this.shapeShifter.height
    )
    this.pixiGraphics.arc(
      0,
      this.shapeShifter.shapeKey * this.shapeShifter.height,
      this.shapeShifter.radius,
      0, Math.PI)
    this.pixiGraphics.lineTo(
      -this.shapeShifter.radius,
      0
    )
    this.pixiGraphics.endFill()
  }
}
