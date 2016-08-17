import isFunction from '../dash/isFunction'
import isString from '../dash/isString'
import isHash from '../dash/isHash'
import forEach from '../dash/forEach'
import union from '../dash/union'
import without from '../dash/without'
import map from '../dash/map'

function removeEvent (store, el, event, handler) {
  let toRemove = []
  forEach(store.global, (e) => {
    let off = isFunction(e.off) ? e.off : () => {}
    console.log({ store, el, event, handler })
    if (e.el === el && ( !event || (e.event === event && (e.handler === handler || !handler))) ) {
      toRemove.push(e)
      off()
    }
  })
  store.global = without.apply(this, [store.global].concat(toRemove))
}

let off = function (events, selector, handler) {
  let queue = []

  if (isFunction(selector) && !handler) {
    handler = selector
    selector = undefined
  }

  if (isString(events)) {
    queue = map(events.split(/\s+/g), (event) => {
      return { event, handler }
    })
  } else if (events instanceof this.$root.Event) {
    queue = [ { event: events.type, handler } ]
  } else if (isHash(events)) {
    forEach(events, (h, e) => {
      queue = union(queue, map(e.split(/\s+/g), (event) => {
        return { event, handler: h }
      }))
    })
  } else if (!events) {
    removeEvent(this.$root.event, this)
    return this
  }

  let base = selector ? this.find(selector) : this

  base.each(function () {
    forEach(queue, (q) => {
      removeEvent(base.$root.event, this, q.event, q.handler)
    })
  })

  return this
}

off._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.isHash',
  'dash.forEach',
  'dash.union',
  'dash.without',
  'dash.map'
]

export default off