import toPath from './toPath'
import _hasProperty from './_hasProperty'

export default function unset (object, path) {
  try {
    const fields = toPath(path)
    let obj = object

    while (fields.length) {
      const prop = fields.shift()

      if (!_hasProperty(obj, prop)) {
        return true
      } else if (!fields.length) {
        delete obj[prop]
        return true
      }
      obj = obj[prop]
    }
    return true
  } catch (err) {
    return false
  }
}
