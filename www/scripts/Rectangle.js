import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class Rectangle extends Component {
  constructor (position, { width, height }) {
    super(position)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

    this.rectangle = { width, height }
  }

  setWidth (width) {
    return PopMotion.spring({
      from: this.rectangle.width,
      to: width,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.rectangle.width = v; this.update() })
  }

  setHeight (height) {
    return PopMotion.spring({
      from: this.rectangle.height,
      to: height,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.rectangle.height = v; this.update() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF00FF)
    this.pixiGraphics.drawRect(
      -this.rectangle.width / 2, -this.rectangle.height / 2,
      this.rectangle.width, this.rectangle.height
    )
    // this.pixiGraphics.endFill()

    this.pixiGraphics.hitArea = new PIXI.Rectangle(
      -this.rectangle.width / 2, -this.rectangle.height / 2,
      this.rectangle.width, this.rectangle.height
    )
  }
}
