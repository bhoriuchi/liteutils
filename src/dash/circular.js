import forEach from './forEach'
import isObject from './isObject'
import isFunction from './isFunction'
import contains from './contains'

export default function circular (obj) {
  let circularEx = (obj, value = '[Circular]', key = null, seen = []) => {
    seen.push(obj)
    if (isObject(obj)) {
      forEach(obj, (o, i) => {
        if (contains(seen, o)) obj[i] = isFunction(value) ? value(obj, key, seen.slice(0)) : value
        else circularEx(o, value, i, seen.slice(0))
      })
    }
    return obj
  }

  if (!obj) throw new Error('circular requires an object to examine')
  return circularEx(obj)
}