import has from './has'
import isArray from './isArray'
import isHash from './isHash'

let stringify = function (obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj)
    else if (has(obj, 'toString')) return obj.toString()
    else return String(obj)
  } catch (err) {}
  return ''
}

stringify._chainable = true
stringify._accepts = ['ANY']
stringify._dependencies = [
  'dash.has',
  'dash.isArray',
  'dash.isHash'
]

export default stringify