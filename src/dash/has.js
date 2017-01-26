import forEach from './forEach'
import isArray from './isArray'
import toPath from './toPath'

function has (obj, path) {
  let found = true
  let fields = isArray(path) ? path : toPath(path)
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

has._accepts = [Object, Array]
has._dependencies = [
  'dash.forEach',
  'dash.isArray',
  'dash.toPath'
]

export default has