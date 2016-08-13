import isArray from './isArray'
import isNumber from './isNumber'
import stringToPathArray from './stringToPathArray'

export default function set (obj, path, val) {
  let value = obj
  let fields = isArray(path) ? path : stringToPathArray(path)
  for (let f in fields) {
    let idx = Number(f)
    let p = fields[idx]
    if (idx === fields.length - 1) value[p] = val
    else if (!value[p]) value[p] = isNumber(p) ? [] : {}
    value = value[p]
  }
}