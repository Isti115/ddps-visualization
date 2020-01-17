import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Connector from './Connector.js'

import * as globals from './globals.js'

const capitalize = s => (
  s.slice(0, 1).toUpperCase() + s.slice(1)
)

export default class Component {
  constructor ({ x = 0, y = 0 } = {}, properties = {}) {
    // Store parameters
    this.position = { x, y }
    this.properties = properties

    Object.keys(properties).forEach(name => {
      this[`set${capitalize(name)}`] = value => {
        this.setProperty(name, value)
      }
    })

    // Bind methods
    this.init = this.init.bind(this)
    this.updatePosition = this.updatePosition.bind(this)
    this.setPosition = this.setPosition.bind(this)

    this.updateConnectors = this.updateConnectors.bind(this)
    this.update = this.update.bind(this)

    // Does the constructor here see the overridden fucntion of subclasses?
    this.draw = this.draw.bind(this)
    this.updateHitArea = this.updateHitArea.bind(this)

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

    this.connectorsContainer = new PIXI.Container()
    this.pixiContainer.addChild(this.connectorsContainer)

    this.localBounds = {
      width: 0,
      height: 0
    }
  }

  updatePosition () {
    this.pixiContainer.position.set(this.position.x, this.position.y)
    this.updateConnectors()
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

  setProperty (name, value) {
    return PopMotion.spring({
      from: this.properties[name],
      to: value,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(v => { this.properties[name] = v; this.update() })
  }

  setProperties (properties) {
    return PopMotion.spring({
      from: this.properties,
      to: { ...this.properties, ...properties },
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(p => { this.properties = p; this.update() })
  }

  updateConnectors () {
    if (this.parent) {
      this.parent.connector.draw({
        x: this.position.x -
       (this.localBounds.width / 2) -
       (this.parent.parent.localBounds.width / 2),
        y: this.position.y
      })
    }

    this.children.forEach(({ child, connector }) => {
      connector.draw({
        x: child.position.x -
         (child.localBounds.width / 2) -
         (this.localBounds.width / 2),
        y: child.position.y
      })
    })
  }

  update () {
    this.draw()
    this.updateHitArea()

    this.localBounds = this.pixiGraphics.getLocalBounds()
    this.connectorsContainer.position.set(this.localBounds.width / 2, 0)

    this.updateConnectors()
  }

  draw () { }

  updateHitArea () { }

  addChild (child) {
    const connector = new Connector()

    child.parent = { parent: this, connector }

    this.children = [...this.children, { child, connector }]

    this.pixiContainer.addChild(child.pixiContainer)
    this.connectorsContainer.addChild(connector.pixiGraphics)
  }

  getLayout () {
    return ({
      size: [
        this.localBounds.width + globals.margin.x,
        this.localBounds.height + globals.margin.y
      ],
      children: this.children.map(c => c.child.getLayout())
    })
  }

  setLayout (layout) {
    this.setPosition(layout)

    this.children.forEach(({ child, connector }, i) => {
      connector.draw({
        x: child.position.x -
         (child.localBounds.width / 2) -
         (this.localBounds.width / 2),
        y: child.position.y
      })
      child.setLayout(layout.children[i])
    })
  }
}
