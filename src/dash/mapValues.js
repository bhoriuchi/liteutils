import forEach from './forEach'

function mapValues (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    newObj[k] = fn(v)
  })
  return newObj
}

mapValues._accepts = [Object, Array]
mapValues._dependencies = ['dash.forEach']

export default mapValues