import App from './scripts/App.js'
import Circle from './scripts/Circle.js'
import ShapeShifter from './scripts/ShapeShifter.js'

import PIXI from './libraries/PIXI.js'

const randBetween = (n, m) => n + Math.floor(m * Math.random())

const init = () => {
  const app = new App(window.document.body)

  const makeCircle = () => {
    const c = new Circle({ x: 0, y: 0 }, { radius: randBetween(10, 30) })

    c.pixiGraphics.hitArea = new PIXI.Circle(0, 0, 10)
    c.pixiGraphics.interactive = true
    c.pixiGraphics.buttonMode = true
    c.pixiGraphics.addListener(
      'mousedown',
      () => {
        c.setRadius(10 + Math.random() * 50)
        app.layout()
      }
    )

    return c
  }

  const makeShapeShifter = () => {
    const ss = new ShapeShifter({ x: 0, y: 0 }, {
      radius: randBetween(10, 30),
      shapeKey: randBetween(0, 1),
      height: randBetween(10, 50)
    })

    ss.pixiGraphics.hitArea = new PIXI.Circle(0, 0, 10)
    ss.pixiGraphics.interactive = true
    ss.pixiGraphics.buttonMode = true
    ss.pixiGraphics.addListener(
      'mousedown',
      () => {
        ss.setShapeKey(1 - ss.shapeShifter.shapeKey)
        app.layout()
      }
    )

    return ss
  }

  for (let i = 0; i < 5; i++) {
    const c1 = makeCircle()
    c1.draw()
    for (let j = 0; j < 5; j++) {
      const c2 = makeShapeShifter()
      c2.draw()
      c1.addChild(c2)
    }
    app.root.addChild(c1)
  }

  app.layout()

  window.app = app
}

window.addEventListener('load', init, false)
