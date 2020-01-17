import Circle from './Circle.js'
import ProgressCircle from './ProgressCircle.js'
import Rectangle from './Rectangle.js'
import ShapeShifter from './ShapeShifter.js'
import Text from './Text.js'

const randBetween = (n, m) => n + Math.floor((m - n) * Math.random())

const makeCircle = () => {
  const c = new Circle({ radius: randBetween(10, 30) })

  c.pixiGraphics.addListener(
    'pointerdown',
    () => { c.setRadius(randBetween(10, 60)) }
  )

  c.update()
  return c
}

const makeProgressCircle = () => {
  const pc = new ProgressCircle({
    radius: randBetween(20, 40),
    progress: randBetween(0, 1)
  })

  pc.pixiGraphics.addListener(
    'pointerdown',
    () => { pc.setProgress(Math.random()) }
  )

  pc.update()
  return pc
}

const makeRectangle = () => {
  const r = new Rectangle({
    width: randBetween(40, 200),
    height: randBetween(30, 50)
  })

  r.pixiGraphics.addListener(
    'pointerdown',
    () => {
      r.setWidth(randBetween(40, 200))
      r.setHeight(randBetween(30, 50))
    }
  )

  r.update()
  return r
}

const makeShapeShifter = () => {
  const ss = new ShapeShifter({
    radius: randBetween(10, 30),
    shapeKey: randBetween(0, 1),
    height: randBetween(30, 75)
  })

  ss.pixiGraphics.addListener(
    'pointerdown',
    () => { ss.setShapeKey(1 - ss.properties.shapeKey) }
  )

  ss.update()
  return ss
}

const words = [ 'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur' ]

const makeText = () => {
  // const t = new Text({ text: 'sajtosszendvics' })
  const t = new Text({ text: words[randBetween(0, 6)] })
  t.pixiGraphics.addListener(
    'pointerdown',
    () => { t.setFontSize(randBetween(10, 30)) }
  )

  t.update()
  return t
}

const generators = [
  makeCircle,
  makeProgressCircle,
  makeRectangle,
  makeShapeShifter,
  makeText
]

const childLimits = [
  [2, 4],
  [2, 4],
  [2, 4],
  [1, 3],
  [1, 3]
]

window.randBetween = randBetween

const randomChildCount = depth => (
  randBetween(...(childLimits[depth - 1]))
  // (depth === 5 ? 2 : 1) + Math.floor((5 - (depth / 2)) * Math.random())
)

export default {
  makeTree (root, depth) {
    if (depth === 0 || (depth < 3 && Math.random() < 0.5)) {
      return
    }

    const children = [...Array(randomChildCount(depth))].map(
      () => generators[randBetween(0, 5)]()
    )

    children.forEach(c => {
      this.makeTree(c, ((Math.random() + (children.length / 5) < 0.5) ? depth : depth - 1))
      root.addChild(c)
    })
  },

  makeTree_v1 (root) {
    const circles = [...Array(randBetween(2, 3))].map(() => (
      Math.random() < 0.5 ? makeCircle() : makeRectangle()
    ))
    for (let c of circles) {
      const shapeShifters = [...Array(randBetween(2, 3))].map(() => (
        Math.random() < 0.5 ? makeShapeShifter() : makeProgressCircle()
      ))

      for (let ss of shapeShifters) {
        c.addChild(ss)
      }

      root.addChild(c)
    }

    const t = makeText()
    root.addChild(t)
  }
}

// export default class TreeGenerator {
//   static makeTree (root) {
//
//   }
// }
