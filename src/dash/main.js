import lib from './index'

let Dash = function (obj) {
  this._value = obj
}

Dash.prototype.value = function () {
  return this._value
}

let util = function (obj) {
  return new Dash(obj)
}

lib.forEach(lib, (fn, name) => {
  util[name] = fn
  if (fn._chainable === true) {
    Dash.prototype[name] = function () {
      let args = [this._value].concat([ ...arguments ])
      this._value = fn.apply(this, args)
      return this
    }
  }
})

export default util