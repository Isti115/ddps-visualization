import PIXI from '../libraries/PIXI.js'

import Component from './Component.js'

export default class Circle extends Component {
  constructor (position, { radius }) {
    super(position, { radius })

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

    // this.properties = { radius }
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF0000)
    this.pixiGraphics.drawCircle(0, 0, this.properties.radius)
    // this.pixiGraphics.endFill()

    this.pixiGraphics.hitArea = new PIXI.Circle(0, 0, this.properties.radius)
  }
}
