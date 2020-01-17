import App from './scripts/App.js'
import Circle from './scripts/Circle.js'
import ProgressCircle from './scripts/ProgressCircle.js'
import Rectangle from './scripts/Rectangle.js'
import ShapeShifter from './scripts/ShapeShifter.js'
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

  const makeRectangle = () => {
    const r = new Rectangle({ x: 0, y: 0 }, {
      width: randBetween(40, 200),
      height: randBetween(30, 50)
    })

    r.pixiGraphics.addListener(
      'mousedown',
      () => {
        r.setWidth(randBetween(40, 200))
        r.setHeight(randBetween(30, 50))
      }
    )

    return r
  }

  const makeShapeShifter = () => {
    const ss = new ShapeShifter({ x: 0, y: 0 }, {
      radius: randBetween(10, 30),
      shapeKey: randBetween(0, 1),
      height: randBetween(10, 50)
    })

    ss.pixiGraphics.addListener(
      'mousedown',
      () => { ss.setShapeKey(1 - ss.properties.shapeKey) }
    )

    return ss
  }

  const circles = [...Array(randBetween(2, 3))].map(() => (
    Math.random() < 0.5 ? makeCircle() : makeRectangle()
  ))
  for (let c of circles) {
    c.update()

    const shapeShifters = [...Array(randBetween(2, 3))].map(() => (
      Math.random() < 0.5 ? makeShapeShifter() : makeProgressCircle()
    ))

    for (let ss of shapeShifters) {
      ss.update()
      c.addChild(ss)
    }

    app.root.addChild(c)
  }

  const t = new Text({ x: 0, y: 0 }, { text: 'sajtosszendvics' })
  t.pixiGraphics.addListener(
    'mousedown',
    () => { t.setFontSize(randBetween(10, 30)) }
  )
  app.root.addChild(t)
  t.update()

  app.layout()

  window.app = app
}

window.addEventListener('load', init, false)
