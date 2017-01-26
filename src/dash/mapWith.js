import forEach from './forEach'

function mapWith (obj, fn) {
  let newObj = []
  forEach(obj, (v, k) => {
    let value = fn(v, k)
    if (value !== undefined) newObj.push(value)
  })
  return newObj
}

mapWith._accepts = [Object, Array]
mapWith._dependencies = ['dash.forEach']

export default mapWith