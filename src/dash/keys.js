import isArray from './isArray'
import range from './range'

export default function keys (obj) {
  try {
    return isArray(obj) ? range(obj.length) : Object.keys(obj)
  } catch (err) {
    return []
  }
}