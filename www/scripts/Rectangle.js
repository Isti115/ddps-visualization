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
      from: this.rectangle,
      to: { ...this.rectangle, width },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.rectangle = v; this.update() })
  }

  setHeight (height) {
    return PopMotion.spring({
      from: this.rectangle,
      to: { ...this.rectangle, height },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.rectangle = v; this.update() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF0000)
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
