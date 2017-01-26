import forEach from './forEach'

function map (obj, fn) {
  let output = []
  forEach(obj, (v, k) => output.push(fn(v, k)))
  return output
}

map._accepts = [Object, Array]
map._dependencies = ['dash.forEach']

export default map