import forEach from './forEach'

export default function map (obj, fn) {
  let output = []
  forEach(obj, (v, k) => output.push(fn(v, k)))
  return output
}