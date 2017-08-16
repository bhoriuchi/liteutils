import isArray from './isArray'
import toPath from './toPath'

function get (obj, path, defaultValue) {
  let fields = isArray(path) ? path : toPath(path)

  let idx = 0
  const length = fields.length

  while (obj !== null && idx < length) {
    obj = obj[fields[idx++]]
  }

  return (idx && idx === length) ? obj : defaultValue

}

get._accepts = [Object, Array]
get._dependencies = [
  'dash.isArray',
  'dash.toPath'
]

export default get