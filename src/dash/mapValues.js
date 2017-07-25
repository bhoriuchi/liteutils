import forEach from './forEach'

function mapValues (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    newObj[k] = fn(v, k)
  })
  return newObj
}

mapValues._accepts = [Object]
mapValues._dependencies = ['dash.forEach']

export default mapValues