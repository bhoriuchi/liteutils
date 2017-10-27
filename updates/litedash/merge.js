import isObject from './isObject'
import cloneDeep from './cloneDeep'
import isArray from './isArray'
import _hasProperty from './_hasProperty'

export default function merge (target, ...sources) {
  if (!isObject(target)) return {}
  if (!sources.length) return target

  const _arrayMerge = function (tgt, src) {
    return Object.keys(src).reduce((t, k) => {
      if (!_hasProperty(t, k) || !isObject(t[k]) || !isObject(src[k])) {
        t[k] = cloneDeep(src[k])
      } else {
        merge(t[k], src[k])
      }
      return t
    }, tgt)
  }

  while (sources.length) {
    const source = sources.shift()
    if (isObject(source)) {
      Object.keys(source).forEach(key => {
        const value = source[key]

        // if target doesnt have the key,
        // the key is not an object,
        // or the source is an array and the target is not
        // overwrite with a clone
        if (!_hasProperty(target, key, true)
          || !isObject(value)
          || (isArray(value) && !isArray(target[key]))) {
          target[key] = cloneDeep(value)
        } else if (isArray(value) && isArray(target[key])) {
          _arrayMerge(target[key], value)
        } else {
          merge(target[key], value)
        }
      })
    }
  }

  return target
}
