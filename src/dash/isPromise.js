import isFunction from './isFunction'

function isPromise (obj) {
  return obj instanceof Promise || (obj && isFunction(obj.then) && isFunction(obj.catch))
}

isPromise._accepts = ['ANY']
isPromise._dependencies = ['dash.isFunction']

export default isPromise