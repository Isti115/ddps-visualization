export default class EventHandlerManager {
  constructor (eventTypes) {
    this.eventListeners = Object.assign({}, ...eventTypes.map(
      eventType => ({ [eventType]: [] })
    ))

    this.addEventListener = this.addEventListener.bind(this)
    this.removeEventListener = this.removeEventListener.bind(this)
  }

  addEventListener (type, callback) {
    if (!(type in this.eventListeners)) {
      throw new Error(`Cannot add event listener to ${this.constructor.name} for unknown event type: ${type}`)
    }

    this.eventListeners[type].push(callback)
  }

  removeEventListener (type, callback) {
    if (!(type in this.eventListeners)) {
      throw new Error(`Cannot remove event listener from ${this.constructor.name} for unknown event type: ${type}`)
    } else if (!this.eventListeners[type].includes(callback)) {
      throw new Error(`Cannot remove event listener from ${this.constructor.name} because it has not been found as a callback for event type: ${type}`)
    }

    this.eventListeners[type].splice(this.eventListeners[type].indexOf(callback))
  }

  createEvent (type, event) {
    if (!(type in this.eventListeners)) {
      throw new Error(`Cannot create event for unknown event type: ${type}`)
    }

    this.eventListeners[type].forEach(callback => callback(event))
  }
}
