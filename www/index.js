import App from './scripts/App.js'
import TreeGenerator from './scripts/TreeGenerator.js'

const init = () => {
  const app = new App(window.document.body)

  TreeGenerator.makeTree(app.root, 5)

  app.layout()

  window.app = app
}

window.addEventListener('load', init, false)
