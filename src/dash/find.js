import forEach from './forEach'

export default function find (obj, fn, def) {
  let found = def || null
  forEach(obj, function (v, k) {
    if (fn(v, k)) {
      found = v
      return false
    }
  })
  return found
}