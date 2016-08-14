import isArray from './isArray'
import stringToPathArray from './stringToPathArray'

let get = function (obj, path, defaultValue) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  if (fields.length === 0) return defaultValue

  try {
    for (let f in fields) {
      if (!value[fields[f]]) return defaultValue
      else value = value[fields[f]]
    }
  } catch (err) {
    return defaultValue
  }
  return value
}

get._chainable = true
get._accepts = [Object, Array]
get._dependencies = [
  'dash.isArray',
  'dash.stringToPathArray'
]

export default get