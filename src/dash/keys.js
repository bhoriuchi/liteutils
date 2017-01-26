import isArray from './isArray'
import range from './range'

function keys (obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj)
  } catch (err) {
    return []
  }
}

keys._accepts = [Object, Array]
keys._dependencies = [
  'dash.isArray',
  'dash.range'
]

export default keys