import PIXI from '../libraries/PIXI.js'

import Component from './Component.js'

export default class ProgressCircle extends Component {
  constructor (position, { radius = 30, progress = 0 } = {}) {
    super(position, { radius, progress })

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true
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
