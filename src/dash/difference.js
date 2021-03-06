import isArray from './isArray'

function difference () {
  let args = [ ...arguments ]
  if (!args.length) return []

  return args.reduce((prev, cur) => {
    if (!isArray(prev) || !isArray(cur)) return []
    let left = new Set(prev)
    let right = new Set(cur)
    let d = [ ...left ].filter(item => !right.has(item))
    return [ ...d ]
  }, args[0])
}

difference._accepts = [Array]
difference._dependencies = ['dash.isArray']

export default difference