import forEach from './forEach'
import isObject from './isObject'
import isFunction from './isFunction'
import contains from './contains'
import clone from './clone'

function circular (obj, value = '[Circular]') {
  let circularEx = (_obj, key = null, seen = []) => {
    seen.push(_obj)
    if (isObject(_obj)) {
      forEach(_obj, (o, i) => {
        if (contains(seen, o)) _obj[i] = isFunction(value) ? value(_obj, key, clone(seen)) : value
        else circularEx(o, i, clone(seen))
      })
    }
    return _obj
  }

  if (!obj) throw new Error('circular requires an object to examine')
  return circularEx(obj, value)
}

circular._accepts = [Object, Array]
circular._dependencies = [
  'dash.forEach',
  'dash.isObject',
  'dash.isFunction',
  'dash.contains',
  'dash.clone'
]

export default circular