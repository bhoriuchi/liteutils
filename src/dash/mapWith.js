import forEach from './forEach'

let mapWith = function (obj, fn) {
  let newObj = []
  forEach(obj, (v, k) => {
    let value = fn(v, k)
    if (value !== undefined) newObj.push(value)
  })
  return newObj
}

mapWith._chainable = true
mapWith._accepts = [Object, Array]
mapWith._dependencies = ['dash.forEach']

export default mapWith