import _query from './index'
import { mapWith } from '../dash'

function mapNodes (element, selector) {
  return mapWith(element.querySelectorAll(selector), (v) => {
    return typeof v === 'object' ? v : undefined
  })
}

let lQuery = function (selector) {
  if (!selector) this.el = []
  if (selector instanceof lQuery) this.el = selector.el
  else if (typeof selector === 'string') this.el = mapNodes(document, selector)
  else this.el[0] = selector
}

let query = function (selector) {
  return new lQuery(selector)
}

lib.forEach(lib, (fn, name) => {
  query[name] = fn
  if (fn._chainable === true) {
    lQuery.prototype[name] = function () {
      let args = [this._value].concat([ ...arguments ])
      this._value = fn.apply(this, args)
      return fn._terminates ? this._value : this
    }
  }
})

export default query