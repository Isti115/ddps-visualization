import App from './scripts/App.js'
import Circle from './scripts/Circle.js'
import ShapeShifter from './scripts/ShapeShifter.js'
import ProgressCircle from './scripts/ProgressCircle.js'
import Text from './scripts/Text.js'

const randBetween = (n, m) => n + Math.floor(m * Math.random())

const init = () => {
  const app = new App(window.document.body)

  const makeCircle = () => {
    const c = new Circle({ x: 0, y: 0 }, { radius: randBetween(10, 30) })

    c.pixiGraphics.addListener(
      'mousedown',
      () => { c.setRadius(randBetween(10, 60)) }
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
      () => { ss.setShapeKey(1 - ss.shapeShifter.shapeKey) }
    )

    return ss
  }

  const makeProgressCircle = () => {
    const pc = new ProgressCircle({ x: 0, y: 0 }, {
      radius: randBetween(20, 40),
      progress: randBetween(0, 1)
    })

    pc.pixiGraphics.addListener(
      'mousedown',
      () => { pc.setProgress(Math.random()) }
    )

    return pc
  }

  const circles = [...Array(randBetween(2, 4))].map(() => makeCircle())
  for (let c of circles) {
    c.update()

    const shapeShifters = [...Array(randBetween(2, 6))].map(() => (
      Math.random() < 0.5 ? makeShapeShifter() : makeProgressCircle()
    ))

    for (let ss of shapeShifters) {
      ss.update()
      c.addChild(ss)
    }

    app.root.addChild(c)
  }

  app.root.addChild(new Text({ x: 0, y: 0 }, { text: 'sajtosszendvics' }))

  app.layout()

  window.app = app
}

window.addEventListener('load', init, false)
