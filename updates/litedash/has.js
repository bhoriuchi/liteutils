import toPath from './toPath'
import _hasProperty from './_hasProperty'

export default function has (object, path) {
  const fields = toPath(path)
  let obj = object

  while (fields.length) {
    const prop = fields.shift()

    if (!_hasProperty(obj, prop)) {
      return false
    } else if (!fields.length) {
      return true
    }
    obj = obj[prop]
  }

  return false
}
