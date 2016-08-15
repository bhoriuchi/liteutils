import isArray from './isArray'

let union = function () {
  let args = [ ...arguments ]
  if (!args.length) return []

  let u = args.reduce((prev, cur) => {
    if (!isArray(prev) || !isArray(cur)) return []
    return [ ...prev ].concat([ ...cur ])
  }, [])

  return [ ...new Set(u) ]
}

union._accepts = ['ANY']
union._dependencies = ['dash.isArray']

export default union