import isArray from './isArray'
import isNumber from './isNumber'
import stringToPathArray from './stringToPathArray'
import forEach from './forEach'

let set = function (obj, path, val) {
  let fields = isArray(path) ? path : stringToPathArray(path)

  forEach(fields, (field, idx) => {
    if (idx === fields.length - 1) obj[field] = val
    else if (!obj[field]) obj[field] = isNumber(field) ? [] : {}
    obj = obj[field]
  })
}

set._chainable = true
set._accepts = [Object, Array]
set._dependencies = [
  'dash.isArray',
  'dash.isNumber',
  'dash.stringToPathArray',
  'dash.forEach'
]

export default set