import EventHandlerManager from './EventHandlerManager.js'
import PopMotion from '../libraries/PopMotion.js'

import * as globals from './globals.js'

class AnimationManager extends EventHandlerManager {
  constructor () {
    super(['allfinished'])

    this.animations = []
  }

  animate (from, to, update) {
    return PopMotion.spring({
      from,
      to,
      //
      stiffness: globals.stiffness,
      dampening: globals.dampening
    }).start({
      update,
      complete: () => this.createEvent('allfinished')
    })
  }
}

export default new AnimationManager()
