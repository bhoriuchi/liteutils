import onEvent from './onEvent'

let on = function (events, selector, data, fn) {
  onEvent.call(this, false, events, selector, data, fn)
  return this
}

on._dependencies = ['query.onEvent']

export default on