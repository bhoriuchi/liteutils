import cloneDeep from './cloneDeep'
import unset from './unset'
import isObject from './isObject'
import isArray from './isArray'

export default function omit (object, paths) {
  if (!isObject(object)) return {}
  if (!isArray(paths)) return object

  const obj = cloneDeep(object)

  return paths.reduce((o, path) => {
    unset(o, path)
    return o
  }, obj)
}
