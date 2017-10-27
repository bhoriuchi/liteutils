import forEach from './forEach'
import isObject from './isObject'
import isArray from './isArray'
import isFunction from './isFunction'
import identity from './identity'
import keys from './keys'

export default function reduce (collection, iteratee, accumulator) {
  let accum = accumulator
  let iter = iteratee

  if (!isObject(collection) && !isArray(collection)) return undefined
  if (!isFunction(iter)) {
    accum = iter
    iter = identity
  }

  accum = accum !== undefined
    ? accum
    : isArray(collection)
      ? collection.length
        ? collection[0]
        : undefined
      : keys(collection).length
        ? collection[keys(collection)[0]]
        : undefined

  forEach(collection, (value, key) => {
    accum = iter(accum, value, key, collection)
  })

  return accum
}
