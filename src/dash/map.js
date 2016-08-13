import forEach from './forEach'

let map = function (obj, fn) {
  let output = []
  forEach(obj, (v, k) => output.push(fn(v, k)))
  return output
}

map._chainable = true

export default map