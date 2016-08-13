import isHash from './isHash'
import forEach from './forEach'

export default function omitBy (obj, fn) {
  let newObj = {}
  if (!isHash(obj)) return newObj
  forEach(obj, (v, k) => {
    if (!fn(v, k)) newObj[k] = v
  })
  return newObj
}