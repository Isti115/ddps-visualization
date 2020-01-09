import PIXI from '../libraries/PIXI.js'
import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

import * as globals from './globals.js'

export default class Text extends Component {
  constructor (position, { text = '', fontSize = 25 } = {}) {
    super(position)

    this.pixiGraphics.interactive = true
    this.pixiGraphics.buttonMode = true

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

  setFontSize (fontSize) {
    return PopMotion.spring({
      from: this.fontSize,
      to: fontSize,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start(fs => { this.properties.fontSize = fs; this.update() })
  }

  draw () {
    this.pixiGraphics.removeChild(this.text)

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
}
