import forEach from './forEach'
import isObject from './isObject'
import isArray from './isArray'
import isFunction from './isFunction'
import identity from './identity'
import keys from './keys'

function reduce (collection, iteratee, accumulator) {
  if (!isObject(collection) && !isArray(collection)) return undefined
  if (!isFunction(iteratee)) {
    accumulator = iteratee
    iteratee = identity
  }

  accumulator = (accumulator !== undefined)
    ? accumulator
    : isArray(collection)
      ? collection.length
        ? collection[0]
        : undefined
      : keys(collection).length
        ? collection[keys(collection)[0]]
        : undefined

  forEach(collection, (value, key) => {
    accumulator = iteratee(accumulator, value, key, collection)
  })

  return accumulator
}

reduce._accepts = [Object, Array]
reduce._dependencies = [
  'dash.forEach',
  'dash.isObject',
  'dash.isArray',
  'dash.isFunction',
  'dash.identity',
  'dash.keys'
]

export default reduce