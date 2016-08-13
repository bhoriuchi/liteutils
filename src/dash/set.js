import isArray from './isArray'
import isNumber from './isNumber'
import stringToPathArray from './stringToPathArray'
import forEach from './forEach'

export default function set (obj, path, val) {
  let fields = isArray(path) ? path : stringToPathArray(path)

  forEach(fields, (field, idx) => {
    if (idx === fields.length - 1) obj[field] = val
    else if (!obj[field]) obj[field] = isNumber(field) ? [] : {}
    obj = obj[field]
  })
}