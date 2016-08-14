import isArray from './isArray'
import forEach from './forEach'

let filter = function (obj, fn) {
  let newObj = []
  if (!isArray(obj)) return newObj
  forEach(obj, function (v, k) {
    if (fn(v, k)) newObj.push(v)
  })
  return newObj
}

filter._chainable = true
filter._accepts = [Array]
filter._dependencies = [
  'dash.isArray',
  'dash.forEach'
]

export default filter