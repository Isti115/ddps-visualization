import PIXI from '../libraries/PIXI.js'

export default class App {
  /**
   * @param {HTMLElement} container
   */
  constructor (container) {
    this.container = container

    //

    this.init = this.init.bind(this)

    //

    this.init()
  }

  init () {
    this.pixiApp = new PIXI.Application({
      width: this.container.offsetWidth,
      height: this.container.offsetHeight
    })

    this.container.appendChild(this.pixiApp.view)
  }
}
