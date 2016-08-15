import isArray from './isArray'
import isHash from './isHash'
import isDate from './isDate'
import forEach from './forEach'
import includes from './includes'
import clone from './clone'

function _arrayMerge (target, source, seen) {
  forEach(source, (val, i) => {
    if (isArray(val) && !isArray(target[i])) target[i] = val
    else if (target[i] !== undefined) _merge(target[i], val, clone(seen))
    else target.push(val)
  })
}

function _merge (target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  forEach(source, (s, k) => {
    let t = target[k]
    if (t === undefined && isHash(s)) target[k] = _merge({}, s, clone(seen))
    else if (isHash(t) && isHash(s)) target[k] = _merge(t, s, clone(seen))
    else if (isArray(s) && !isArray(t)) target[k] = s
    else if (isArray(s)) forEach(s, (val, i) => _arrayMerge(t, s, seen))
    else if (isDate(s)) target[k] = new Date(s)
    else target[k] = s
  })
  return target
}

let merge = function () {
  let args = [ ...arguments ]

  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}

  let target = args[0]
  let sources = args.slice(1)

  forEach(sources, (source) => {
    if (isHash(source)) _merge(target, source)
  })
  return target
}

merge._accepts = [Object]
merge._dependencies = [
  'dash.isArray',
  'dash.isHash',
  'dash.isDate',
  'dash.forEach',
  'dash.includes',
  'dash.clone'
]

export default merge