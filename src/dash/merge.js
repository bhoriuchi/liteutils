import isArray from './isArray'
import isHash from './isHash'
import isDate from './isDate'
import forEach from './forEach'
import map from './map'

function _merge (target, source) {
  forEach(source, (s, k) => {
    let t = target[k]

    if (t === undefined && isHash(s)) {
      t = _merge({}, s)
    } else if (isHash(t) && isHash(s)) {
      t = _merge(t, s)
    } else if (isArray(s)) {
      t = map(s, (val) => {
        if (isHash(val)) return _merge({}, val)
        if (isArray(val)) return _merge([], val)
        return val
      })
    } else if (isDate(s)) {
      t = new Date(s)
    } else {
      t = s
    }
  })
}

export default function merge () {
  let args = [ ...arguments ]

  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}

  // new code
  let target = args[0]
  let sources = args.slice(1)

  /*
  let targetObject = args[0]
  let sources = args.slice(1)

  //  define the recursive merge function
  let _merge = function (target, source) {
    for (let k in source) {
      if (!target[k] && isHash(source[k])) {
        target[k] = _merge({}, source[k])
      } else if (target[k] && isHash(target[k]) && isHash(source[k])) {
        target[k] = merge(target[k], source[k])
      } else {
        if (isArray(source[k])) {
          target[k] = []
          for (let x in source[k]) {
            if (isHash(source[k][x])) {
              target[k].push(_merge({}, source[k][x]))
            } else if (isArray(source[k][x])) {
              target[k].push(_merge([], source[k][x]))
            } else {
              target[k].push(source[k][x])
            }
          }
        } else if (isDate(source[k])) {
          target[k] = new Date(source[k])
        } else {
          target[k] = source[k]
        }
      }
    }
    return target
  }

  //  merge each source
  for (let k in sources) {
    if (isHash(sources[k])) _merge(targetObject, sources[k])
  }
  return targetObject
  */
  forEach(sources, (source) => {
    if (isHash(source)) _merge(target, source)
  })
  return target
}