import isObject from './isObject'
import isFunction from './isFunction'
import isArray from './isArray'

export default function _isSettable (value) {
  return isObject(value) || isFunction(value) || isArray(value)
}
