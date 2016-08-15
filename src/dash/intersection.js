import isArray from './isArray'

let intersection = function () {
  let args = [ ...arguments ]
  if (!args.length) return []

  return args.reduce((prev, cur) => {
    if (!isArray(prev) || !isArray(cur)) return []
    let left = new Set(prev)
    let right = new Set(cur)
    let i = [ ...left ].filter(item => right.has(item))
    return [ ...i ]
  }, args[0])
}

intersection._accepts = [Array]
intersection._dependencies = ['dash.isArray']

export default intersection