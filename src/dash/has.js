import toPath from './toPath'

function has (obj, path) {
  path = toPath(path)

  let index = -1
  let { length } = path
  let result = false
  let key

  while (++index < length) {
    key = path[index]
    if (!(result = obj != null && Object.prototype.hasOwnProperty.call(obj, key))) {
      break
    }
    obj = obj[key]
  }

  return result
}

has._accepts = [Object, Array]
has._dependencies = [
  'dash.toPath'
]

export default has