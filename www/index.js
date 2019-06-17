import App from './scripts/App.js'
import Circle from './scripts/Circle.js'
import ShapeShifter from './scripts/ShapeShifter.js'
import Text from './scripts/Text.js'

const randBetween = (n, m) => n + Math.floor(m * Math.random())

const init = () => {
  const app = new App(window.document.body)

  const makeCircle = () => {
    const c = new Circle({ x: 0, y: 0 }, { radius: randBetween(10, 30) })

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

    ss.pixiGraphics.addListener(
      'mousedown',
      () => {
        ss.setShapeKey(1 - ss.shapeShifter.shapeKey)
        app.layout()
      }
    )

    return ss
  }

  const circles = [...Array(randBetween(2, 4))].map(() => makeCircle())
  for (let c of circles) {
    c.draw()

    const shapeShifters = [...Array(randBetween(2, 6))].map(() => makeShapeShifter())
    for (let ss of shapeShifters) {
      ss.draw()
      c.addChild(ss)
    }

    app.root.addChild(c)
  }

  app.root.addChild(new Text({ x: 0, y: 0 }, { text: 'sajtosszendvics' }))

  app.layout()

  window.app = app
}

window.addEventListener('load', init, false)
