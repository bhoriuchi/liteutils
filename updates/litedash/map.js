import identity from './identity'
import forEach from './forEach'

export default function map (collection, iteratee) {
  const fn = typeof iteratee === 'function'
    ? iteratee
    : identity
  const value = []

  forEach(collection, (v, k) => {
    value.push(fn(v, k))
  })

  return value
}
