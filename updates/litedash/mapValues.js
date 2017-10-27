import reduce from './reduce'
import isFunction from './isFunction'
import isObject from './isObject'
import isArray from './isArray'
import identity from './identity'

export default function mapValues (object, iteratee) {
  if (!isObject(object) || isArray(object)) return {}
  const iter = isFunction(iteratee)
    ? iteratee
    : identity

  return reduce(object, (accum, v, k) => {
    try {
      accum[k] = iter(v, k, object)
    } catch (err) {
      accum[k] = undefined
    }
    return accum
  }, {})
}
