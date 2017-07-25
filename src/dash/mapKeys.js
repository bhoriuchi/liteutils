import forEach from './forEach'

function mapKeys (obj, fn) {
  let newObj = {}
  forEach(obj, (v, k) => {
    let newKey = fn(v, k)
    newObj[typeof newKey === 'string' ? newKey : k] = v
  })
  return newObj
}

mapKeys._accepts = [Object]
mapKeys._dependencies = ['dash.forEach']

export default mapKeys