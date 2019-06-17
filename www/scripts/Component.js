import PopMotion from '../libraries/PopMotion.js'

import * as globals from './globals.js'

export default class Component {
  constructor ({ x = 0, y = 0 } = {}) {
    // Store parameters
    this.position = { x, y }

    // Bind methods
    this.init = this.init.bind(this)
    this.setPosition = this.setPosition.bind(this)
    this.draw = this.draw.bind(this)

    // Call init
    this.init()
  }

  init () {
    this.pixiContainer = new PIXI.Container()
    this.pixiContainer.position.set(this.position.x, this.position.y)

    this.pixiGraphics = new PIXI.Graphics()
    this.pixiContainer.addChild(this.pixiGraphics)

    this.children = []
  }

  setPosition (position) {
    return PopMotion.spring({
      from: this.position,
      to: position,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => {
      this.pixiContainer.position.set(v.x, v.y)
      this.position = v
    })
  }

  draw () {

  }

  addChild (child) {
    this.children = [...this.children, child]
    this.pixiContainer.addChild(child.pixiContainer)
  }

  getLayout () {
    const localBounds = this.pixiGraphics.getLocalBounds()

    return ({
      size: [
        localBounds.height + 10,
        localBounds.width
      ],
      children: this.children.map(c => c.getLayout())
    })
    // return ({
    //   size: [
    //     localBounds.width,
    //     localBounds.height + 10
    //   ],
    //   children: this.children.map(c => c.getLayout())
    // })
  }

  setLayout (layout) {
    this.children.forEach((c, i) => {
      c.setPosition({
        x: layout.children[i].y - layout.y,
        y: layout.children[i].x - layout.x
      })
      // c.setPosition({
      //   x: layout.children[i].x - layout.x,
      //   y: layout.children[i].y - layout.y
      // })

      c.setLayout(layout.children[i])
    })
  }
}
