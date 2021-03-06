import isHash from './isHash'
import forEach from './forEach'

function pickBy (obj, fn) {
  let newObj = {}
  if (!isHash(obj)) return newObj
  forEach(obj, (v, k) => {
    if (fn(v, k)) newObj[k] = v
  })
  return newObj
}

pickBy._accepts = [Object]
pickBy._dependencies = [
  'dash.isHash',
  'dash.forEach'
]

export default pickBy