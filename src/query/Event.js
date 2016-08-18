import isString from '../dash/isString'
import forEach from '../dash/forEach'

let copyProps = 'altKey, bubbles, button, buttons, cancelable, char, charCode, clientX, clientY, ' +
  'ctrlKey, currentTarget, data, detail, eventPhase, key, keyCode, metaKey, offsetX, offsetY, originalTarget, ' +
  'pageX, pageY, relatedTarget, screenX, screenY, shiftKey, target, toElement, view, which'.split(/,\s*/g)

let filterProps = function (props) {
  let newObj = {}
  forEach(copyProps, (prop) => {
    newObj[prop] = props[prop]
  })
  return newObj
}

let Event = function (type, props) {
  if (!(this instanceof Event)) return new Event(type, props)
  if (props.data) this.data = props.data
  props = filterProps(props)
  this.originalEvent = isString(type) ? new CustomEvent(type, props) : type

  forEach(copyProps, (prop) => {
    this[prop] = this.originalEvent[prop]
  })

  return this
}

Event._chainable = false
Event._dependencies = [
  'dash.isString',
  'dash.forEach'
]

export default Event