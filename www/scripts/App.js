import FlexTree from '../libraries/FlexTree.js'
import PIXI from '../libraries/PIXI.js'

import Component from './Component.js'

export default class App {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    // Store parameters
    this.container = container

    // Bind methods
    this.init = this.init.bind(this)
    this.layout = this.layout.bind(this)

    // Call init
    this.init()
  }

  init () {
    this.pixiApp = new PIXI.Application({
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
      antialias: true
    })

    this.container.appendChild(this.pixiApp.view)
    this.container.addEventListener('keydown', () => this.layout())

    this.root = new Component()
    this.pixiApp.stage.addChild(this.root.pixiContainer)
  }

  layout () {
    const flextreeLayout = FlexTree({ spacing: 20 })

    const rootLayout = this.root.getLayout()
    // rootLayout.size = [0, 50]

    const tree = flextreeLayout.hierarchy(rootLayout)
    flextreeLayout(tree)
    tree.x = -(this.container.clientWidth / 2)
    tree.y = -100
    this.root.setLayout(tree)
  }
}
