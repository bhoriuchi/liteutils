import isArray from './isArray'

export default function ensureArray (obj) {
  return !obj ? [] : isArray(obj) ? obj : [obj]
}