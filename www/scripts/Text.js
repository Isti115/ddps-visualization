import PIXI from '../libraries/PIXI.js'
// import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

// import * as globals from './globals.js'

export default class Text extends Component {
  constructor (position, { text = '', fontSize = 24 } = {}) {
    super(position)

    this.properties = { text, fontSize }

    this.text = new PIXI.Text(
      this.properties.text,
      {
        fontFamily: 'Arial',
        fontSize: this.properties.fontSize,
        fill: 0xff1010,
        align: 'center'
      }
    )

    this.text.position.set(0, -this.properties.fontSize / 2)

    this.pixiGraphics.addChild(this.text)
  }

  draw () {

  }
}
