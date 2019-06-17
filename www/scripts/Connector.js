import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import * as globals from './globals.js'

export default class Connector {
  constructor () {
    // Bind methods
    this.init = this.init.bind(this)

    // Call init
    this.init()
  }

  init () {
    this.pixiGraphics = new PIXI.Graphics()

    this.properties = {
      offset: { x: 0, y: 0 }
    }
  }

  setOffset (offset) {
    // console.log(
    //   {
    //     from: this.properties,
    //     to: { ...this.properties, offset }
    //   }
    // )

    return PopMotion.spring({
      from: this.properties.offset,
      to: offset,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(o => { this.properties.offset = o; this.draw() })
    // return PopMotion.spring({
    //   from: this.properties,
    //   to: { ...this.properties, offset },
    //   //
    //   stiffness: globals.stiffness,
    //   dampening: globals.dampening
    // }).start(p => { this.properties = p; this.draw() })
  }

  draw () {
    this.pixiGraphics.clear()
    this.pixiGraphics.lineStyle(1, 0x00FF00)

    this.pixiGraphics.moveTo(0, 0)
    this.pixiGraphics.bezierCurveTo(
      this.properties.offset.x / 2, 0,
      this.properties.offset.x / 2, this.properties.offset.y,
      this.properties.offset.x, this.properties.offset.y
    )
  }
}
