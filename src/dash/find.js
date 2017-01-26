import forEach from './forEach'

function find (obj, fn, def) {
  let found = def || null
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v
      return false
    }
  })
  return found
}

find._accepts = [Object, Array]
find._dependencies = ['dash.forEach']

export default find