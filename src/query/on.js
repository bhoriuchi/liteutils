import isFunction from '../dash/isFunction'
import isString from '../dash/isString'
import forEach from '../dash/forEach'

let on = function (events, selector, data, fn) {
  if (!isString(events)) return this
  if (!isString(selector)) {
    fn = data
    data = selector
    selector = undefined
  }
  if (!isFunction(fn) && isFunction(data)) {
    fn  = data
    data = undefined
  }
  if (!fn) return this

  let base = selector ? this.find(selector) : this

  // create a function that adds data to the event if data exists
  let handler = (event) => fn(new this.$root.Event(event, data))

  base.each(function (i, el) {
    let off = null
    let prefix = !el.addEventListener ? 'on' : ''

    forEach(events.split(/\s+/g), (event) => {
      event = `${prefix}${event}`

      if (el.addEventListener) {
        el.addEventListener(event, handler, false)
        off = () => el.removeEventListener(event, handler, false)
      } else if (el.attachEvent) {
        el.attachEvent(event, handler)
        off = () => el.detachEvent(event, handler)
      }
      base.$root.event.global.push({ el, event, handler, off })
    })
  })
  return this
}

on._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.forEach',
  'query.each',
  'query.find'
]

export default on