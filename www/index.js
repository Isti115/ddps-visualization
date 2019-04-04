import App from './scripts/App.js'

const init = () => {
  window.app = new App(window.document.body)
}

window.addEventListener('load', init, false)
