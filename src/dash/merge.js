import isArray from './isArray'
import isHash from './isHash'
import isDate from './isDate'

export default function merge () {
  let args = [ ...arguments ]
  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}
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
}