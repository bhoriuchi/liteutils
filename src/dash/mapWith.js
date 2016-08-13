import forEach from './forEach'

export default function mapWith (obj, fn) {
  let newObj = []
  forEach(obj, (v, k) => {
    let value = fn(v, k)
    if (value !== undefined) newObj.push(value)
  })
  return newObj
}