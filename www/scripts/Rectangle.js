import PIXI from '../libraries/PIXI.js'
// import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

// import * as globals from './globals.js'

export default class Rectangle extends Component {
  constructor (position, { width, height }) {
    super(position, { width, height })

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

    // this.properties = { width, height }
  }

  // setWidth (width) {
  //   return PopMotion.spring({
  //     from: this.properties.width,
  //     to: width,
  //     //
  //     stiffness: globals.stiffness,
  //     dampening: globals.dampening
  //   }).start(v => { this.properties.width = v; this.update() })
  // }

  // setHeight (height) {
  //   return PopMotion.spring({
  //     from: this.properties.height,
  //     to: height,
  //     //
  //     stiffness: globals.stiffness,
  //     dampening: globals.dampening
  //   }).start(v => { this.properties.height = v; this.update() })
  // }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0xFF00FF)
    this.pixiGraphics.drawRect(
      -this.properties.width / 2, -this.properties.height / 2,
      this.properties.width, this.properties.height
    )
    // this.pixiGraphics.endFill()

    this.pixiGraphics.hitArea = new PIXI.Rectangle(
      -this.properties.width / 2, -this.properties.height / 2,
      this.properties.width, this.properties.height
    )
  }
}
