import isObject from './isObject'

export default function assign (target, ...sources) {
  if (!isObject(target)) return {}
  if (!sources.length) return target

  return sources.reduce((tgt, source) => {
    return isObject(source)
      ? Object.assign(tgt, source)
      : tgt
  }, target)
}
