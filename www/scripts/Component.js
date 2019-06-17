import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Connector from './Connector.js'

import * as globals from './globals.js'

export default class Component {
  constructor ({ x = 0, y = 0 } = {}) {
    // Store parameters
    this.position = { x, y }

    // Bind methods
    this.init = this.init.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.setPosition = this.setPosition.bind(this)

    // Does the constructor here see the overridden fucntion of subclasses?
    this.draw = this.draw.bind(this)

    this.addChild = this.addChild.bind(this)
    this.getLayout = this.getLayout.bind(this)
    this.setLayout = this.setLayout.bind(this)

    // Call init
    this.init()
  }

  init () {
    this.pixiContainer = new PIXI.Container()
    this.pixiContainer.position.set(this.position.x, this.position.y)

    this.pixiGraphics = new PIXI.Graphics()
    this.pixiContainer.addChild(this.pixiGraphics)

    this.children = []
    this.connectors = []
  }

  updatePosition () {
    this.pixiContainer.position.set(this.position.x, this.position.y)
  }

  setPosition (position) {
    return PopMotion.spring({
      from: this.position,
      to: position,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(p => { this.position = p; this.updatePosition() })
  }

  draw () {

  }

  addChild (child) {
    this.children = [...this.children, child]
    this.pixiContainer.addChild(child.pixiContainer)

    const connector = new Connector()
    this.connectors = [...this.connectors, connector]
    this.pixiContainer.addChild(connector.pixiGraphics)
  }

  getLayout () {
    const localBounds = this.pixiGraphics.getLocalBounds()

    return ({
      // Flipping coordinates because flextree gives vertical results.
      size: [
        localBounds.height + globals.margin.y,
        localBounds.width + globals.margin.x
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
      // Flipping coordinates because flextree gives vertical results.
      const offset = {
        x: layout.children[i].y - layout.y,
        y: layout.children[i].x - layout.x
      }

      c.setPosition({
        x: offset.x,
        y: offset.y
      })
      // c.setPosition({
      //   x: layout.children[i].x - layout.x,
      //   y: layout.children[i].y - layout.y
      // })

      this.connectors[i].setOffset(offset)

      c.setLayout(layout.children[i])
    })
  }
}