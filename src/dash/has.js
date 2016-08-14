import forEach from './forEach'
import isArray from './isArray'
import stringToPathArray from './stringToPathArray'

let has = function (obj, path) {
  let found = true
  let fields = isArray(path) ? path : stringToPathArray(path)
  if (!fields.length) return false
  forEach(fields, (field) => {
    if (obj[field] === undefined) {
      found = false
      return false
    }
    obj = obj[field]
  })
  return found
}

has._chainable = true
has._accepts = [Object, Array]
has._dependencies = [
  'dash.forEach',
  'dash.isArray',
  'dash.stringToPathArray'
]

export default has