import toPath from './toPath'
import has from './has'

function set (obj, path, val) {
  let fields = Array.isArray(path) ? path : toPath(path)
  let prop = fields.shift()

  if (!fields.length) return obj[prop] = value
  if (!has(obj, prop)) obj[prop] = (fields.length >= 1 && typeof fields[0] === 'number') ? [] : {}

  set(obj[prop], fields, value)
}

set._accepts = [Object, Array]
set._dependencies = [
  'dash.toPath',
  'dash.has'
]

export default set