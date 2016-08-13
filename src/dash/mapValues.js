import forEach from './forEach'

export default function mapValues (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    newObj[k] = fn(v)
  })
  return newObj
}