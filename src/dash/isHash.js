import isArray from './isArray'
import isDate from './isDate'
import isObject from './isObject'

export default function isHash (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj)
}