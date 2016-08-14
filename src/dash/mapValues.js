import forEach from './forEach'

let mapValues = function (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    newObj[k] = fn(v)
  })
  return newObj
}

mapValues._chainable = true
mapValues._accepts = [Object, Array]
mapValues._dependencies = ['dash.forEach']

export default mapValues