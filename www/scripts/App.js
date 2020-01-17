import FlexTree from '../libraries/FlexTree.js'
import PIXI from '../libraries/PIXI.js'
import Viewport from '../libraries/Viewport.js'

import Component from './Component.js'
import * as globals from './globals.js'

const horizontal = true

const flipLayout = tree => {
  tree.size.reverse()
  if (tree.children) {
    tree.children.forEach(flipLayout)
  }
  ;[tree.x, tree.y] = [tree.y, tree.x]
}

// const mirrorLayout = tree => {
//   tree.x = -tree.x - tree.size[0]
//   if (tree.children) {
//     tree.children.forEach(mirrorLayout)
//   }
// }

// const translateLayout = (tree, offset) => {
//   tree.x += offset.x
//   tree.y += offset.y
//   if (tree.children) {
//     tree.children.forEach(c => translateLayout(c, offset))
//   }
// }

const makeRelative = tree => {
  if (tree.children) {
    tree.children.forEach(c => {
      makeRelative(c)
      c.x -= tree.x
      c.y -= tree.y
    })
  }
}

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
    this.tick = this.tick.bind(this)

    // Call init
    this.init()
  }

  init () {
    this.pixiApp = new PIXI.Application({
      width: this.container.offsetWidth,
      height: this.container.offsetHeight,
      antialias: true
    })

    this.pixiApp.renderer.backgroundColor = 0xffffff

    this.container.appendChild(this.pixiApp.view)
    // this.container.addEventListener('keydown', () => this.layout())

    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,

      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: this.pixiApp.renderer.plugins.interaction
    })
    this.viewport.drag().pinch().wheel().decelerate()

    // this.root = new Component()
    // if (horizontal) {
    //   this.root = new Component({ x: 0, y: this.container.clientHeight / 2 })
    // } else {
    //   this.root = new Component({ x: this.container.clientWidth / 2, y: 0 })
    // }
    this.root = horizontal
      ? new Component({ x: 0, y: this.container.clientHeight / 2 })
      : new Component({ x: this.container.clientWidth / 2, y: 0 })
    // this.pixiApp.stage.addChild(this.root.pixiContainer)
    this.viewport.addChild(this.root.pixiContainer)
    this.pixiApp.stage.addChild(this.viewport)

    this.pixiApp.ticker.add(this.tick)

    this.layoutCounter = 0
    // setInterval(this.layout, 1000)

    this.paused = false
  }

  layout () {
    const flextreeLayout = FlexTree({ spacing: globals.spacing })

    const rootLayout = this.root.getLayout()
    rootLayout.size = [200, 200]

    if (horizontal) { flipLayout(rootLayout) }
    const tree = flextreeLayout.hierarchy(rootLayout)
    flextreeLayout(tree)
    if (horizontal) { flipLayout(tree) }
    // mirrorLayout(tree)

    this.tree = tree

    // if (horizontal) {
    //   this.root.setPosition({ x: 100, y: this.root.position.y })
    // } else {
    //   this.root.setPosition({ x: this.root.position.x, y: 100 })
    // }

    makeRelative(tree)

    if (horizontal) {
      tree.y = this.container.clientHeight / 2
    } else {
      tree.x = this.container.clientWidth / 2
    }

    this.root.setLayout(tree)
  }

  tick () {
    if (this.layoutCounter === 60 && !this.paused) {
      this.layout()
      this.layoutCounter = 0
    }

    this.layoutCounter++
  }
}
