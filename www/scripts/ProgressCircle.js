import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class ProgressCircle extends Component {
  constructor (position, { radius = 30, progress = 0 } = {}) {
    super(position)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

    this.properties = { radius, progress }
  }

  setProgress (progress) {
    return PopMotion.spring({
      from: this.properties,
      to: { ...this.properties, progress },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(p => { this.properties = p; this.update() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0x888800)
    this.pixiGraphics.drawCircle(0, 0, this.properties.radius)
    this.pixiGraphics.drawCircle(0, 0, this.properties.radius - 10)

    // this.pixiGraphics.beginFill(1, 0xAAAA00)
    this.pixiGraphics.lineStyle(10, 0xBBBB00)
    // this.pixiGraphics.arc(0, 0, 25, 0, Math.PI)
    this.pixiGraphics.arc(0, 0, this.properties.radius - 5, 0, this.properties.progress * (Math.PI * 2))
    // this.pixiGraphics.endFill()
  }

  updateHitArea () {
    this.pixiGraphics.hitArea = new PIXI.Circle(0, 0, this.properties.radius)
  }
}
