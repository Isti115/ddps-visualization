import PIXI from '../libraries/PIXI.js'

import Component from './Component.js'

export default class Rectangle extends Component {
  /**
   * Create a rectangle.
   *
   * @param {Object} position
   * @param {Number} position.x
   * @param {Number} position.y
   *
   * @param {Object} properties
   * @param {Number} properties.width
   * @param {Number} properties.height
   */
  constructor (position, properties) {
    super(position, properties)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF00FF)
    this.pixiGraphics.drawRect(
      -this.properties.width / 2, -this.properties.height / 2,
      this.properties.width, this.properties.height
    )

    this.pixiGraphics.hitArea = new PIXI.Rectangle(
      -this.properties.width / 2, -this.properties.height / 2,
      this.properties.width, this.properties.height
    )
  }
}
