import onEvent from './onEvent'

let one = function (events, selector, data, fn) {
  onEvent.call(this, true, events, selector, data, fn)
  return this
}

one._dependencies = ['query.onEvent']

export default one