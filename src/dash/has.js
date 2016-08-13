import forEach from './forEach'
import isArray from './isArray'
import stringToPathArray from './stringToPathArray'

export default function has (obj, path) {
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