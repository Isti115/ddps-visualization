import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class Circle extends Component {
  constructor (position, { radius }) {
    super(position)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

    this.circle = { radius }
  }

  setRadius (radius) {
    return PopMotion.spring({
      from: this.circle,
      to: { radius },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.circle = v; this.update() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF0000)
    this.pixiGraphics.drawCircle(0, 0, this.circle.radius)
    // this.pixiGraphics.endFill()

    this.pixiGraphics.hitArea = new PIXI.Circle(0, 0, this.circle.radius)
  }
}
