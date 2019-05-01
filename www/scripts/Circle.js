import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class Circle extends Component {
  constructor (position, { radius }) {
    super(position)

    this.circle = { radius }
  }

  setRadius (radius) {
    return PopMotion.spring({
      from: this.circle,
      to: { radius },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.circle = v; this.draw() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF0000) // (thickness, color)
    this.pixiGraphics.drawCircle(0, 0, this.circle.radius) // (x,y,radius)
    this.pixiGraphics.endFill()
  }
}
