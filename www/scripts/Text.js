import PIXI from '../libraries/PIXI.js'
// import PopMotion from '../libraries/PopMotion.js'

import Component from './Component.js'

// import * as globals from './globals.js'

export default class Text extends Component {
  constructor (position, { text }) {
    super(position)

    this.properties = { text }

    this.text = new PIXI.Text(
      this.properties.text,
      {
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 0xff1010,
        align: 'center'
      }
    )

    this.pixiGraphics.addChild(this.text)
  }

  draw () {

  }
}
