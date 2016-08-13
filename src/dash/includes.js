import isArray from './isArray'

export default function includes (obj, key) {
  return isArray(obj) && obj.indexOf(key) !== -1
}