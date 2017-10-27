import get from './get'
import set from './set'
import has from './has'
import isObject from './isObject'

export default function pick (object, paths) {
  return !Array.isArray(paths) || !paths.length || !isObject(object)
    ? {}
    : paths.reduce((result, path) => {
      if (has(object, path)) {
        return set(result, path, get(object, path))
      }
    }, {})
}
