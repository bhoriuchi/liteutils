import isFunction from './isFunction'

export default function isPromise (obj) {
  return obj && isFunction(obj.then) && isFunction(obj.catch)
}